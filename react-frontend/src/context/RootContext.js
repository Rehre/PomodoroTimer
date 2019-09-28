import React from 'react';
import PropTypes from 'prop-types';

const RootContext = React.useContext();

class RootContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {};

    this.changeState = this.changeState.bind(this);
  }

  changeState(state, cb) {
    this.setState(state, cb);
  }

  render() {
    const { children } = this.props;

    return (
      <RootContext.Provider
        value={{ state: this.state, setState: this.changeState }}
      >
        {children}
      </RootContext.Provider>
    );
  }
}

RootContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { RootContextProvider, RootContext };
