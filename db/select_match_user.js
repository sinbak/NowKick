import { query } from './db_helper.js';

const selectMatchUsersByMatchId = matchId =>
    query(`SELECT * FROM match_user WHERE match_id = ?`, matchId);

export
{
    selectMatchUsersByMatchId
};