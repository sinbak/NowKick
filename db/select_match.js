import { query } from './db_helper.js';
import selectAsFieldFrom from './select_as_field_from.js';

/**
 * id에 해당하는 풋살 경기 정보를 질의하는 함수
 * @param {Number} id - 경기 id, 1 이상의 정수여야 함
 * @return {Promise<RowDataPacket>} id에 해당하는 경기 정보 레코드, id에 해당하는 경기가 없을 때는 undefined 반환
 */
const selectFutsalMatch = id => 
    selectAsFieldFrom('futsal_match', 'id', id);

/**
 * dateOfDay 날짜에 startDateTime 시각 이후 시작되는 풋살 경기 정보 레코드를 가져오는 함수
 * @param {String} dateOfDay - MySQL DATE 형식의 string
 * @param {Date | String} startDateTime - Date 객체이거나 DateTime 형식의 string
 * @return {Promise<Array<RowDataPacket>>} 해당 날짜, 해당 시각 이후에 시작하는 경기 정보 레코드 배열
 */
const selectDayFutsalMatch= (dateOfDay, startDateTime) =>
    query('SELECT * FROM futsal_match WHERE DATE(start_time) = ? AND start_time > ?',
        [
            dateOfDay,
            startDateTime
        ]);

export 
{ 
    selectFutsalMatch,
    selectDayFutsalMatch
};