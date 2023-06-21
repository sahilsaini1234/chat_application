import io from 'socket.io-client';
const connection_port='localhost:8000';

let socket;

export default socket=io(connection_port)