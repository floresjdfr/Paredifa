import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import automatonRoutes from './routes/automatons.mjs'
import aboutUsRoutes from './routes/aboutUs.mjs'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;


// middleware
app.use('/api', aboutUsRoutes);
app.use('/api', automatonRoutes);

// routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// mongodb conecction
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(`Failed to connect to MongoDB Atlas. Error: ${error.message}`))

app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));