import React, { useEffect, useState } from 'react'
import Participant from './Participant'
import '../styles/chatsection.css';
import useStateValue from '../context/AppContext';
import { getUserChats } from '../services/chat';
export default function ChatSection() {
  const [{user},dispatch] = useStateValue();
  const [userchats, setUserChats] = useState([]);
  // useEffect(()=>{
  //   if(userchats.length===0)
  //   {
  //     handleGetChats();
  //   }
  // },[]);
  const handleGetChats = async()=>{
    getUserChats(user.userId).then((data)=>{
      console.log('data',data);
      setUserChats(data);
    })
  }
  return (
    <div className=''>
      <div>Header</div>
      <button onClick={handleGetChats}>get Chats</button>
      <div>
        {
          userchats && userchats.length > 0 && userchats.map((chat)=>(
            <Participant key={chat._id} chat={chat}/>
          )
          )
        }
      </div>
    </div>
  )
}