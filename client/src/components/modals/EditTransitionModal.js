import { Modal, Button, Form } from "react-bootstrap";
import useUserContext from "../../hooks/useUserContext";
import { useState } from "react";

export const EditTransitionModal = () => {
    const { canvas, setCanvas, editTransitionModalShow, setEditTransitionModalShow, } = useUserContext();

    const [transitionLabelInput, SetTransitionLabelInput] = useState('');

    const {network, lastItem} = canvas;

    const handleCancel = () => {
        if(lastItem){
            network.body.data.edges.remove(lastItem);
        }
        setEditTransitionModalShow(false);
    }
    const handleAccept = (event) => {
        event.preventDefault();
        const inputLabel = transitionLabelInput;
        let transition = network.body.data.edges.get(lastItem);
        transition.label = inputLabel;
        network.body.data.edges.update(transition);
        setCanvas({network});
        setEditTransitionModalShow(false);
    }
    const handleInputChange = (event) => {
        SetTransitionLabelInput(event.target.value);
    }

    return (
        <Modal
            show={editTransitionModalShow}
            onHide={handleCancel}
            size="sg"
            aria-labelledby="contained-modal-tittle-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-tittle-vcenter">
                    Edit Transition
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="edit-transition-form" onSubmit={handleAccept}>
                    <Form.Group>
                        <Form.Label>Transition</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Transition"
                            value={transitionLabelInput}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    form="edit-transition-form"
                    type="submit"
                    variant="primary"
                >
                    Accept
                </Button>
                <Button 
                    variant="secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </Modal.Footer>

        </Modal>
    )
}
