import React, { useState, useEffect } from "react";
import { Typography, Avatar, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider } from '@mui/material/styles';
import decode from "jwt-decode";
import { makeStyles } from '@mui/styles';
import "./Navbar.css";

import memories from "./img1.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="nav">
      <div className="logo">
        <img className="img" src={memories} alt="icon" height="60" />
        <h2>
          <span>Y</span>addein
        </h2>
      </div>
      <div className="menu-link">
        <ul>
          <li className="nav-item">
            <Link to="/">Main</Link>
          </li>
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/details">Details</Link>
          </li>
          {user?.result ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result.name}
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Sign In
            </Button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
