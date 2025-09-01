import { Request, Response } from 'express';
import posts from '../data/posts.json' assert { type: 'json' };
import { Post } from '../types';

export const getPostById = (req: Request, res: Response) => {
  const post = (posts as Post[]).find(p => p.id === parseInt(req.params.postId));
  post ? res.json(post) : res.status(404).json({ error: 'Post not found' });
};

export const updatePost = (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const existing = (posts as Post[]).find(p => p.id === postId);

  if (!existing) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Simulated update
  const updatedPost: Post = {
    ...existing,
    ...req.body,
  };

  res.json({ message: 'Post updated (simulated)', post: updatedPost });
};
