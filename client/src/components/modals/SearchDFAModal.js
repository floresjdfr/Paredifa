import { Modal, Button } from "react-bootstrap";
import { AutomatonsTable } from "./table/AutomatonsTable";
import useGlobalContext from "../../hooks/useGlobalContext";

export const SearchDFAModal = () => {
    const { dfaModalShow, setDfaModalShow } = useGlobalContext();

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
                <AutomatonsTable />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}