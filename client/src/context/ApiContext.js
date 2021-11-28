/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import React, { createContext, useReducer } from 'react';
import { /* CREATE,  */FETCH_ALL/* , UPDATE, DELETE  */} from "../constants/actionTypes";

import appReducer from './AppReducer';

import * as api from '../api/index.js';

const initialState = {
    automatons: []
}

export const ApiContext = createContext(initialState);

const ApiProvider = ({ ...props }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    const readAutomatons = () => async () => {
        try {
            const { data } = await api.readAutomatons('116830152');

            dispatch({ type: FETCH_ALL, payload: data })
        } catch (error) {
            console.log(error.message);
        }
    }

/*     const addAutomaton = () => {

    }

    const updateAutomaton = () => {

    }

    const deleteAutomaton = () => {

    } */

    const value = {
        automatons: state.automatons,
        readAutomatons,
    }

    return <ApiContext.Provider {...props} value={value} />;
}

export default ApiProvider;