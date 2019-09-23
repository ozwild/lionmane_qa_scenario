import React, {Component, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Container, Menu, Visibility, Dropdown} from 'semantic-ui-react'
import {AuthContext} from "../Contexts/AuthContext";

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    paddingBottom: '2em',
    paddingTop: '1em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};


const NavBar = () => {
    const [menuFixed, setMenuFixed] = useState(false);
    const [overlayFixed, setOverlayFixed] = useState(false);
    const [overlayRect, setOverlayRect] = useState(false);

    const handleOverlayRef = (c) => {
        const {height, width} = c.getBoundingClientRect();
        if (!overlayRect) {
            setOverlayRect({height, width});
        }
    };
    const stickOverlay = () => setOverlayFixed(true);

    const stickTopMenu = () => setMenuFixed(true);

    const unStickOverlay = () => setOverlayFixed(false);

    const unStickTopMenu = () => setMenuFixed(false);

    const {login, logout, user} = useContext(AuthContext);

    const handleLogin = async () => login('aozikuma@gmail.com', '123456789');

    const handleLogout = () => logout();

    const userOptions = () => {
        if (user) {
            return (
                <Dropdown text={user.name} pointing className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item> <Link to={'/'} onClick={() => logout()}> Logout</Link></Dropdown.Item>
                        {/*<Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon'/>
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>*/}
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        return (
            <>
                <Menu.Item as={Link} to="/login">Login</Menu.Item>
                {/*<Menu.Item as={Link} to="/register">Register</Menu.Item>*/}
            </>
        )

    };

    return (
        <Visibility
            onBottomPassed={stickTopMenu}
            onBottomVisible={unStickTopMenu}
            once={false}
        >
            <Menu
                borderless
                fixed={menuFixed ? 'top' : undefined}
                style={menuFixed ? fixedMenuStyle : menuStyle}
            >
                <Container text>
                    {/*<Menu.Item>
                            <Image size='mini' src='/logo-placeholder.png'/>
                        </Menu.Item>*/}
                    <Menu.Item header>LionMane QA Test</Menu.Item>
                    <Menu.Item as={Link} to="/contacts">Contacts</Menu.Item>

                    <Menu.Menu position='right'>
                        {userOptions()}
                    </Menu.Menu>
                </Container>
            </Menu>
        </Visibility>
    );


};

/*class NavBar extends Component {

    state = {
        menuFixed: false,
        overlayFixed: false,
    };

    handleOverlayRef = (c) => {
        const {overlayRect} = this.state;
        const {height, width} = c.getBoundingClientRect();

        if (!overlayRect) {
            this.setState({overlayRect: {height, width}})
        }
    };

    stickOverlay = () => this.setState({overlayFixed: true});

    stickTopMenu = () => this.setState({menuFixed: true});

    unStickOverlay = () => this.setState({overlayFixed: false});

    unStickTopMenu = () => this.setState({menuFixed: false});

    render() {

        const {menuFixed, overlayFixed, overlayRect} = this.state;

        const handleLogin = async () => {
            login('aozikuma@gmail.com', '123456789');
        };

        const handleLogout = () => {
            logout();
        };

        return (
            <Visibility
                onBottomPassed={this.stickTopMenu}
                onBottomVisible={this.unStickTopMenu}
                once={false}
            >
                <Menu
                    borderless
                    fixed={menuFixed ? 'top' : undefined}
                    style={menuFixed ? fixedMenuStyle : menuStyle}
                >
                    <Container text>
                        {/!*<Menu.Item>
                            <Image size='mini' src='/logo-placeholder.png'/>
                        </Menu.Item>*!/}
                        <Menu.Item header>LionMane QA Test</Menu.Item>
                        <Menu.Item as={Link} to="/contacts">Contacts</Menu.Item>

                        <Menu.Menu position='right'>
                            <AuthContext.Consumer>
                                {(login, logout, user) => {
                                    console.log(user);
                                    if (!user) {
                                        return (
                                            <>
                                                <Menu.Item as={Link} to="/login">Login</Menu.Item>
                                                <Menu.Item as={Link} to="/register">Register</Menu.Item>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <Dropdown text={user.name} pointing className='link item'>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                                                    <Dropdown.Item>List Item</Dropdown.Item>
                                                    <Dropdown.Divider/>
                                                    <Dropdown.Header>Header Item</Dropdown.Header>
                                                    <Dropdown.Item>
                                                        <i className='dropdown icon'/>
                                                        <span className='text'>Submenu</span>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>List Item</Dropdown.Item>
                                                            <Dropdown.Item>List Item</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>List Item</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        );
                                    }
                                }}
                            </AuthContext.Consumer>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </Visibility>
        );
    }

}*/

export default NavBar;