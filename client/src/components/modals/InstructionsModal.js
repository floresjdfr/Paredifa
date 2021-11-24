import { Modal, Button } from "react-bootstrap";
import useGlobalContext from "../../hooks/useGlobalContext";

export const InstructionsModal = () => {
    const { instructionsModalShow, setInstructionsModalShow } = useGlobalContext();

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
