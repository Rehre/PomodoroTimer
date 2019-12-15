import React from 'react';

import Top from './Top';
import Button from './Button';
import Bottom from './Bottom';

import { RootContext } from '../context/RootContext';

function Main() {
  const { state, startFocusedSession, stopFocusedSession } = React.useContext(
    RootContext
  );

  const { currentSession, totalSessionCount, currentTimeLeft } = state;

  return (
    <>
      <Top session={currentSession} totalSessionCount={totalSessionCount} />
      <Button
        session={currentSession}
        onStartClick={startFocusedSession}
        onStopClick={stopFocusedSession}
        onSkipClick={startFocusedSession}
      />
      <Bottom
        currentSession={currentSession}
        currentTimeLeft={currentTimeLeft}
      />
    </>
  );
}

export default Main;
