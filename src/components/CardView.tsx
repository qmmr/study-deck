import React, { FunctionComponent, MouseEvent } from 'react'
import styled from 'styled-components'
import { TCard } from '../App'
import { removeCard } from '../services/cardService'

const View = styled.div`
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

export type TViewProps = TCard & { onRemove: (id: string) => void }

export const CardView: FunctionComponent<TViewProps> = ({ id, term, definition, onRemove }) => {
  const handleRemove = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    const confirm: boolean = window.confirm(`Do you want to remove "${term}"?`)

    if (confirm) {
      onRemove(id) // Remove from App state
      removeCard(id) // Remove from DB via API call
    }
  }

  return (
    <View>
      <p>Term: {term}</p>
      <p>Definition: {definition}</p>
      <ButtonsContainer>
        <button type="button">Show</button>
        <div>
          <button>Edit</button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </ButtonsContainer>
    </View>
  )
}

export default CardView
