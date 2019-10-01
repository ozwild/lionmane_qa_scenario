import React, {useState, useContext} from 'react';
import {Container, Header, Card, Image} from "semantic-ui-react";

const UnauthorizedErrorPage = (props) => {

    return (
        <Container style={{paddingTop: "3em"}}>
            <Card style={{maxWidth: "430px"}}>

                <Image src='/images/desk-top.jpg' wrapped ui={false} style={{objectFit: "cover"}}/>

                <Card.Content>
                    <Header as={'h1'}>Unauthorized</Header>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default UnauthorizedErrorPage;