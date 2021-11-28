/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import axios from 'axios';

const url = 'http://localhost:3001/api';

export const readAboutUs = () => axios.get(`${url}/AboutUs`);
export const readAutomatons = (userID) => axios.get(`${url}/automatons/${userID}`);
export const addAutomaton = (body) => axios.post(`${url}/automatons`, body);
export const updateAutomaton = (userID, autId, body) => axios.patch(`${url}/automatons/${userID}/${autId}`, body); /* SIN PROBAR */
export const deleteAutomaton = (userID, autId) => axios.delete(`${url}/automatons/${userID}/${autId}`);
export const run = (body) => axios.post(`${url}/run`, body);
export const compile = (body) => axios.post(`${url}/compile`, body);