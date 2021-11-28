/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export default useGlobalContext;