import { Modal, Button } from "react-bootstrap";
import { DFATable } from "./table/DFATable";
import useUserContext from "../../hooks/useUserContext";

export const SearchDFAModal = () => {
    const { dfaModalShow, setDfaModalShow } = useUserContext();

    const handleClose = () => {
        setDfaModalShow(false);
    };

    return (
        <Modal
            
            show={dfaModalShow}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Automatons
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {/* ====TABLE=== */}
                <DFATable />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}