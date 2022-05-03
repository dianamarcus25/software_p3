import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'
import { Sidebar_elements } from './Sidebar_elements';

import {IconContext} from 'react-icons';
import * as BiIcons from "react-icons/bi"
import { useNavigate } from 'react-router-dom';

function SideNavbar() {

    const [sidebar] = useState(false);

    //handling the log out 
    const logoutHandle = () => {
        const navigate = useNavigate
        localStorage.removeItem('authToken');
        navigate('/login')
    }
  

           return (
               <> 

<div className='side-navigation-bar'>
<IconContext.Provider value={{color: '#ffff'}}>
                        <nav className={ sidebar ? 'nav-menu active': 'nav-menu'} >

                            <ul className='nav-menu-items'> 
                            <div className="logo">
                                    <Link to='/' className='logo-nav'> Path
                                    </Link>
                                </div>
                                
                                {Sidebar_elements.map((item, index) => {
                                   return (
                                       <li key={index} className={item.class_name}>
                                           <Link to={item.page}>
                                               {item.icon}
                                               <span>{item.title}</span>
                                           </Link>
                                       </li>
                                   )
                               })}
           
                               <li className="logout">
                                   <Link to='/login' className='logout-link' 
                                   onClick={logoutHandle}> <BiIcons.BiLogOut /> <span>Logout</span>
                                   </Link> 
                               </li>
                            </ul>
                       </nav>
                      
                      
                       </IconContext.Provider>

</div>
               </>

           )
    }



export default SideNavbar;

// // calling the elements for the sidebar
// import { Sidebar_elements } from './Sidebar_elements';


// // importing icons for sidebar 
// import {IconContext} from 'react-icons';
// import * as BiIcons from "react-icons/bi";

// function Navbar () {

//     const [sidebar] = useState(false);

//     // const handleLogout = event => {
//     //     localStorage.removeItem("users");

//     // }

//     const [logout] =  useState(false);

//     return (
//         <>    

//         <IconContext.Provider value={{color: '#ffff'}}>
           
//            <div className="navbar">
//                <Link to='#' className='menu'>
//                    </Link>
//             </div>
//             <div className="shadow p-4 mb-5 bg-white rounded">
//                <Link to='#' className='second-menu'>
//                    </Link>
//             </div>
//             <nav className={ sidebar ? 'nav-menu active': 'nav-menu'}>
//                 <ul className='nav-menu-items'> 
//                     <li className="logo">
//                         <Link to='/homepage' className='logo-link'> Path
//                         </Link>

//                     </li>
//                     {Sidebar_elements.map((item, index) => {
//                         return (
//                             <li key={index} className={item.class_name}>
//                                 <Link to={item.page}>
//                                     {item.icon}
//                                     <span>{item.title}</span>
//                                 </Link>
//                             </li>
//                         )
//                     })}

//                     <li className="logout">
                    
//                         <Link to='/login' className='nav-text' 
//                         onClick={() => {localStorage.removeItem("users")}}
//                         >
//                         <BiIcons.BiLogOut /> Logout
//                         </Link>
                     
//                     </li>
                    
 
//                  </ul>
//             </nav>
//             </IconContext.Provider>
        
//         </>

//     )
// }

// export default Navbar;
