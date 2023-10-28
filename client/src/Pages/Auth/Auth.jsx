import React, { useState } from 'react'
import './Auth.css'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

const Auth = () => {
  
  const [isSignup,setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  localStorage.setItem('Profile',JSON.stringify({name,email,password}))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch =()=>{
    setIsSignup(!isSignup)
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(!email && !password){alert("Enter email and password")}
    if(isSignup){
      if(!name){
        alert("Enter a name")
      }
      dispatch(signup({name,email,password},navigate))
    }else{
      dispatch(login ({email,password},navigate))
    }

  }

  return (
    <section className='auth-section'>
        {isSignup && <AboutAuth/>}
        <div className='auth-container-2'>
          {!isSignup && <img src={icon} alt='stackoverflow' className='login-logout'/>}
          <form onSubmit={handleSubmit}>
            { 
              isSignup &&(
                <label htmlFor="name">
                  <h4>Display name</h4>
                  <input type="text" id ="name" name ='name' onChange={(e) =>{setName(e.target.value)}}/>
                </label>
              )
            }
            <label htmlFor="email">
              <h4>Email</h4>
              <input type="email" name = 'email' id='email' onChange={(e) =>{setEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <h4>Password</h4>
                { !isSignup && <p className='handle-switch-btn' >forgot password ?</p>}
              </div>
              <input type="password" name = 'password' id='password' onChange={(e) =>{setPassword(e.target.value)}}/>
              {isSignup && <p style={{color:'#666767', fontSize:'13px'}}>Passwords must contain at least eight <br />characters, including at least 1 letter and 1 <br />number.</p>}
            </label>
            {
              isSignup && (
                <label htmlFor="check">
                  <input type="checkbox" id='check'/>
                  <p style={{color:'#666767', fontSize:'13px'}}>Opt-in to receive occasional <br />product updates, user research invitations,<br /> company announcements, and digests.</p>
                </label>
              )
            }
            <button type='submit' className='auth-btn'>
              {isSignup ? 'Sign up': 'Log in'}
            </button>
            {isSignup && (<p style={{color:'#666767', fontSize:'13px'}}>By clicking “Sign up”, you agree to our <br /> 
              <span style={{color:'#007ac6'}}>terms of service </span>and acknowledge that you have read and <br /> understand our 
              <span style={{color:'#007ac6'}}>privacy policy</span> and code of conduct.</p>)}
          </form>
          <p>
            {isSignup ? 'alredy have an account ?' : "Don't have an account"}
            <button type='submit' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
          </p>
        </div>
    </section>
  )
}

export default Auth