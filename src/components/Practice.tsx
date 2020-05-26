import React, { useState, FC, Fragment } from 'react'
import { Button, Flex, Text } from 'rebass'
import { RouteComponentProps } from '@reach/router'
import { TCards } from '../App'

type TPracticeProps = RouteComponentProps & { cards: TCards }

const Practice: FC<TPracticeProps> = ({ cards }) => {
  let [currentIndex, setCurrentIndex] = useState(0)
  const cardsLength = cards.length

  if (!cards || cards.length === 0) return <Text>Loading...</Text>

  const handlePrev = () => setCurrentIndex((currentIndex - 1 + cardsLength) % cardsLength)
  const handleNext = () => setCurrentIndex((currentIndex + 1) % cardsLength)

  return (
    <Fragment>
      <Text as="h2">This is practice run...</Text>
      <Flex
        justifyContent="center"
        flexDirection="column"
        p={3}
        size={[500, 500]}
        bg="muted"
        sx={{ border: '1px solid gray' }}
      >
        <Text as="h1">{cards[currentIndex].term}</Text>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center" mt="auto">
          <Button sx={{ cursor: 'pointer' }} width={150} height={50} onClick={handlePrev}>
            Prev
          </Button>
          <Text>
            Card {currentIndex + 1}/{cardsLength}
          </Text>
          <Button sx={{ cursor: 'pointer' }} width={150} height={50} onClick={handleNext}>
            Next
          </Button>
        </Flex>
      </Flex>
    </Fragment>
  )
}

export default Practice
