import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import RegisterImg from "../../image/register.png";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {doc , setDoc} from "firebase/firestore"
import { auth, db } from "../../firebase/config";
import {toast} from 'react-toastify'


const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

  const handleFormSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password , userName)
      .then((userCredential) => {
        // Signed in
        const uid = userCredential.user.uid;
        const userDocRef = doc(db , "registerUserInfo" , userCredential.user.uid)
         setDoc(userDocRef  , { uid , email , userName , password })
         navigate("/login")
         toast.success("user register Successfully")
      })
      .catch((error) => {
        toast.error(error.message)

        // ..
      });
  };



  return (
    <div>
      <div className="flex gap-2 h-[36rem] w-[100%] ">
        <div className="w-[50%] border-[5px] flex flex-col justify-center items-start md:pl-[100px]">
          <Form
            onSubmitCapture={handleFormSubmit}
            className="flex flex-col   md:w-[350px]"
          >
            <Form.Item>
              <Input
                type="text"
                className="md:w-[300px]"
                placeholder="User Name"
                size="large"
                required
                onChange={(e) => setUserName(e.target.value)}
              ></Input>
            </Form.Item>

            <Form.Item>
              <Input
                className="md:w-[300px]"
                type="email"
                placeholder="Email"
                size="large"
                required
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
              <Button
                className="border-[2px] border-cyan-700"
                size="large"
                htmlType="submit"
              >
                Register Now
              </Button>
            </Form.Item>
          </Form>
          <div className="flex">
            <div>
              <p>
                Already Registered:
                <Link to="/login">
                  {" "}
                  <b className="">Register Now</b>{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[50%] border-[5px] flex flex-col justify-center items-center">
          <h2 className="pb-3 font-semibold">Register Here </h2>
          <p className="pb-3 font-semibold">
            Register to BookMark your favorite Cryptocurrecy
          </p>
          <img src={RegisterImg} alt="login" />
        </div>
      </div>
    </div>
  );
};

export default Register;
