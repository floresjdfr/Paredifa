import { Modal, Button } from "react-bootstrap";
import useUserContext from "../../hooks/useUserContext";

export const ConfirmModal = () => {
    const { confirmModalShow, setConfirmModalShow } = useUserContext();

    const handleClose = () => {
        setConfirmModalShow(false);
    };

    return (
        <Modal
            show={confirmModalShow}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to clear the canvas?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>No</Button>
                <Button variant="success" onClick={handleClose}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}