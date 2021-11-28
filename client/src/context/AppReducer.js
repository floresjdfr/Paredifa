/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { FETCH_ABOUTUS, CREATE, FETCH_AUTOMATONS, UPDATE, DELETE } from "../constants/actionTypes";

export default function appReducer(state, action) {

    switch (action.type) {
        case FETCH_ABOUTUS:
            return { ...state, aboutUs: action.payload };
        case FETCH_AUTOMATONS:
            return { ...state, automatons: action.payload };
        case CREATE:
            return { ...state, automatons: [...state.automatons, action.payload] };
        case UPDATE: //REVISAR
            const updatedAutomaton = action.payload;

            const updatedAutomatons = state.automatons.map((automaton) =>
                automaton._id === updatedAutomaton._id ? updatedAutomaton : automaton
            );

            return { ...state, automatons: updatedAutomatons };
        case DELETE:
            return {
                ...state,
                automatons: state.automatons
                    .filter((automaton) => automaton._id !== action.payload)
            };
        default:
            return state;
    }

}