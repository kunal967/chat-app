import React from 'react';
import CreateChatRoomBtn from './CreateChatRoomBtn';
import DashBoardToggle from './Dashboard/DashBoardToggle';

const Sidebar = () => {
  return <div className='h-100 pt-2'>
      <div>
        <DashBoardToggle />
        <CreateChatRoomBtn />
      </div>
      bottom

  </div>;
};

export default Sidebar;
 