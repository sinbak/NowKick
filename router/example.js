import express from 'express';
import selectAsFieldFrom from '../db/select_as_field_from.js';

const router = express.Router();

router.get('/', async (req, res) =>
{
    const user = await selectAsFieldFrom('user', 'uid', 3);

    res.json(user);
});

export default router;