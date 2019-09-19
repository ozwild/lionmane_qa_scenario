import React from 'react';
import {Table, Button} from "semantic-ui-react";
import CRUDIndexTable from "./CRUDIndexTable";
import {Link} from "react-router-dom";

const ContactIndexTable = ({data}) => {
    const headers = ["First Name", "Last Name", "Email", "Telephone 1", "Telephone 2", "Telephone 3", "Date of Birth", "Options"];
    const rowTemplate = contact => (
        <Table.Row key={contact.id}>
            <Table.Cell>
                <Link to={`/contacts/${contact.id}`}>{contact.first_name}</Link>
            </Table.Cell>
            <Table.Cell>
                <Link to={`/contacts/${contact.id}`}>{contact.last_name}</Link>
            </Table.Cell>
            <Table.Cell>{contact.email}</Table.Cell>
            <Table.Cell>{contact.telephone_1}</Table.Cell>
            <Table.Cell>{contact.telephone_2}</Table.Cell>
            <Table.Cell>{contact.telephone_3}</Table.Cell>
            <Table.Cell>{contact.birth_date}</Table.Cell>
            <Table.Cell>
                <Link to={`/contacts/${contact.id}/edit`}>
                    <Button icon={'edit'}/>
                </Link>
                <Button icon={'trash'}/>
            </Table.Cell>
        </Table.Row>
    );
    return (
        <CRUDIndexTable
            title={"Contacts"}
            createOptions={{icon: "user", route: "/contacts/create", title: "Create"}}
            headers={headers}
            data={data}
            rowTemplate={rowTemplate}
        />
    );
};

export default ContactIndexTable;