[![npm version](https://badge.fury.io/js/react-payment.svg)](https://badge.fury.io/js/react-payment)

React components for payments:

- `<CardForm>`: credit card entry (with validation)
- `<BankForm>`: bank account entry (with validation)
- `<PaymentMethods>`: list of payment methods (with add / remove buttons)

You can configure/modify some things with props and CSS, and if you need to do any further customization, they're small files—send me a quick PR!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Demo](#demo)
  - [CardForm](#cardform)
  - [BankForm](#bankform)
  - [PaymentMethods](#paymentmethods)
- [Usage](#usage)
  - [CardForm usage](#cardform-usage)
  - [BankForm usage](#bankform-usage)
  - [PaymentMethods usage](#paymentmethods-usage)
  - [Full example](#full-example)
- [Development](#development)
  - [Deployment](#deployment)
  - [Credits](#credits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Demo

[Component demo](http://lorensr.me/react-payment)

### CardForm

[![Blank CardForm](https://www.dropbox.com/s/yvjmcyhgihho6iy/Screenshot%202016-08-11%2014.53.26.png?raw=1)](http://lorensr.me/react-payment/?selectedKind=CardForm&selectedStory=full&full=0&down=1&left=1&panelRight=0)

[![Invalid CardForm](https://www.dropbox.com/s/lmhnc19d39tlug4/Screenshot%202016-08-11%2014.53.59.png?raw=1)](http://lorensr.me/react-payment/?selectedKind=CardForm&selectedStory=invalid&full=0&down=1&left=1&panelRight=0)

### BankForm

[![Valid BankForm](https://www.dropbox.com/s/wj939litstd1wqw/Screenshot%202016-08-11%2014.51.48.png?raw=1)](http://lorensr.me/react-payment/?selectedKind=BankForm&selectedStory=valid&full=0&down=1&left=1&panelRight=0)

[![Invalid BankForm](https://www.dropbox.com/s/96rrp3cw8wudffb/Screenshot%202016-08-11%2014.52.37.png?raw=1)](http://lorensr.me/react-payment/?selectedKind=BankForm&selectedStory=invalid&full=0&down=1&left=1&panelRight=0)

### PaymentMethods

[![PaymentMethods](https://www.dropbox.com/s/ha0ryw4nppy8le0/Screenshot%202016-08-11%2014.48.28.png?raw=1)](http://lorensr.me/react-payment/?selectedKind=PaymentMethods&selectedStory=full&full=0&down=1&left=1&panelRight=0)

## Usage

```sh
yarn add react-payment
```

Since this library uses [Material-UI](http://material-ui.com/) components, you need to have a [Material-UI theme](http://www.material-ui.com/#/customization/themes). To get the default style, just wrap this module's components in a `<MuiThemeProvider>` tag (see the [full example](#full-example)).

The alternate syntax for partial imports is `react-payment/dist/ComponentName`:

```js
import { CardForm } from 'react-payment';

OR

import CardForm from 'react-payment/dist/CardForm';
```

- [`CardForm usage`](#cardform-usage)
- [`BankForm usage`](#bankform-usage)
- [`PaymentMethods usage`](#paymentmethods-usage)
- [`Full example`](#full-example)

### CardForm usage

`<CardForm>` is a credit card form. By default it only has inputs for number, expiration, and CVC.

Props:

- `onSubmit(card => {})`
- `getName`: show the name input, default `false`
- `getZip`: show the zip code input, default `false`
- `styles`: override styles on the elements
- `defaultValues`: initial input values. Object of the form `{ inputName: defaultString }`, and the input names are: `name, number, expiration, cvc, zip`. Expiration is of the format `"01/44"` for January 2044.

```jsx
import { CardForm } from 'react-payment';

onSubmit: (card) => {
  const { number, exp_month, exp_year, cvc, name, zip } = card;
  Stripe.card.createToken({
    number,
    exp_month,
    exp_year,
    cvc,
    name,
    address_zip: zip
  }, (status, response) => {
    if (response.error) {
      alert('Adding card failed with error: ' + response.error.message);
    } else {
      const cardToken = response.id;
      // send cardToken to server to be saved under the current user
      // show success message and navigate away from form
    }
  });
}

<CardForm
  onSubmit={this.onSubmit}
  getName={true}
  getZip={true}
/>
```

### BankForm usage

`<BankForm>` is a form for entering US bank account information.

If you would like `BankForm` to [intelligently validate the account & routing number](https://stripe.com/docs/stripe.js?#bank-account-validation-helpers), make sure that [Stripe.js](https://stripe.com/docs/stripe.js) is loaded (see the [full example below](#full-example)).

Props:

- `onSubmit(account => {})`
- `defaultValues`: initial input values. Object of the form `{ inputName: defaultString }`, and the input names are `name, accountNumber, routingNumber`.

```js
import BankForm from 'react-payment';

onSubmit(account) {
  const { name, accountNumber, routingNumber, accountType } = account;
  const account_holder_type = accountType === 'personal' ? 'individual' : 'company';

  Stripe.bankAccount.createToken({
    country: 'US',
    currency: 'USD',
    routing_number: routingNumber,
    account_number: accountNumber,
    account_holder_name: name,
    account_holder_type
  }, (status, response) => {
    if (response.error) {
      alert('Adding bank account failed with error: ' + response.error.message);
    } else {
      const bankAccountToken = response.id;
      // send bankAccountToken to server to be saved under the current user
      // show success message and navigate away from form
    }
  });
}

<BankForm
  onSubmit={this.onSubmit}
/>
```

### PaymentMethods usage

`<PaymentMethods>` is a list of your credit cards and/or bank accounts.

Props:

- `showCards`: whether to show the card list & add button
- `showBanks`: whether to show the bank list & add button
- `cards`: array of cards, in the format `{ id: '1', last4: '1234', brand: 'visa' }`
- `banks`: array of banks, in the format `{ id: '1', last4: '1234' }`
- `onAddCard`
- `onAddBank`
- `onRemoveCard(id => {})`
- `onRemoveBank(id => {})`

```jsx
import { PaymentMethods } from 'react-payment';

<PaymentMethods
  showCards={true}
  showBanks={false}
  cards={[{ id: '1', last4: '1234', brand: 'visa' }]}
  onAddCard={this.showCardFormDialog}
  onRemoveCard={this.removeCard}
  />
```

### Full example

```jsx
import { CardForm, BankForm, PaymentMethods } from 'react-payment';
import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import server from './server';

let loadedStripe = false;

export default class PaymentExample extends Component {

  state = {
    dialogOpen: false
    cardDialog: true
  };

  componentWillMount() {
    if (loadedStripe) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v2/";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    };
    document.body.appendChild(script);

    loadedStripe = true;
  }

  openDialog = (type) => {
    this.setState({
      dialogOpen: true,
      cardDialog: type === 'card' ? true : false
    });
  };

  closeDialog = () => {
    this.setState({dialogOpen: false});
  };

  removeCard = (id) => {
    server.removeCard(id);
  };

  removeBank = (id) => {
    server.removeBankAccount(id);
  };

  onSubmitCard = (card) => {
    const { number, exp_month, exp_year, cvc, name, zip } = card;
    Stripe.card.createToken({
      number,
      exp_month,
      exp_year,
      cvc,
      name,
      address_zip: zip
    }, (status, response) => {
      if (response.error) {
        alert('Adding card failed with error: ' + response.error.message)
      } else {
        const cardToken = response.id;
        server.saveCard(cardToken);
        this.closeDialog();
        // show success message
      }
    });
  };

  onSubmitBank = (account) => {
    const { name, accountNumber, routingNumber, accountType } = account;
    const account_holder_type = accountType === 'personal' ? 'individual' : 'company';

    Stripe.bankAccount.createToken({
      country: 'US',
      currency: 'USD',
      routing_number: routingNumber,
      account_number: accountNumber,
      account_holder_name: name,
      account_holder_type
    }, (status, response) => {
      if (response.error) {
        alert('Adding bank account failed with error: ' + response.error.message);
      } else {
        const bankAccountToken = response.id;
        server.saveBankAccount(bankAccountToken);
        this.closeDialog();
        // show success message
      }
    })
  };

  render() {
    const title = this.state.cardDialog ? 'Add credit card' : 'Add bank account';

    return (
      <MuiThemeProvider>
        <PaymentMethods
          showCards={true}
          showBanks={true}
          cards={[{ id: '1', last4: '1234', brand: 'visa' }]}
          banks={[]}
          onAddCard={() => this.openDialog('card')}
          onAddBank={() => this.openDialog('bank')}
          onRemoveCard={this.removeCard}
          onRemoveBank={this.removeBank}
          />
        <Dialog
          title={title}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.closeDialog}
        >
          {
            this.state.cardDialog ?
            <CardForm
              onSubmit={this.onSubmitCard}
              getName={true}
              getZip={true}
            />
            :
            <BankForm
              onSubmit={this.onSubmitBank}
            />
          }
        </Dialog>
      </MuiThemeProvider>
    );
  }
}
```

## Development

```sh
git clone git@github.com:lorensr/react-payment.git
npm install
npm run storybook
```

[http://localhost:9001](http://localhost:9001)

### Deployment

```sh
npm version patch
npm publish
```

```sh
npm run deploy-storybook
```

### Credits

- Contributions by [these fine folks](https://github.com/lorensr/react-payment/graphs/contributors)
- Segmented control component from [`segmented-control`](https://github.com/lorensr/segmented-control)
