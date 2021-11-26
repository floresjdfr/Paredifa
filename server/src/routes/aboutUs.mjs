import express from 'express';

import { createAboutUs, getAboutUs } from '../controllers/aboutUs.mjs';

const router = express.Router();

router.post("/AboutUs", createAboutUs);
router.get("/AboutUs", getAboutUs);

export default router;