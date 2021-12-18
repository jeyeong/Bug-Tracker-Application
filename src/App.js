import React, { useState } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import {
  LoadingScreen,
  LoginPage,
  Dashboard,
  Projects,
  Tickets,
  NavbarWrapper,
} from './views';

const getUserData = () => {
  axios
    .get('https://bug-tracker-backend-jy.herokuapp.com/data')
    .then(res => console.log(res));
}

const App = () => {
  // UserID
  const [signInMode, setSignInMode] = useState('auth0');
  const [userID, setUserID] = useState(undefined);

  const { user, isLoading } = useAuth0();
  const userIDAuth0 = user?.sub.match(/[^|]*$/)[0];

  // UserID is set in two ways:
  // (1) Auth0, which delivers the ID via 'sub' in a '[method]|[ID]' format
  // (2) Demo login, which changes userID directly, hence the signInMode check
  if (signInMode === 'auth0' && userID !== userIDAuth0) {
    setUserID(userIDAuth0);
  }

  // Views
  if (isLoading || signInMode === 'loading') {
    return <LoadingScreen />;
  }

  if (userID === undefined) {
    return <LoginPage setUserID={setUserID} setSignInMode={setSignInMode} />;
  }

  return (
    <div className="app">
      <NavbarWrapper
        signInMode={signInMode}
        setSignInMode={setSignInMode}
        userID={userID}
      >
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/tickets' element={<Tickets />} />
        </Routes>
      </NavbarWrapper>
    </div>
  );
}

export default App;
