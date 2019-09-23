import React, {useState, useEffect} from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = React.createContext({});

export default ({children}) => {

    const previousUser = AuthService.loggedInUser;
    const previousToken = AuthService.token;
    const previousExpiration = AuthService.expiration;
    const [user, setUser] = useState(previousUser);
    const [token, setToken] = useState(previousToken);
    const [expiration, setExpiration] = useState(previousExpiration);

    const login = async (email, password) => {
        const {user, token, expiration} = await AuthService.login(email, password);
        setUser(user);
        setToken(token);
        setExpiration(expiration);
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        setToken(null);
    };

    useEffect(() => {
    }, [user]);

    const defaultContext = {
        login, logout, user, token, expiration
    };

    return (
        <AuthContext.Provider value={defaultContext}>
            {children}
        </AuthContext.Provider>
    );

};
