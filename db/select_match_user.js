import selectAsFieldFrom from './select_as_field_from.js';

const selectMatchUsersByMatchId = matchId =>
    selectAsFieldFrom('match_user', 'match_id', matchId);

export
{
    selectMatchUsersByMatchId
};