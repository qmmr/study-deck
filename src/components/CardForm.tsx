import React, { useState, FunctionComponent, ChangeEvent, FormEvent } from 'react'
import { Box, Button, Text } from 'rebass'
import { Label, Textarea } from '@rebass/forms'
import { saveCard } from '../services/cardService'
import { TCard } from '../App'

type TCardFormProps = {
  onSave?: (card: TCard) => void
  onCancel?: () => void
  card?: TCard
}

const CardForm: FunctionComponent<TCardFormProps> = ({
  onSave = () => {},
  onCancel = () => {},
  card = { id: undefined, term: '', definition: '' },
}) => {
  const isSaved: boolean = !!card && 'id' in card && card.id !== undefined
  const [term, setTerm] = useState(isSaved ? card.term : '')
  const [definition, setDefinition] = useState(isSaved ? card.definition : '')

  const handleTermChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setTerm(event.target.value)
  }

  const handleDefinitionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDefinition(event.target.value)
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    console.log('handleSubmit :: ', card, term, definition)
    event.preventDefault()
    try {
      const savedCard: TCard = await saveCard({ id: card.id, term, definition })
      onSave(savedCard)
      handleReset()
    } catch (err) {
      throw err
    }
  }

  const handleReset = (): void => {
    setTerm('')
    setDefinition('')
    onCancel()
  }

  return (
    <Box as="form" onSubmit={handleSubmit} onReset={handleReset}>
      <Text as="h4">{isSaved ? 'Update card' : 'Add card'}</Text>
      <Label htmlFor={isSaved ? `term_${card.id}` : 'new'}>Term</Label>
      <Textarea
        id={isSaved ? `term_${card.id}` : 'new'}
        name="term"
        value={term}
        onChange={handleTermChange}
        placeholder="Enter your term"
      />
      <Label htmlFor={isSaved ? `definition_${card.id}` : 'new'}>Definition</Label>
      <Textarea
        id={isSaved ? `definition_${card.id}` : 'new'}
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
