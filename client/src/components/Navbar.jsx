import React, {useEffect}from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import logo from '../assets/logo.png'
import search from '../assets/search-solid.svg';
import Avatar from '../components/Avatar/Avatar'
// import Button from '../components/Button/Button'
import './Navbar.css'
import { setCurrentUser } from '../actions/CurrentUser';
import User from '../Pages/Users/User';

const Navbar = () => {

  var user = useSelector((state)=>(state.currentUserReducer))

  const dispatch = useDispatch();
  const Navigate = useNavigate()
  

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [user?.token, dispatch]);

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    Navigate('/')
    dispatch(setCurrentUser(null))
  }

  return (
    <nav className='main-navbar'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src ={logo} alt = 'logo' />
            </Link>
            <div style={{display:'flex', justifyContent:'space-between', textWrap: "nowrap", margin: '5px'}}>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            </div>
            <form>
                <input type="text" placeholder='Search...' />
                <img src={search} alt="search" width='18' className='search-icon'/>
            </form>
            {user === null ?
                <Link to = '/Auth' className='nav-item nav-links'>Log in</Link>:
                 <>
                 <Avatar backgroundColor ='#009dff' px='7px' py='10px' borderRadius='50%' color='white'><Link to = {`/Users/${user?.result?._id}`} style={{color:'white',textDecoration:'none'}}>{user?.result.name.charAt(0)}</Link></Avatar>
                 <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                 </>
            }
        </div>
    </nav>
  )
}

export default Navbar
