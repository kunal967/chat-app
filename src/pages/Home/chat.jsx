import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import Top from '../../components/chat-window/chat-top';
import Bottom from '../../components/chat-window/chatBottom';
import Messages from '../../components/chat-window/messages';
import { useRooms } from '../../context/rooms.context';

const Chat = () => {

  const { chatId } = useParams()
  const rooms = useRooms()

  if(!rooms ){
    return <Loader center vertical size="md" content="Loading" speed='slow' />
  }

  const currentRoom = rooms.find(room => room.id === chatId)

  if(!currentRoom){
    return <h6 className='text-center mt-page'> Chat {chatId} not found.</h6>
  }

  return (
    <>
      <div className='chat-top'>
        <Top />
      </div>
      <div className='chat-middle'>
        <Messages />
      </div>
      <div className='chat-bottom'>
        <Bottom />
      </div>
    </>
  );
};

export default Chat;
