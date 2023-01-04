import { query } from './db_helper.js';

/**
 * 풋살 경기장 정보를 질의하는 함수
 * @return {Promise<Array<RowDataPacket>>} 경기장 정보 레코드 배열
 */
const selectFutsalField = () =>
    query('SELECT * FROM futsal_field');

export { selectFutsalField };