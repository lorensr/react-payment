import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let loadedStripe = false

class StoryWrapper extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    if (loadedStripe) {
      return
    }

    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v2/";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    loadedStripe = true;
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{
            width: '100%',
            margin: '50px 0',
            display: 'flex',
            justifyContent: 'center'
          }}>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default StoryWrapper
