import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  // Topics are served from frontend data files; this is a health endpoint
  res.json({ message: 'Topics are served statically from the frontend.' });
});

export default router;
