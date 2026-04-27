import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getLikedSongs, toggleLike } from '../controllers/likes.controller.js';

const router = Router();

router.use(protect);

router.get('/', getLikedSongs);
router.post('/:songId', toggleLike);

export default router;
