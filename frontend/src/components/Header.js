import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";

function Header(props) {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <LinkContainer to="/"><Navbar.Brand>ProShop</Navbar.Brand></LinkContainer>
                    <Nav className="me-auto">
                        <LinkContainer to='/home'>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/features'>
                            <Nav.Link>Features</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/pricing'>
                            <Nav.Link>Pricing</Nav.Link>
                        </LinkContainer>
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenue'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>

                            </NavDropdown>
                        )}
                    </Nav>
                    <Nav>

                        <LinkContainer to='/cart'>
                            <Nav.Link href="#cart"><i className="fas fa-shopping-cart me-1"></i>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user me-1"></i>Login</Nav.Link>
                            </LinkContainer>
                        )}

                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;