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
    const { user } = useAuth0();
    const [dfaModalShow, setDfaModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [aboutModalShow, setAboutModalShow] = useState(false);
    const [instructionsModalShow, setInstructionsModalShow] = useState(false);
    const [errorsModalShow, setErrorsModalShow] = useState(false);

    const [canvas, setCanvas] = useState({ graph: {} });

    const [currentAutomaton, setCurrentAutomaton] = useState({ nodes: [], edges: [] });

    const [editTransitionModalShow, setEditTransitionModalShow] = useState(false);

    const [mode, setMode] = useState('DFA');

    // https://www.npmjs.com/package/html2canvas
    const saveCanvasPNG = e => {
        html2canvas(document.querySelector("#canvas")).then(canvas => {
            let img = canvas.toDataURL("image/png");
            let link = document.createElement('a');
            link.download = currentAutomaton.automatonName + '.png';
            link.href = img;
            link.click();
        });
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

    const addAutomaton = async () => {
        try {
            let newAutomaton;
            const { data } = await api.addAutomaton(newAutomaton); // ARREGLAR

            dispatch({ type: CREATE, payload: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateAutomaton = async () => {
        try {
            const { data } = await api.updateAutomaton(); // ARREGLAR

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
    }

    return <GlobalContext.Provider {...props} value={value} />;
}

export default GlobalProvider;