import express from 'express';
import selectAsFieldFrom from '../db/select_as_field_from.js';

const router = express.Router();

router.get('/', (req, res) => res.end('This is router response'));
router.get('/user', (req, res) => 
    selectAsFieldFrom('user', 'department', '컴퓨터공학과')
    .then(result => res.json(result)));
export default router;