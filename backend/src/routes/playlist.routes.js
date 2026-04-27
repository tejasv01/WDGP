import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createPlaylist, getUserPlaylists, addSongToPlaylist, getPlaylistById, deletePlaylist } from '../controllers/playlist.controller.js';

const router = Router();

router.use(protect);

router.get('/', getUserPlaylists);
router.get('/:id', getPlaylistById);
router.delete('/:id', deletePlaylist);
router.post('/', createPlaylist);
router.post('/:playlistId/songs/:songId', addSongToPlaylist);

export default router;
