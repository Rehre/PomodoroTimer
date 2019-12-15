import React from 'react';
import PropTypes from 'prop-types';

import './styles/index.scss';
import styles from './styles/index.scss.json';

const Top = ({ session, totalSessionCount }) => {
  if (session === 'home') {
    return (
      <div className={styles.top}>
        <h1 className={styles.topHomeHeader}>HELLO</h1>
        <div className={styles.topHomeParagraph}>
          You have done this much session so far !
        </div>
        <h1 className={styles.topHomeSessionCount}>{totalSessionCount}</h1>
        <div className={styles.topHomeParagraph}>Let’s do it again !</div>
      </div>
    );
  }

  if (session === 'focus') {
    return (
      <div className={styles.top}>
        <h1 className={styles.topFocusBreakHeader}>SESSION</h1>
        <h1 className={styles.topFocusBreakSessionCount}>
          {totalSessionCount + 1}
        </h1>
      </div>
    );
  }

  return (
    <div className={styles.top}>
      <h1 className={styles.topFocusBreakHeader}>BREAK</h1>
      <h1 className={styles.topFocusBreakSessionCount}>
        {totalSessionCount + 1}
      </h1>
      <h3 className={styles.topFocusBreakHeader}>Starting next session...</h3>
    </div>
  );
};

Top.propTypes = {
  session: PropTypes.oneOf(['home', 'focus', 'break']).isRequired,
  totalSessionCount: PropTypes.number.isRequired,
};

export default Top;
