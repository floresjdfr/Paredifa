/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import * as api from '../api/index.js';

export const split = (word = "", splitter = ",", replace = "") => {return word.split(splitter);}

export const compileRegex = async (re) => await api.compile({re});

