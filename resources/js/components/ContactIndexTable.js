import React, {useState} from 'react';
import {Table, Button, Responsive, ButtonGroup, Message} from "semantic-ui-react";
import CRUDIndexTable from "./CRUDIndexTable";
import {Link} from "react-router-dom";
import ContactService from "../Services/ContactService";
import {Notyf} from "notyf";

const ContactIndexTable = () => {
    const service = ContactService;
    const [status, setStatus] = useState("");
    const [deletedContact, setDeletedContact] = useState(null);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const headers = [
        "Nombre", "Apellido", "Email",
        ["Teléfono 1", 1200], ["Teléfono 2", 1200], ["Teléfono 3", 1200],
        ["Fecha de Nacimiento", 768],
        "Acciones"
    ];

    const deleteContact = (contact) => {
        service.delete(contact)
            .then(() => {
                /*setRefreshCounter(refreshCounter + 1);*/
                const notification = new Notyf();
                notification.error(`The user has been deleted`);
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
                <Link to={`/contacts/${contact.id}`}>{contact.first_name} {contact.last_name}</Link>
            </Table.Cell>
            <Table.Cell>

            </Table.Cell>
            <Table.Cell>{contact.email.replace('@','')}</Table.Cell>
            <Responsive as={Table.Cell} minWidth={1200}>
                {contact.telephone_1}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={1200}>
                {contact.telephone_2}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={1200}>
                {contact.telephone_3}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={768}>
                {contact.birth_date}
            </Responsive>
            <Table.Cell>
                <Button.Group icon>
                    <Link to={`/contacts/${contact.id}/edit`}>
                        <Button icon={'edit'}/>
                    </Link>
                    <Button icon={'cancel'} onClick={() => deleteContact(contact, refreshData)}/>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
    return (
        <React.Fragment>
            <CRUDIndexTable
                title={"Contactos"}
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
                     content={<span>The contact has been deleted.
                         <a href={"#"} onClick={() => undoDeletion()}>Undo?</a></span>}
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