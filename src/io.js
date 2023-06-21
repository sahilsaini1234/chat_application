import io from 'socket.io-client';
const connection_port='https://setver.onrender.com/';

let socket;

export default socket=io(connection_port)