import React, { createContext, useState, useReducer } from 'react';
import html2canvas from 'html2canvas';
import { FETCH_ABOUTUS, CREATE, FETCH_AUTOMATONS, UPDATE, DELETE } from "../constants/actionTypes";

import appReducer from './AppReducer';

import * as api from '../api/index.js';

import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
    automatons: [],
    aboutUs: {}
}

export const GlobalContext = createContext(initialState);

const GlobalProvider = ({ ...props }) => {
    const { user, isAuthenticated } = useAuth0();
    const [dfaModalShow, setDfaModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [aboutModalShow, setAboutModalShow] = useState(false);
    const [instructionsModalShow, setInstructionsModalShow] = useState(false);
    const [errorsModalShow, setErrorsModalShow] = useState(false);


    const [vocabularyTemp, setVocabularyTemp] = useState('');
    const [vocabularyArray, setVocabularyArray] = useState([]);

    const [canvas, setCanvas] = useState({ graph: {} });

    const [currentAutomaton, setCurrentAutomaton] = useState('');
    const [path, setPath] = useState('');

    const [editTransitionModalShow, setEditTransitionModalShow] = useState(false);

    const [mode, setMode] = useState('DFA');

    const [toastModal, setToastModal] = useState({ message: '', show: false });

    const [errors, setErrors] = useState([]);

    // https://www.npmjs.com/package/html2canvas
    const saveCanvasPNG = e => {
        let { network } = canvas;
        let nodes = network.body.data.nodes.get();
        let edges = network.body.data.edges.get();

        if (nodes.length !== 0 && edges.length !== 0) {
            html2canvas(document.querySelector("#canvas")).then(canvas => {
                let img = canvas.toDataURL("image/png");
                let link = document.createElement('a');
                link.download = currentAutomaton.automatonName + '.png';
                link.href = img;
                link.click();
            });
        } else {
            setToastModal({ message: 'Please add an Automaton on Canvas to Save the Image!', show: true });
        }
    }

    const saveAutomaton = () => {
        if (isAuthenticated) {
            let { network } = canvas;
            let nodes = network.body.data.nodes.get();
            let edges = network.body.data.edges.get();

            if (nodes.length !== 0 && edges.length !== 0) {
                if (state.automatons.find(automaton => automaton._id === currentAutomaton)) {
                    deleteAutomaton(currentAutomaton);
                }

                const newAutomaton =
                {
                    userID: user?.email,
                    newAutomaton:
                    {
                        automatonName: 'prueba acc',
                        nodes: nodes,
                        edges: edges
                    }
                }

                addAutomaton(newAutomaton);
                network.body.data.nodes.clear();
                network.body.data.edges.clear();
                setToastModal({ message: 'Automaton Stored Correctly!!', show: true });
            } else {
                setToastModal({ message: 'Please create or display an Automaton to save on the database!', show: true });
            }
        } else {
            setToastModal({ message: 'Please login to save the Automaton!', show: true });
        }
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    const readAboutUs = async () => {
        try {
            const { data } = await api.readAboutUs();

            dispatch({ type: FETCH_ABOUTUS, payload: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    const readAutomatons = async () => {
        try {
            const { data } = await api.readAutomatons(user?.email);

            dispatch({ type: FETCH_AUTOMATONS, payload: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    const addAutomaton = async (newAutomaton) => {
        try {
            const { data } = await api.addAutomaton(newAutomaton);

            dispatch({ type: CREATE, payload: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateAutomaton = async () => {
        try {
            const { data } = await api.updateAutomaton(user?.email);

            dispatch({ type: UPDATE, payload: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteAutomaton = async (autId) => {
        try {
            const { data } = await api.deleteAutomaton(user?.email, autId);

            dispatch({ type: DELETE, payload: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    const value = {
        dfaModalShow,
        setDfaModalShow,
        confirmModalShow,
        setConfirmModalShow,
        aboutModalShow,
        setAboutModalShow,
        instructionsModalShow,
        setInstructionsModalShow,
        editTransitionModalShow,
        setEditTransitionModalShow,
        saveCanvasPNG,
        errorsModalShow,
        setErrorsModalShow,
        canvas,
        setCanvas,
        currentAutomaton,
        setCurrentAutomaton,
        automatons: state.automatons,
        aboutUs: state.aboutUs,
        readAboutUs,
        readAutomatons,
        addAutomaton,
        updateAutomaton,
        deleteAutomaton,
        mode,
        setMode,
        saveAutomaton,
        toastModal,
        setToastModal,
        path,
        setPath,
        errors,
        setErrors,
        vocabularyTemp,
        setVocabularyTemp,
        vocabularyArray,
        setVocabularyArray
    }

    return <GlobalContext.Provider {...props} value={value} />;
}

export default GlobalProvider;