-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: nowkick
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `futsal_field`
--

DROP TABLE IF EXISTS `futsal_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `futsal_field` (
  `row` tinyint unsigned NOT NULL,
  `column` tinyint unsigned NOT NULL,
  `location` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `futsal_field`
--

LOCK TABLES `futsal_field` WRITE;
/*!40000 ALTER TABLE `futsal_field` DISABLE KEYS */;
INSERT INTO `futsal_field` VALUES (38,18,'대전 대덕구 한남로 70 한남대학교');
/*!40000 ALTER TABLE `futsal_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `futsal_match`
--

DROP TABLE IF EXISTS `futsal_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `futsal_match` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `play_time` smallint unsigned NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `current_member` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `futsal_match`
--

LOCK TABLES `futsal_match` WRITE;
/*!40000 ALTER TABLE `futsal_match` DISABLE KEYS */;
INSERT INTO `futsal_match` VALUES (1,60,'2023-01-11 16:00:00','2023-01-11 17:00:00',10),(2,45,'2023-01-13 10:00:00','2023-01-13 10:45:00',4),(3,30,'2023-01-13 12:00:00','2023-01-13 12:30:00',8),(4,60,'2023-01-15 13:00:00','2023-01-15 14:00:00',5),(5,60,'2023-01-15 13:00:00','2023-01-13 14:00:00',1),(6,40,'2023-01-15 14:10:00','2023-01-13 14:50:00',1);
/*!40000 ALTER TABLE `futsal_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_user`
--

DROP TABLE IF EXISTS `match_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_user` (
  `match_id` int unsigned NOT NULL,
  `uid` int unsigned NOT NULL,
  `team` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_user`
--

LOCK TABLES `match_user` WRITE;
/*!40000 ALTER TABLE `match_user` DISABLE KEYS */;
INSERT INTO `match_user` VALUES (1,1,'B'),(1,3,'A'),(1,4,'B'),(1,7,'A'),(1,9,'B'),(1,10,'A'),(2,1,NULL),(2,3,NULL),(2,7,NULL),(2,9,NULL),(3,9,NULL),(3,1,NULL),(3,4,NULL),(3,3,NULL),(3,5,NULL),(3,6,NULL),(3,7,NULL),(3,8,NULL),(4,8,NULL),(4,3,NULL),(4,10,NULL),(4,4,NULL),(6,2,NULL),(1,2,'B'),(1,13,'B'),(1,14,'A'),(1,6,'A'),(4,9,NULL),(5,9,NULL);
/*!40000 ALTER TABLE `match_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `stuid` int unsigned NOT NULL,
  `department` varchar(60) NOT NULL,
  `grade` tinyint unsigned NOT NULL,
  `gender` varchar(4) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'신현수',20180210,'컴퓨터공학과',3,'남'),(2,'이상빈',20180203,'컴퓨터공학과',3,'남'),(3,'심미르',20210540,'빅데이터응용학과',2,'남'),(4,'서민하',20201964,'컴퓨터공학과',3,'여'),(5,'유은선',20220205,'전기전자공학과',1,'여'),(6,'장유준',20192310,'영어영문학과',2,'남'),(7,'박다빈',20180915,'영어영문학과',4,'여'),(8,'전원석',20220463,'사회복지학과',1,'남'),(9,'허치원',20179382,'정치ㆍ언론학과',4,'남'),(10,'오현석',20220521,'AI융합학과',1,'남'),(13,'김성수',20180213,'컴퓨터공학과',4,'남'),(14,'이지은',20220123,'중국경제통상학과',1,'여');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-11 15:52:13
