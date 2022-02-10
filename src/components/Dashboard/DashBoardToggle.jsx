import React, { useCallback } from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';
import { useMediaQuery, useModelState } from '../../misc/Costom-hooks';
import { auth, database } from '../../misc/Firebase';

const DashBoardToggle = () => {
  const { isOpen, open, close } = useModelState();
  const isMobile = useMediaQuery('(max-width:992px)');

  const onSignOut = useCallback(() => {
    database.ref(`status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(()=>{
      auth.signOut();
      close();
      
    }).catch(err => {
      Alert.error(err.message, 4000);
    })

  }, [close]);
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} placement="left" onHide={close}>
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
