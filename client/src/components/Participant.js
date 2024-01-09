import React from 'react'
import ProfileIcon from "../assets/ProfileIcon.jpg";
import '../styles/participant.css';
export default function Participant({chat}) {
  return (
    <div className='participantContainer'>
        <img src={ProfileIcon} alt='profile' className='participantImg'/>
        <p className='participantName'>chatName</p>
        <p className='messageTime'>Time</p>
    </div>
  )
}
