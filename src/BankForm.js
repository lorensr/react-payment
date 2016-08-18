import React, { Component, PropTypes } from 'react'
import ValidatingFormsyText from './ValidatingFormsyText'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsySegmentedControl } from 'segmented-control'

class BankForm extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      canSubmit: false,
    }

    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    })
  }

  render() {
    const defaultStyle = {
      display: "block"
    }

    const style = _.extend(defaultStyle, this.props.style)

    const { defaultValues } = this.props

    return (
      <Formsy.Form
        className="card-form"
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.props.onSubmit}
        autoComplete="on"
        >
        <FormsyText
          name="name"
          ref="name"
          floatingLabelText="Name on account"
          style={style}
          defaultValue={defaultValues.name}
          required
          />
        <FormsyText
          name="accountNumber"
          ref="accountNumber"
          type="tel"
          pattern="\d*"
          floatingLabelText="Account number"
          validations={{
            isNumeric: true,
            isValid: (otherValues, accountNumber) => {
              if (window.Stripe
                && Stripe.bankAccount
                && Stripe.bankAccount.validateAccountNumber) {
                  return Stripe.bankAccount.validateAccountNumber(accountNumber, 'US')
              } else {
                return true
              }
            }
          }}
          validationError="Invalid account number"
          className="account-number"
          style={style}
          defaultValue={defaultValues.accountNumber}
          required
          />
        <ValidatingFormsyText
          name="routingNumber"
          ref="routingNumber"
          type="tel"
          pattern="\d*"
          floatingLabelText="Routing number"
          validations={{
            isNumeric: true,
            isValid: (otherValues, routingNumber) => {
              if (window.Stripe
                && Stripe.bankAccount
                && Stripe.bankAccount.validateRoutingNumber) {
                  return Stripe.bankAccount.validateRoutingNumber(routingNumber, 'US')
            } else {
                return true
              }
            }
          }}
          validationError="Invalid routing number"
          className="routing-number"
          style={style}
          defaultValue={defaultValues.routingNumber}
          required
          />
        <FormsySegmentedControl
          name="accountType"
          options={[
            { label: "Personal", value: "personal", default: true },
            { label: "Business", value: "business" }
          ]}
          />
        <RaisedButton
          type="submit"
          label="add bank account"
          disabled={!this.state.canSubmit}
          style={_.extend({
            width: 200,
            margin: "20px auto"
          }, style)}
          primary
          />
      </Formsy.Form>
    )
  }
}

BankForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  style: PropTypes.object,
}

BankForm.defaultProps = {
  defaultValues: {}
}

export default BankForm
