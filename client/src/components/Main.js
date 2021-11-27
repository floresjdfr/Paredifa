import { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Canvas } from "./Canvas";
import useGlobalContext from '../hooks/useGlobalContext';

import './Main.css';
import { deleteHandler, newStateHandler, newTransitionHandler, setFinalHandler, setStartHandler, runAnimation, requestRun } from '../controllers/canvas';
import { ToastModal } from './modals/ToastModal';

/**
 * Changes the node's color if they are start or final node
 * @param {*} nodes => Array
 * @param {*} startColor => String
 * @param {*} finalColor => String
 * @returns new Array with colors added
 */
/* const updateColorForStartAndFinal = (nodes, startColor = '#69995D', finalColor = '#9B2915') => {
    return nodes.map(node => {
        return node.start
            ? { color: startColor, ...node }
            : node.final
                ? { color: finalColor, ...node }
                : { ...node };
    })
} */

export const Main = () => {
    const {
        setDfaModalShow,
        setConfirmModalShow,
        setErrorsModalShow,
        saveCanvasPNG,
        canvas,
        mode,
        saveAutomaton,
        path,
        setPath,
        setToastModal,
    } = useGlobalContext();

    const onChangePath = e => setPath(e.target.value);

    const handleDfaModalOpen = () => {
        setDfaModalShow(true);
    }

    const handleConfirmModalOpen = () => {
        setConfirmModalShow(true);
    }

    const handleErrorsModalOpen = () => {
        setErrorsModalShow(true);
    }

    const handleSaveAutomaton = () => {
        saveAutomaton();
    }

    const [process, setProcess] = useState({
        label: "Run",
        isRunning: false
    });

    const handleRun = async () => {
        let nodes = canvas.network.body.data.nodes.get();
        let edges = canvas.network.body.data.edges.get();

        if (nodes.length !== 0 && edges.length !== 0) {
            setProcess({
                label: 'Running',
                isRunning: true
            })

            const data = await requestRun(path, canvas.network);
            const pathList = data.path;
            const result = data.result;
            if (result) {
                runAnimation(canvas.network, pathList);
            }
            setProcess({
                label: "Run",
                isRunning: false
            })
        } else {
            setToastModal({ message: 'Please create or display an Automaton to run it!', show: true });
        }
    }

    /* const [step, setStep] = useState(true);

    const handleRunBySteps = () => {
        setStep(!step);
    } */

    return (
        <Container className="mt-4" fluid>

            <div className="d-flex flex-row flex-wrap">
                <div className="me-auto">
                    <Form.Group as={Row} className="mb-3" controlId=" ">
                        <Col md="auto">
                            <Form.Control type="text" placeholder={mode === 'DFA' ? 'Vocabulary' : 'Regex'} className="mt-2" />
                        </Col>
                        <Col md="auto">
                            <Button
                                variant="dark"
                                className="buttons dark-button"
                                onClick={() => console.log('Set Vocabulary')}
                            >
                                <i className="material-icons">sort_by_alpha</i> Set
                                {
                                    mode === 'DFA' ? ' Vocabulary' : ' Regex'
                                }
                            </Button>
                        </Col>
                    </Form.Group>
                </div>

                <div>
                    <Form.Group as={Row} className="mb-3" controlId=" ">
                        <Col md="auto">
                            <Form.Control type="text" placeholder="Path" value={path} onChange={onChangePath} className="mt-2" />
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
                            {/* <Button variant="dark" className="buttons dark-button" onClick={handleRunBySteps}>
                                {
                                    step ? <i className="material-icons">directions_walk</i> : <i className="material-icons">directions_run</i>
                                }
                                {' '}Run by Steps
                            </Button> */}
                        </Col>
                    </Form.Group>
                </div>
            </div>

            <div className="automaton-options d-flex flex-row flex-wrap justify-content-end mb-3">
                <div>
                    <Button variant="outline-light" className="buttons" onClick={() => saveCanvasPNG()}><i className="material-icons">collections</i> Export DFA to PNG</Button>
                    <Button variant="outline-light" className="buttons" onClick={handleSaveAutomaton}><i className="material-icons">save</i> Save / Update Automaton</Button>
                    <Button variant="outline-light" className="buttons" onClick={handleDfaModalOpen}><i className="material-icons">search</i> Search Automaton</Button>
                </div>
            </div>

            <div className="automaton-options mb-3">
                {
                    mode === 'DFA' &&
                    <div >
                        <Button variant="outline-light" className="buttons" onClick={() => newStateHandler(canvas.network)}><i className="material-icons">radio_button_unchecked</i>New State</Button>

                        <Button variant="outline-light" className="buttons" onClick={() => newTransitionHandler(canvas.network)}><i className="material-icons">redo</i>New Transition</Button>

                        <Button variant="outline-light" className="buttons" onClick={() => deleteHandler(canvas.network)}><i className="material-icons">delete</i> Delete</Button>

                        <Button variant="outline-light" className="buttons" onClick={() => setStartHandler(canvas.network)}><i className="material-icons">start</i> Set Start</Button>

                        <Button variant="outline-light" className="buttons" onClick={() => setFinalHandler(canvas.network)}><i className="material-icons">radio_button_checked</i> Set Final</Button>
                    </div>
                }
                <div className="me-auto">
                    <Button variant="outline-light" className="buttons" onClick={handleConfirmModalOpen}><i className="material-icons">border_clear</i> Clear Canvas</Button>
                </div>
                <div>
                    <Button variant="danger" className="buttons" onClick={handleErrorsModalOpen}><i className="material-icons">error</i> Show Errors</Button>
                </div>
            </div>

            <Canvas />

            <ToastModal />

        </Container>
    )
}
