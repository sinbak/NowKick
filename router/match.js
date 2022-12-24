import express from 'express';

const router = express.Router();

router.get('/:matchId', (req, res) => res.end(req.params.matchId + ' confirmed'));

export default router;