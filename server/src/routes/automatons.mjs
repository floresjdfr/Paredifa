/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import express from 'express';

import { addAutomaton, getAutomatons, readAutomatons, readAutomaton, updateAutomaton, deleteAutomaton } from '../controllers/automatons.mjs';

const router = express.Router();

router.post("/automatons", addAutomaton);
router.get("/automatons/:userID", readAutomatons);
router.get("/automatons/:userID/:autName", readAutomaton);
router.patch("/automatons/:userID/:autId", updateAutomaton);
router.delete("/automatons/:userID/:autId", deleteAutomaton);

router.get("/automatons", getAutomatons); //-----------REQUEST DE PRUEBA

export default router;