import selectAsFieldFrom from './select_as_field_from.js';

/**
 * id에 해당하는 풋살 경기 정보를 질의하는 함수
 * @param {Number} id - 경기 id, 1 이상의 정수여야 함
 * @return {Promise<RowDataPacket>} id에 해당하는 경기 정보 레코드, id에 해당하는 경기가 없을 때는 undefined 반환
 */
const selectFutsalMatch = id => 
    selectAsFieldFrom('futsal_match', 'id', id);

export { selectFutsalMatch };