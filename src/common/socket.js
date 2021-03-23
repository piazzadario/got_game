import { io } from 'socket.io-client';


export const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Client id: ', socket.id)
})

socket.on('faction_selection', (faction) => {
  console.log('Your opponent has selected: ', faction)
});



//const notify_faction = (faction) => {
//  socket.emit('faction_selection', faction);
//}

export default socket
