// Validates on change instead of just on blur
//
// Use on the last input of the form, so that the button is enabled as soon as
// user types a valid entry
//
// https://github.com/mbrookes/formsy-material-ui/issues/97

import React from 'react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

function debounceFunc(fn, delay) {
  var timer = null;
  return function () {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export default React.createClass({
  componentDidMount() {
    const { debounce = 200 } = this.props;
    this.setValidate = debounceFunc(this.refs.input.setValue, debounce);
  },

  componentWillReceiveProps() {
    const input = this.refs.input;
    input.setState({ value: input.getValue() || '' });
  },

  onChange(event) {
    if (this.props.onChange)
    this.props.onChange(event);
    this.setValidate(event.currentTarget.value);
  },


  render() {
    return <FormsyText ref="input" {...this.props} onChange={this.onChange} />
  }
});
