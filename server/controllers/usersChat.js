const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // The server adds a new user to the room and adds the user to the list of users with their connection name.
  // It also assigns a unique ID for each user. 
  const existingUser = users.find((user) => user.room === room && user.name === name);

  //Checks is the fields are empty or not, if they are it asks users to input the missing data
  if(!name || !room) return { error: 'Username and room are required.' };

  //Checks if the new user name is already taken. If it is it asks users to join the room with a different name
  if(existingUser) return { error: 'Username is taken.' };
  const user = { id, name, room };
  users.push(user);
  return { user };
}

//when a user leaves the room the list gets updated and the name of that user is removed
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if(index !== -1) return users.splice(index, 1)[0];
}
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };


