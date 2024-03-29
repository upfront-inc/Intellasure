import './App.css';
import React, { useEffect, useState } from 'react';
import { auth, db } from './auth/Firebase';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ContentScreen from './screens/ContentScreen';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function App() {
  const [currentView, setCurrentView] = useState('loading')

  const [userAccess, setuserAccess] = useState('staff')
  const [userInfo, setUserInfo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        grabUserInfo();
      } else {
        setCurrentView('login');
      }
    });

    return () => unsubscribe();
  }, []);

  const grabUserInfo = () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          let access = docSnap.data();
          if(access.type === 'suspended'){
            signoutUser()
          }
          setUserInfo(access)
          setuserAccess(access.status)
          setCurrentView('content');
        } else {
          console.error("No such user!");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        throw error;
      });
  }

  const signoutUser = () => {
    signOut(auth)
    .then(() => {
      setCurrentView('login')
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
  }

  return (
    <div className="App">
      {
        loading === true
          ? <LoadingScreen/>
          : currentView === 'login'
              ? <LoginScreen/>
              : currentView === 'content'
                  ? <ContentScreen 
                      setCurrentView={setCurrentView} 
                      userAccess={userAccess}
                      loading={loading}
                      setLoading={setLoading}/>
                  : null
      }
    </div>
  );
}

export default App;
