import React, { Fragment, FC } from 'react'
import { Flex } from 'rebass'

import { TCard, TCards } from '../App'
import CardForm from './CardForm'
import CardView from './CardView'

type TCardListProps = {
  cards: TCards
  onAdd: (card: TCard) => void
  onRemove: (id: string) => void
  onUpdate: (card: TCard) => void
}

const CardList: FC<TCardListProps> = ({ cards, onAdd, onRemove, onUpdate }) => {
  return (
    <Fragment>
      <CardForm onSave={onAdd} />
      <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
        {cards.map((card: TCard) => (
          <CardView key={card.id} onRemove={onRemove} onUpdate={onUpdate} {...card} />
        ))}
      </Flex>
    </Fragment>
  )
}

export default CardList
