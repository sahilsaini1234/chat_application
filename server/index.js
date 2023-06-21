const express=require('express')
const socket= require('socket.io')
const app=express();
const cors=require('cors')
const PORT=8000;

const server=app.listen(PORT,()=>{
    console.log('server start at'+PORT)
})
app.use(cors({origin:'http://localhost:3000'}))
const io=socket(server,{
    cors:{
        origin:'*'
    }
})
io.on("connection",(socket)=>{
    socket.on('join_room',(data)=>{
       socket.join(data);
    })
    socket.on('send_message',(data)=>{
        socket.to(data.room).emit('recieve',data)
    })
})