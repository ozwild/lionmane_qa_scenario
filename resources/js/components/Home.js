import React from 'react';
import {Link} from 'react-router-dom';
import {Header, Container, Button} from "semantic-ui-react";

const Home = () => {
    const errorStyling = {
        fontSize: '50px',
        color: '#585858',
        fontFamily: 'Arial',
        height: '650px',
        verticalAlign: 'middle',
        textAlign: 'center',
        display: 'table-cell',
        lineHeight: '1.5'
    };
    return (
        <Container>
            <Header as={'h1'}>LionMane QA Test</Header>
            <p style={errorStyling}>BIenvenido! Aquí puedes ver tu lista de contatos y manejarlos.</p>
            <div>
                <Button floated={'right'} as={Link} to={'/contacts/create'}>Agregar COntacto</Button>
                <Button floated={'right'} as={Link} to={'/contacts'}>Ver Contactos</Button>
            </div>
        </Container>
    );
};

export default Home;