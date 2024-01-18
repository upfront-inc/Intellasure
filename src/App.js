import './App.css';
import React, { useEffect, useState } from 'react';
import { auth } from './auth/Firebase';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ContentScreen from './screens/ContentScreen';

function App() {
  const [currentView, setCurrentView] = useState('loading')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentView('content');
        // grabUserInfo();
        // grabInformation();
      } else {
        setCurrentView('login');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {
        currentView === 'loading'
          ? <LoadingScreen />
          : currentView === 'login'
              ? <LoginScreen />
              : currentView === 'content'
                  ? <ContentScreen />
                  : null
      }
    </div>
  );
}

export default App;
