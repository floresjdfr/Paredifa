import mongoose from 'mongoose'

const connectionString =
  'mongodb+srv://prueba:prueba@cluster0.yhhpr.mongodb.net/automaton?retryWrites=true&w=majority'

export default async function connectMongoose() {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("Base de datos conectada"));

  if (mongoose.connection.readyState != 1) throw "No se pudo conectar a la base de datos";
}

export const disconnectMongoose =  () => {
  if (mongoose.connection.readyState == 1) mongoose.connection.close()
}

