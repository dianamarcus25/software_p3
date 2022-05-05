import React from 'react';
import '../css/chat/InputFields.css';

const InputFields = ({message, setMessage, sendMessage}) => (
    <form className="form">
        {/* input form for messages */}
        <input className="input" placeholder="Type a message..."  
        value={message}
        onChange={(event) => setMessage(event.target.value)} 
        onKeyPress={event => event.key==='Enter' ? sendMessage(event) : null}
        />
        {/* sending messages when the button is clicked */}
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
)

export default InputFields;