import express from 'express';

import { addAutomaton, getAutomatons, readAutomatons, readAutomaton, updateAutomaton, deleteAutomaton } from '../controllers/automatons.mjs';

const router = express.Router();

router.post("/automatons", addAutomaton);
router.get("/automatons/:userID", readAutomatons);
router.get("/automatons/:userID/:autName", readAutomaton);
router.patch("/automatons/:userID/:autName", updateAutomaton);
router.delete("/automatons/:userID/:autName", deleteAutomaton);

router.get("/automatons", getAutomatons); //-----------REQUEST DE PRUEBA

export default router;