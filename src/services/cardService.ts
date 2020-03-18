export async function getCards() {
  const data = await fetch(`/api/card`)
  return await data.json()
}

// type TRemoveCard = (id: string) => Promise<T>
export async function removeCard(id: string) {
  return await fetch(`/api/card/${id}`, { method: 'DELETE' })
}
