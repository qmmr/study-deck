import React, { Fragment, FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Flex } from 'rebass'

import { TCard, TCards } from '../App'
import CardForm from './CardForm'
import CardView from './CardView'

type TCardListProps = RouteComponentProps & {
  cards: TCards
  onAdd: (card: TCard) => void
  onRemove: (id: string) => void
  onUpdate: (card: TCard) => void
}

const CardList: FC<TCardListProps> = ({ cards, onAdd, onRemove, onUpdate }) => {
  return (
    <Fragment>
      <CardForm onSave={onAdd} />
      <Flex flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
        {cards.map((card: TCard) => (
          <CardView key={card.id} onRemove={onRemove} onUpdate={onUpdate} {...card} />
        ))}
      </Flex>
    </Fragment>
  )
}

export default CardList
