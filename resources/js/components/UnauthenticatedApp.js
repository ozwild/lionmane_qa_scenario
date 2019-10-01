import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import AppLayout from './AppLayout';
import LoginLayout from './LoginLayout';

const UnauthenticatedApp = () => {
    return (
        <Switch>
            <AppLayout exact path={'/'} component={Home}/>
            <LoginLayout component={Login}/>
        </Switch>
    );
};

export default UnauthenticatedApp;

