import React, { Component, PropTypes } from 'react'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';

import './PaymentMethods.css'

class PaymentMethods extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    let {
      showCards,
      showBanks,
      cards,
      banks
    } = this.props

    let cardSection
    let bankSection

    if (showCards) {
      let list
      if (cards && cards.length) {
        list = (
          <div className="payment-method-list">
            {cards.map(card => (
              <div
                className="payment-method"
                key={card.id}>
                <span className="payment-method__text payment-method__text--card">
                  {card.brand}
                  <span className="payment-method__number">
                    &middot;&middot;&middot;
                    {card.last4}
                  </span>
                </span>
                <FlatButton
                  label="remove"
                  className="payment-method__remove"
                  style={{ position: "absolute" }}
                  onClick={e => this.props.onRemoveCard(card.id, e)}
                  />
                <Divider
                  style={{ marginTop: 15 }}
                  />
              </div>
            ))}
          </div>
        )
      }
      cardSection = (
        <section className="payment-methods__section">
          {list}
          <RaisedButton
            style={{ display: "block" }}
            className="payment-methods__add"
            label="add card"
            onClick={this.props.onAddCard}
            primary
            />
        </section>
      )
    }

    if (showBanks) {
      let list
      let addText = "add bank account"

      if (banks && banks.length) {
        addText = "add account"
        list = (
          <div className="payment-method-list">
            {banks.map(bank => (
              <div
                className="payment-method"
                key={bank.id}>
                <span className="payment-method__text">
                  Bank account ending in
                  <span className="payment-method__number">
                    {bank.last4}
                  </span>
                </span>
                <FlatButton
                  label="remove"
                  className="payment-method__remove"
                  style={{ position: "absolute" }}
                  onClick={(e) => this.props.onRemoveBank(e, bank.id)}
                  />
                <Divider
                  style={{ marginTop: 15 }}
                  />
              </div>
            ))}
          </div>
        )
      }
      bankSection = (
        <section className="payment-methods__section">
          {list}
          <RaisedButton
            style={{ display: "block" }}
            className="payment-methods__add"
            label={addText}
            onClick={this.props.onAddBank}
            primary
            />
        </section>
      )
    }

    return (
      <div className="payment-methods">
        {cardSection}
        {bankSection}
      </div>
    )
  }
}

PaymentMethods.propTypes = {
  showCards: PropTypes.bool.isRequired,
  showBanks: PropTypes.bool.isRequired,
  cards: PropTypes.array,
  banks: PropTypes.array,
  onAddCard: PropTypes.func,
  onAddBank: PropTypes.func,
  onRemoveCard: PropTypes.func,
  onRemoveBank: PropTypes.func
}

export default PaymentMethods
