import React, { useEffect, useState } from 'react'
import { Flex, Text } from 'rebass'
import './App.css'

import { ThemeProvider } from 'emotion-theming'

import { theme } from './theme'
import { getCards } from './services/cardService'
import CardView from './components/CardView'
import CardForm from './components/CardForm'

export type TCard = {
  id: string
  definition: string
  term: string
}

export type TCards = Array<TCard>

function App() {
  const [cards, setCards] = useState<TCards>([])

  useEffect(() => {
    async function fetchData() {
      const json: TCards = await getCards()
      // console.log('json data: ', json)
      setCards(json)
    }
    fetchData()
  }, [])

  const handleCardRemove = (id: string): void => {
    setCards(cards.filter((card: TCard): boolean => card.id !== id))
  }

  const handleCardAdd = (card: TCard): void => {
    setCards(existingCards => [...existingCards, card])
  }

  const handleUpdate = (card: TCard): void => {
    setCards(existingCards => existingCards.map(c => (c.id === card.id ? card : c)))
  }

  return (
    <ThemeProvider theme={theme}>
      <Flex flexDirection="column">
        <header>
          <Text as="h1">
            Study<span>Deck</span>
          </Text>
          <h2>Study, sleep, repeat...</h2>
        </header>
        <main>
          <h1>Main</h1>
          <CardForm onSave={handleCardAdd} />
          <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
            {cards.map((card: TCard) => (
              <CardView key={card.id} onRemove={handleCardRemove} onUpdate={handleUpdate} {...card} />
            ))}
          </Flex>
        </main>
      </Flex>
    </ThemeProvider>
  )
}

export default App
