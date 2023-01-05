const userInfoValidator = (req, res, next) =>
{
    const userFields = [ 'name', 'stuid', 'department', 'grade', 'gender' ];
    const bodyFields = Object.keys(req.body);
    const errorPageUrl = '/user/error/400?fields=';

    // req.body에 user field가 모두 존재하는지 확인
    // req.body의 user 정보가 빈 문자열이 아닌지 확인
    const wrongFields = userFields.filter(fieldName => 
        bodyFields.includes(fieldName) === false || req.body[fieldName] === '');
    if(wrongFields.length !== 0)
        return res.redirect(`${errorPageUrl}${wrongFields.join(',')}`);
    
    // 학번이 8자리 양의 정수가 맞는지 확인(첫 자리는 1~9여야 '0000001' 꼴의 문자열을 거를 수 있음)
    if(/^[1-9][0-9]{7}$/.test(req.body.stuid) === false)
        return res.redirect(`${errorPageUrl}stuid`);
    
    // 학년
    if(req.body.grade.includes('+'))
        return res.redirect(`${errorPageUrl}grade`);
    
    const grade = Number(req.body.grade);
    if(grade < 1 || 10 < grade )
        return res.redirect(`${errorPageUrl}grade`);
    // 학년이 실수일 때
    if(String(grade) !== req.body.grade)
        return res.redirect(`${errorPageUrl}grade`);
    
    // 성별 검증
    if([ '남', '여' ].includes(req.body.gender) === false)
        return res.redirect(`${errorPageUrl}gender`);

    next();
};

export 
{
    userInfoValidator
};