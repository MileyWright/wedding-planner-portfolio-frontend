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
import logo from './Assets/Tie the Knot Logo (Transparent).png';

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
              <a href='https://tietheknot.now.sh/' className='logo'>
                <img src={logo} alt='logo' />
              </a>
              <div className='navLink-container'>
                <Link to='/' className='links link'>
                  Planning Tools
                </Link>
                <Link to='/' className='links link'>
                  Wedding Planners
                </Link>
                <a href='https://tietheknot.netlify.com/photos.html' className='links link'>
                  Photos
                </a>
                <Link to='/' className='links link'>
                 Ideas + Advice
                </Link> 
                <a href='https://tietheknot.netlify.com/about-us.html' className='links link'>
                  About Us
                </a>
              </div>

              <div className='link-container'>
                <Link to='/' className='links link2'>
                  Home
                </Link>
                <Link to='/signup' className='links link2'>
                  Signup
                </Link>
                <Link to='/login' className='links link2'>
                  Log In
                </Link>
                {localStorage.getItem('token') ? (
                  <ProtectedLink id={currentUser} />
                ) : null}
              </div>
            </div>
          </nav>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Register} />
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
