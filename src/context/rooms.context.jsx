import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/Firebase';
import { transformtoArrayWithId } from '../misc/helpers';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref('rooms');
    roomListRef.on('value', (snap) => {
      const data = transformtoArrayWithId(snap.val());
      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}> {children} </RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext)
