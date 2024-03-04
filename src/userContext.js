import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');

    const saveEmail = (email) => {
        setUserEmail(email);
    };

    return (
        <UserContext.Provider value={{ userEmail, saveEmail }}>
            {children}
        </UserContext.Provider>
    );
};