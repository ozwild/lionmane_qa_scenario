import React from 'react';
import {Route, Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

const ErrorLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <main>
                    <Menu secondary>
                        <Menu.Item
                            name={'Home'}
                            onClick={() => location.href = "/"}
                        />
                        <Menu.Item
                            name={'Login'}
                            onClick={() => location.href = "/login"}
                        />
                    </Menu>
                    <Component {...matchProps} />
                </main>
            </>
        )}/>
    );
};

export default ErrorLayout;
