/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { Modal, Button, Form } from "react-bootstrap";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useState } from "react";
import {allowTypeTransition} from '../../controllers/validations';

export const EditTransitionModal = () => {
    const { canvas, setCanvas, editTransitionModalShow, setEditTransitionModalShow, vocabularyArray } = useGlobalContext();

    const [transitionLabelInput, SetTransitionLabelInput] = useState('');

    const {network, lastItem} = canvas;

    const handleCancel = () => {
        if(lastItem){
            network.body.data.edges.remove(lastItem);
        }
        setEditTransitionModalShow(false);
        SetTransitionLabelInput('');
    }
    const handleAccept = (event) => {
        event.preventDefault();
        const inputLabel = transitionLabelInput;
        let transition = network.body.data.edges.get(lastItem);
        transition.label = inputLabel;
        network.body.data.edges.update(transition);
        setCanvas({network});
        SetTransitionLabelInput('');
        setEditTransitionModalShow(false);
    }
    const handleInputChange = (event) => {
        console.log(event);
        if (allowTypeTransition(vocabularyArray, event.nativeEvent.data, transitionLabelInput))SetTransitionLabelInput(event.target.value);
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
                Transition
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="edit-transition-form" onSubmit={handleAccept}>
                    <Form.Group>
                        <Form.Label>Transition</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Transitions must be separated by comma(,)"
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
