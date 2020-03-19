import React, { FunctionComponent, MouseEvent, useState } from 'react'
import styled from 'styled-components'
import { Button, Text } from 'rebass'
import { TCard } from '../App'
import { removeCard } from '../services/cardService'
import CardForm from './CardForm'

const ViewContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 300px;
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 1rem;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
`

type TCardViewProps = TCard & { onRemove: (id: string) => void }
type TViewProps = TCardViewProps & { onEdit: () => void }

export const CardView: FunctionComponent<TCardViewProps> = ({ onRemove, ...card }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const handleToggleEdit = (): void => {
    setIsEditMode(current => !current)
  }
  // TODO: Use update when available in cardService...
  const handleSave = (): void => {}

  return isEditMode ? (
    <ViewContainer>
      <CardForm onSave={handleSave} onCancel={handleToggleEdit} />
    </ViewContainer>
  ) : (
    <View {...card} onRemove={onRemove} onEdit={handleToggleEdit} />
  )
}

const View: FunctionComponent<TViewProps> = ({ id, term, definition, onRemove, onEdit }) => {
  const [isFront, setIsFront] = useState(true)
  const handleShow = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setIsFront(current => !current)
  }

  const handleRemove = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    const confirm: boolean = window.confirm(`Do you want to remove "${term}"?`)

    if (confirm) {
      try {
        await removeCard(id) // Wait until the card is removed from the DB via API call
        onRemove(id) // ... and then remove it from the App state
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <ViewContainer>
      <Text>{isFront ? 'Front' : 'Back'}</Text>
      <Text>{isFront ? `Term: ${term}` : `Definition: ${definition}`}</Text>
      <ButtonsContainer>
        <Button variant="secondary" type="button" onClick={handleShow}>
          Show {isFront ? 'back' : 'front'}
        </Button>
        <div>
          <Button variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </ButtonsContainer>
    </ViewContainer>
  )
}

export default CardView
