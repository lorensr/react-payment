import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import StoryWrapper from './StoryWrapper'
import CardForm from '../CardForm'

storiesOf('CardForm', module)
.addWithInfo('full', () => {
  return (
    <StoryWrapper>
      <CardForm
        onSubmit={action('onSubmit')}
        getName={true}
        getZip={true}
      />
    </StoryWrapper>
  )
})
.addWithInfo('basic', () => {
  return (
    <StoryWrapper>
      <CardForm
        onSubmit={action('onSubmit')}
      />
    </StoryWrapper>
  )
})
.addWithInfo('valid', () => {
  const STRIPE_TEST_CARD = '4242424242424242'
  return (
    <StoryWrapper>
      <CardForm
        onSubmit={action('onSubmit')}
        getName={true}
        getZip={true}
        defaultValues={{
          name: 'Loren',
          number: STRIPE_TEST_CARD,
          expiration: '01/40',
          cvc: '123',
          zip: '94117'
        }}
      />
    </StoryWrapper>
  )
})
