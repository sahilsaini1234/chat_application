import { useEffect,useState} from 'react';
import React from 'react';
import socket from './io'
import './Chat_app.css'
export default function Chat_app() {
    const [Fields,setinputs]=useState({
        name:"",
        message:"",
        room:"",
    })
    const[messagelist,setmessagelist]=useState([])
    const [inchat,setchat] = useState(false)
    useEffect(()=>{
        socket.on('recieve',(data)=>{
            setmessagelist([...messagelist,data])
        })
    })
    const handler=(e)=>{
          setinputs({
            ...Fields,
            [e.target.name]:e.target.value,
          })
    }
    const enter_room=()=>{
        //console.log(Fields)
         setchat(true);
         socket.emit("join_room",Fields.room);
         document.getElementById("Heading").innerHTML ="Let's Chat"
    }
    const send= async ()=>{
        await socket.emit("send_message",Fields)
        setmessagelist([...messagelist,Fields])
    }
    console.log(Fields)
    return (
        <div className="container">
            <div className="left">
            <h1 className="Heading" id="Heading">Welcome to<span><br /></span>Chatroom</h1>
             <img src="tea.gif" alt="" />
            </div>
            {!inchat?(
              
              <div className="input_box">
                <p>Enter in the chatroom by name and room-id</p>
              <input  type="text" placeholder="Enter your name" name="name" onChange={handler}/>
              <input type="text" placeholder="Enter Room" name="room" onChange={handler}/>
               <button onClick={enter_room}>Join</button>
               
            </div>
            ):(
              <div>
                <h2>Chat Room-{Fields.room}</h2>
                <div className="message_container">
                 {
                    messagelist.map((item,index)=>{
                        return (<div style={{margin:'15px'}} key={index}>
                            {item.name}:<span class="messages">{item.message}</span>
                        </div>);
                    })
                 }
                 </div>
                 <input style={{width:"500px",margin:'5px',borderRadius:"45px"}} type="text" placeholder="Enter Message" name="message" onChange={handler}/>
                <button style={{backgroundColor:'blue',borderRadius:'45px',color:"white",width:"80px"}} onClick={send}>Send</button>
              </div>
            )
        }
          </div>
      );
}
