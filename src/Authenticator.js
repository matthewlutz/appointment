//this is used to keep track of what interface to show based on login status

import React, {createContext, useContext, useState} from 'react';

const Authenticator = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [usersRole, setRole] = useState(() => {
        return localStorage.getItem('role') || '';
    });


    const login = (userData, role ) => {
        setUser(userData);
        setRole(role);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', role);

    }

    const logout = () => {
        setUser(null);
        setRole('');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    }

    return (
        <Authenticator.Provider value={{user, usersRole, login, logout}}>
            {children}
        </Authenticator.Provider>
    );
}

export const useAuth = () => useContext(Authenticator);