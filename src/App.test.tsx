import React from 'react'
import { act, render } from '@testing-library/react'
import App from './App'
import { getCards } from './services/cardService'

jest.mock('./services/cardService')

describe('<App />', () => {
  it('should render cards fetched from API', async () => {
    const mockCards = [
      { id: 'id_1', term: 'Term 1', definition: 'Definition 1' },
      { id: 'id_2', term: 'Term 2', definition: 'Definition 2' },
      { id: 'id_3', term: 'Term 3', definition: 'Definition 3' },
    ]

    let getByText
    await act(async () => {
      await getCards.mockResolvedValue(mockCards)(({ getByText } = render(<App />)))
    })

    mockCards.forEach(card => {
      expect(getByText(RegExp(card.term, 'i'))).toBeInTheDocument()
      expect(getByText(RegExp(card.definition, 'i'))).toBeInTheDocument()
    })
  })
})
