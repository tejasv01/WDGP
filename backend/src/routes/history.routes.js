import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { logHistory, getHistory } from '../controllers/history.controller.js';

const router = Router();

router.use(protect); // All history routes require auth

router.post('/', logHistory);
router.get('/', getHistory);

export default router;
