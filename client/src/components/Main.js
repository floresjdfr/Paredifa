import { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Canvas } from "./Canvas";
import useGlobalContext from '../hooks/useGlobalContext';
import axios from 'axios';

import './Main.css';

const fetchAutomaton = async ({ username, automatonName }) => {
    try {
        const url = `http://localhost:3001/automatons/automaton/`;

        const { data } = await axios
            .post(url, { username, automatonName });

        console.log(data);

        if (data) {
            let { dfa: { nodes }, dfa: { edges } } = data;
            nodes = updateColorForStartAndFinal(nodes);

            console.log('nodes', nodes);
            //console.log(nodes);
            return { nodes, edges }
        }
        else {
            return {};
        }

    } catch (error) {
        return {};
    }
}


/**
 * Changes the node's color if they are start or final node
 * @param {*} nodes => Array
 * @param {*} startColor => String
 * @param {*} finalColor => String
 * @returns new Array with colors added
 */
const updateColorForStartAndFinal = (nodes, startColor = '#69995D', finalColor = '#9B2915') => {
    return nodes.map(node => {
        return node.start
            ? { color: startColor, ...node }
            : node.final
                ? { color: finalColor, ...node }
                : { ...node };
    })
}

export const Main = () => {
    const {
        setDfaModalShow,
        setConfirmModalShow,
        setErrorsModalShow,
        setCanvas,
        userName,
        setUserName,
        automatonName,
        setAutomatonName,
        saveCanvasPNG,
        readAutomatons,
        automatons,
    } = useGlobalContext();

    const onChangeUserName = e => setUserName(e.target.value);
    const onChangeAutomatonName = e => setAutomatonName(e.target.value);

    const handleDfaModalOpen = () => {
        setDfaModalShow(true);
    }

    const handleConfirmModalOpen = () => {
        setConfirmModalShow(true);
    }

    const handleErrorsModalOpen = () => {
        setErrorsModalShow(true);
    }

    const handleShowCanvas = () => {
        setCanvas({ graph: {} });
        const fetchElement = async () => {
            const res = await fetchAutomaton({ username: userName, automatonName: automatonName });
            setCanvas({ graph: res })
        }
        fetchElement();
    }

    const [process, setProcess] = useState({
        label: "Run",
        isRunning: false
    });

    const handleRun = () => {
        setProcess({
            label: 'Running',
            isRunning: true
        })
        setTimeout(() => {
            setProcess({
                label: "Run",
                isRunning: false
            })
        }, 3000)
    }

    const [step, setStep] = useState(true);

    const handleRunBySteps = () => {
        setStep(!step);
    }

    const handlePrueba = async () => {
        readAutomatons()
        console.log(automatons)
    }

    return (
        <Container className="mt-4">

            <div className="d-flex flex-row flex-wrap">
                <div className="me-auto">
                    <Form.Group as={Row} className="mb-3" controlId=" ">
                        <Col md="auto">
                            <Form.Control type="text" placeholder="Vocabulary" />
                        </Col>
                        <Col md="auto">
                            <Button variant="dark" className="buttons dark-button"><i className="material-icons" onClick={() => console.log('Set Vocabulary')}>sort_by_alpha</i> Set Vocabulary</Button>
                        </Col>
                    </Form.Group>
                </div>

                <div>
                    <Form.Group as={Row} className="mb-3" controlId=" ">
                        <Col md="auto">
                            <Form.Control type="text" placeholder="Path" />
                        </Col>
                        <Col md="auto">
                            <Button variant="dark" className="buttons dark-button" onClick={handleRun}>
                                {!process.isRunning ? <i className="material-icons">play_arrow</i> :
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        variant="danger"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                }
                                {` ${process.label}`}
                            </Button>
                            <Button variant="dark" className="buttons dark-button" onClick={handleRunBySteps}>
                                {
                                    step ? <i className="material-icons">directions_walk</i> : <i className="material-icons">directions_run</i>
                                }
                                {' '}Run by Steps
                            </Button>
                        </Col>
                    </Form.Group>
                </div>
            </div>

            <div className="automaton-options mb-3 d-flex justify-content-end">
                <Button variant="outline-light" className="buttons" onClick={handleConfirmModalOpen}><i className="material-icons">restore</i> Clear Canvas</Button>
                <Button variant="outline-light" className="buttons" onClick={() => saveCanvasPNG()}><i className="material-icons">collections</i> Export DFA to PNG</Button>
                <Button variant="outline-light" className="buttons" onClick={handlePrueba}><i className="material-icons">edit</i> Rename Automaton</Button>
                <Button variant="outline-light" className="buttons" onClick={() => console.log('Save Automaton')}><i className="material-icons">save</i> Save Automaton</Button>
                <Button variant="outline-light" className="buttons" onClick={handleDfaModalOpen}><i className="material-icons">search</i> Search Automaton</Button>
            </div>

            <div className="d-flex flex-row flex-wrap mb-3">
                <div>
                    <Form.Group as={Row} controlId=" ">
                        <Form.Label column md="auto" className="fw-bold">
                            Username:
                        </Form.Label>
                        <Col md="auto">
                            <Form.Control type="text" placeholder="Username" onChange={onChangeUserName} value={userName} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="ms-2">
                    <Form.Group as={Row} controlId=" ">
                        <Form.Label column md="auto" className="fw-bold">
                            Automaton Name:
                        </Form.Label>
                        <Col md="auto">
                            <Form.Control type="text" placeholder="Automaton Name" onChange={onChangeAutomatonName} value={automatonName} />
                        </Col>
                    </Form.Group>
                </div>

                <div className="me-auto">
                    <Button variant="dark" className="buttons dark-button" onClick={handleShowCanvas}><i className="material-icons">search</i> Search</Button>
                </div>

                <div>
                    <Button variant="danger" className="buttons" onClick={handleErrorsModalOpen}><i className="material-icons">error</i> Show Errors</Button>
                </div>
            </div>

            <Canvas />

        </Container>
    )
}
