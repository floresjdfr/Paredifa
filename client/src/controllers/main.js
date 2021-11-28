import * as api from '../api/index.js';

export const split = (word = "", splitter = ",", replace = "") => {return word.split(splitter);}

export const compileRegex = async (re) => await api.compile({re});

