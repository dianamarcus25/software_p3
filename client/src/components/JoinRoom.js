import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/chat/JoinRoom.css';
import SideNavbar from '../header/SideNavbar';
import TopNavbar from '../header/TopNavbar';

const JoinRoom = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <>
{/* navigation bars */}
        <TopNavbar/>
        <SideNavbar/>
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                 <h1 className="heading">Join a room with a mentor</h1>
                 <div><input placeholder="Your name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                 <div><input placeholder="Room name" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                 {/* check for any error if the username already exists or not 
                 if there aren't any errors then the user is connected to the room they entered */}
                 <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/ChatRoom?name=${name}&room=${room}`}>
           <button className={'button mt-20'} type="submit">Join a room</button>
         </Link>
            </div>
        </div>
        </>
     )
}

export default JoinRoom;

