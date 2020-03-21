import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

// Components
import weddingEventContext from './Contexts/WeddingEventContext';
import UserContext from './Contexts/UserContext';
import { axiosWithAuth } from './Components/Authentication/axiosWithAuth';
import ProtectedRoute from './Components/Authentication/ProtectedRoute';
import UserProfile from './Components/UserProfile';
import profileIcon from './Assets/user-circle-solid.png';
import ringIcon from './Assets/wedding-rings-black.png';

function App() {
  const [weddingEvent, setWeddingEvent] = useState([]);
  const [user, setUser] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState([]);
  const userStorage = useState(localStorage.getItem('username'));

  useEffect(() => {
    axiosWithAuth()
      .get('https://weddingportfolio.herokuapp.com/weddingposts')
      .then(res => setWeddingEvent(res.data))
      .catch(err => console.log(err.response));
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get('https://weddingportfolio.herokuapp.com/auth/user')
      .then(res => {
        const currentUser = res.data.user.filter(
          list => list.username === userStorage[0]
        )[0];
        setUserLoggedIn(currentUser);
        setUser(res.data.user);
      })
      .catch(err => console.log(err.response));
  }, []);

  const currentUser = user.filter(list => {
    return list.username === userStorage[0];
  });

  return (
    <weddingEventContext.Provider value={{ weddingEvent, setWeddingEvent }}>
      <UserContext.Provider value={user}>
        <div className='App'>
          <nav>
            <div className='navigation'>
              <Link to='/' className='logo'>
                <img src={ringIcon} alt='logo' />
                <h1>Wedding Planner Portfolio</h1>
              </Link>
              <div className='link-container'>
                <Link to='/' className='links'>
                  Home
                </Link>
                <Link to='/register' className='links'>
                  Register
                </Link>
                <Link to='/login' className='links'>
                  Login
                </Link>
                {localStorage.getItem('token') ? (
                  <ProtectedLink id={currentUser} />
                ) : null}
              </div>
            </div>
          </nav>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route
            exact
            path='/login'
            render={props => {
              return (
                <Login {...props} currentUser={currentUser} userInfo={user} />
              );
            }}
          />
          <ProtectedRoute
            exact
            path='/protected/:id'
            id={currentUser.id}
            component={UserProfile}
          />
        </div>
      </UserContext.Provider>
    </weddingEventContext.Provider>
  );
}

export default App;

export const ProtectedLink = ({ id }) => {
  const [hello, sethello] = useState('');
  useEffect(() => {
    id.map(list => {
      return sethello(list.id);
    });
  }, [id]);

  return (
    <Link to={`/protected/${hello}`} className='links'>
      <img src={profileIcon} alt={'My Profile'} />
    </Link>
  );
};
