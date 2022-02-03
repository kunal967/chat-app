/* eslint-disable no-unused-vars */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'rsuite';
import { auth, database } from '../misc/Firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const[isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    let userRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if(authObj){
        userRef = database.ref(`/profiles/${authObj.uid}`)
        userRef.on('value', snap =>{
          const {name , createdAt, avatar} = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid : authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false)
        })

      } else{
        if(userRef){
          userRef.off()
        }

        setProfile(null)
        setIsLoading(false)
      }

    })
    return () =>{
      authUnsub();
      if(userRef){
        userRef.off()
      }
    }

  },[])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ProfileContext.Provider value={{isLoading, profile}} >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
