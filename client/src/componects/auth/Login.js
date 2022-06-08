import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate} from 'react-router-dom'
import React, {useState, useContext} from 'react'
import {Authcontext} from '../../contexts/AuthContexts'


const Login = () => {

  //context
  const {loginUser}= useContext(Authcontext);

  // Router
  const history = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const {username,password} = loginForm;

  const onChangeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value})

  const login = async (e) => {
      e.preventDefault();
      try {
        const loginData = await loginUser(loginForm);
        if(loginData.success) {
          history('/dashboard');
        }else{}
      } catch (error) {
        console.log(error.message);
      }
     
  }

  return (
    <>
    <Form className="m-3" onSubmit={login}>
      <Form.Group className="p-2">
        <Form.Control 
          type="text"
          placeholder="Nhập tên tài khoản"
          name="username"
          required 
          value={username}
          onChange={onChangeLoginForm}
          />
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Control 
          type="password" 
          placeholder="Nhập mật khẩu" 
          name="password" 
          required 
          value={password}
          onChange= {onChangeLoginForm}
          />
      </Form.Group>
      <Button variant='success' type="submit">Login</Button>
    </Form>
    <p>Tạo tài khoản mới ? 
      <Link to='/register'>
          <Button variant='info' size='sm' classname='ml-2'>Register</Button>
      </Link>
    </p>
    </>
  )
}

export default Login