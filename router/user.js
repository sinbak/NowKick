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
                        user_profile_image, 
                        email_id: result.stuid.toString().slice(0,4) + 'xxxx' 
                    }));
        }
    }
  });

export default router