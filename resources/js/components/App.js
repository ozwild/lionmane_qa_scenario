import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import NavBar from './AppBar';
import Home from "./Home";
import ContactIndex from "./ContactIndex";
import Footer from "./Footer";
import ContactShow from "./ContactShow";
import CreateContactForm from "./CreateContactForm";
import EditContactForm from "./EditContactForm";

class App extends Component {
    render() {
        return (
            <div>

                <NavBar/>

                <main>
                    <Switch>

                        <Route exact path={'/'} component={Home}/>
                        <Route path='/contacts' component={ContactIndex}/>
                        <Route exact path='/contacts/create' component={CreateContactForm}/>
                        <Route exact path='/contacts/:contactId?'
                               render={({match}) => <ContactShow contactId={parseInt(match.params.contactId)}/>}/>
                        <Route exact path='/contacts/:contactId?/edit'
                               render={({match}) => <EditContactForm
                                   contactId={parseInt(match.params.contactId)}
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

