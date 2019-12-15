import React from 'react';
import PropTypes from 'prop-types';

import './styles/index.scss';
import styles from './styles/index.scss.json';

const zeroPadding = (padding, parameter) => {
  return `${'0'.repeat(padding).substring(parameter.length)}${parameter}`;
};

const Bottom = ({ currentSession, currentTimeLeft }) => {
  const minutes = Math.floor(currentTimeLeft / 1000 / 60);
  const seconds = (currentTimeLeft / 1000) % 60;

  const circleCircumference = Math.PI * 150;

  let currentPercentage = 0;
  if (currentSession === 'focus') {
    currentPercentage = (1500000 - currentTimeLeft) / 1500000;
  }

  if (currentSession === 'break') {
    currentPercentage = (300000 - currentTimeLeft) / 300000;
  }

  return (
    <div className={styles.bottom}>
      <div className={styles.progressContainer}>
        <h1 className={styles.timerText}>
          {zeroPadding(2, `${minutes}`)}:{zeroPadding(2, `${seconds}`)}
        </h1>
        <svg width="200px" height="200px">
          <circle
            className={styles.progressCircleBar}
            cx="-100px"
            cy="100px"
            r="75px"
            fill="none"
            stroke="#6C5B7B"
            strokeWidth="5px"
            strokeDasharray={circleCircumference}
            strokeDashoffset={
              currentSession === 'home'
                ? '0'
                : circleCircumference -
                  (circleCircumference * (currentPercentage * 100)) / 100
            }
          />
        </svg>
      </div>
    </div>
  );
};

Bottom.propTypes = {
  currentSession: PropTypes.string.isRequired,
  currentTimeLeft: PropTypes.number.isRequired,
};

export default Bottom;
