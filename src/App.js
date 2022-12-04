import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {
  Navbar,
  Homepage,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";
import "./App.css";
import { Layout, Space } from "antd";
import Typography from "antd/es/typography/Typography";
import WatchList from "./pages/WatchList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { ShowOnLogin, ShowOnLogout } from "./components/AuthRoutes";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch } from "react-redux";
import { GET_USER_DETAILS, REMOVE_ACTIVE_USER } from "./app/authSlice";
import {toast} from 'react-toastify'
import { onAuthStateChanged } from "firebase/auth";




function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          dispatch(GET_USER_DETAILS({
            userID : uid,
            userEmail : user.email
          }))
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
   })
 

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <Layout>
          <div className="routes">
            <Routes>
              <Route exect path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route
                exect
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exect path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exect path="/news" element={<News />} />
              <Route
                exect
                path="/watchlist"
                element={
                 <ShowOnLogin>
                <WatchList />
                </ShowOnLogin>
              
              }
              />
              <Route  path="/login" element={<Login /> } />
              <Route exect path="/register" element={<Register />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            CryptoDesk <br/>
            Develop by <a className="m-1 inline-block"  href="https://trishank.me/" target="_blank" rel="noreferrer">Trishank </a>with ❤️
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
