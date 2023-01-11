import { query } from './db_helper.js';

/**
 * match_user 테이블의 matchId, uid 필드 값이 주어진 것과 일치하는 레코드의 team 필드 값을 teamName으로 갱신한다
 * 
 * @param {Number} matchId - 경기 id, 1 이상의 정수
 * @param {Number} uid - 유저 id, 1 이상의 정수
 * @param {String} teamName - 할당할 팀 명
 * @return {Promise<Array<RowDataPacket>>}
 */
const updateMatchUserTeam = (matchId, uid, teamName) =>
    query(
        `UPDATE match_user SET team = ? WHERE matchId = ? and uid = ?`,
        [ teamName, matchId, uid ]
    );

export
{
    updateMatchUserTeam
};