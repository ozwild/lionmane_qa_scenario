import React, {useState} from 'react';
import {Table, Button, Responsive, ButtonGroup, Message} from "semantic-ui-react";
import CRUDIndexTable from "./CRUDIndexTable";
import {Link} from "react-router-dom";
import ContactService from "../Services/ContactService";

const ContactIndexTable = () => {
    const service = ContactService;
    const [status, setStatus] = useState("");
    const [deletedContact, setDeletedContact] = useState(null);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const headers = [
        "First Name", "Last Name", "Email",
        ["Date of Birth", 768], ["Telephone 1", 1200], ["Telephone 2", 1200], ["Telephone 3", 1200],
        "Options"
    ];

    const deleteContact = (contact) => {
        service.delete(contact)
            .then(() => {
                setRefreshCounter(refreshCounter + 1);
                setDeletedContact(contact);
                setStatus("deleted");
            });
    };

    const undoDeletion = () => {
        if (!deletedContact) return;
        service.undelete(deletedContact)
            .then(() => {
                setRefreshCounter(refreshCounter + 1);
                setStatus("restored");
                scheduleMessageDismissal();
            })
    };

    const scheduleMessageDismissal = () => {
        setTimeout(() => dismissMessages(), 5000);
    };

    const dismissMessages = () => {
        setStatus("");
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
        <React.Fragment>
            <CRUDIndexTable
                title={"Contacts"}
                createOptions={{icon: "user", route: "/contacts/create", title: "Create"}}
                headers={headers}
                rowTemplate={rowTemplate}
                service={service}
                refreshCounter={refreshCounter}
            />
            {status === "deleted" &&
            <Message info
                     onDismiss={dismissMessages}
                     icon={"trash"}
                     header={"Contact Deleted!"}
                     content={<span>The contact has been deleted.  <a href={"#"}
                                                                      onClick={() => undoDeletion()}>Undo?</a></span>}
            />
            }
            {status === "restored" &&
            <Message success
                     icon={"redo"}
                     header={"Contact Restored!"}/>
            }
        </React.Fragment>
    );
};

export default ContactIndexTable;