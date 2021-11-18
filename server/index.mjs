import express from 'express';
import connectMongoose from './database/databaseConnection.mjs';
import cors from 'cors';
import automatonsRouter from './routes/automatonsRoute.mjs';

await connectMongoose();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/automatons', automatonsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})