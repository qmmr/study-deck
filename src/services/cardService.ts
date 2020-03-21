import { TCard } from '../App'

export async function getCards<T>(): Promise<T> {
  const response = await fetch(`/api/card`)

  return await response.json()
}

// TODO: Convert to arrow function syntax
export async function removeCard<T>(id: string): Promise<T> {
  const response = await fetch(`/api/card/${id}`, { method: 'DELETE' })

  return response.json()
}

type TUnsavedCard = { term: string; definition: string }
type TGenericCard = TCard | TUnsavedCard

// TODO: Convert to arrow function syntax
async function createCard<T>(card: TUnsavedCard): Promise<T> {
  const response = await fetch(`/api/card`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  })

  return response.json()
}

// TODO: Convert to arrow function syntax
async function updateCard<T>(card: TCard): Promise<T> {
  console.log('updateCard:: ', card)
  const response = await fetch(`/api/card/${card.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  })

  return response.json()
}

export async function saveCard<T>(card: TGenericCard): Promise<T> {
  console.log('saveCard:: ', card)
  return 'id' in card ? updateCard(card) : createCard(card)
}
