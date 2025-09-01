import { Router } from 'express';
import { getAllUsers, getUserById, getUserPosts } from '../controllers/usersController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/:id/posts', getUserPosts);

export default router;