/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import aboutUsModel from "../models/aboutUs.mjs"

export const createAboutUs = (req, res) => {
    const aboutUs = aboutUsModel(req.body);

    aboutUs
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(409).json({ message: error.message }));
}

export const getAboutUs = (req, res) => {
    aboutUsModel
        .find()
        .then((data) => res.status(200).json(data.length != 0 ? data[0] : null))
        .catch((error) => res.status(404).json({ message: error.message }))
}