import React, { memo } from 'react';
import { ButtonToolbar, Icon } from 'rsuite';
import { Link } from 'react-router-dom';
import { useCurrentRoom } from '../../../context/current.room.context';
import { useMediaQuery } from '../../../misc/Costom-hooks';
import RoomInfo from './RoomInfo';

const Top = () => {
  const name = useCurrentRoom(v => v.name);
  const isMobile = useMediaQuery('(max-width : 992px)');

  return (
    <div>
      <div className="d-flex justify-content-between allign-items-center">
        <h4 className='text-disappear d-flex align-items-center'>
          <Icon
            icon="arrow-circle-left"
            componentClass={Link}
            to="/"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear"> {name} </span>
        </h4>
        <ButtonToolbar className="ws-nowrap">todo</ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between allign-items-center">
        <span>todo</span>
        <RoomInfo />
      </div>
    </div>
  );
};

export default memo(Top);
