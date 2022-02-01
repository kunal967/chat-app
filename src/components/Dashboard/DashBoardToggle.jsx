import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { useModelState } from '../../misc/Costom-hooks';

const DashBoardToggle = () => {
  const { isOpen, open, close } = useModelState();

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer show={isOpen} placement="left" onHide={close}>
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
