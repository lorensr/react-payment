import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import StoryWrapper from './StoryWrapper'
import BankForm from '../BankForm'
import '../BankForm.css'

storiesOf('BankForm', module)
.addWithInfo('blank', () => {
  return (
    <StoryWrapper>
      <BankForm
        onSubmit={action('onSubmit')}
      />
    </StoryWrapper>
  )
})
.addWithInfo('valid', () => {
  const STRIPE_TEST_ACCOUNT = '000123456789'
  const STRIPE_TEST_ROUTING = '110000000'
  return (
    <StoryWrapper>
      <BankForm
        onSubmit={action('onSubmit')}
        defaultValues={{
          name: 'Loren',
          accountNumber: STRIPE_TEST_ACCOUNT,
          routingNumber: STRIPE_TEST_ROUTING
        }}
      />
    </StoryWrapper>
  )
})
.addWithInfo('invalid', () => {
  return (
    <StoryWrapper>
      <BankForm
        onSubmit={action('onSubmit')}
        defaultValues={{
          name: 'Loren',
          accountNumber: 'invalid',
          routingNumber: '110000003'
        }}
      />
    </StoryWrapper>
  )
})
