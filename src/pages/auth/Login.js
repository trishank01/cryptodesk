import React from 'react'
import {Form , Input , Button} from 'antd'
import LoginImg from "../../image/login1.png"

const Login = () => {
  return (
    <div>  
       <div className='flex gap-2 h-[36rem] w-[100%] '>
        <div className='w-[50%] border-[5px] flex flex-col justify-center items-center'>
            <h2 className='pb-3 font-semibold'>Login Here </h2>
            <img src={LoginImg} alt="login"/>
        
        </div>
          <div className="w-[50%] border-[5px] flex justify-center items-center">
          <Form className='flex flex-col items-center'>

            <Form.Item >
                 <Input placeholder='User Name' required></Input>
            </Form.Item>

            <Form.Item >
                 <Input placeholder='Email' required></Input>
            </Form.Item>

            <Form.Item >
                 <Input type='password' placeholder='Password' required></Input>
            </Form.Item>

            <Form.Item >
                 <Button htmlType='submit'>Log In</Button>
            </Form.Item>
        </Form>
        </div>
       </div>
 
    </div>
  )
}

export default Login