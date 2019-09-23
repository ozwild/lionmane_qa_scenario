import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, Menu, Segment, Header, List, Container} from "semantic-ui-react";
import Contact from '../Models/Contact'
import ContactService from "../Services/ContactService";

class ContactShow extends Component {

    state = {
        contact: new Contact()
    };

    componentDidMount() {
        const {contactId} = this.props.match.params;
        contactId && ContactService.get(contactId)
            .then(contact => {
                this.setState({contact});
            });
    }

    render() {
        const {contact} = this.state;
        return (
            <Container>
                <Segment raised>
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Header as={"h1"}>{contact.name}</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <List>
                                <List.Item>
                                    <List.Icon name={"mail"}/>
                                    <List.Content><a href={`mailto:${contact.email}`}>{contact.email}</a></List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name={"birthday cake"}/>
                                    <List.Content>{contact.birth_date}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name={"phone"}/>
                                    <List.Content>{contact.telephone_1}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name={"phone"}/>
                                    <List.Content>{contact.telephone_2}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name={"phone"}/>
                                    <List.Content>{contact.telephone_3}</List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        );
    }
}

ContactShow.defaultProps = {
    contactId: null
};

ContactShow.propTypes = {
    contactId: PropTypes.number,
};

export default ContactShow;