import React from 'react';
import {Table, Button, Responsive, ButtonGroup} from "semantic-ui-react";
import CRUDIndexTable from "./CRUDIndexTable";
import {Link} from "react-router-dom";
import ContactService from "../Services/ContactService";

const ContactIndexTable = ({data}) => {
    const service = ContactService;
    const headers = [
        "First Name", "Last Name", "Email",
        ["Date of Birth", 768], ["Telephone 1", 1200], ["Telephone 2", 1200], ["Telephone 3", 1200],
        "Options"
    ];
    const deleteContact = (contact, refreshData) => {
        service.delete(contact)
            .then(() => refreshData());
    };
    const rowTemplate = (contact, refreshData) => (
        <Table.Row key={contact.id}>
            <Table.Cell>
                <Link to={`/contacts/${contact.id}`}>{contact.first_name}</Link>
            </Table.Cell>
            <Table.Cell>
                <Link to={`/contacts/${contact.id}`}>{contact.last_name}</Link>
            </Table.Cell>
            <Table.Cell>{contact.email}</Table.Cell>
            <Responsive as={Table.Cell} minWidth={768}>
                {contact.birth_date}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={1200}>
                {contact.telephone_1}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={1200}>
                {contact.telephone_1}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={1200}>
                {contact.telephone_1}
            </Responsive>
            <Table.Cell>
                <Button.Group icon>
                    <Link to={`/contacts/${contact.id}/edit`}>
                        <Button icon={'edit'}/>
                    </Link>
                    <Button icon={'trash'} onClick={() => deleteContact(contact, refreshData)}/>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
    return (
        <CRUDIndexTable
            title={"Contacts"}
            createOptions={{icon: "user", route: "/contacts/create", title: "Create"}}
            headers={headers}
            service={service}
            rowTemplate={rowTemplate}
        />
    );
};

export default ContactIndexTable;