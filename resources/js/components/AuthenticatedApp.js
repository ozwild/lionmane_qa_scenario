import React from 'react';
import {Switch} from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import ContactIndex from "./ContactIndex";
import ContactShow from "./ContactShow";
import CreateContactForm from "./CreateContactForm";
import EditContactForm from "./EditContactForm";
import AppLayout from './AppLayout';
import LoginLayout from './LoginLayout';
import ErrorLayout from "./ErrorLayout";
import NotFoundErrorPage from "./NotFoundErrorPage";

const AuthenticatedApp = () => {
    return (
            <Switch>
                <AppLayout exact path={'/'} component={Home}/>
                <LoginLayout exact path={'/login'} component={Login}/>
                <AppLayout exact path='/contacts' component={ContactIndex}/>
                <AppLayout exact path='/contacts/create' component={CreateContactForm}/>
                <AppLayout exact path='/contacts/:contactId?' component={ContactShow}/>
                <AppLayout exact path='/contacts/:contactId?/edit' component={EditContactForm}/>
                <ErrorLayout component={NotFoundErrorPage}/>
            </Switch>
    );
};

export default AuthenticatedApp;

