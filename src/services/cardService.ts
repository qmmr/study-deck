export async function getCards() {
  const data = await fetch(`https://carpal-cliff-dianella.glitch.me/api/card`)
  return await data.json()
}
