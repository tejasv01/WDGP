import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getAllSongs, searchSongs, getRecommendations } from '../controllers/song.controller.js';

const router = Router();

router.get('/', getAllSongs);
router.get('/search', searchSongs);
router.get('/recommendations', protect, getRecommendations);

export default router;
