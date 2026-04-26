import { Router } from 'express';
import { getAllSongs } from '../controllers/song.controller.js';

const router = Router();

router.get('/', getAllSongs);

export default router;
