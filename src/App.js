import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from "./components";
import "./App.css"
import { Layout, Space, } from "antd";
import Typography from "antd/es/typography/Typography";



function App() {

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exect path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route exect path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exect path="/crypto/coinId" element={<CryptoDetails />} />
              <Route exect path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      
      <div className="footer" >
         <Typography.Title level={5} style={{color:"white" , textAlign:"center"}}>
          CryptoDesk <br/> 
          All rights reservered
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
