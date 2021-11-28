/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import express from 'express';

import { createAboutUs, getAboutUs } from '../controllers/aboutUs.mjs';

const router = express.Router();

router.post("/AboutUs", createAboutUs);
router.get("/AboutUs", getAboutUs);

export default router;