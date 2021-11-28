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

export const DFANameModal = () => {
    const { /* automatons,  */dfaNameModalShow, setDfaNameModalShow, saveAutomaton } = useGlobalContext();

    const [name, setName] = useState('');

    const handleClose = () => {
        setDfaNameModalShow(false);
    };

    const handleAccept = (event) => {
        event.preventDefault();
        saveAutomaton(name);
        setName('');
    }

    const handleInputChange = (event) => {
        setName(event.target.value);
    }

    const handleAutoName = () => {
        let name = '$FA_' + (Math.floor(Math.random() * (5000 - 4000)) + 4000);

        setName(name);
    }

    return (
        <Modal

            show={dfaNameModalShow}
            onHide={handleClose}
            size="sg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Automaton Name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form id="edit-transition-form" onSubmit={handleAccept}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Automaton Name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>

                <div className="d-flex justify-content-end mt-2">
                    <Button variant="primary" onClick={handleAutoName}><i className="material-icons">autorenew</i> Autogenerate Name</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button
                    form="edit-transition-form"
                    type="submit"
                    variant="primary"
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
