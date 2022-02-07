import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'rsuite';
import CreateChatRoomBtn from './CreateChatRoomBtn';
import DashBoardToggle from './Dashboard/DashBoardToggle';
import ChatRoomList from './Rooms/ChatRoomList';

const Sidebar = () => {
  const topSideBarRef = useRef();

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSideBarRef) {
      setHeight(topSideBarRef.current.scrollHeight);
    }
  }, [topSideBarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashBoardToggle />
        <CreateChatRoomBtn />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList aboveHeight={height} />
      bottom
    </div>
  );
};

export default Sidebar;
