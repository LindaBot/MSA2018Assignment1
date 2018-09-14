import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core/';

// import MenuIcon from '@material-ui/icons/Menu';

import * as React from 'react';
// import { Nav,  NavItem } from 'react-bootstrap';
// import { IndexLinkContainer } from "react-router-bootstrap";
// import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
    return (
            <AppBar position="static">
                <Toolbar>
                {<h2>Material Weather</h2>
                    /* 
                    <IconButton  aria-label="Menu" color="inherit">
                        <MenuIcon aria-haspopup="true"/>
                    </IconButton>
                    <Typography variant="display2" color="inherit">
                        <Link style={{color: "white"}} to="/">Weather</Link>
                    </Typography> */}
                </Toolbar>
            </AppBar>
    );
}