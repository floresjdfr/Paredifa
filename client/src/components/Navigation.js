import { Navbar, Container, Nav } from 'react-bootstrap';
import { ToggleButtons } from './ToggleButtons';
import useUserContext from '../hooks/useUserContext';

export const Navigation = () => {
    const { setAboutModalShow, setInstructionsModalShow } = useUserContext();

    const handleAboutModalOpen = () => {
        setAboutModalShow(true);
    }

    const handleInstructionsModalOpen = () => {
        setInstructionsModalShow(true);
    }

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{background: "#343a40"}}>
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
