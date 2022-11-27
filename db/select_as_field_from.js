import { query } from './db_helper.js';

/**
 * table에서 field 값을 가지는 레코드를 선택하여 그 중에 '첫 번째 요소'를 반환함
 * 
 * @param {string} table - nowkick 데이터베이스 내의 테이블명
 * @param {string} fieldName - 선택할 레코드의 field 명
 * @param {*} fieldValue - 선택할 레코드의 field 값(Mysql2 라이브러리가 지원하는 타입)
 */
const selectAsFieldFrom = async (table, fieldName, fieldValue) =>
{
    const result = await query("SELECT * FROM ?? WHERE ?? = ?", [table, fieldName, fieldValue]);

    return result[0];
};

export default selectAsFieldFrom;