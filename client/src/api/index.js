import axios from 'axios';

const url = 'http://localhost:3001/api';

export const readAboutUs = () => axios.get(`${url}/AboutUs`);
export const readAutomatons = (userID) => axios.get(`${url}/automatons/${userID}`);

/* SIN PROBAR */
export const addAutomaton = (body) => axios.post(`${url}/automatons`, body);
export const updateAutomaton = (userID, autName, body) => axios.patch(`${url}/automatons/${userID}/${autName}`, body);
export const deleteAutomaton = (userID, autName) => axios.delete(`${url}/automatons/${userID}/${autName}`);