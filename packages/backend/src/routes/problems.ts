import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Problems are served statically from the frontend.' });
});

export default router;
