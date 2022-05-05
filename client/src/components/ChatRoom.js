import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from './TextContainer.js'
import InfoChatBar from './InfoChatBar.js'
import InputFields from './InputFields.js'
import Messages from './Messages.js'

import { useLocation } from "react-router";
import { Navigate } from "react-router";

import "../css/chat/ChatRoom.css";
import TopNavbar from "../header/TopNavbar.jsx";
import SideNavbar from "../header/SideNavbar.jsx";

let socket;
// The function is a connection point for the client and server 
// and it handles all the incoming messages from the different 
// users that are connected
// enables the chat in real-time

const ChatRoom = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [flag, setFlag]=useState(0);
    const location = useLocation()

	const ENDPOINT = "http://localhost:3000/";


  useEffect(() => {  
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) { 
        setFlag(1);
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on("message", message => {
			setMessages(messages => [...messages, message]);
		});

		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
	}, []);

	//send message function

	const sendMessage = event => {
		event.preventDefault();

		//emitting the messagees users send on the screen using.
		if (message) {
			socket.emit("sendMessage", message);
			setMessage("");
		}
	};

	// if there is an error or something went wrong redirect the user to join page
	if (flag){
		return (
		  <Navigate to="/join" />
		)
	  }

	return (
		<>
		{/* Navigation bars */}
		<TopNavbar/>
		<SideNavbar/>
	
    <div className="outerContainer">
      <div className="container-chat">

		  {/* call the information chat bar function */}
          <InfoChatBar room={room} />

		  {/* call the messages function */}
          <Messages messages={messages} name={name} />

		  {/* call the input fields function */}
          <InputFields message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>

      <TextContainer users={users}/>
    </div>

	</>
	);
};

export default ChatRoom;