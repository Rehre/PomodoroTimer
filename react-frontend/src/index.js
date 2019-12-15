import React from 'react';
import { render } from 'react-dom';

import './styles/index.scss';
import styles from './styles/index.scss.json';
import Main from './layout';

import { RootContextProvider } from './context/RootContext';

const App = () => {
  return (
    <RootContextProvider>
      <div className={styles.app}>
        <Main />
      </div>
    </RootContextProvider>
  );
};

render(<App />, document.getElementById('root'));
