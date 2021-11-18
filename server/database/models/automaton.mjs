import mongoose from 'mongoose'

const { Schema } = mongoose

//Definicion del Schema del automata
const automatonSchema = new Schema(
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
            from: Number,
            to: Number,
          },
        ],
      },
    ],
  },
  { collection: 'automatons' },
)

const automatonModel = mongoose.model('automatonModel', automatonSchema)

export default automatonModel
