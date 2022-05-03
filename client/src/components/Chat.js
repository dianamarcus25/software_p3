import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from './TextContainer.js'
import InfoBar from './InfoBar.js'
import Input from './Input.js'
import Messages from './Messages.js'
import { useLocation } from "react-router";
import { Navigate } from "react-router";

import "../css/chat/Chat.css";
import TopNavbar from "../header/TopNavbar.jsx";
import SideNavbar from "../header/SideNavbar.jsx";

let socket;

const Chat = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [flag, setFlag]=useState(0);
    const location = useLocation()

	// const ENDPOINT = "http://localhost:3000/";
	const ENDPOINT = "https://software-fp.herokuapp.com/";

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

		if (message) {
			socket.emit("sendMessage", message);
			setMessage("");
		}
	};

	if (flag){
		return (
		  <Navigate to="/join" />
		)
	  }

	return (
		<>
		<TopNavbar/>
		<SideNavbar/>
	
    <div className="outerContainer">
      <div className="container-chat">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>

	</>
	);
};

export default Chat;