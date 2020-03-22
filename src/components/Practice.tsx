import React, { FC, Fragment } from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import { Text } from 'rebass'

type TPracticeProps = RouteComponentProps

const Practice: FC<TPracticeProps> = props => {
  return (
    <Fragment>
      <Text as="p">This is practice run...</Text>
      <Link to="/">Home</Link>
    </Fragment>
  )
}

export default Practice
