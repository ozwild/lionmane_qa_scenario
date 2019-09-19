import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import {Container, Header} from 'semantic-ui-react'
import NavBar from './AppBar';
import Home from "./Home";
import ContactIndex from "./ContactIndex";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import ContactShow from "./ContactShow";
import Contact from "../Models/Contact";
import ContactService from "../Services/ContactService";

class App extends Component {
    render() {
        return (
            <div>

                <NavBar/>

                <main>
                    <Switch>

                        <Route exact path={'/'} component={Home}/>
                        <Route exact path='/contacts' component={ContactIndex}/>
                        <Route exact path='/contacts/create' component={ContactForm}/>
                        <Route exact path='/contacts/:contactId?'
                               render={({match}) => <ContactShow contactId={parseInt(match.params.contactId)}/>}/>
                        <Route exact path='/contacts/:contactId?/edit'
                               render={({match}) => <ContactForm
                                   contact={parseInt(match.params.contactId)}
                               />}/>
                    </Switch>
                </main>

                <Footer/>

                <ToastsContainer store={ToastsStore} lightBackground/>

            </div>
        );
    }
}

export default App;

