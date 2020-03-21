import React, { FunctionComponent, MouseEvent, useState } from 'react'
import { Button, Flex, Text } from 'rebass'
import { TCard } from '../App'
import { removeCard } from '../services/cardService'
import CardForm from './CardForm'

type TCardViewProps = TCard & {
  onRemove: (id: string) => void
  onUpdate: (card: TCard) => void
}
type TViewProps = TCard & { onEdit: () => void; onRemove: (id: string) => void }
type TViewContainerProps = { children: React.ReactNode }

export const CardContainer: FunctionComponent<TViewContainerProps> = ({ children }) => {
  return (
    <Flex
      flexDirection="column"
      flexWrap="nowrap"
      size={[300, 300]}
      p={3}
      sx={{ border: '1px solid #636363', borderRadius: '5px', boxShadow: '3px 3px 8px rgba(0,0,0,0.3)' }}
    >
      {children}
    </Flex>
  )
}
export const CardView: FunctionComponent<TCardViewProps> = ({ onRemove, onUpdate, ...card }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const handleToggleEdit = (): void => {
    setIsEditMode(current => !current)
  }

  return isEditMode ? (
    <CardContainer>
      <CardForm onSave={onUpdate} onCancel={handleToggleEdit} card={card} />
    </CardContainer>
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
    <CardContainer>
      <Text as="h2" color="text" mt="1" fontSize={3}>
        {isFront ? `Term` : `Definition`}
      </Text>
      <Text as="h1" color="heading" mt="2" fontSize={4}>
        {isFront ? term : definition}
      </Text>
      <Flex flexDirection="row" justifyContent="space-between" mt="auto">
        <Button
          variant="secondary"
          type="button"
          onClick={handleShow}
          width={[100]}
          fontSize={0}
          sx={{ cursor: 'pointer' }}
        >
          Show {isFront ? 'back' : 'front'}
        </Button>
        <Flex>
          <Button variant="outline" onClick={onEdit} fontSize={1} sx={{ cursor: 'pointer' }}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleRemove} fontSize={1} ml={1} sx={{ cursor: 'pointer' }}>
            Remove
          </Button>
        </Flex>
      </Flex>
    </CardContainer>
  )
}

export default CardView
