import { Modal, Button } from "react-bootstrap";
import useUserContext from "../../hooks/useUserContext";

export const AboutModal = () => {
    const { aboutModalShow, setAboutModalShow } = useUserContext();

    const handleClose = () => {
        setAboutModalShow(false);
    };

    return (
        <Modal
            show={aboutModalShow}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    About Us
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p className="text-center fw-bold">Universidad Nacional de Costa Rica</p>
                <p className="text-center fw-bold">Escuela de Informática</p>
                <p className="text-center fw-bold">EIF400: Paradigmas de Programación</p>
                <p className="text-center fw-bold">Profesor: Dr. Carlos Loría Sáenz</p>
                <p className="text-center fw-bold">II Ciclo 2021</p>
                <p className="text-center fw-bold">Authors:</p>
                <p className="text-center">Rolando Herrera Bustos</p>
                <p className="text-center">Marvin Aguilar Fuentes</p>
                <p className="text-center">Alonso Calderón Trigueros</p>
                <p className="text-center">José David Flores Rodríguez</p>
                <p className="text-center fw-bold">Group: 02-10am</p>
                <p className="text-center fw-bold">Version 2.0</p>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
