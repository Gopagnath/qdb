import { Request, Response } from 'express';
import users from '../data/users.json' assert { type: 'json' };
import posts from '../data/posts.json' assert { type: 'json' };
import { User, Post } from '../types';

export const getAllUsers = (req: Request, res: Response) => {
  res.json(users as User[]);
};

export const getUserById = (req: Request, res: Response) => {
  const user = (users as User[]).find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

export const getUserPosts = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const userPosts = (posts as Post[]).filter(p => p.userId === userId);
  res.json(userPosts);
};