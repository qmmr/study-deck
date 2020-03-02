import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.css'

import { getCards } from './services/cardService'
import CardView from './components/CardView'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CardsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`

export type TCard = {
  id: string
  definition: string
  term: string
}

export type TCards = Array<TCard>

function App() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    async function fetchData() {
      const json = await getCards()
      // console.log('json data: ', json)
      setCards(json)
    }
    fetchData()
  }, [])

  return (
    <AppContainer>
      <header>
        <h1>
          Study<span>Deck</span>
        </h1>
        <h2>Study, sleep, repeat...</h2>
      </header>
      <main>
        <h1>Main</h1>
        <CardsContainer>
          {cards.map((card: TCard) => (
            <CardView key={card.id} {...card} />
          ))}
        </CardsContainer>
      </main>
    </AppContainer>
  )
}

export default App
