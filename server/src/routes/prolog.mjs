import express from 'express';

import { runDFA } from '../controllers/prolog.mjs';

const router = express.Router();

router.post("/run", runAutomaton);

export default router;