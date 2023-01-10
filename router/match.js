import express from 'express';
import { selectFutsalMatch } from '../db/select_match.js';
import { selectFutsalField } from '../db/select_field.js';
import { selectPlayersByMatch } from '../db/select_players_by_match.js';
import selectAsFieldFrom from '../db/select_as_field_from.js';
import { user_profile_image } from '../lib/user_profile.js';
import { getHM, getLongDateString } from '../lib/date.js';
import { query } from '../db/db_helper.js';

const router = express.Router();

router.get('/:matchId',
    (req, res, next) =>                       // matchId의 유효성 검사(1 이상의 정수)
    {
        const matchId = Number(req.params.matchId);
        const statusDefaultText = '400 Bad Request';

        // matchId가 정수인지 검사
        // 파라미터 matchId가 정수 형태의 문자열인지 검사
        if(!Number.isSafeInteger(matchId) || req.params.matchId.indexOf('.') !== -1)
            return res.status(400).send(statusDefaultText + ', matchId is Unsigned Int');
        if(matchId < 1)
            return res.status(400).send(statusDefaultText + ', matchId is over 1');
        next();
    },
    async (req, res) =>
    {
        const matchId = Number(req.params.matchId);
        const statusDefaultText = { notFound : '404 Not Found' };

        try
        {
            const matchRecord = await selectFutsalMatch(matchId);

            // matchId에 해당하는 match가 존재하지 않을 때의 예외 처리
            if(matchRecord === undefined)
                return res.status(404).send(statusDefaultText.notFound + ', match Not Found');

            const [ [ fieldRecord ], playerRecords ] = await Promise.all([ selectFutsalField(), selectPlayersByMatch(matchId) ]);
            
            // stuid를 입학 년도에 대한 학번으로 변경
            // user_info_link, user_profile_image 정보 추가
            const players =  playerRecords
                            .map(player => 
                                Object.assign(
                                    player, 
                                    {
                                        stuid : String(player.stuid).slice(2, 4),
                                        user_info_link : `/user/${player.uid}`, 
                                        user_profile_image 
                                    }));
            
            // 템플릿 렌더링
            return res.render('match_info.ejs', 
                {
                    match_date : getLongDateString(matchRecord.start_time, 'ko-KR'),
                    play_time : matchRecord.play_time,
                    start_time : getHM(matchRecord.start_time, 'ko-KR'),
                    end_time : getHM(matchRecord.end_time, 'ko-KR'),
                    location : fieldRecord.location,
                    current_member : matchRecord.current_member,
                    players
                });
        }
        catch(e)
        {
            console.log(e);
            return res.status(500).send('500 Internal Server Error Occured!');
        }
    });

router.post('/match/:match_id/player', async (req, res) =>{
    const match_current = (await selectAsFieldFrom('futsal_match', 'id', req.params.match_id)).current_member
    if(match_current === 10)  { //참가자가 10인지 검증
        return res.status(409).send('정원이 다 찼습니다. 다른 경기 신청바랍니다.')
    }
    else {
        const confirm_uid = (await selectAsFieldFrom('user', 'stuid', res.body.stuid)).uid // 유저의 stuid를 통해 uid 가져오기
        if ((await query('SELECT * FROM match_user WHERE uid = ? and match_id = ?',[confirm_uid, req.params.match_id])).length === 0){
            return res.redirect(`/match/${req.params.match_id}/player/${confirm_uid}`)
        }
        query('INSERT INTO match_user(uid, match_id) VALUES (?, ?)',[confirm_uid, req.params.match_id]) //10명 미달로 인한 인원 추가
        query('UPDATE futsal_match SET current_member = ? WHERE id = ?', [match_current + 1, req.params.matach_id])
        res.redirect(`/match/${req.params.match_id}/player/${confirm_uid}`)
    }
})

export default router;