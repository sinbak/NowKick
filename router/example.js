import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.end('This is router response'));

export default router;