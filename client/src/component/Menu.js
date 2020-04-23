import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
class Menu extends Component {
    render() {
        return(
        <Navbar className="menu" bg="light" expand="lg">
            <Navbar.Brand><span style={{color: "white"}}>Todos App</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><NavLink className="menu-select" activeClassName="menu-active" exact to="/">Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink className="menu-select" activeClassName="menu-active" to="/todos/1">Todos</NavLink></Nav.Link>
                    <Nav.Link><NavLink className="menu-select" activeClassName="menu-active" to="/another">Another</NavLink></Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default Menu;