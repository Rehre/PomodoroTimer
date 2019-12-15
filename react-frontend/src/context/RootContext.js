import React from 'react';
import PropTypes from 'prop-types';

const notifier = window.require('node-notifier');

const RootContext = React.createContext();

class RootContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSession: 'home',
      totalSessionCount: 0,
      currentTimeLeft: 0,
    };

    this.focusedTimeCountDown = () => {};
    this.breakTimeCountDown = () => {};
    this.startFocusedSession = this.startFocusedSession.bind(this);
    this.startBreakSession = this.startBreakSession.bind(this);
    this.runFocusedCountDown = this.runFocusedCountDown.bind(this);
    this.runBreakCountDown = this.runBreakCountDown.bind(this);
    this.stopFocusedSession = this.stopFocusedSession.bind(this);
  }

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData() {
    let totalSessionCount = localStorage.getItem('totalSessionCount');

    if (totalSessionCount === null) {
      totalSessionCount = 0;
      localStorage.setItem('totalSessionCount', totalSessionCount);
    } else {
      totalSessionCount = parseInt(totalSessionCount, 10);
    }

    this.setState({
      totalSessionCount,
    });
  }

  startFocusedSession() {
    // NOTE: need this so skip button could work correctly
    clearTimeout(this.breakTimeCountDown);

    notifier.notify({
      title: 'Pomodoro',
      message: 'Focus session started!',
    });

    this.setState(
      {
        currentSession: 'focus',
        currentTimeLeft: 1500000,
      },
      () => {
        this.focusedTimeCountDown = setTimeout(this.runFocusedCountDown, 1000);
      }
    );
  }

  startBreakSession() {
    notifier.notify({
      title: 'Pomodoro',
      message:
        'Great! you are finished the focus session you can take a break now',
    });

    this.setState(
      {
        currentSession: 'break',
        currentTimeLeft: 300000,
      },
      () => {
        this.breakTimeCountDown = setTimeout(this.runBreakCountDown, 1000);
      }
    );
  }

  runFocusedCountDown() {
    const { currentTimeLeft, totalSessionCount } = this.state;

    const nextCurrentTimeLeft = currentTimeLeft - 1000;

    if (nextCurrentTimeLeft <= 0) {
      clearTimeout(this.focusedTimeCountDown);
      localStorage.setItem('totalSessionCount', totalSessionCount + 1);

      this.setState({ totalSessionCount: totalSessionCount + 1 }, () => {
        this.startBreakSession();
      });

      return;
    }

    this.setState(
      {
        currentTimeLeft: nextCurrentTimeLeft,
      },
      () => {
        this.focusedTimeCountDown = setTimeout(this.runFocusedCountDown, 1000);
      }
    );
  }

  runBreakCountDown() {
    const { currentTimeLeft } = this.state;

    const nextCurrentTimeLeft = currentTimeLeft - 1000;

    if (nextCurrentTimeLeft <= 0) {
      clearTimeout(this.breakTimeCountDown);
      this.startFocusedSession();
      return;
    }

    this.setState(
      {
        currentTimeLeft: nextCurrentTimeLeft,
      },
      () => {
        this.breakTimeCountDown = setTimeout(this.runBreakCountDown, 1000);
      }
    );
  }

  stopFocusedSession() {
    clearTimeout(this.focusedTimeCountDown);

    this.setState({
      currentSession: 'home',
      currentTimeLeft: 0,
    });
  }

  render() {
    const { currentSession, totalSessionCount, currentTimeLeft } = this.state;
    const { children } = this.props;

    return (
      <RootContext.Provider
        value={{
          state: { currentSession, totalSessionCount, currentTimeLeft },
          startFocusedSession: this.startFocusedSession,
          stopFocusedSession: this.stopFocusedSession,
        }}
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
