import React, { Fragment, FC } from 'react'
import { Link, RouteComponentProps } from '@reach/router'
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

type TLinkAsButtonProps = {
  children: React.ReactNode
  to: string
}

function LinkAsButton({ children, to }: TLinkAsButtonProps) {
  return <Link to={to}>{children}</Link>
}

const CardList: FC<TCardListProps> = ({ cards, onAdd, onRemove, onUpdate }) => {
  return (
    <Fragment>
      <LinkAsButton to="practice">practice deck</LinkAsButton>
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
