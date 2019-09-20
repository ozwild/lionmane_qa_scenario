import React, {Component} from 'react';
import {Button, Container, Header, Label, List, Segment, Icon, Divider, Image, Message} from "semantic-ui-react";
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

export default ContactIndex;