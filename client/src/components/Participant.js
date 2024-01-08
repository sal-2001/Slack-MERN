import React from 'react'
import '../styles/participant.css';
export default function Participant({chat}) {
  return (
    <div className='participantContainer'>
        <img src='' alt='profile' className='participantImg'/>
        <p>{chat.chatName}</p>
        <p>Time</p>
    </div>
  )
}
