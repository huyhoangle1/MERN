import React from 'react'
import LoginForm from '../componects/auth/Login'
import RegisterForm from '../componects/auth/Register'

const Auth = ({authRouter}) => {
  return (
  <>
    Hoangle
    { authRouter === 'login' && <LoginForm /> }   
    { authRouter === 'register' && <RegisterForm /> }   
  </>
  )
}

export default Auth