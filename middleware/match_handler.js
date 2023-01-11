import { selectMatchUsersByMatchId } from '../db/select_match_user.js';

/**
 * 해당 경기 참가자 수가 정원에 도달하면 참가자의 팀을 배정해주는 핸들러
 */
const teamAssignHandler = async (req, _, next) =>
{
    try
    {
        const matchId = Number(req.params.match_id);
        const matchUserRecords = await selectMatchUsersByMatchId(matchId);

        if(matchUserRecords.length !== 10)
            return;

        // 각 참가자의 uid로 매핑
        const uids = matchUserRecords.map(record => record.uid);
        // team은 a, b의 두 팀이 존재
        const teams = [[], []];

        // 랜덤으로 uid 배열 요소 중 하나를 선택해 해당 uid를 가진 참가자를 a팀에 배정
        for(let i = 0; i < matchUserRecords.length / 2; i++)
        {
            const index = Math.floor(Math.random() * uids.length);
            const uid = uids.splice(index, 1);

            teams[0].push(matchUserRecords.find(record => record.uid === uid));
        }

        // 나머지는 b팀에 배정
        teams[1] = matchUserRecords.filter(record => uids.includes(record.uid));

        // db에 업데이트
        const updatePromise = [
            teams[0].map(matchUserRecord => updateMatchUserTeam(matchId, matchUserRecord.uid, 'A')),
            teams[1].map(matchUserRecord => updateMatchUserTeam(matchId, matchUserRecord.uid, 'B'))
        ];

        await Promise.all(updatePromise.flat());

        return;
    }
    catch(e)
    {
        console.log(e);
        next(e);
    }
};

export
{
    teamAssignHandler
};