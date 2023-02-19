# NowKick
2022-2 CMD Project "바로차"
# **팀원 소개** 
   | Category | Position | Work | Profile |  
   | :----- | :----- | :----- | :---- |
   | SW Engineer | **Leader** | `Backend` | [sinbak's Github](https://github.com/sinbak) |  
   | SW Engineer | **Main develop** | `Backend` | [ShangBinLee's Github](https://github.com/ShangBinLee) |  
   | SW Engineer | Mate | `Frontend` | [Byunjihun's Github](https://github.com/Byunjihun) |
   | SW Engineer | Mate | `Frontend` | [jangjuntae's Github](https://github.com/jangjuntae) |  

# 요구사항

- Node.js 16.13.2 버전 이상
- mysql 8.0.28 버전 이상

# Basic Installation

### __gitbash 기준__

프로젝트를 설치할 디렉터리로 이동한 후(ex. cd C:/CMD/project)

for HTTPS...
```
git clone https://github.com/Team-CMD/NowKick.git
```

or SSH...
```
git clone git@github.com:Team-CMD/NowKick.git
```

### __CMD or Powershell 기준(관리자 권한으로 실행)__

프로젝트 루트 디렉터리 기준 상대경로 __/db__ 로 이동 후

Node.js 패키지 설치를 위해서

```
npm install
```

Mysql nowkick 계정 설정과 nowkic 데이터베이스 설정을 위해

```
mysql -u root -p < init.sql
```

위의 과정이 정상적으로 완료된 후

```
Enter Password :
```

가 출력되면 더미 데이터 저장을 위해

```
1234
```

입력 후 아무런 에러 메시지 없이 줄바꿈 후 터미널 커서가 정상적으로 출력되면 성공

# Start Server

### __CMD or Powershell 기준__

```
npm run dev-start
```

이후 정상적으로 실행 시

```
> nowkick@0.0.0 dev-start
> nodemon --watch * --ignore node_modules --exec npm start

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): **\*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `npm start`

> nowkick@0.0.0 start
> node main.js
```

메시지가 출력되며 browser 혹은 postman 등을 통해 http://localhost:3000 으로 접속 가능
