import React, { memo } from 'react';
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current.room.context';
import { useModelState } from '../../../misc/Costom-hooks';

const RoomInfo = () => {
  const { isOpen, open, close } = useModelState();
  const desc = useCurrentRoom(room => room.Description)
  
  const name = useCurrentRoom(v => v.name);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room Information
      </Button>
      <Modal show={isOpen} onHide={close} >
          <Modal.Header>
              <Modal.Title>
                  About {name}
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h6 className='mb-1' >Description</h6>
              <p>{desc}</p>
              
          </Modal.Body>
          <Modal.Footer>
              <Button block onClick={close}>
                Close
              </Button>
          </Modal.Footer>

      </Modal>
    </>
  );
};

export default memo(RoomInfo);

