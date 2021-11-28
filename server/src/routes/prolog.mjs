import express from 'express';

import { compile, run } from '../controllers/prolog.mjs';

const router = express.Router();

router.post("/run", run);
router.post("/compile", compile);

export default router;