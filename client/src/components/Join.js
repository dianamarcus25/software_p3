
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/chat/Join.css';
import SideNavbar from '../header/SideNavbar';
import TopNavbar from '../header/TopNavbar';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <>

        <TopNavbar/>
        <SideNavbar/>

        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                 <h1 className="heading">Join a room with a mentor</h1>
                 <div><input placeholder="Your name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                 <div><input placeholder="Room name" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                 <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
           <button className={'button mt-20'} type="submit">Join a room</button>
         </Link>
            </div>
 
        </div>

        </>
     )
}

export default Join;

