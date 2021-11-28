/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { Modal, Button } from "react-bootstrap";
import useGlobalContext from "../../hooks/useGlobalContext";

export const ConfirmModal = () => {
    const { confirmModalShow, setConfirmModalShow, canvas, setPath, setVocabularyTemp } = useGlobalContext();

    const handleClose = () => {
        setConfirmModalShow(false);
    };

    const handleClearCanvas = () => {
        let { network } = canvas;

        network.body.data.nodes.clear();
        network.body.data.edges.clear();
        
        setPath('');
        setVocabularyTemp('');
    }

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
                <Button variant="success" onClick={() => {handleClearCanvas(); handleClose();}}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}