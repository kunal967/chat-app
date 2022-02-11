/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase from 'firebase/app'
import { auth, database } from '../misc/Firebase';


export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStausRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStausRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          // If we're not currently connected, don't do anything.
          if (!!snapshot.val() === false) {
            return;
          }

          userStausRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStausRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }

        if (userStausRef) {
          userStausRef.off();
        }
        database.ref('.info/connected').off()

        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsub();
      database.ref('.info/connected').off()
      if (userRef) {
        userRef.off();
      }
      if (userStausRef) {
        userStausRef.off();
      }
    };
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
