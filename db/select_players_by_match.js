import { query } from './db_helper.js';

/**
 * 전달받은 matchId에 해당하는 경기의 모든 참가자들의 정보를 가져옴(match_id는 제외)
 * 
 * @param {Number} matchId - 경기 id, 1 이상의 정수여야 함
 * @return {Promise<Array<RowDataPacket>>} 경기 참가자 정보 레코드 배열, query 결과가 존재하지 않을 때는 길이가 0
 */
const selectPlayersByMatch = matchId =>
    query(`SELECT u.uid as uid, name, stuid, department, grade, gender 
        FROM match_user as mu 
        JOIN user as u 
        ON mu.uid = u.uid 
        WHERE match_id = ?`
        , matchId);

export 
{
    selectPlayersByMatch
};