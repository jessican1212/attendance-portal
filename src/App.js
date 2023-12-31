import React, {useState, useEffect} from 'react';
import './App.css';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/Dashboard';
import studentEmails from './studentEmails.json';
import Admin from './components/Admin';
import app from './components/firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const ADMIN = ["jessicang@calhacks.io", "madhav@calhacks.io"]

function App() {
  const [user, setUser] = useState(null);
  const [validUser, setValidUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (ADMIN.includes(user.email)) {
          setAdmin(true);
        }
        const e = user.email;
        const res = studentEmails.find(el => el.email === e);
        if (res) {
          setValidUser(true);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);


    function logIn() {
        signInWithPopup(auth, provider);
    }

    function logOut() {
      signOut(auth, provider);
    }
    
  return (
    <div id="container">
      <img src="favicon.ico" height="140px" alt="logo"/>
      { user ? (
        validUser ? (
          <div>
            <Dashboard name={user.displayName} email={user.email}/>
            <button className="logOutBtn" onClick={logOut}>Log Out</button>
          </div>
        ) : (
          <div>
            <h1>Cubstart Web Attendance Portal</h1>
            <h3>Fall 2023 | UC Berkeley</h3>
            <p>{user.displayName}, we cannot find your email <u>{user.email}</u> in our database. Please try again with a different email, or you are not registered for this course.</p>
            <button className="logOutBtn" onClick={logOut}>Log Out</button>
            {admin ? (
              <Admin />
            ): (<></>)}
          </div>
        )
      ) : (
        <div>
          <h1>Cubstart Web Attendance Portal</h1>
          <h3>Fall 2023 | UC Berkeley</h3>
          <button className="logIn" onClick={logIn}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default App;
