// test할 ejs 파일의 내용 전체를 복사 붙여넣기 하세요.
// 단, body 내의 내용만
const testHtml = 'test';

// 객체에 렌더링할 때 필요한 데이터를 넣으세요.
const data = {};

const renderedPage = ejs.render(testHtml, data);

document.body.innerHTML += renderedPage;