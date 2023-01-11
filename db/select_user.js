import selectAsFieldFrom from "./select_as_field_from.js";

const selectUserByUid = async (fieldValue) =>
    await selectAsFieldFrom('user', 'uid', fieldValue);

/**
 * 전달받은 stuid에 해당하는 user 정보를 가져오는 함수
 * 
 * @param {Number} stuid - 정보를 가져올 user의 학번 타입이 Number가 아닌 Number 형태의 string이어도 DB query는 정상적으로 수행됨
 * @return {Promise<RowDataPacket>} 해당 학번의 user 정보 레코드, 없으면 undefined
 */
const selectUserByStuid = async stuid =>
    await selectAsFieldFrom('user', 'stuid', stuid);

export 
{
    selectUserByUid,
    selectUserByStuid
};