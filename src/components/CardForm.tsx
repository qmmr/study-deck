import React, { useState, FunctionComponent, ChangeEvent, FormEvent } from 'react'
import { Box, Button } from 'rebass'
import { Label, Textarea } from '@rebass/forms'
import { saveCard } from '../services/cardService'
import { TCard } from '../App'

type TCardFormProps = { onSave: (card: TCard) => void }
const CardForm: FunctionComponent<TCardFormProps> = props => {
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')

  const handleTermChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setTerm(event.target.value)
  }

  const handleDefinitionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDefinition(event.target.value)
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      const card: TCard = await saveCard({ term, definition })
      props.onSave && typeof props.onSave === 'function' && props.onSave(card)
      handleReset()
    } catch (err) {
      throw err
    }
  }

  const handleReset = (): void => {
    setTerm('')
    setDefinition('')
  }

  return (
    <Box as="form" onSubmit={handleSubmit} onReset={handleReset}>
      CardForm
      <Label htmlFor="term">Term</Label>
      <Textarea id="term" name="term" value={term} onChange={handleTermChange} placeholder="Enter your term" />
      <Label htmlFor="definition">Term</Label>
      <Textarea
        id="definition"
        name="definition"
        onChange={handleDefinitionChange}
        placeholder="Enter your definition"
        value={definition}
      />
      <Button type="submit">Save</Button>
      <Button type="reset">Clear</Button>
    </Box>
  )
}

export default CardForm
