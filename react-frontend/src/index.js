import React from 'react';
import { render } from 'react-dom';

import './styles/index.scss';
import styles from './styles/index.scss.json';

import Top from './layout/Top';
import Bottom from './layout/Bottom';

const App = () => (
  <div className={styles.app}>
    <Top />
    <Bottom />
  </div>
);

render(<App />, document.getElementById('root'));
