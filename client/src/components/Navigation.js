/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { ToggleButtons } from './ToggleButtons';
import useGlobalContext from '../hooks/useGlobalContext';
import { useAuth0 } from "@auth0/auth0-react";

export const Navigation = () => {
    const { setAboutModalShow, setInstructionsModalShow } = useGlobalContext();

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const handleAboutModalOpen = () => {
        setAboutModalShow(true);
    }

    const handleInstructionsModalOpen = () => {
        setInstructionsModalShow(true);
    }

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: "#343a40" }}>
            <Container fluid>
                <Navbar.Brand>
                    <img
                        alt=""
                        src="/img/logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Paredifa
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={handleInstructionsModalOpen}><i className="material-icons">description</i> Instruccions</Nav.Link>
                        <Nav.Link onClick={handleAboutModalOpen}><i className="material-icons">groups</i> About Us</Nav.Link>
                    </Nav>

                    <Nav>
                        {!isAuthenticated && (
                            <Nav.Item>
                                <Button
                                    variant="primary"
                                    className="btn-margin"
                                    onClick={() => loginWithRedirect()}
                                >
                                    <i className="material-icons">login</i> Login
                                </Button>
                            </Nav.Item>
                        )}
                        {isAuthenticated && (
                            <div className="d-inline-flex align-middle">
                                <img className="img-fluid rounded-circle me-1"
                                    src={user.picture}
                                    alt="User Pic"
                                    width="40"
                                />
                                <NavDropdown title={user.name}>
                                    <NavDropdown.Item onClick={() => logout()} ><i className="material-icons">logout</i> Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        )}
                    </Nav>

                    <Nav className="mx-3">
                        <Navbar.Text className="text-light me-3">
                            MODE
                        </Navbar.Text>
                        <ToggleButtons />
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}