import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TCard } from '../../App'
import CardForm from '../CardForm'

describe('<CardForm />', () => {
  it('should render Update Card form', () => {
    const heading = 'Update card'
    const term = 'This is a test term'
    const definition = 'This is a test definition'
    const card: TCard = { id: 'abc', term, definition }
    const onSave = jest.fn()
    const onCancel = jest.fn()
    const { getByText } = render(<CardForm card={card} onSave={onSave} onCancel={onCancel} />)

    expect(getByText(heading)).toBeInTheDocument()
    expect(getByText(term)).toBeInTheDocument()
    expect(getByText(definition)).toBeInTheDocument()
  })

  it('should handle term input', () => {
    const heading = 'Add card'
    const term = 'This is a test term'
    const onSave = jest.fn()
    const onCancel = jest.fn()

    const { debug, getByText, getByPlaceholderText } = render(<CardForm onSave={onSave} onCancel={onCancel} />)

    expect(getByText(heading)).toBeInTheDocument()
    const termTextArea = getByPlaceholderText('Enter your term')

    fireEvent.input(termTextArea, { target: { value: term } })

    fireEvent.click(getByText(/save/i))

    // TODO: Mock saveCard
    expect(onSave).toHaveBeenCalledTimes(1)
    debug()
  })
})
