/* nowkick 데이터베이스를 생성하고 테이블을 생성
   nowkick 데이터베이스 전용 계정(nowkick)을 생성하고 nowkick 데이터베이스에 대한 모든 권한 부여
   nowkick 계정 비밀번호는 1234, 개발 단계에서 편의성을 위해 사용하는 것
   실제 배포 단계에서는 비밀번호 변경이 필요하며 비밀 번호 설정은 sql 파일을 통해서 하기보다는 따로 설정해주는 것이 좋을 것 같음
   (github에 업로드 되면 안되므로)
*/

CREATE DATABASE `nowkick`;

USE `nowkick`;

CREATE TABLE `user` (
    `uid` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    `stuid` INT(13) UNSIGNED NOT NULL,
    `department` VARCHAR(60) NOT NULL,
    `grade` TINYINT UNSIGNED NOT NULL,
    `gender` VARCHAR(4) NOT NULL
);

CREATE TABLE `futsal_field` (
    `row` TINYINT UNSIGNED NOT NULL,
    `column` TINYINT UNSIGNED NOT NULL,
    `location` VARCHAR(300) NOT NULL 
);

CREATE TABLE `futsal_match` (
    `id` INT(15) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `play_time` SMALLINT UNSIGNED NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    `current_member` TINYINT NOT NULL
);

CREATE TABLE `match_user` (
    `match_id` INT(12) UNSIGNED NOT NULL,
    `uid` INT(12) UNSIGNED NOT NULL
);

CREATE USER 'nowkick'@'localhost' IDENTIFIED by '1234';
GRANT ALL PRIVILEGES ON nowkick.* TO 'nowkick'@'localhost';

/* nowkick_init.sql 파일 실행(nowkick 데이터베이스의 테이블 생성, 더미 데이터 저장) */
system mysql -u nowkick -p nowkick < nowkick_init.sql;