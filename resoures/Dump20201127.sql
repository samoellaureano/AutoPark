CREATE DATABASE  IF NOT EXISTS `autopark` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `autopark`;
-- MySQL dump 10.16  Distrib 10.1.36-MariaDB, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: autopark
-- ------------------------------------------------------
-- Server version	10.1.36-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `checkins`
--

DROP TABLE IF EXISTS `checkins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataHora` datetime NOT NULL,
  `estacionamento_id` int(11) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `veiculo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5B9B35E64B4FF41B` (`veiculo_id`),
  KEY `FK5B9B35E6A1988FD9` (`estacionamento_id`),
  KEY `FK5B9B35E6B4DEA83B` (`cliente_id`),
  CONSTRAINT `FK5B9B35E64B4FF41B` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculos` (`id`),
  CONSTRAINT `FK5B9B35E6A1988FD9` FOREIGN KEY (`estacionamento_id`) REFERENCES `estacionamentos` (`id`),
  CONSTRAINT `FK5B9B35E6B4DEA83B` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkins`
--

LOCK TABLES `checkins` WRITE;
/*!40000 ALTER TABLE `checkins` DISABLE KEYS */;
INSERT INTO `checkins` VALUES (8,'2020-11-22 14:18:12',1,1,1),(9,'2020-11-23 13:04:05',1,1,1),(10,'2020-11-24 18:40:38',1,1,1),(11,'2020-11-24 18:41:24',1,1,1),(12,'2020-11-24 18:59:34',1,1,1),(13,'2020-11-24 19:00:58',1,1,1),(14,'2020-11-24 19:03:17',1,1,1),(25,'2020-11-25 12:40:27',1,1,5),(26,'2020-11-25 12:44:40',1,1,5),(27,'2020-11-25 12:47:18',1,1,5),(28,'2020-11-25 12:52:02',1,1,5),(29,'2020-11-25 13:09:19',1,1,5),(30,'2020-11-25 14:16:02',1,1,5),(31,'2020-11-26 10:39:27',1,1,1),(32,'2020-11-26 10:59:47',1,1,1),(33,'2020-11-26 12:34:02',1,1,1),(34,'2020-11-26 12:40:30',1,1,1),(35,'2020-11-26 12:48:46',1,1,1),(36,'2020-11-26 13:04:00',1,1,1),(37,'2020-11-26 13:06:18',1,1,1),(38,'2020-11-26 13:11:24',1,1,1),(39,'2020-11-26 13:15:52',1,1,1);
/*!40000 ALTER TABLE `checkins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkouts`
--

DROP TABLE IF EXISTS `checkouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataHora` datetime NOT NULL,
  `valor` double NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `veiculo_id` int(11) DEFAULT NULL,
  `estacionamento_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK17CE5BED4B4FF41B` (`veiculo_id`),
  KEY `FK17CE5BEDA1988FD9` (`estacionamento_id`),
  KEY `FK17CE5BEDB4DEA83B` (`cliente_id`),
  CONSTRAINT `FK17CE5BED4B4FF41B` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculos` (`id`),
  CONSTRAINT `FK17CE5BEDA1988FD9` FOREIGN KEY (`estacionamento_id`) REFERENCES `estacionamentos` (`id`),
  CONSTRAINT `FK17CE5BEDB4DEA83B` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkouts`
--

LOCK TABLES `checkouts` WRITE;
/*!40000 ALTER TABLE `checkouts` DISABLE KEYS */;
INSERT INTO `checkouts` VALUES (8,'2020-11-22 14:50:05',0,1,1,1),(9,'2020-11-23 13:04:15',30,1,1,1),(10,'2020-11-24 18:41:16',0,1,1,1),(11,'2020-11-24 18:57:52',18.5,1,1,1),(12,'2020-11-24 19:00:53',0,1,1,1),(13,'2020-11-24 19:01:02',0,1,1,1),(14,'2020-11-24 19:03:27',0,1,1,1),(15,'2020-11-24 20:04:43',0,1,1,1),(16,'2020-11-25 12:29:42',0,1,5,1),(17,'2020-11-25 12:35:01',0,1,5,1),(18,'2020-11-25 12:43:46',0,1,5,1),(19,'2020-11-25 12:44:53',0,1,5,1),(20,'2020-11-25 12:48:38',0,1,5,1),(21,'2020-11-25 13:05:39',0,1,5,1),(22,'2020-11-25 13:21:22',0,1,5,1),(23,'2020-11-26 09:52:50',0,1,5,1),(24,'2020-11-26 10:39:34',23.5,1,1,1),(29,'2020-11-26 12:29:04',0,1,1,1),(30,'2020-11-26 12:34:29',0,1,1,1),(31,'2020-11-26 12:40:52',0,1,1,1),(32,'2020-11-26 12:49:06',0,1,1,1),(33,'2020-11-26 13:04:22',0,1,1,1),(34,'2020-11-26 13:06:47',0,1,1,1),(35,'2020-11-26 13:11:44',0,1,1,1),(36,'2020-11-26 13:16:11',0,1,1,1);
/*!40000 ALTER TABLE `checkouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `celular` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `credito_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK362539B9C5E32BBB` (`usuario_id`),
  KEY `FK362539B95B8ED2BB` (`credito_id`),
  CONSTRAINT `FK362539B95B8ED2BB` FOREIGN KEY (`credito_id`) REFERENCES `creditos` (`id`),
  CONSTRAINT `FK362539B9C5E32BBB` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'47997386549','samoellaureano@gmail.com','samoel laureano',1,1),(2,'33333333333','felipe@gmail.com','Felipe Schulz',2,2);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditos`
--

DROP TABLE IF EXISTS `creditos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creditos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saldo` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditos`
--

LOCK TABLES `creditos` WRITE;
/*!40000 ALTER TABLE `creditos` DISABLE KEYS */;
INSERT INTO `creditos` VALUES (1,0),(2,0);
/*!40000 ALTER TABLE `creditos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(14) NOT NULL,
  `descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'66123685000171','Empresa - 01');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estacionamentos`
--

DROP TABLE IF EXISTS `estacionamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estacionamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(14) NOT NULL,
  `descricao` varchar(45) NOT NULL,
  `endereco` varchar(45) NOT NULL,
  `vagas` int(11) NOT NULL,
  `empresa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK65DEC083150D69DB` (`empresa_id`),
  CONSTRAINT `FK65DEC083150D69DB` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estacionamentos`
--

LOCK TABLES `estacionamentos` WRITE;
/*!40000 ALTER TABLE `estacionamentos` DISABLE KEYS */;
INSERT INTO `estacionamentos` VALUES (1,'66123685000171','Estacionamento 01','Rua Isolde Paulo,526',50,1),(2,'66123685000171','Estacionamento 02','Rua Isolde Paulo,526',50,1);
/*!40000 ALTER TABLE `estacionamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcionarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `celular` varchar(12) NOT NULL,
  `email` varchar(45) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `empresa_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `ativo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKB7C39DF8150D69DB` (`empresa_id`),
  KEY `FKB7C39DF8C5E32BBB` (`usuario_id`),
  CONSTRAINT `FKB7C39DF8150D69DB` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`),
  CONSTRAINT `FKB7C39DF8C5E32BBB` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (2,'33333333333','felipe@gmail.com','Felipe Schulz',1,2,''),(3,'22222222223','funcionario@gmail.com','Funcionario Teste',1,3,'');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=535 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'CHEVROLET'),(2,'VOLKSWAGEN'),(3,'FIAT'),(4,'MERCEDES-BENZ'),(5,'CITROEN'),(6,'CHANA'),(7,'HONDA'),(8,'SUBARU'),(10,'FERRARI'),(11,'BUGATTI'),(12,'LAMBORGHINI'),(13,'FORD'),(14,'HYUNDAI'),(15,'JAC'),(16,'KIA'),(17,'GURGEL'),(18,'DODGE'),(19,'CHRYSLER'),(20,'BENTLEY'),(21,'SSANGYONG'),(22,'PEUGEOT'),(23,'TOYOTA'),(24,'RENAULT'),(25,'ACURA'),(26,'ADAMO'),(27,'AGRALE'),(28,'ALFA ROMEO'),(29,'AMERICAR'),(31,'ASTON MARTIN'),(32,'AUDI'),(34,'BEACH'),(35,'BIANCO'),(36,'BMW'),(37,'BORGWARD'),(38,'BRILLIANCE'),(41,'BUICK'),(42,'CBT'),(43,'NISSAN'),(44,'CHAMONIX'),(46,'CHEDA'),(47,'CHERY'),(48,'CORD'),(49,'COYOTE'),(50,'CROSS LANDER'),(51,'DAEWOO'),(52,'DAIHATSU'),(53,'VOLVO'),(54,'DE SOTO'),(55,'DETOMAZO'),(56,'DELOREAN'),(57,'DKW-VEMAG'),(59,'SUZUKI'),(60,'EAGLE'),(61,'EFFA'),(63,'ENGESA'),(64,'ENVEMO'),(65,'FARUS'),(66,'FERCAR'),(68,'FNM'),(69,'PONTIAC'),(70,'PORSCHE'),(72,'GEO'),(74,'GRANCAR'),(75,'GREAT WALL'),(76,'HAFEI'),(78,'HOFSTETTER'),(79,'HUDSON'),(80,'HUMMER'),(82,'INFINITI'),(83,'INTERNATIONAL'),(86,'JAGUAR'),(87,'JEEP'),(88,'JINBEI'),(89,'JPX'),(90,'KAISER'),(91,'KOENIGSEGG'),(92,'LAUTOMOBILE'),(93,'LAUTOCRAFT'),(94,'LADA'),(95,'LANCIA'),(96,'LAND ROVER'),(97,'LEXUS'),(98,'LIFAN'),(99,'LINCOLN'),(100,'LOBINI'),(101,'LOTUS'),(102,'MAHINDRA'),(104,'MASERATI'),(106,'MATRA'),(107,'MAYBACH'),(108,'MAZDA'),(109,'MENON'),(110,'MERCURY'),(111,'MITSUBISHI'),(112,'MG'),(113,'MINI'),(114,'MIURA'),(115,'MORRIS'),(116,'MP LAFER'),(117,'MPLM'),(118,'NEWTRACK'),(119,'NISSIN'),(120,'OLDSMOBILE'),(121,'PAG'),(122,'PAGANI'),(123,'PLYMOUTH'),(124,'PUMA'),(125,'RENO'),(126,'REVA-I'),(127,'ROLLS-ROYCE'),(129,'ROMI'),(130,'SEAT'),(131,'UTILITARIOS AGRICOLAS'),(132,'SHINERAY'),(137,'SAAB'),(139,'SHORT'),(141,'SIMCA'),(142,'SMART'),(143,'SPYKER'),(144,'STANDARD'),(145,'STUDEBAKER'),(146,'TAC'),(147,'TANGER'),(148,'TRIUMPH'),(149,'TROLLER'),(150,'UNIMOG'),(154,'WIESMANN'),(155,'CADILLAC'),(156,'AM GEN'),(157,'BUGGY'),(158,'WILLYS OVERLAND'),(161,'KASEA'),(162,'SATURN'),(163,'SWELL MINI'),(175,'SKODA'),(239,'KARMANN GHIA'),(254,'KART'),(258,'HANOMAG'),(261,'OUTROS'),(265,'HILLMAN'),(288,'HRG'),(295,'GAIOLA'),(338,'TATA'),(341,'DITALLY'),(345,'RELY'),(346,'MCLAREN'),(534,'GEELY');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelos`
--

DROP TABLE IF EXISTS `modelos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modelos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `marca_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4921E2CDB7D0653B` (`marca_id`),
  CONSTRAINT `FK4921E2CDB7D0653B` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1424 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelos`
--

LOCK TABLES `modelos` WRITE;
/*!40000 ALTER TABLE `modelos` DISABLE KEYS */;
INSERT INTO `modelos` VALUES (1,'INTEGRA',25),(2,'LEGEND',25),(3,'NSX',25),(4,'MARRUA',27),(5,'145',28),(6,'147',28),(7,'155',28),(8,'156',28),(9,'164',28),(10,'166',28),(11,'2300',28),(12,'SPIDER',28),(13,'HUMMER',156),(14,'AM-825',16),(15,'HI-TOPIC',16),(16,'ROCSTA',16),(17,'TOPIC',16),(18,'TOWNER',16),(19,'100',32),(20,'80',32),(21,'A1',32),(22,'A3',32),(23,'A4 SEDAN',32),(24,'A5 COUPE',32),(25,'A6 SEDAN',32),(26,'A7',32),(27,'A8',32),(30,'Q3',32),(31,'Q5',32),(32,'Q7',32),(33,'R8',32),(34,'RS3',32),(35,'RS4',32),(36,'RS5',32),(37,'RS6',32),(38,'S3',32),(39,'S4 SEDAN',32),(40,'S6 SEDAN',32),(41,'S8',32),(42,'TT',32),(43,'TTS',32),(86,'BUGGY',157),(87,'DEVILLE',155),(88,'ELDORADO',155),(89,'SEVILLE',155),(90,'JAVALI',42),(92,'MINI STAR FAMILY',6),(93,'MINI STAR UTILITY',6),(95,'CIELO',47),(96,'FACE',47),(97,'QQ',47),(98,'S-18',47),(99,'TIGGO',47),(100,'300C',19),(101,'CARAVAN',19),(102,'CIRRUS',19),(103,'GRAN CARAVAN',19),(104,'LE BARON',19),(105,'NEON',19),(106,'PT CRUISER',19),(107,'SEBRING',19),(108,'STRATUS',19),(109,'TOWN E COUNTRY',19),(110,'VISION',19),(111,'AIRCROSS',5),(112,'AX',5),(113,'BERLINGO',5),(114,'BX',5),(115,'C3',5),(116,'C4',5),(117,'C5',5),(118,'C6',5),(119,'C8',5),(120,'DS3',5),(121,'EVASION',5),(122,'JUMPER',5),(123,'XANTIA',5),(124,'XM',5),(125,'XSARA',5),(126,'ZX',5),(127,'CL-244',50),(128,'CL-330',50),(129,'ESPERO',51),(130,'LANOS',51),(131,'LEGANZA',51),(132,'NUBIRA',51),(133,'PRINCE',51),(134,'RACER',51),(135,'SUPER SALON',51),(136,'TICO',51),(137,'APPLAUSE',52),(138,'CHARADE',52),(139,'CUORE',52),(140,'FEROZA',52),(141,'GRAN MOVE',52),(142,'MOVE VAN',52),(143,'TERIOS',52),(144,'AVENGER',18),(145,'DAKOTA',18),(146,'JOURNEY',18),(147,'RAM',18),(148,'STEALTH',18),(151,'M-100',61),(152,'PLUTUS',61),(153,'START',61),(155,'ULC',61),(158,'ENGESA',63),(159,'CAMPER',64),(160,'MASTER',64),(161,'348',10),(162,'355',10),(163,'360',10),(164,'456',10),(165,'550',10),(166,'575M',10),(167,'612',10),(168,'CALIFORNIA',10),(169,'F430',10),(170,'F599',10),(171,'147',3),(174,'500',3),(175,'BRAVA',3),(176,'BRAVO',3),(178,'COUPE',3),(179,'DOBLO',3),(180,'DUCATO CARGO',3),(181,'DUNA',3),(182,'ELBA',3),(183,'FIORINO',3),(184,'FREEMONT',3),(185,'GRAND SIENA',3),(186,'IDEA',3),(187,'LINEA',3),(188,'MAREA',3),(189,'OGGI',3),(190,'PALIO',3),(191,'PANORAMA',3),(192,'PREMIO',3),(193,'PUNTO',3),(194,'SIENA',3),(195,'STILO',3),(196,'STRADA',3),(197,'TEMPRA',3),(198,'TIPO',3),(199,'UNO',3),(201,'AEROSTAR',13),(202,'ASPIRE',13),(203,'BELINA',13),(204,'CLUB WAGON',13),(205,'CONTOUR',13),(206,'CORCEL II',13),(207,'COURIER',13),(208,'CROWN VICTORIA',13),(209,'DEL REY',13),(210,'ECOSPORT',13),(211,'EDGE',13),(212,'ESCORT',13),(213,'EXPEDITION',13),(214,'EXPLORER',13),(215,'F-100',13),(216,'F-1000',13),(217,'F-150',13),(218,'F-250',13),(219,'FIESTA',13),(220,'FOCUS',13),(221,'FURGLAINE',13),(222,'FUSION',13),(223,'IBIZA',13),(224,'KA',13),(225,'MONDEO',13),(226,'MUSTANG',13),(227,'PAMPA',13),(228,'PROBE',13),(229,'RANGER',13),(230,'VERSAILLES ROYALE',13),(231,'TAURUS',13),(232,'THUNDERBIRD',13),(233,'TRANSIT',13),(234,'VERONA',13),(235,'VERSAILLES',13),(236,'WINDSTAR',13),(238,'A-10',1),(239,'A-20',1),(240,'AGILE',1),(241,'ASTRA',1),(242,'BLAZER',1),(243,'BONANZA',1),(245,'C-10',1),(246,'C-20',1),(247,'CALIBRA',1),(248,'CAMARO',1),(249,'CAPRICE',1),(250,'CAPTIVA',1),(251,'CARAVAN',1),(252,'CAVALIER',1),(253,'CELTA',1),(255,'CHEVY',1),(256,'CHEYNNE',1),(258,'COBALT',1),(259,'CORSA',1),(262,'CORVETTE',1),(263,'CRUZE',1),(264,'D-10',1),(265,'D-20',1),(266,'IPANEMA',1),(267,'KADETT',1),(268,'LUMINA',1),(269,'MALIBU',1),(271,'MERIVA',1),(272,'MONTANA',1),(274,'OMEGA',1),(275,'OPALA',1),(276,'PRISMA',1),(277,'S10',1),(280,'SILVERADO',1),(281,'SONIC',1),(282,'SONOMA',1),(283,'SPACEVAN',1),(284,'SS10',1),(285,'SUBURBAN',1),(287,'SYCLONE',1),(288,'TIGRA',1),(289,'TRACKER',1),(290,'TRAFIC',1),(291,'VECTRA',1),(292,'VERANEIO',1),(293,'ZAFIRA',1),(294,'HOVER',75),(295,'BR-800',17),(296,'CARAJAS',17),(297,'TOCANTINS',17),(298,'XAVANTE',17),(299,'VIP',17),(300,'TOWNER',76),(301,'ACCORD',7),(302,'CITY',7),(303,'CIVIC',7),(304,'CR-V',7),(305,'FIT',7),(306,'ODYSSEY',7),(307,'PASSPORT',7),(308,'PRELUDE',7),(309,'ACCENT',14),(310,'ATOS',14),(311,'AZERA',14),(312,'COUPE',14),(314,'ELANTRA',14),(315,'EXCEL',14),(316,'GALLOPER',14),(317,'GENESIS',14),(318,'H1',14),(319,'H100',14),(321,'I30',14),(323,'IX35',14),(324,'MATRIX',14),(325,'PORTER',14),(326,'SANTA FE',14),(327,'SCOUPE',14),(328,'SONATA',14),(329,'TERRACAN',14),(330,'TRAJET',14),(331,'TUCSON',14),(332,'VELOSTER',14),(333,'VERACRUZ',14),(337,'J3',15),(338,'J5',15),(339,'J6',15),(340,'DAIMLER',86),(341,'S-TYPE',86),(342,'X-TYPE',86),(345,'MODELOS XJ',86),(352,'MODELOS XK',86),(354,'CHEROKEE',87),(355,'COMMANDER',87),(356,'COMPASS',87),(357,'GRAND CHEROKEE',87),(358,'WRANGLER',87),(359,'TOPIC VAN',88),(360,'JIPE MONTEZ',89),(361,'PICAPE MONTEZ',89),(362,'BESTA',16),(363,'BONGO',16),(364,'CADENZA',16),(365,'CARENS',16),(366,'CARNIVAL',16),(367,'CERATO',16),(368,'CERES',16),(369,'CLARUS',16),(370,'MAGENTIS',16),(371,'MOHAVE',16),(372,'OPIRUS',16),(373,'OPTIMA',16),(374,'PICANTO',16),(375,'SEPHIA',16),(376,'SHUMA',16),(377,'SORENTO',16),(378,'SOUL',16),(379,'SPORTAGE',16),(380,'LAIKA',94),(381,'NIVA',94),(382,'SAMARA',94),(383,'GALLARDO',12),(384,'MURCIELAGO',12),(385,'DEFENDER',96),(386,'DISCOVERY',96),(389,'FREELANDER',96),(391,'NEW RANGE',96),(392,'RANGE ROVER',96),(393,'ES',97),(396,'GS',97),(397,'IS-300',97),(398,'LS',97),(400,'RX',97),(402,'SC',97),(403,'320',98),(404,'620',98),(405,'H1',100),(406,'ELAN',101),(407,'ESPRIT',101),(408,'SCORPIO',102),(409,'222',104),(410,'228',104),(411,'3200',104),(412,'430',104),(413,'COUPE',104),(414,'GHIBLI',104),(415,'GRANCABRIO',104),(416,'GRANSPORT',104),(417,'GRANTURISMO',104),(418,'QUATTROPORTE',104),(419,'SHAMAL',104),(420,'SPIDER',104),(422,'PICK-UP',106),(423,'323',108),(424,'626',108),(425,'929',108),(426,'B-2500',108),(427,'B2200',108),(428,'MILLENIA',108),(429,'MPV',108),(430,'MX-3',108),(431,'MX-5',108),(432,'NAVAJO',108),(433,'PROTEGE',108),(434,'RX',108),(467,'CLASSE A',4),(468,'CLASSE B',4),(469,'CLASSE R',4),(498,'CLASSE GLK',4),(531,'SPRINTER',4),(532,'MYSTIQUE',110),(533,'SABLE',110),(534,'550',112),(535,'MG6',112),(536,'COOPER',113),(537,'ONE',113),(538,'3000',111),(539,'AIRTREK',111),(540,'ASX',111),(541,'COLT',111),(542,'DIAMANT',111),(543,'ECLIPSE',111),(544,'EXPO',111),(545,'GALANT',111),(546,'GRANDIS',111),(547,'L200',111),(548,'L300',111),(549,'LANCER',111),(550,'MIRAGE',111),(551,'MONTERO',111),(552,'OUTLANDER',111),(553,'PAJERO',111),(554,'SPACE WAGON',111),(555,'BG-TRUCK',114),(556,'350Z',43),(557,'ALTIMA',43),(558,'AX',43),(559,'D-21',43),(560,'FRONTIER',43),(562,'KING-CAB',43),(563,'LIVINA',43),(564,'MARCH',43),(565,'MAXIMA',43),(567,'MURANO',43),(568,'NX',43),(569,'PATHFINDER',43),(571,'PRIMERA',43),(572,'QUEST',43),(573,'SENTRA',43),(574,'STANZA',43),(575,'180SX',43),(576,'TERRANO',43),(577,'TIIDA',43),(578,'VERSA',43),(579,'X-TRAIL',43),(580,'XTERRA',43),(581,'ZX',43),(582,'106',22),(583,'205',22),(584,'206',22),(585,'207',22),(586,'3008',22),(587,'306',22),(588,'307',22),(589,'308',22),(590,'405',22),(591,'406',22),(592,'407',22),(593,'408',22),(594,'504',22),(595,'505',22),(596,'508',22),(597,'605',22),(598,'607',22),(599,'806',22),(600,'807',22),(601,'BOXER',22),(602,'HOGGAR',22),(603,'PARTNER',22),(604,'RCZ',22),(605,'GRAN VOYAGER',123),(606,'SUNDANCE',123),(607,'TRANS-AM',69),(608,'TRANS-SPORT',69),(609,'911',70),(612,'BOXSTER',70),(613,'CAYENNE',70),(614,'CAYMAN',70),(615,'PANAMERA',70),(617,'21 SEDAN',24),(618,'CLIO',24),(619,'DUSTER',24),(620,'EXPRESS',24),(621,'FLUENCE',24),(622,'KANGOO',24),(623,'LAGUNA',24),(624,'LOGAN',24),(625,'MASTER',24),(626,'MEGANE',24),(627,'SAFRANE',24),(628,'SANDERO',24),(629,'SCENIC',24),(630,'SYMBOL',24),(631,'TRAFIC',24),(632,'TWINGO',24),(634,'9000',137),(635,'SL-2',162),(636,'CORDOBA',130),(637,'IBIZA',130),(638,'INCA',130),(641,'FORTWO',142),(642,'ACTYON SPORTS',21),(643,'CHAIRMAN',21),(644,'ISTANA',21),(645,'KORANDO',21),(646,'KYRON',21),(647,'MUSSO',21),(648,'REXTON',21),(649,'FORESTER',8),(650,'IMPREZA',8),(651,'LEGACY',8),(652,'OUTBACK',8),(653,'SVX',8),(654,'TRIBECA',8),(655,'VIVIO',8),(656,'BALENO',59),(657,'GRAND VITARA',59),(658,'IGNIS',59),(660,'JIMNY',59),(662,'SUPER CARRY',59),(663,'SWIFT',59),(664,'SX4',59),(665,'VITARA',59),(666,'WAGON R',59),(667,'STARK',146),(668,'AVALON',23),(669,'BANDEIRANTE',23),(670,'CAMRY',23),(671,'CELICA',23),(672,'COROLLA',23),(673,'CORONA',23),(674,'HILUX',23),(675,'LAND CRUISER',23),(676,'MR-2',23),(677,'PASEO',23),(678,'PREVIA',23),(679,'RAV4',23),(680,'SUPRA',23),(682,'PANTANAL',149),(684,'T-4',149),(685,'400 SERIES',53),(687,'850',53),(688,'900 SERIES',53),(700,'AMAROK',2),(701,'APOLLO',2),(702,'BORA',2),(703,'CARAVELLE',2),(704,'CORRADO',2),(706,'EOS',2),(707,'EUROVAN',2),(708,'FOX',2),(709,'FUSCA',2),(710,'GOL',2),(711,'GOLF',2),(713,'JETTA',2),(714,'KOMBI',2),(715,'LOGUS',2),(717,'PARATI',2),(718,'PASSAT',2),(719,'POINTER',2),(720,'POLO',2),(722,'SANTANA',2),(723,'SAVEIRO',2),(725,'SPACEFOX',2),(726,'TIGUAN',2),(727,'TOUAREG',2),(729,'VOYAGE',2),(732,'ZDX',25),(737,'140',3),(755,'BRASILIA',2),(756,'BRASILVAN',13),(775,'CORCEL',13),(803,'PALIO WEEKEND',3),(806,'FOCUS SEDAN',13),(807,'FIESTA SEDAN',13),(808,'FIESTA TRAIL',13),(810,'207 SW',22),(811,'ESCORT SW',13),(812,'307 SEDAN',22),(813,'307 SW',22),(815,'C4 PALLAS',5),(816,'C4 PICASSO',5),(817,'C4 VTR',5),(818,'CLIO SEDAN',24),(819,'COROLLA FIELDER',23),(824,'HILUX SW4',23),(825,'MEGANE GRAND TOUR',24),(827,'SANDERO STEPWAY',24),(829,'XSARA PICASSO',5),(1360,'COLHEITADEIRA',131),(1361,'PICKUP F75',158),(1362,'X12',17),(1365,'BEL AIR',1),(1366,'RX',36),(1369,'C-14',1),(1370,'SRX4',155),(1372,'C-15',1),(1373,'BRASIL',1),(1377,'POLARA',18),(1380,'600',3),(1382,'F-01',13),(1383,'FALCON',13),(1384,'GALAXIE',13),(1386,'MAVERICK',13),(1387,'MODELO A',13),(1388,'NEW FIESTA',13),(1389,'LINHA FX',82),(1391,'GTS',124),(1392,'H3',80),(1394,'PRIME',14),(1395,'TIBURON',14),(1397,'JEEP',87),(1398,'CJ5',87),(1399,'TC',239),(1404,'CLASSE CLC',4),(1405,'CLASSE CLS',4),(1408,'MONTEREY',110),(1411,'TOPSPORT',114),(1412,'TARGA',114),(1414,'X8',114),(1415,'370Z',43),(1418,'GTB',124),(1419,'GTC',124),(1420,'GTE',124),(1421,'AUSTIN',115),(1423,'7TL',24);
/*!40000 ALTER TABLE `modelos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codVerificacao` int(11) NOT NULL,
  `numCartao` int(11) NOT NULL,
  `titular` varchar(255) NOT NULL,
  `validade` datetime NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKA4A8520DB4DEA83B` (`cliente_id`),
  CONSTRAINT `FKA4A8520DB4DEA83B` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabeladeprecos`
--

DROP TABLE IF EXISTS `tabeladeprecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tabeladeprecos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `valor` double NOT NULL,
  `estacionamento_id` int(11) DEFAULT NULL,
  `tipoVeiculo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKAAE94FEA22428FFB` (`tipoVeiculo_id`),
  KEY `FKAAE94FEAA1988FD9` (`estacionamento_id`),
  CONSTRAINT `FKAAE94FEA22428FFB` FOREIGN KEY (`tipoVeiculo_id`) REFERENCES `tiposveiculos` (`id`),
  CONSTRAINT `FKAAE94FEAA1988FD9` FOREIGN KEY (`estacionamento_id`) REFERENCES `estacionamentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabeladeprecos`
--

LOCK TABLES `tabeladeprecos` WRITE;
/*!40000 ALTER TABLE `tabeladeprecos` DISABLE KEYS */;
INSERT INTO `tabeladeprecos` VALUES (1,'Carro/Hora',30,1,2);
/*!40000 ALTER TABLE `tabeladeprecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposveiculos`
--

DROP TABLE IF EXISTS `tiposveiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tiposveiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposveiculos`
--

LOCK TABLES `tiposveiculos` WRITE;
/*!40000 ALTER TABLE `tiposveiculos` DISABLE KEYS */;
INSERT INTO `tiposveiculos` VALUES (1,'Motocicleta'),(2,'Automóvel'),(3,'Microônibus'),(4,'Triciclo'),(5,'Bicicleta'),(6,'Caminhonete'),(7,'Caminhão');
/*!40000 ALTER TABLE `tiposveiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acesso` bit(1) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `perfil` int(11) NOT NULL,
  `senha` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'','07800508943',0,'ee1b8b1ebea4317c2c7b5029208bf40'),(2,'','12345678901',2,'ee1b8b1ebea4317c2c7b5029208bf40'),(3,'','12345678902',1,'6a6f6d48966db085a9997c1cb9f9e79c');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `veiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ano` varchar(255) NOT NULL,
  `cor` varchar(30) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `modelo_id` int(11) DEFAULT NULL,
  `tipoVeiculo_id` int(11) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `ativo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7976D24410C04319` (`modelo_id`),
  KEY `FK7976D24422428FFB` (`tipoVeiculo_id`),
  KEY `FK7976D244B4DEA83B` (`cliente_id`),
  CONSTRAINT `FK7976D24410C04319` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`id`),
  CONSTRAINT `FK7976D24422428FFB` FOREIGN KEY (`tipoVeiculo_id`) REFERENCES `tiposveiculos` (`id`),
  CONSTRAINT `FK7976D244B4DEA83B` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculos`
--

LOCK TABLES `veiculos` WRITE;
/*!40000 ALTER TABLE `veiculos` DISABLE KEYS */;
INSERT INTO `veiculos` VALUES (1,'2006','VERMELHO','DSO2249',259,2,1,''),(2,'1994','AZUL','aaa2129',709,2,1,'\0'),(3,'2020','AMARELO','aaa2129',248,2,1,'\0'),(4,'2021','PRETO','NAT2801',713,2,1,''),(5,'2020','BRANCO','LSP5340',592,2,1,''),(6,'2020','VERMELHA','AAA1212',242,2,1,'');
/*!40000 ALTER TABLE `veiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-27 13:41:20
