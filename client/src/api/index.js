import axios from 'axios';

const url = 'http://localhost:3001/api';

export const readAboutUs = () => axios.get(`${url}/AboutUs`);
export const readAutomatons = (userID) => axios.get(`${url}/automatons/${userID}`);

/* INCOMPLETOS */
export const addAutomaton = (newAutomaton) => axios.post(url, newAutomaton);
export const updateAutomaton = () => axios.patch();
export const deleteAutomaton = () => axios.delete();