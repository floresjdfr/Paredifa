import { FETCH_ABOUTUS, CREATE, FETCH_AUTOMATONS, UPDATE, DELETE } from "../constants/actionTypes";

export default function appReducer(state, action) {

    switch (action.type) {
        case FETCH_ABOUTUS:
            return { ...state, aboutUs: action.payload };
        case CREATE:
            return;
        case FETCH_AUTOMATONS:
            return { ...state, automatons: action.payload };
        case UPDATE:
            return;
        case DELETE:
            return;
        default:
            return state;
    }

}