import mysql from 'mysql2/promise';

const
{
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

// pool은 외부로 노출하지 않는다.
// pool은 해당 서비스 내에서 유일하게 현재 모듈에서만 존재한다.
const pool = mysql.createPool({
    host : 'localhost',
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME,
    port : 3306,
    enableKeepAlive : true
});

// 해당 함수를 통해서만 sql을 실행할 수 있고, 그 외의 곳에서는 pool에서 connection을 획득하고 query를 날릴 수 없다.
const query = async (sql, args) =>
{
    const con = await pool.getConnection();

    const [ result ] = await con.query(sql, args);
    con.release();

    return result;
}

const endPool = () => pool.end();

export
{
    query,
    endPool
};