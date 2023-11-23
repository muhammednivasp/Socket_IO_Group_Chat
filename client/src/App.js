import { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect('http://localhost:3001')

function App() {
  const [user, setUSer] = useState('')
  const [room, setRoom] = useState('')
  const [show, setShow] = useState(false)



  const joinRoom = () => {
    if (user !== '' && room !== '') {
      socket.emit('join_room', room)
      setShow(true)
    }
  }

  return (
    <div className="App">
      {!show ? (
        <div className='joinChatContainer'>
          <h3>JOIN A CHAT</h3>
          <input type='text' placeholder='Name...' onChange={(event) => {
            setUSer(event.target.value)
          }}></input>
          <input type='text' placeholder='ROOM ID...' onChange={(event) => {
            setRoom(event.target.value)
          }}></input>
          <button onClick={joinRoom}>JOIN A ROOM</button>
        </div>
      ) : (
        <Chat socket={socket} user={user} room={room} />
      )}
    </div>

  );
}

export default App;
