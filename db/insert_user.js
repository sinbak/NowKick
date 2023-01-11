import '../lib/env_config.js'
import { query } from './db_helper.js';

/**
 * 전달받은 user 정보를 user table에 insert하는 함수
 * @param {Object} userRecord - insert할 유저 정보 레코드(uid 제외)
 */
const insertUser = ({ name, stuid, department, grade, gender }) =>
    query(
        'INSERT INTO USER(name, stuid, department, grade, gender) VALUES(?, ?, ?, ?, ?)',
        [ name, stuid, department, grade, gender ])

export
{
    insertUser
};