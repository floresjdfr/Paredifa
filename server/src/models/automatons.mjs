/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import mongoose from 'mongoose';

const automatonSchema = mongoose.Schema(
    {
        userID: String,
        dfa: [
            {
                automatonName: String,
                nodes: [
                    {
                        id: Number,
                        label: String,
                        start: Boolean,
                        final: Boolean,
                    },
                ],
                edges: [
                    {
                        label: String,
                        /* labelList: [{label : String}], */
                        from: Number,
                        arrows: String,
                        to: Number,
                    },
                ],
            },
        ],
    },
    { collection: 'automatons' },
)

const automatonModel = mongoose.model('automatonModel', automatonSchema);

export default automatonModel;