# NowKick
2022-2 CMD Project "바로차"

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

### __CMD or Powershell 기준__

프로젝트 디렉터리로 이동한 후(ex. cd nowkick)

Node.js 패키지 설치를 위해서

```
npm install
```

Mysql nowkick 계정 설정과 nowkic 데이터베이스 설정, 더미 데이터 저장을 위해

```
mysql -u root -p < db/init.sql
```

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