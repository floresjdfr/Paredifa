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