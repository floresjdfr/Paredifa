/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import express from 'express';

import { compile, run } from '../controllers/prolog.mjs';

const router = express.Router();

router.post("/run", run);
router.post("/compile", compile);

export default router;