import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/login.css'
import {useNavigate} from 'react-router-dom'

  const Login = () =>{
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
  
    useEffect(()=>{
      if(localStorage.getItem('authToken')) {
        navigate('/login');
      }
    }, [navigate])
  
  const loginHandle = async(event) =>{
    event.preventDefault();
  
    const config ={
      headers: {'Content-Type': 'application/json'},
  }
  
  try {
    const {data} = await axios.post("/api/users/login", {email, password}, config)
    localStorage.setItem("authToken", data.token);
  
    navigate("/DashboardLoggedin")
  } catch (err) {
    setError(error, "invalid credentials");
    // setTimeout(()=>{
    //   setError("invalid credentials")
    // }, 5000)
  }
  
  }

      return (
   

<body className="body">
<main className="form-signin">
  <form className='login-form' onSubmit={loginHandle}>
    <h3 className="h1 mb-2 fw-normal">Path</h3>
    <h5 className="h6 mb fw-normal">Account login</h5>

{/* email address input*/}
  <div className="form-group">
    <label htmlFor="inputEmail">Email address</label>
    <input type="email" 
    className="form-control" 
    id="inputEmail1" 
    aria-describedby="email" 
    placeholder="Enter email"
    value={email}
		onChange={(e) => setEmail(e.target.value)}
    />
    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

  {/* password input*/}
  <div className="form-group">
    <label htmlFor="inputPassword">Password</label>
    <input type="password" 
    className="form-control" 
    id="inputPassword" 
    placeholder="Password"
    value={password}
		onChange={(e) => setPassword(e.target.value)}
    />
    <small id="passwordHelp" className="form-text text-muted">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces.</small>
  </div>

  <span className='account-not-created'>
      Not registered? <Link to='/register'> Create an account.</Link>
     </span>

  <div className="login-button">
  <button type="submit" value="Login" className="btn btn-primary">Login</button>
  </div>


  </form>
  </main>
  </body> 

       

    );
}
    
export default Login
