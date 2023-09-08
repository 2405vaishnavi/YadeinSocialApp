import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Navbar from '../Navbar/Navbar';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
// import Navbar from '../Navbar/Navbar';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
      await dispatch(signup(form, navigate)); // Assuming signup action is correctly configured
    } else {
      await dispatch(signin(form, navigate)); // Assuming signin action is correctly configured
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      await dispatch({ type: AUTH, data: { result, token } });

      navigate('/home'); // Navigate to the appropriate route after Google login
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    alert('Google Sign In was unsuccessful. Try again later');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
        <Navbar/>
    <Container component="main" maxWidth="xs">
<Paper className={classes.paper} elevation={6} style={{ minWidth: '50vh' ,minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '4px solid black' }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <br/>
          <Button type="submit" fullWidth variant="contained"  style={{ backgroundColor: 'blue', color: 'white' }} className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <br/><br/>
          <GoogleLogin
            clientId="20066614933-5an9usrf0meu6hce8n018oj48rqt1buj.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton}  style={{ backgroundColor: 'red', color: 'white' }} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default SignUp;
