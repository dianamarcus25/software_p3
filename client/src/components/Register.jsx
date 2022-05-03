import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/register.css'
import { useNavigate } from 'react-router-dom';


// function Register() {

const Register =() =>{
  const navigate = useNavigate()

	const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const[error, setError] = useState('');

  useEffect(()=>{
    if(localStorage.getItem('authToken')) {
      navigate('/register');
    }
  }, [navigate]);

const registerHandle = async(event) =>{
  event.preventDefault();

  const config ={
    headers: {'Content-Type': 'application/json'},
}

try {
  const {data} = await axios.post("/api/users/register", 
  {firstname, 
    lastname, 
    email, 
    password, 
    role}, 
    config);

  localStorage.setItem("authToken", data.token);
  navigate("/DashboardLoggedin")

} catch (err) {
  setError(error.response.data.err);
  setTimeout(()=>{
    setError("")
  }, 5000)
}

}

  return (

<body className="body" >
<main className="form-register">

{/* <form className='register-form' onSubmit={registerUser}> */}
<form className='register-form' onSubmit={registerHandle}>

			{/* <form className='register-form' onSubmit={registerUser}> */}
      <h3 className="h1 mb-2 fw-normal">Path</h3>
    <h5 className="h6 mb fw-normal">Create an account and connect with a mentor or begin mentoring</h5>
    {error && <span className="error-mesg">{error}</span>}
    <div className="row">
    <div className="col"> 

    {/* first name input*/}  
    <label htmlFor="firstname">First name</label>
      <input 
      type="text" 
      className="form-control" 
      placeholder="First name"
      id="firstname"
      name="firstanme"
      value={firstname}
      onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="col">
    {/* last name input*/}
    <label htmlFor="lastname">Last name</label>
      <input type="text" 
      className="form-control" 
      placeholder="Last name"
      id="lastname"
      name="lastname"
      value={lastname}
      onChange={(e) => setLastName(e.target.value)}
      />
    </div>  
    </div>
  {/* email address input*/}
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" 
    className="form-control" 
    id="email" 
    placeholder="Enter email"
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

  {/* password input*/}
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" 
    className="form-control" 
    id="password" 
    placeholder="Password"
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <small id="passwordHelp" className="form-text text-muted">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces.</small>
  </div>

  <label htmlFor="role">Choose to register as a mentor or mentee</label>
  <span>
      <select type="boolean" 
      className="role-control" 
      placeholder="role"
      id="role"
      name="role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      > 
      <option>Choose</option>
      <option>mentor</option>
      <option>mentee</option>
      </select>
      </span>

      <span className='account-created'>
        Do you already have an account? <Link to='/login'> Login here</Link>
     </span>

     <div className='register-button' >
  <button className="btn btn-primary" 
  type='submit'
  >Register</button> </div>

  </form>
  </main> 
  </body>


  )
}


export default Register;