import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import PaymentMethods from '../PaymentMethods'
import StoryWrapper from './StoryWrapper'


const banks = [
  {
    id: '1',
    last4: '6789'
  },
  {
    id: '2',
    last4: '1234'
  }
]

const cards = [
  {
    id: '3',
    last4: '0987',
    brand: 'Visa'
  },
  {
    id: '4',
    last4: '1111',
    brand: 'Discover'
  }
]

storiesOf('PaymentMethods', module)
.addWithInfo('full',  () => {
  return getMethods(banks, cards)
})
.addWithInfo('empty', () => {
  return getMethods()
})
.addWithInfo('with cards', () => {
  return getMethods(null, cards)
})
.addWithInfo('with banks', () => {
  return getMethods(banks)
})
.addWithInfo('cards only', () => (

  <StoryWrapper>
    <PaymentMethods
      showCards={true}
      showBanks={false}
      cards={cards}
      onAddCard={action('onAddCard')}
      onRemoveCard={action('onRemoveCard')}
      />
  </StoryWrapper>

))

const getMethods = (banks, cards) => (

  <StoryWrapper>
    <PaymentMethods
      showCards={true}
      showBanks={true}
      cards={cards}
      banks={banks}
      onAddCard={action('onAddCard')}
      onAddBank={action('onAddBank')}
      onRemoveCard={action('onRemoveCard')}
      onRemoveBank={action('onRemoveBank')}
      />

  </StoryWrapper>
)
