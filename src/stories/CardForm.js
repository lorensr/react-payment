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
.addWithInfo('invalid', () => {
  return (
    <StoryWrapper>
      <CardForm
        onSubmit={action('onSubmit')}
        getName={true}
        getZip={true}
        defaultValues={{
          name: 'Loren',
          number: '456345',
          expiration: '01/01',
          cvc: '12',
          zip: '94117'
        }}
      />
    </StoryWrapper>
  )
})
.addWithInfo('custom label', () => {
  return (
    <StoryWrapper>
      <CardForm
        label="submit"
        onSubmit={action('onSubmit')}
        getName={true}
        getZip={true}
      />
    </StoryWrapper>
  )
})
