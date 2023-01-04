/**
 * 주어진 date의 시각 : 분 형식의 LocalTimeString을 반환하는 함수
 * @param {Date} date - Date 객체
 * @param {String|Array<String>} locales - locale 정보를 담고 있는 string 혹은 string 배열
 * @return {String} 주어진 date의 LocalTimeString
 */
const getHM = (date, locales) =>
    date.toLocaleTimeString(locales, { hour : 'numeric', minute : 'numeric', hour12 : false });

/**
 * 주어진 date의 년월일 요일을 나타내는 LocalDateString을 반환하는 함수
 * @param {Date} date - Date 객체
 * @param {String|Array<String>} locales - locale 정보를 담고 있는 string 혹은 string 배열
 * @return {String} 주어진 date의 LocalDateString
 */
const getLongDateString = (date, locales) =>
    date.toLocaleDateString(locales, { year : 'numeric', month : 'long', day : 'numeric', weekday : 'long' });

export 
{
    getHM,
    getLongDateString
};