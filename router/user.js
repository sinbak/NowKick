import express from 'express';
import {selectUserByUid} from '../db/select_user.js';
import {user_profile_image} from '../lib/user_profile.js';

const router = express.Router();

router.get('/:uid', async function (req, res) {
    const num = Number(req.params.uid);
    if(Number.isNaN(num) === true ) {
        res.status(400).send('400 Bad Request'); //추후에 에러코드 수정
    } //숫자인지 판별
    else if(num < 1){ 
          res.status(400).send('400 Bad Request');
      } //1이상의 숫자인지 판별
    else{
        const result = await selectUserByUid(num);
        if(result === undefined){ //유저 데이터가 존재하지 않는 경우
            res.status(404).send('404 Not Found');
        }
        else{
            res.render('user_info.ejs', 
                Object.assign(result, 
                    {   
                        stuid : result.stuid.toString().slice(2, 4),
                        user_profile_image, 
                        email_id: result.stuid.toString().slice(0,4) + 'xxxx' 
                    }));
        }
    }
  });

/**
 * req.query에 fields 속성이 존재하는지 검증하고
 * fields 값이 유효한 유저 정보 필드명을 쉼표로 구분하여 나열한 문자열인지 검증한다
 * 검증에 성공하면 fields 값에 명시된 필드명(한글명으로 변환)을 포함하는 에러 페이지로 응답한다
 * 실패하면 400 Bad Request를 응답한다
 */
router.get('/error/400', (req, res, next) =>
{
    const userFields = [ 'name', 'stuid', 'department', 'grade', 'gender' ];
    const userFieldMap = {
        name : '이름',
        stuid : '학번',
        department : '학과',
        grade : '학년',
        gender : '성별'
    };

    if(req.query.fields === undefined || req.query.fields === '')
        return res.status(400).send('400 잘못된 경로입니다');

    const fieldList = req.query.fields.split(',');
                 
    
    if(fieldList.every(v => userFields.includes(v)) === false)
        return res.status(400).send('400 잘못된 경로입니다');

    return res.send(`${fieldList.map(v => userFieldMap[v]).join(', ')} 필드가 잘못 입력되었습니다`);
});

export default router