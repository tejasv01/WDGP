import { Router } from 'express';
import { getAllSongs, searchSongs } from '../controllers/song.controller.js';

const router = Router();

router.get('/', getAllSongs);
router.get('/search', searchSongs);

export default router;
