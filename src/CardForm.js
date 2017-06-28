import _ from 'lodash'
import Payment from 'payment'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ValidatingFormsyText from './ValidatingFormsyText'
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton'

class CardForm extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      canSubmit: false,
    }

    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  componentDidMount() {
    const { number, expiration, cvc, zip } = this.refs

    Payment.formatCardNumber(ReactDOM.findDOMNode(number).querySelector('input'))
    Payment.formatCardExpiry(ReactDOM.findDOMNode(expiration).querySelector('input'))
    Payment.formatCardCVC(ReactDOM.findDOMNode(cvc).querySelector('input'))

    if (zip) {
      Payment.restrictNumeric(ReactDOM.findDOMNode(zip).querySelector('input'))
    }
  }

  onSubmit(data) {
    const { month, year } = Payment.fns.cardExpiryVal(data.expiration)

    const card = _.omit(data, 'expiration')
    card.exp_month = month
    card.exp_year = year

    this.props.onSubmit(card)
  }

  render() {
    const defaultStyle = {
      display: "block"
    }

    const style = _.extend(defaultStyle, this.props.style)

    const { defaultValues } = this.props;

    return (
      <Formsy.Form
        className="card-form"
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.onSubmit}
        autoComplete="on"
        >
        {
          this.props.getName
          ?
          <FormsyText
            name="name"
            ref="name"
            hintText="Name on card"
            style={style}
            defaultValue={defaultValues.name}
            required
            />
          : ''
        }
        <FormsyText
          name="number"
          ref="number"
          type="tel"
          hintText="Card number"
          validations={{
            isValid: (otherValues, card) => {
              return Payment.fns.validateCardNumber(card)
            }
          }}
          validationError="Invalid card number"
          className="cc-number"
          defaultValue={defaultValues.number}
          style={style}
          required
          />
        <FormsyText
          name="expiration"
          ref="expiration"
          type="tel"
          hintText="MM / YY"
          validations={{
            isValid: (otherValues, expiration) => {
              if (!expiration) {
                return false
              }

              const { month, year } = Payment.fns.cardExpiryVal(expiration)
              return Payment.fns.validateCardExpiry(month, year)
            }
          }}
          validationError="Invalid expiration"
          // autoCompleteType="cc-exp"
          defaultValue={defaultValues.expiration}
          style={style}
          required
          />
        <ValidatingFormsyText
          name="cvc"
          ref="cvc"
          type="tel"
          hintText="CVC"
          validations={{
            isNumeric: true,
            rightLength: (otherValues, cvc) => {
              return cvc && (cvc.length == 3 || cvc.length == 4)
            }
          }}
          validationError={this.props.getZip ? 'Invalid CVC' : null}
          className="cc-cvc"
          // autoCompleteType="csc"
          style={style}
          defaultValue={defaultValues.cvc}
          required
          />
        {
          this.props.getZip
          ?
          <ValidatingFormsyText
            name="zip"
            ref="zip"
            type="tel"
            hintText="ZIP"
            validations={{
              isNumeric: true,
              isLength: 5
            }}
            defaultValue={defaultValues.zip}
            style={style}
            required
            />
          : ''
        }
        <RaisedButton
          type="submit"
          label="add card"
          disabled={!this.state.canSubmit}
          style={_.extend({
            width: 175,
            margin: "20px auto"
          }, style)}
          primary
          />
      </Formsy.Form>
    )
  }
}

CardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  getName: PropTypes.bool,
  getZip: PropTypes.bool,
  style: PropTypes.object,
  defaultValues: PropTypes.object,
}

CardForm.defaultProps = {
  getName: false,
  getZip: false,
  defaultValues: {},
}

export default CardForm
