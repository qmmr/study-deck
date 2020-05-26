import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { ThemeProvider } from 'emotion-theming'
import { Link, Router, RouteComponentProps } from '@reach/router'

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

type TLinkAsButtonProps = RouteComponentProps & { children: React.ReactNode; to: string }

function LinkAsButton({ children, to }: TLinkAsButtonProps) {
  return (
    <Link style={{ textDecoration: 'none' }} to={to}>
      {children}
    </Link>
  )
}

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
      <Flex flexDirection="column" width={[1, 1 / 2, 1 / 2, 2 / 3]} mx="auto" mt={1}>
        <Flex as="header" flexDirection="column">
          <Text as="h1">
            Study<span>Deck</span>
          </Text>
          <h2>Study, sleep, repeat...</h2>
          <Box as="nav" my={3}>
            <Flex as="ul" flexDirection="row" sx={{ listStyle: 'none' }}>
              <Box as="li" mr={2}>
                <LinkAsButton to="/">home</LinkAsButton>
              </Box>
              <Box as="li">
                <LinkAsButton to="practice">practice deck</LinkAsButton>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex as="main">
          <Router>
            <CardList
              path="/"
              cards={cards}
              onAdd={handleCardAdd}
              onRemove={handleCardRemove}
              onUpdate={handleUpdate}
            />
            <Practice path="practice" cards={cards} />
          </Router>
        </Flex>
      </Flex>
    </ThemeProvider>
  )
}

export default App
