import { Router } from 'express';
import { getPostById, updatePost } from '../controllers/postsController';

const router = Router();

router.get('/:postId', getPostById);
router.post('/:postId/delete', updatePost); // Simulates update or delete

export default router;