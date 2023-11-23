import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, user, room }) {
    const [currMessage, setCurrMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currMessage !== '') {
            const messageData = {
                room: room,
                author: user,
                message: currMessage,
                time: new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
            setMessageList((list) => [...list, messageData])
            setCurrMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((chat) => {
                        return (
                            <div className='message' id={user === chat.author ? 'you' : 'other'}>
                                <div>
                                    <div className='message-content'>
                                        <p>{chat.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p>{`(${chat.time})`}</p>
                                        <td />
                                        <p>{chat.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input type='text' placeholder='hey...' value={currMessage} onChange={(event) => {
                    setCurrMessage(event.target.value)

                }}
                    onKeyPress={(event) => { event.key === 'Enter' && sendMessage() }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat