export async function getCards() {
  const data = await fetch(`https://carpal-cliff-dianella.glitch.me/api/card`)
  return await data.json()
}

// type TRemoveCard = (id: string) => Promise<T>
export async function removeCard(id: string) {
  return await fetch(`https://carpal-cliff-dianella.glitch.me/api/card/${id}`, { method: 'DELETE' })
}
