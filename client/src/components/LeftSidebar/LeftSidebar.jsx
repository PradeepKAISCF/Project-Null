import React from 'react'
import './LeftSidebar.css'
import {NavLink} from 'react-router-dom'
import Globe from '../../assets/Globe.svg'

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
        <nav className='side-nav'>
            <NavLink to='/' className='side-nav-links' activeClassName='active'>
                <p>Home</p>
            </NavLink>
            <div className='side-nav-div'>
                <div><p>Public</p></div>
                <NavLink to = '/Quetions' className='side-nav-links' activeClassName = 'active' style={{paddingLeft:'40px'}}>
                    <img src={Globe} alt="Globe"/>
                    <p style={{paddingLeft:"10px"}}>Quetions</p>
                </NavLink>
                <NavLink to = '/Tags' className='side-nav-links'style={{paddingLeft:'40px'}}>
                    <p>Tags</p>
                </NavLink>
                <NavLink to = '/Users' className='side-nav-links'style={{paddingLeft:'40px'}}>
                    <p>Users</p>
                </NavLink>
                <NavLink to = '/chatbot' className='side-nav-links'style={{paddingLeft:'40px'}}>
                    <p>Chat with AI</p>
                </NavLink>
                <NavLink to = '/subscribe' className='side-nav-links'style={{paddingLeft:'40px'}}>
                    <p>Subscribe</p>
                </NavLink>
            </div>
        </nav>
    </div>
  )
}

export default LeftSidebar