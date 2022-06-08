import React from 'react'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <>
    <Form className="m-3">
      <Form.Group className="p-2">
        <Form.Control 
          type="text"
          placeholder="Nhập tên tài khoản"
          name="username"
          required />
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Control 
          type="text" 
          placeholder="Nhập mật khẩu" 
          name="password" 
          required />
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Control 
          type="text" 
          placeholder="Nhập lại mật khẩu" 
          name="password" 
          required />
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

export default Register