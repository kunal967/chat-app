import React, { useCallback } from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModelState } from '../../misc/Costom-hooks';
import { auth } from '../../misc/Firebase';

const DashBoardToggle = () => {
  const { isOpen, open, close } = useModelState();
    const isMobile = useMediaQuery('(max-width:992px)')

  const onSignOut = useCallback (()=>{
    auth.signOut()

    Alert.info('Signed Out', 4000 )

    close()
  }, [close])
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} placement="left" onHide={close}>
        <Dashboard  onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
