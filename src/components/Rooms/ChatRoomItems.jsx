import React from 'react';
import TimeAgo from 'timeago-react';

const ChatRoomItems = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">Room-Name</h3>
        <TimeAgo datetime={new Date()} className="font-normal text-black-45" />
      </div>

      <div className="d-flex align-items-center text-black-70">
        <span>No new messages</span>
      </div>
    </div>
  );
};

export default ChatRoomItems;
