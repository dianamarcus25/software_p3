import React from 'react';
import './App.css';
import {
Routes,
Route} from 'react-router-dom';

//ROUTING
import PrivateRoute from './components/routing/PrivateRoute';

//PAGES
import Login from "./components/Login"
import Register from "./components/Register.jsx"
import DashboardLoggedin from "./components/DashboardLoggedin.jsx"
import HomepageGuest from "./components/HomepageGuest"
import Search from './components/Search';

import ChatRoom from './components/ChatRoom';
import JoinRoom from './components/JoinRoom';


function App() {

  return (
    <>
        <Routes>
      {/* if the user is not loggedin redirect them to 
      login page in order to accesss the dashboars, search, 
      joining a chat and the chat pages */}

      <Route exact path='/DashboardLoggedin' element={<PrivateRoute/>}>
        <Route exact path='/DashboardLoggedin' element={<DashboardLoggedin/>}/>
      </Route>
      
      <Route exact path='/Search' element={<PrivateRoute/>}>
        <Route exact path="/Search" element={<Search/>} />
      </Route>

      <Route exact path='/JoinRoom' element={<PrivateRoute/>}>
        <Route exact path="/JoinRoom" element={<JoinRoom/>} />
       </Route>

      <Route exact path='/ChatRoom' element={<PrivateRoute/>}>
        <Route exact path="/ChatRoom" element={<ChatRoom/>} />
      </Route>

 {/* routes for reguster, login and homepage for users that are not loggedin */}
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/" element={<HomepageGuest/>} />
      </Routes>
    </>
  );
}

export default App;