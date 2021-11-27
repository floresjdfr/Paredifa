import axios from 'axios';

const url = 'http://localhost:3001/api';

export const readAboutUs = () => axios.get(`${url}/AboutUs`);
export const readAutomatons = (userID) => axios.get(`${url}/automatons/${userID}`);
export const addAutomaton = (body) => axios.post(`${url}/automatons`, body);
export const updateAutomaton = (userID, autId, body) => axios.patch(`${url}/automatons/${userID}/${autId}`, body); /* SIN PROBAR */
export const deleteAutomaton = (userID, autId) => axios.delete(`${url}/automatons/${userID}/${autId}`);
export const run = (body) => axios.post(`${url}/run`, body);