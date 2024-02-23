//this is used to keep track of what interface to show based on login status

import React, {createContext, useContext, useState} from 'react';

const Authenticator = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <Authenticator.Provider value={{user, login, logout}}>
            {children}
        </Authenticator.Provider>
    );
}

export const useAuth = () => useContext(Authenticator);