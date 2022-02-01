import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModelState } from '../../misc/Costom-hooks';

const DashBoardToggle = () => {
  const { isOpen, open, close } = useModelState();
    const isMobile = useMediaQuery('(max-width:992px)')
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} placement="left" onHide={close}>
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
