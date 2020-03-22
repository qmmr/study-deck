import React, { useEffect, useState } from 'react'
import { Flex, Text } from 'rebass'
import { ThemeProvider } from 'emotion-theming'
import { Router } from '@reach/router'

import { theme } from './theme'
import { getCards } from './services/cardService'
import CardList from './components/CardList'
import Practice from './components/Practice'

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
          <Router>
            <CardList
              path="/"
              cards={cards}
              onAdd={handleCardAdd}
              onRemove={handleCardRemove}
              onUpdate={handleUpdate}
            />
            <Practice path="practice" />
          </Router>
        </main>
      </Flex>
    </ThemeProvider>
  )
}

export default App
