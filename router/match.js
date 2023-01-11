import express from 'express';
import { selectFutsalMatch, selectDayFutsalMatch } from '../db/select_match.js';
import { selectFutsalField } from '../db/select_field.js';
import { selectPlayersByMatch } from '../db/select_players_by_match.js';
import selectAsFieldFrom from '../db/select_as_field_from.js';
import { user_profile_image } from '../lib/user_profile.js';
import { getHM, getLongDateString } from '../lib/date.js';
import { query } from '../db/db_helper.js';
import { userInfoValidator, conditionalRegisterUser } from '../middleware/user_validator.js';
import { teamAssignHandler } from '../middleware/match_handler.js';

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
                    players,
                    apply_link : `/match/${matchId}/player`
                });
        }
        catch(e)
        {
            console.log(e);
            return res.status(500).send('500 Internal Server Error Occured!');
        }
    });

router.post('/:match_id/player', 
    userInfoValidator,
    conditionalRegisterUser,
    async (req, res, next) =>{
    const match_current = (await selectAsFieldFrom('futsal_match', 'id', req.params.match_id)).current_member
    if(match_current === 10)  { //참가자가 10인지 검증
        return res.status(409).send('정원이 다 찼습니다. 다른 경기 신청바랍니다.')
    }
    else {
        const confirm_uid = (await selectAsFieldFrom('user', 'stuid', req.body.stuid)).uid // 유저의 stuid를 통해 uid 가져오기
        if ((await query('SELECT * FROM match_user WHERE uid = ? and match_id = ?',[confirm_uid, req.params.match_id])).length !== 0){
            return res.redirect(`/match/${req.params.match_id}/player/${confirm_uid}`)
        }
        await query('INSERT INTO match_user(uid, match_id) VALUES (?, ?)',[confirm_uid, req.params.match_id]) //10명 미달로 인한 인원 추가
        await query('UPDATE futsal_match SET current_member = ? WHERE id = ?', [match_current + 1, req.params.match_id])
        res.redirect(`/match/${req.params.match_id}/player/${confirm_uid}`)
        return next();
    }},
    teamAssignHandler
)

router.get('/:match_id/player/:uid', async function(req, res) {
    if(Number(req.params.match_id) >= 1 && Number(req.params.uid) >= 1){
        const save_match = await query('SELECT * FROM match_user WHERE match_id = ? and uid = ?', [req.params.match_id, req.params.uid])
        if(save_match.length === 1) {
            if( save_match[0].team === null) {
                res.send('본 유저는 해당 경기 참가자입니다. 아직 팀 배정이 되지 않았습니다')
            }
            else {
                res.send(`본 유저는 해당 경기 참가자입니다. 팀은 ${save_match[0].team}입니다.`)
            }
        }
        else {
            res.send('본 유저는 해당 경기 참가자가 아닙니다')
        }
    }
    else{
        return res.status(404).send('404 Not Found');
    }
})

/**
 * page일 뒤에 예정된 경기 목록 페이지를 응답하는 라우터
 */
router.get('/list/:page',
    (req, res, next) =>
    {
        // page 파라미터가 0 이상의 정수 문자열인지 검증
        if(req.params.page !== '0' && /^[1-9][0-9]*$/.test(req.params.page) === false)
            return res.status(404).send('404 Not Found');
        
        next();
    },
    async (req, res) =>
    {
        const page = Number(req.params.page);
        const todayDate = new Date();
        const pageDate = new Date();

        // page가 1 이상이면 pageDate를 오늘로부터 page일 뒤의 날짜와 시작 시각으로 설정 
        if(page > 0)
        {
            pageDate.setDate(todayDate.getDate() + page);
            pageDate.setHours(0, 0, 0, 0);
        }

        try
        {
            const [ intendedMatchRecords, [ fieldRecord ] ] = await Promise.all(
                [
                    selectDayFutsalMatch(pageDate.toLocaleDateString('ko-KR').replaceAll(' ', ''), pageDate),
                    selectFutsalField()
                ]);

            if(page !== 0 && intendedMatchRecords.length === 0)
                return res.status(404).send('404 Not Found');
            
            const diffs = Array(7).fill(0).map((_, i) => i);
            const match_list_links = diffs.map(diff => `/match/list/${diff}`);
            const days = diffs.map(diff => todayDate.getDate() + diff);
            const match_info_summaries = intendedMatchRecords
                                         .map(match =>
                                            ({
                                                start_time : getHM(match.start_time),
                                                location : fieldRecord.location,
                                                match_info_link : `/match/${match.id}`
                                            }));

            return res.render('main.ejs', { 
                match_list_info : { 
                    match_list_links, 
                    days, 
                    match_info_summaries 
                }
            });
        }
        catch(e)
        {
            console.log(e);
            return res.status(500).send('500 Internal Server Error Occured!');
        }
    });

export default router;