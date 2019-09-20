import React, {Component} from 'react';
import {Button, Container, Header, Label, List, Segment, Icon, Divider, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ContactService from "../Services/ContactService";
import ContactIndexTable from "./ContactIndexTable";

const ContactIndex = () => {
    return (
        <Container>
            <ContactIndexTable/>
        </Container>
    );
};

/*class ContactIndex extends Component {

    state = {
        contacts: []
    };

    componentDidMount() {
        ContactService.all()
            .then(async contacts => {
                this.setState({contacts})
            });
    }

    render() {
        const {contacts} = this.state;
        return (
            <Container>
                <ContactIndexTable data={contacts}/>
            </Container>
        );
    }

}*/

export default ContactIndex;