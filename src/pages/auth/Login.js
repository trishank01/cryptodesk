import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import LoginImg from "../../image/login1.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import {toast} from 'react-toastify'
import { onAuthStateChanged } from "firebase/auth";
import { GET_USER_DETAILS } from "../../app/authSlice";
import { useDispatch } from "react-redux";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/watchlist")
        toast.success("user login Successfully..")
        // ...
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };
 
//    useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const uid = user.uid;
//           dispatch(GET_USER_DETAILS({
//             userID : uid,
//             userEmail : user.email
//           }))
//           // ...
//         } else {
//           // User is signed out
//           // ...
//         }
//       });
//    })
   
  return (
    <div>
      <div className="flex gap-2 h-[36rem] w-[100%] ">
        <div className="w-[50%] border-[5px] flex flex-col justify-center items-center">
          <h2 className="pb-3 font-semibold">Login Here </h2>
          <img src={LoginImg} alt="login" />
        </div>
        <div className="w-[50%] border-[5px] flex flex-col justify-center items-start md:pl-[100px]">
          <Form
            onSubmitCapture={handleLogin}
            className="flex flex-col md:w-[350px]"
          >
            <Form.Item>
              <Input
                className="md:w-[300px]"
                placeholder="Email"
                size="large"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </Form.Item>

            <Form.Item>
              <Input
                className="md:w-[300px]"
                type="password"
                placeholder="Password"
                size="large"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </Form.Item>

            <Form.Item>
              <Button size="large" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
          <div className="flex">
            <div>
              <p>
                Not Registered Yet :
                <Link to="/register">
                  {" "}
                  <b className="">Register here</b>{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
