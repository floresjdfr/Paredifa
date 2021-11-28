/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import mongoose from 'mongoose';

const aboutUsSchema = mongoose.Schema(
    {
        university: String,
        school: String,
        course: String,
        professor: String,
        cycle: String,
        authors: [
            {
                id: String,
                name: String,
                hour: String,
            },
        ],
        group: String,
        version: String,
    },
    { collection: 'aboutUs' },
)

const aboutUsModel = mongoose.model('aboutUsModel', aboutUsSchema);

export default aboutUsModel;