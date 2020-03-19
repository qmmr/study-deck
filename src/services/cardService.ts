export async function getCards<T>(): Promise<T> {
  const response = await fetch(`/api/card`)

  return await response.json()
}

// TODO: Convert to arrow function syntax
export async function removeCard<T>(id: string): Promise<T> {
  const response = await fetch(`/api/card/${id}`, { method: 'DELETE' })

  return response.json()
}

// TODO: Convert to arrow function syntax
export async function saveCard<T>(card: { term: string; definition: string }): Promise<T> {
  const response = await fetch(`/api/card`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  })

  return response.json()
}
