import { Modal, Button } from "react-bootstrap";
import useUserContext from "../../hooks/useUserContext";

export const InstructionsModal = () => {
    const { instructionsModalShow, setInstructionsModalShow } = useUserContext();

    const handleClose = () => {
        setInstructionsModalShow(false);
    };

    return (
        <Modal
            show={instructionsModalShow}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Instructions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
