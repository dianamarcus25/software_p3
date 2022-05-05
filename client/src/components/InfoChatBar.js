import React from 'react';
import { Link } from 'react-router-dom';
import '../css/chat/InfoChatBar.css';
import closeIcon from '../icons/closeIcon.png';
import onlineIcon from '../icons/onlineIcon.png';

const InfoChatBar = ({room}) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            {/* show if the user is online or not */}
            <img className="onlineIcon" src={onlineIcon} alt="online" />
            {/* room name */}
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            {/* if user ends the chat using the "X" icon then redirect to the join page*/}
            <Link to="/"><img src={closeIcon} alt="close" /></Link>
        </div>
    </div>
)

export default InfoChatBar;