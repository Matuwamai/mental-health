import React, { createContext, ReactNode, useContext } from 'react';
import { db, auth } from '../services/firebase'; // Import initialized Firebase services

interface FirebaseContextProps {
  firestore: typeof db;
  auth: typeof auth;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ firestore: db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
