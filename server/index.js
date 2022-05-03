// importing dependencies 
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

const {errorHandler } = require('./middleware/errorsMiddleware');
const userRoutes = require('./routes/userRoutes');

// configure ENV file
dotenv.config({path : '.env'})

// connection to database
require('./database/db.js');

// Require the Model created
const Users = require('./models/userSchema');

//////// Middleware/////////

//get data from front end
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/users', userRoutes); 
app.use('/api/private', require('./routes/private')); 
const { addUser, removeUser, getUser, getUsersInRoom } = require('./controllers/usersChat');

const router = require('./routes/chatRouter.js');

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

//socket connection 
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
       callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
    //    callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });
  



//error handler 
app.use(errorHandler);

// Run the server
const port= 5000 || process.env.PORT;

//-------deployment
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
//------deployment

server.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});