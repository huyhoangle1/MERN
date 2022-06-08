import React from 'react'
import LoginForm from '../componects/auth/Login'
import RegisterForm from '../componects/auth/Register'

const Auth = ({authRouter}) => {
  let body

  body =   
  (  <>
    { authRouter === 'login' && <LoginForm /> }   
    { authRouter === 'register' && <RegisterForm /> }   
  </>)
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Note Learing Check progess</h1>
          <h2>by LeHuyHoang</h2>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth