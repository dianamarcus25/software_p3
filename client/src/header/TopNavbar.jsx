import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'



function TopNavbar() {

const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);

           return (
               <> 

<div className='top-nav'>
 <ul className="nav justify-content-end">
  <ul className="nav-item dropdown">
    <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false" onClick={toggleOpen}>Profile</Link>
    <div className={`dropdown-menu ${dropdown ? 'show' : ''}`} >
      <li><Link className="dropdown-item" to="#">Settings</Link></li>
      <li><Link className="dropdown-item" to="#">Notifications</Link></li>
    </div> 
  </ul>
  
  <li className="nav-item">
    <Link className="nav-link" to="/login">Login</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/register">Register</Link>
  </li>

</ul>

</div>


               </>

           )
    }



export default TopNavbar;
