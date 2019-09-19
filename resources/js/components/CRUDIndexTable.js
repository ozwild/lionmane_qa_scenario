import React from 'react';
import {Link} from "react-router-dom";
import {Header, Button, Divider, Icon, Table} from "semantic-ui-react";

const GenericTable = ({title, headers, data, createOptions, rowTemplate}) => {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan={headers.length}>
                        {title &&
                        <Header as={"h1"}>{title}</Header>
                        }
                        {createOptions &&
                        <Link to={createOptions.route}>
                            <Button
                                icon primary
                                floated='right'
                                labelPosition='left'
                                size='small'
                            >
                                <Icon name={createOptions.icon}/> {createOptions.title}
                            </Button>
                        </Link>
                        }
                        <Divider hidden clearing />
                    </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    {headers.map((header, index) => <Table.HeaderCell key={index}>{header}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>

                {rowTemplate && data.map(datum => rowTemplate(datum))}

            </Table.Body>
        </Table>
    );
};

export default GenericTable;