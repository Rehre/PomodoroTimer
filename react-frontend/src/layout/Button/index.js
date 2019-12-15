import React from 'react';
import PropTypes from 'prop-types';

import './styles/index.scss';
import styles from './styles/index.scss.json';

function Button({ session, onStartClick, onStopClick, onSkipClick }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${
        session === 'focus' ? styles.buttonStop : ''
      }`}
      onClick={() => {
        switch (session) {
          case 'home':
            onStartClick();
            break;
          case 'focus':
            onStopClick();
            break;
          default:
            onSkipClick();
            break;
        }
      }}
    >
      {session === 'home' ? 'START' : ''}
      {session === 'focus' ? 'STOP' : ''}
      {session === 'break' ? 'SKIP' : ''}
    </button>
  );
}

Button.propTypes = {
  session: PropTypes.string.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onSkipClick: PropTypes.func.isRequired,
};

export default Button;
