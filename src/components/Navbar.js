import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  StarOutlined,
  MenuOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import icon from "../image/icon.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { REMOVE_ACTIVE_USER } from "../app/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ShowOnLogin, ShowOnLogout } from "./AuthRoutes";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 876) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(REMOVE_ACTIVE_USER());
        navigate("/");
        toast.success("logout Successfully");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CrytoDesk</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">CryptoCurrencies</Link>
          </Menu.Item>

          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>

          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>

          <ShowOnLogin>
            <Menu.Item icon={<StarOutlined />}>
              <Link to="/watchlist">WatchList</Link>
            </Menu.Item>
          </ShowOnLogin>

          <ShowOnLogout>
            <Menu.Item icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
          </ShowOnLogout>

          <ShowOnLogin>
            <Button className="border-none bg-white m-3" onClick={handleLogout} icon={<LogoutOutlined />}>
              Logout
            </Button>
          </ShowOnLogin>

        
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
