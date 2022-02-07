import React from 'react';
import { Nav } from 'rsuite';
import ChatRoomItems from './ChatRoomItems';

const ChatRoomList = ({ aboveHeight }) => {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveHeight}px)`,
      }}
    >
      <Nav.Item>
        <ChatRoomItems />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;
