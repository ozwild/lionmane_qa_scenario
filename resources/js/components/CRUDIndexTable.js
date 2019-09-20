import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Header, Button, Divider, Icon, Table, Pagination, Responsive, Segment} from "semantic-ui-react";

const CRUDIndexTable = ({title, headers, service, createOptions, rowTemplate}) => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [counter, setCounter] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setStatus("loading");
        service.all(activePage)
            .then(response => {
                setData(response.data);
                setTotalPages(response.last_page);
                setStatus("ready");
            });
    }, [activePage, counter]);

    const refreshData = () => {
        setCounter(counter + 1);
    };

    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
    };

    return (
        <Segment {...(status === "loading" && {loading: true})}>
            <Table celled compact>
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
                            <Divider hidden clearing/>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        {headers.map((header, index) => {
                            if (Array.isArray(header)) {
                                return (
                                    <Responsive key={index} as={Table.HeaderCell} minWidth={header[1]}>
                                        {header[0]}
                                    </Responsive>
                                );
                            }
                            return (
                                <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                            );
                        })}
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {rowTemplate && data.map(datum => rowTemplate(datum, refreshData))}

                </Table.Body>
                <Table.Footer>

                    <Table.Row>
                        <Table.HeaderCell colSpan={headers.length} textAlign={"right"}>
                            <Pagination
                                activePage={activePage}
                                onPageChange={onChange}
                                totalPages={totalPages}
                                ellipsisItem={null}
                                pointing
                                secondary
                            />
                        </Table.HeaderCell>
                    </Table.Row>

                </Table.Footer>
            </Table>
        </Segment>
    );
};

export default CRUDIndexTable;