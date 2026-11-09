-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2022 at 07:38 AM
-- Server version: 5.7.35-log
-- PHP Version: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_controllerv1_0`
--

-- --------------------------------------------------------

--
-- Table structure for table `agences`
--

CREATE TABLE `agences` (
  `AGENCE_ID` int(11) NOT NULL,
  `AGENCE_NAME` varchar(200) NOT NULL,
  `LATITUDE` varchar(100) NOT NULL,
  `LONGITUDE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `agences`
--

INSERT INTO `agences` (`AGENCE_ID`, `AGENCE_NAME`, `LATITUDE`, `LONGITUDE`) VALUES
(1, 'Agence du siege', '-3.4276702729751127', '29.92690925331985');

-- --------------------------------------------------------

--
-- Table structure for table `archivage_repertories`
--

CREATE TABLE `archivage_repertories` (
  `ID_REPERTORIE` int(11) NOT NULL,
  `DESCRIPTION` text COLLATE gb2312_bin NOT NULL,
  `TYPE` varchar(50) COLLATE gb2312_bin NOT NULL,
  `EMAIL` varchar(50) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `archivage_repertories`
--

INSERT INTO `archivage_repertories` (`ID_REPERTORIE`, `DESCRIPTION`, `TYPE`, `EMAIL`) VALUES
(1, 'AA', 'folder', 'dd@fd'),
(2, 'aa', 'folder', 'dd@fd'),
(3, 'ss', 'folder', 'dd@fd'),
(4, 'xx', 'folder', 'dd@fd'),
(5, 'cc', 'folder', 'dd@fd'),
(6, 'archives/INTERNE_AA/Cours de change du 08_07_2021.', 'file', 'dd@fd'),
(7, 'archives/INTERNE_AA/Cours de change du 12_07_2021.', 'file', 'dd@fd'),
(8, 'archives/INTERNE_AA/Cours de change du 08_07_2021.', 'file', 'dd@fd'),
(9, 'archives/INTERNE_AA/Cours de change du 12_07_2021.pdf', 'file', 'dd@fd'),
(10, 'archives/INTERNE_AA/ords-21.2.0.174.1826.zip', 'file', 'dd@fd'),
(11, 'archives/INTERNE_AA/EasySMPP-1.0.0.1.zip', 'file', 'dd@fd'),
(12, 'archives/INTERNE_AAmm', 'folder', 'dd@fd'),
(13, 'archives/INTERNE_AA/mm', 'folder', 'dd@fd'),
(14, 'archives/INTERNE_AA/WhatsApp Image 2021-07-08 at 08.07.05.jpeg', 'file', 'dd@fd'),
(15, 'archives/INTERNE_AA/nn', 'folder', 'dd@fd'),
(16, 'archives/INTERNE_AA/nn/FileZilla_3.54.1_win64-setup.exe', 'file', 'dd@fd'),
(17, 'archives/INTERNE_AA/_DSC0012.JPG', 'file', 'dd@fd'),
(18, 'archives/INTERNE_AA/_DSC0007.JPG', 'file', 'dd@fd'),
(19, 'archives/INTERNE_AA/_DSC0006.JPG', 'file', 'dd@fd'),
(20, 'C:\\xampp\\htdocs\\E_controllerV1.0\\application\\modules\\archivage\\controllers\\INTERNE_AA\\Scanp.pdf', 'file', 'manirambonafabrice@gmail.com'),
(21, 'C:\\xampp\\htdocs\\E_controllerV1.0\\application\\modules\\archivage\\controllers\\INTERNE_AA\\Scane.pdf', 'file', 'manirambonafabrice@gmail.com'),
(22, 'archives/INTERNE_AA\\Scan-1.pdf', 'file', 'manirambonafabrice@gmail.com'),
(23, 'archives/INTERNE_AA\\Scan-2.pdf', 'file', 'dd@fd'),
(24, 'archives/INTERNE_AA\\Scan-3.pdf', 'file', 'dd@fd'),
(25, 'archives/INTERNE_AA/ll', 'folder', 'dd@fd'),
(26, 'archives\\INTERNE_AA\\Scan-4.pdf', 'file', 'dd@fd'),
(27, 'archives/INTERNE_AA\\Scan-5.pdf', 'file', 'dd@fd'),
(28, 'archives/INTERNE_AA/Scan-6.pdf', 'file', 'dd@fd'),
(29, 'archives/INTERNE_AA/ll/Scan.pdf', 'file', 'dd@fd'),
(30, 'archives/INTERNE_AA/ll/Scan-1.pdf', 'file', 'dd@fd'),
(31, 'archives/INTERNE_AA/ll/Scan-2.pdf', 'file', 'dd@fd'),
(32, 'archives/INTERNE_AA/ll/pp', 'folder', 'dd@fd'),
(33, 'archives/INTERNE_AA/ll/pp/Scan.pdf', 'file', 'dd@fd'),
(34, 'archives/INTERNE_AA/ll/pp/_DSC0008.JPG', 'file', 'dd@fd'),
(35, 'archives/INTERNE_AA/ll/xx', 'folder', 'manirambonafabrice@gmail.com'),
(36, 'archives/INTERNE_AA/ttt', 'folder', 'manirambonafabrice@gmail.com'),
(37, 'archives/INTERNE_AA/ttt/image-20150918-17701-mfm9vy.jpg', 'file', 'manirambonafabrice@gmail.com'),
(50, 'archives/INTERNE_nouveau/cc', 'folder', 'manirambonafabrice@gmail.com'),
(51, 'archives/INTERNE_nouveau/vvvs', 'folder', 'keza@kk.nn'),
(52, 'archives/INTERNE_nouveau/dfdg', 'folder', 'keza@kk.nn'),
(53, 'archives/INTERNE_nouveau/dfdg/Cours de change du 06_08_2021.pdf', 'file', 'keza@kk.nn'),
(54, 'archives/INTERNE_nouveau/bb', 'folder', 'manirambonafabrice@gmail.com'),
(55, 'archives/INTERNE_nouveau/dfdg/Cours de change du 13_08_2021.pdf', 'file', 'manirambonafabrice@gmail.com'),
(56, 'archives/INTERNE_nouveau/cc/Cours de change du 06_08_2021.pdf', 'file', 'manirambonafabrice@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `archivage_repertories_deleted`
--

CREATE TABLE `archivage_repertories_deleted` (
  `ID_REPERTORIE` int(11) NOT NULL,
  `DESCRIPTION` text COLLATE gb2312_bin NOT NULL,
  `TYPE` varchar(50) COLLATE gb2312_bin NOT NULL,
  `EMAIL` varchar(50) COLLATE gb2312_bin NOT NULL,
  `DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `archivage_repertories_deleted`
--

INSERT INTO `archivage_repertories_deleted` (`ID_REPERTORIE`, `DESCRIPTION`, `TYPE`, `EMAIL`, `DATE`) VALUES
(1, 'archives/INTERNE_AA/_DSC0006.JPG', 'file', 'dd@fd', '2021-07-12 17:20:57'),
(2, 'archives/INTERNE_nouveau/yyy/Cours de change du 06_08_2021.pdf', 'file', 'manirambonafabrice@gmail.com', '2021-08-09 05:39:43'),
(3, 'archives/INTERNE_nouveau/vvvs', 'file', 'keza@kk.nn', '2021-08-13 06:13:53'),
(4, 'archives/INTERNE_nouveau/dfdg/Cours de change du 13_08_2021.pdf', 'file', 'manirambonafabrice@gmail.com', '2021-08-16 13:10:56');

-- --------------------------------------------------------

--
-- Table structure for table `archivage_repertories_shared`
--

CREATE TABLE `archivage_repertories_shared` (
  `ID_SHARED` int(11) NOT NULL,
  `SHARED_TO` int(11) NOT NULL,
  `SHARED_BY` int(11) NOT NULL,
  `DATE_TIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_REPERTORIE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `archivage_repertories_shared`
--

INSERT INTO `archivage_repertories_shared` (`ID_SHARED`, `SHARED_TO`, `SHARED_BY`, `DATE_TIME`, `ID_REPERTORIE`) VALUES
(9, 14, 61, '2021-08-19 06:53:05', 52),
(10, 55, 61, '2021-08-19 06:53:05', 52),
(11, 62, 61, '2021-08-19 06:53:05', 52),
(12, 17, 12, '2021-08-19 09:30:24', 56);

-- --------------------------------------------------------

--
-- Table structure for table `categorie_hierarchique`
--

CREATE TABLE `categorie_hierarchique` (
  `ID_CATEGORIE_HIE` int(11) NOT NULL,
  `DESCRIPTION_CATEGORIE` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categorie_hierarchique`
--

INSERT INTO `categorie_hierarchique` (`ID_CATEGORIE_HIE`, `DESCRIPTION_CATEGORIE`) VALUES
(1, 'CATEGORIE DE DIRECTION'),
(2, 'CATEGORIE D\'ENCADREMENT'),
(3, 'CATEGORIE DE COLLABORATION'),
(4, 'CATEGORIE D\'EXECUTION'),
(5, 'CATEGORIE DU PERSONNEL DE SERVICE');

-- --------------------------------------------------------

--
-- Table structure for table `conge_demande`
--

CREATE TABLE `conge_demande` (
  `ID_CONGE_DEMAMDE` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `ADRESSE_CONGE` text COLLATE gb2312_bin NOT NULL,
  `ID_TYPE_CONGE` int(11) NOT NULL,
  `EXERCICES` int(11) NOT NULL,
  `DUREE` int(11) NOT NULL,
  `MOTIF` text COLLATE gb2312_bin NOT NULL,
  `DATE_DEBUT` date NOT NULL,
  `DATE_FIN` date NOT NULL,
  `DATE_RETOUR` date NOT NULL,
  `DATE_CREATION` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `STATUT` int(11) NOT NULL DEFAULT '0' COMMENT '0creer , 1valider, 2refuser, 3expire'
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `conge_demande`
--

INSERT INTO `conge_demande` (`ID_CONGE_DEMAMDE`, `USER_ID`, `ADRESSE_CONGE`, `ID_TYPE_CONGE`, `EXERCICES`, `DUREE`, `MOTIF`, `DATE_DEBUT`, `DATE_FIN`, `DATE_RETOUR`, `DATE_CREATION`, `STATUT`) VALUES
(1, 15, 'Gitega', 1, 2021, 1, 'Personnel', '2022-04-01', '2022-04-01', '2022-04-04', '2022-03-31 18:54:38', 1),
(2, 56, 'fffff', 2, 2022, 2, 'perso', '2022-04-04', '2022-04-05', '2022-04-06', '2022-03-31 20:34:57', 2);

-- --------------------------------------------------------

--
-- Table structure for table `conge_iterim_user`
--

CREATE TABLE `conge_iterim_user` (
  `ID_CONGE_INTERIM_USER` int(11) NOT NULL,
  `ID_CONGE_DEMAMDE` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `PV` varchar(50) COLLATE gb2312_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `conge_iterim_user`
--

INSERT INTO `conge_iterim_user` (`ID_CONGE_INTERIM_USER`, `ID_CONGE_DEMAMDE`, `ID_USER`, `PV`) VALUES
(1, 1, 16, NULL),
(2, 2, 15, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `conge_notification`
--

CREATE TABLE `conge_notification` (
  `ID_CONGE_NOTIFICATION` int(11) NOT NULL,
  `ID_CONGE_DEMAMDE` int(11) NOT NULL,
  `ID_POST_RESSOURCE` int(11) NOT NULL,
  `ID_POST_DESTINATION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conge_notification`
--

INSERT INTO `conge_notification` (`ID_CONGE_NOTIFICATION`, `ID_CONGE_DEMAMDE`, `ID_POST_RESSOURCE`, `ID_POST_DESTINATION`) VALUES
(1, 1, 2, 10),
(2, 1, 1, 10),
(3, 2, 2, 10),
(4, 2, 1, 10),
(5, 2, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `conge_validation`
--

CREATE TABLE `conge_validation` (
  `ID_CONGE_VALIDATION` int(11) NOT NULL,
  `ID_CONGE_DEMAMDE` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL DEFAULT '-1',
  `ID_POST` int(11) NOT NULL,
  `INTERIM` int(11) DEFAULT NULL COMMENT '0FALSE 1TRUE',
  `COMMENT` text COLLATE gb2312_bin,
  `STATUT` int(11) NOT NULL DEFAULT '0' COMMENT '0 cree, 1 valider , 2 refuser',
  `DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DATE_VALIDATION` datetime DEFAULT NULL,
  `LEVEL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `conge_validation`
--

INSERT INTO `conge_validation` (`ID_CONGE_VALIDATION`, `ID_CONGE_DEMAMDE`, `USER_ID`, `ID_POST`, `INTERIM`, `COMMENT`, `STATUT`, `DATE`, `DATE_VALIDATION`, `LEVEL`) VALUES
(1, 1, 57, 8, 0, 'accepté', 1, '2022-03-31 18:54:38', '2022-03-31 20:20:19', 1),
(2, 1, 58, 3, 0, 'favorable', 1, '2022-03-31 18:54:38', '2022-03-31 20:26:36', 2),
(3, 1, 59, 2, 0, 'accepté', 1, '2022-03-31 18:54:38', '2022-04-01 08:39:40', 3),
(4, 1, -1, 1, NULL, NULL, 0, '2022-03-31 18:54:38', NULL, 3),
(5, 2, 57, 8, 0, 'refusé', 2, '2022-03-31 20:34:57', '2022-03-31 20:35:45', 1),
(6, 2, -1, 3, NULL, NULL, 0, '2022-03-31 20:34:57', NULL, 2),
(7, 2, -1, 2, NULL, NULL, 0, '2022-03-31 20:34:57', NULL, 3),
(8, 2, -1, 1, NULL, NULL, 0, '2022-03-31 20:34:57', NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `defaut_parametre_couleur`
--

CREATE TABLE `defaut_parametre_couleur` (
  `ID` int(11) NOT NULL,
  `CELLULE` varchar(100) COLLATE gb2312_bin NOT NULL,
  `CODE_COULEUR` varchar(100) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `defaut_parametre_couleur`
--

INSERT INTO `defaut_parametre_couleur` (`ID`, `CELLULE`, `CODE_COULEUR`) VALUES
(1, 'Body', '#f7f7f7'),
(2, 'Titre', '#29118c'),
(3, 'Menu', '#29118c'),
(4, 'Bas_menu', 'black'),
(5, 'Bar', '#ededed'),
(6, 'Logo', 'logo/logo_n.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `defaut_parametre_couleur_old`
--

CREATE TABLE `defaut_parametre_couleur_old` (
  `ID` int(11) NOT NULL,
  `CELLULE` varchar(100) COLLATE gb2312_bin NOT NULL,
  `CODE_COULEUR` varchar(100) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `defaut_parametre_couleur_old`
--

INSERT INTO `defaut_parametre_couleur_old` (`ID`, `CELLULE`, `CODE_COULEUR`) VALUES
(1, 'Body', '#f7f7f7'),
(2, 'Titre', '#29118c'),
(3, 'Menu', '#29118c'),
(4, 'Bas_menu', 'black'),
(5, 'Bar', '#ededed');

-- --------------------------------------------------------

--
-- Table structure for table `flux_conge`
--

CREATE TABLE `flux_conge` (
  `ID_FLUX_CONGE` int(11) NOT NULL,
  `ID_FROM` int(11) NOT NULL,
  `ID_TO` int(11) NOT NULL,
  `FROM_PORT` varchar(10) COLLATE gb2312_bin DEFAULT NULL,
  `TO_PORT` varchar(10) COLLATE gb2312_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `flux_conge`
--

INSERT INTO `flux_conge` (`ID_FLUX_CONGE`, `ID_FROM`, `ID_TO`, `FROM_PORT`, `TO_PORT`) VALUES
(1, 6, 2, 't', 'b'),
(2, 5, 2, 't', 'b'),
(3, 16, 9, 't', 'b'),
(4, 2, 1, 't', 'b'),
(5, 19, 13, 't', 'b'),
(6, 21, 13, 't', 'b'),
(7, 13, 3, 't', 'b'),
(8, 7, 2, 't', 'b'),
(9, 10, 7, 't', 'b'),
(10, 4, 2, 't', 'b'),
(11, 8, 3, 't', 'b'),
(12, 3, 2, 't', 'b'),
(13, 22, 10, 't', 'b'),
(14, 20, 13, 't', 'b'),
(15, 11, 4, 't', 'b'),
(16, 15, 11, 't', 'b'),
(17, 18, 13, 't', 'b'),
(18, 14, 8, 't', 'b'),
(19, 23, 11, 't', 'b'),
(20, 24, 11, 't', 'b'),
(21, 9, 7, 't', 'b'),
(22, 1, 10, 'r', 'l'),
(23, 17, 10, 't', 'b'),
(24, 12, 2, 'l', 'b'),
(25, 2, 10, 'r', 'l'),
(26, 4, 1, 't', 'b'),
(27, 6, 1, 't', 'b'),
(28, 5, 1, 't', 'b'),
(29, 3, 1, 't', 'b'),
(30, 7, 1, 't', 'b'),
(31, 12, 1, 'l', 'b');

-- --------------------------------------------------------

--
-- Table structure for table `fonctions`
--

CREATE TABLE `fonctions` (
  `ID_FONCTION` int(11) NOT NULL,
  `DESCRIPTION_FONCTION` varchar(200) NOT NULL,
  `LEVEL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fonctions`
--

INSERT INTO `fonctions` (`ID_FONCTION`, `DESCRIPTION_FONCTION`, `LEVEL`) VALUES
(1, 'Directeur Général', 1),
(2, 'Directeur Général Adjoint', 2),
(3, 'Directeur', 3),
(4, 'Cadre de Bureau', 4),
(5, 'Agent de Bureau', 5),
(6, 'Agent de service', 6);

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `ID_GRADE` int(11) NOT NULL,
  `DESCRIPTION_GRADE` varchar(200) NOT NULL,
  `ID_CATEGORIE_HIE` int(11) NOT NULL,
  `INDICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`ID_GRADE`, `DESCRIPTION_GRADE`, `ID_CATEGORIE_HIE`, `INDICE`) VALUES
(1, 'Directeur Général', 1, 2000),
(2, 'Directeur Général Ajoint', 1, 1800),
(3, 'Directeur', 1, 1600),
(4, 'Directeur-Adjoint', 1, 1500),
(5, 'Sous-Directeur', 1, 1400),
(6, 'Sous-Directeur Ajoint', 1, 1350),
(7, 'Attaché de Direction Principal', 2, 1300),
(8, 'Attaché de Direction', 2, 1200),
(9, 'Attaché de Direction Adjoint', 2, 1150),
(10, 'Fondé de pouvoir Principal', 2, 1100),
(11, 'Fondé de pouvoir', 2, 1000),
(12, 'Fondé de pouvoir Adjoint', 2, 850),
(13, 'Chef de service Principal', 2, 750),
(14, 'Chef de service', 2, 600),
(15, 'Chef de service Adjoint', 2, 530),
(16, 'Chef de division Principal', 3, 520),
(17, 'Chef de division', 3, 500),
(18, 'Chef de division Adjoint', 3, 480),
(19, 'Chef de bureau Principal', 3, 470),
(20, 'Chef de bureau', 3, 450),
(21, 'Chef de bureau Adjoint', 3, 400),
(22, 'Agent principal', 4, 350),
(23, 'Agent de 1ère classe', 4, 330),
(24, 'Agent de 2ème classe', 4, 300),
(25, 'Agent de 3ème classe', 4, 270),
(26, 'Agent de 4ème classe', 4, 250),
(27, 'Agent de 5ème classe', 4, 200),
(28, 'Agent de 6ème classe', 4, 180),
(29, 'Agent de 7ème classe', 4, 150),
(30, 'Agent de Service 1ère classe', 5, 140),
(31, 'Agent de Service 2ème classe', 5, 130),
(32, 'Agent de Service 3ème classe', 5, 120),
(33, 'Agent de Service 4ème classe', 5, 110),
(34, 'Agent de Service 5ème classe', 5, 100);

-- --------------------------------------------------------

--
-- Table structure for table `hierarchie`
--

CREATE TABLE `hierarchie` (
  `ID` int(11) NOT NULL,
  `APPELATION` varchar(500) NOT NULL,
  `NOM_RESPONSABLE` varchar(500) NOT NULL,
  `PRENOM_RESPONSABLE` varchar(500) NOT NULL,
  `FOTO` varchar(50) NOT NULL,
  `TELEPHONE` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `NIVEAU` int(11) NOT NULL,
  `MERE_ID` int(11) NOT NULL,
  `LOCATION` varchar(200) NOT NULL,
  `TEMPO` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hierarchie`
--

INSERT INTO `hierarchie` (`ID`, `APPELATION`, `NOM_RESPONSABLE`, `PRENOM_RESPONSABLE`, `FOTO`, `TELEPHONE`, `EMAIL`, `NIVEAU`, `MERE_ID`, `LOCATION`, `TEMPO`) VALUES
(1, 'New', '', '', '', '', '', 0, 0, '-113.2000122070312 -399.3999633789067', '1'),
(2, 'fab', '', '', '', '', '', 0, 0, '-185 -489.00000000000017', '2'),
(3, 'Jimy', '', '', '', '', '', 0, 0, '-259.0000305175782 -399.3999252319337', '3'),
(4, 'New', '', '', '', '', '', 0, 0, '-184.99999999999991 -403.00000000000045', '0');

-- --------------------------------------------------------

--
-- Table structure for table `hierarchie_relation`
--

CREATE TABLE `hierarchie_relation` (
  `FROM_H` varchar(20) COLLATE gb2312_bin NOT NULL,
  `TO_H` varchar(20) COLLATE gb2312_bin NOT NULL,
  `FROM_PORT` varchar(20) COLLATE gb2312_bin NOT NULL,
  `TO_PORT` varchar(20) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `hierarchie_relation`
--

INSERT INTO `hierarchie_relation` (`FROM_H`, `TO_H`, `FROM_PORT`, `TO_PORT`) VALUES
('2', '4', 'B', 'T'),
('2', '3', 'B', 'T'),
('2', '1', 'B', 'T');

-- --------------------------------------------------------

--
-- Table structure for table `jours_feries`
--

CREATE TABLE `jours_feries` (
  `ID_JOUR_FERIE` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `DESCRIPTION` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ou`
--

CREATE TABLE `ou` (
  `ID_OU` int(11) NOT NULL,
  `NOM` varchar(100) COLLATE gb2312_bin NOT NULL,
  `INTERNE_EXTERNE` varchar(20) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `ou`
--

INSERT INTO `ou` (`ID_OU`, `NOM`, `INTERNE_EXTERNE`) VALUES
(5, 'AA', 'INTERNE'),
(6, 'Credit', 'EXTERNE'),
(7, 'Direction Financiere', 'EXTERNE'),
(8, 'Direction Generale', 'EXTERNE'),
(9, 'Domain Controllers', 'EXTERNE'),
(10, 'IT Management', 'EXTERNE'),
(11, 'Mobile Devices', 'EXTERNE'),
(12, 'Office365', 'EXTERNE'),
(13, 'Printers', 'EXTERNE'),
(14, 'Windows 10', 'EXTERNE'),
(15, 'Windows 10 Test', 'EXTERNE'),
(16, 'Windows Server 2019', 'EXTERNE'),
(17, 'Windows Server 2019 Test', 'EXTERNE'),
(18, 'nouveau', 'INTERNE');

-- --------------------------------------------------------

--
-- Table structure for table `parametrage_augmentation_conge`
--

CREATE TABLE `parametrage_augmentation_conge` (
  `ID_PARAMTRAGE_AUGMENTATION` int(11) NOT NULL,
  `ID_PARAMETRAGE_CONGE` int(11) NOT NULL DEFAULT '1',
  `ANS` int(11) NOT NULL,
  `NOMBRE` int(11) NOT NULL,
  `STATUT_REPETION` int(11) NOT NULL DEFAULT '0' COMMENT '1repeter 0 non repeter'
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `parametrage_augmentation_conge`
--

INSERT INTO `parametrage_augmentation_conge` (`ID_PARAMTRAGE_AUGMENTATION`, `ID_PARAMETRAGE_CONGE`, `ANS`, `NOMBRE`, `STATUT_REPETION`) VALUES
(1, 1, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `parametrage_conge`
--

CREATE TABLE `parametrage_conge` (
  `ID_PARAMTRAGE_CONGE` int(11) NOT NULL,
  `NOMBRE_JOUR_INTILIALE` int(11) NOT NULL,
  `MOIS_MINIMUM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `parametrage_conge`
--

INSERT INTO `parametrage_conge` (`ID_PARAMTRAGE_CONGE`, `NOMBRE_JOUR_INTILIALE`, `MOIS_MINIMUM`) VALUES
(1, 20, 6);

-- --------------------------------------------------------

--
-- Table structure for table `poste`
--

CREATE TABLE `poste` (
  `ID_POSTE` int(11) NOT NULL,
  `DESCRIPTION_POSTE` varchar(200) COLLATE gb2312_bin NOT NULL,
  `ABREVIATION_POSTE` varchar(200) COLLATE gb2312_bin DEFAULT NULL,
  `ID_SERVICE` int(11) DEFAULT NULL,
  `LOC` text COLLATE gb2312_bin
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `poste`
--

INSERT INTO `poste` (`ID_POSTE`, `DESCRIPTION_POSTE`, `ABREVIATION_POSTE`, `ID_SERVICE`, `LOC`) VALUES
(1, 'ADMINISTRATEUR DIRECTEUR GENERAL', 'ADG', 1, '94.6000061035157 -180.14544677734344'),
(2, 'DIRECTEUR GENERAL ADJOINT', 'DGA', 1, '-93.80010986328121 -125.80001831054705'),
(3, 'DIRECTEUR DES OPERATIONS', 'DOP', 5, '76.99996948242188 5.600006103515624'),
(4, 'DIRECTEUR DES CREDIT', 'DIR. CREDIT', 2, '-263.7999877929688 2.599945068359374'),
(5, 'DIRECTEUR DE GESTION DES RISQUES', 'DGR', 3, '-21.39996337890622 3.40008544921875'),
(6, 'DIRECTEUR D\'AUDIT INTERNE', 'D-AUDIT-INT', 4, '-160.80004882812497 0.20007324218750056'),
(7, 'DIRECTEUR FINANCIER', 'DAF', 11, '165.19995117187486 4.200042724609389'),
(8, 'CHEF DE SERVICE INFORMATIQUE', 'CHEF IT', 7, '-84.60009765624997 91.59994506835943'),
(9, 'CHEF DE SERVICE COMPABILITE', 'CHEF COMPTABLE', 8, '199.5999450683593 95.79992675781247'),
(10, 'CHEF DE SEVICE RESSOURCES HUMAINES ET LOGISTIQUE', 'CHEF RH-LOGISTIQUE', 6, '366.6000976562504 69.60000610351564'),
(11, 'CHEF DE DEPARTEMENT CREDIT', 'CHEF D-CREDIT', 9, '-279.3999938964843 85.60000610351561'),
(12, 'SECRETAIRE DE DIRECTION', 'SECR. DIRECTION', 1, '326.199890136719 -93.3999938964844'),
(13, 'CHEF D\'AGENCE DU SIEGE', 'CHEF AG SIEGE', 10, '41.20007324218749 98.00012207031244'),
(14, 'CADRE DE SERVICE INFORMATIQUE', 'CADRE IT', 7, '-89.20007324218743 157.99993896484386'),
(15, 'ANALYSTE CREDIT', 'ANAL. CRED', 9, '-343.1999816894531 193.60003662109375'),
(16, 'AIDE COMPTABLE', 'AIDE COMPTABLE', 8, '226.20007324218747 181.2000122070312'),
(17, 'PLANTON D\'AGENCE DU SIEGE', 'PLANTON AGENCE DU SIEGE', 10, '541 184.99993896484403'),
(18, 'CAISSIER AGENCE GITEGA', 'CAISSIER-GTG', 10, '116.80004882812503 239.3999328613282'),
(19, 'TRESORIER AGENCE GITEGA', 'TRESORIER-GTG', 10, '211.79998779296866 277.60009765625034'),
(20, 'CADRE DU SERVICE DES OPERATIONS DIVERSES GITEGA', 'CADRE -OPD GTG', 10, '-19.39990234375002 242.80001831054676'),
(21, 'AGENTS DE COMPENSATIONS GITEGA', 'AGENT COMPENSATION GTG', 10, '-170.6000366210938 284.800079345703'),
(22, 'CHAUFFEUR', 'CHAUFFEUR', 6, '389.00000000000006 166.00006103515628'),
(23, 'ANALYSTE CREDIT PRINCIPAL(CR JEUNES)', 'ANAL. CRED. PRINC.(CR JEUNES)', 25, '-338 243'),
(24, 'ANALYSTE CREDIT PRINCIPAL(COMMERCIAL)', 'ANAL. CRED. PRINC.(COM)', 21, '-217 201'),
(25, 'CHEF DE DEPARTEMENT INFORMATIQUE', ' CHEF D-IT', 26, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `presence`
--

CREATE TABLE `presence` (
  `PRESENCE_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `PRESENCE_TIME_ID` int(11) NOT NULL,
  `DATE_HEURE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `presence`
--

INSERT INTO `presence` (`PRESENCE_ID`, `USER_ID`, `PRESENCE_TIME_ID`, `DATE_HEURE`) VALUES
(1, 15, 1, '2022-08-11 14:32:48'),
(2, 15, 2, '2022-08-11 14:33:04'),
(3, 15, 3, '2022-08-11 14:33:07'),
(4, 15, 4, '2022-08-11 14:33:09'),
(5, 1, 1, '2022-08-17 16:11:49'),
(6, 15, 1, '2022-08-17 16:12:13'),
(7, 1, 1, '2022-09-13 08:22:25'),
(8, 1, 2, '2022-09-13 08:33:08'),
(9, 15, 1, '2022-09-26 10:22:55'),
(10, 15, 2, '2022-09-26 14:28:31'),
(11, 55, 1, '2022-10-05 12:02:19');

-- --------------------------------------------------------

--
-- Table structure for table `presence_time`
--

CREATE TABLE `presence_time` (
  `PRESENCE_TIME_ID` int(11) NOT NULL,
  `DESCRIPTION` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `presence_time`
--

INSERT INTO `presence_time` (`PRESENCE_TIME_ID`, `DESCRIPTION`) VALUES
(1, 'MATIN'),
(2, 'PAUSE-MIDI'),
(3, 'RETOUR-PM'),
(4, 'RENTRER-SOIR');

-- --------------------------------------------------------

--
-- Table structure for table `profilold`
--

CREATE TABLE `profilold` (
  `ID_PROFIL` int(11) NOT NULL,
  `DESCRIPTION_PROFIL` varchar(200) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `profilold`
--

INSERT INTO `profilold` (`ID_PROFIL`, `DESCRIPTION_PROFIL`) VALUES
(1, 'Super admin'),
(2, 'Admin'),
(3, 'user'),
(8, 'username');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `ID_ROLE` int(11) NOT NULL,
  `DESCRIPTION_ROLE` varchar(200) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`ID_ROLE`, `DESCRIPTION_ROLE`) VALUES
(1, 'SUPER ADMIN'),
(2, 'ADMIN'),
(3, 'USER'),
(7, 'RH');

-- --------------------------------------------------------

--
-- Table structure for table `role_url`
--

CREATE TABLE `role_url` (
  `ID_ROLE_URL` int(11) NOT NULL,
  `ID_ROLE` int(11) NOT NULL,
  `ID_URL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `role_url`
--

INSERT INTO `role_url` (`ID_ROLE_URL`, `ID_ROLE`, `ID_URL`) VALUES
(1, 1, 1),
(2, 1, 2),
(10, 1, 4),
(11, 1, 5),
(12, 1, 6),
(13, 1, 7),
(15, 3, 2),
(16, 7, 2),
(28, 1, 19),
(29, 1, 20),
(30, 1, 21),
(31, 1, 22),
(32, 2, 17),
(33, 1, 23),
(45, 2, 2),
(46, 2, 4),
(47, 2, 5),
(48, 2, 6),
(49, 2, 7),
(51, 2, 20),
(52, 2, 21),
(53, 2, 22),
(54, 2, 23),
(55, 1, 24),
(56, 1, 25),
(57, 3, 19),
(58, 2, 19),
(59, 7, 19),
(60, 1, 26),
(61, 1, 27),
(62, 1, 28),
(63, 1, 29),
(64, 1, 30),
(65, 1, 31),
(66, 1, 32),
(67, 1, 33),
(68, 1, 34),
(69, 1, 35),
(70, 1, 36),
(71, 1, 36),
(72, 1, 37),
(73, 1, 38),
(74, 1, 39),
(75, 1, 40),
(76, 1, 41),
(77, 1, 42),
(78, 1, 43),
(79, 1, 44),
(80, 1, 45),
(81, 2, 28),
(82, 2, 29),
(83, 2, 24),
(84, 2, 30),
(85, 2, 35),
(86, 2, 33),
(87, 2, 34),
(88, 2, 37),
(89, 2, 36),
(90, 2, 38),
(91, 2, 39),
(92, 2, 40),
(93, 2, 41),
(94, 2, 44),
(95, 3, 30),
(96, 3, 33),
(97, 3, 34),
(98, 3, 35),
(99, 3, 36),
(100, 3, 37),
(101, 3, 38),
(102, 3, 23),
(103, 1, 46),
(104, 7, 4),
(105, 7, 5),
(106, 7, 6),
(107, 7, 7),
(108, 7, 20),
(109, 7, 21),
(110, 7, 22),
(111, 7, 23),
(112, 7, 24),
(113, 7, 28),
(114, 7, 29),
(115, 7, 30),
(116, 7, 33),
(117, 7, 34),
(118, 7, 35),
(119, 7, 36),
(120, 7, 37),
(121, 7, 38),
(122, 7, 39),
(123, 7, 40),
(124, 7, 41),
(125, 7, 44),
(126, 7, 46),
(127, 1, 47);

-- --------------------------------------------------------

--
-- Table structure for table `services_ou`
--

CREATE TABLE `services_ou` (
  `ID_SERVICE` int(11) NOT NULL,
  `DESCRIPTION` varchar(200) COLLATE gb2312_bin NOT NULL,
  `ABREVIATION` varchar(500) COLLATE gb2312_bin DEFAULT NULL,
  `ID_UT_CHEF` int(11) DEFAULT NULL,
  `ID_UT_INTERIM` int(11) DEFAULT NULL,
  `ID_PARENT` int(11) NOT NULL DEFAULT '0',
  `NIVEAU` int(11) NOT NULL DEFAULT '0',
  `LOC` text COLLATE gb2312_bin
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `services_ou`
--

INSERT INTO `services_ou` (`ID_SERVICE`, `DESCRIPTION`, `ABREVIATION`, `ID_UT_CHEF`, `ID_UT_INTERIM`, `ID_PARENT`, `NIVEAU`, `LOC`) VALUES
(1, 'DIRECTION GENERALE', 'DG', 7, NULL, 0, 0, '182.99999999999997 -194.9999999999999'),
(2, 'DIRECTION DE CREDIT', 'DC', 25, NULL, 1, 1, '-39.999999999999964 -108.00000000000003'),
(3, 'DIRECTION DE GESTION DES RISQUES', 'DGR', 27, NULL, 1, 1, '542.0000000000002 -105.99999999999999'),
(4, 'DIRECTION D\'AUDIT INTERNE', 'DAI', 24, NULL, 1, 1, '-241.00000000000006 -108.00000000000006'),
(5, 'DIRECTION DES OPERATIONS', 'DOP', 45, NULL, 1, 1, '339.00000000000045 -110.00000000000001'),
(6, 'SERVICE RESSOURCES HUMAINES ET LOGISTIQUES', 'SRHL', 9, NULL, 11, 2, '155.99999999999991 15.99999999999995'),
(7, 'SERVICE INFORMATIQUE', 'SI', 15, NULL, 5, 2, '336.9999999999996 18.000000000000018'),
(8, 'SERVICE COMPTABILITE', 'SC', 12, NULL, 11, 2, '156.9999999999999 -48.000000000000036'),
(10, 'AGENCE GITEGA', '', 40, NULL, 5, 2, '340.0000000000005 -46.000000000000014'),
(11, 'DIRECTION FINANCIERE', 'DAF', 28, NULL, 1, 1, '136.00000000000003 -109.00000000000013'),
(12, 'SERVICE CONTROLE DES OPERATIONS ET CONFORMITE', 'S. CONTROL DES OPER. & CONF', 0, NULL, 3, 2, '541 -32.00000000000013'),
(13, 'ASSEMBLEE GENERALE DES ACTIONNAIRES', 'ASSEMBLEE GENERALE DES ACTIONNAIRES', NULL, NULL, 0, 0, '182.99999999999991 -349.0000000000001'),
(14, 'CONSEIL D\'ADMINISTRATION', 'CA', NULL, NULL, 0, 0, '182.9999999999999 -269.9999999999999'),
(15, 'COMITE D\'AUDIT', 'COMITE D\'AUDIT', NULL, NULL, 0, 0, '-228.99999999999983 -198.99999999999991'),
(16, 'COMITE DE CREDIT', 'COMITE DE CREDIT', NULL, NULL, 0, 0, '-54.999999999999396 -199.99999999999974'),
(17, 'COMITE DE GESTION DES RISQUES', 'COMITE DE GESTION DES RISQUES', NULL, NULL, 0, 0, '522 -202.99999999999991'),
(18, 'COMITE DE NOMINATION ET DE REMUNERATION', 'COMITE DE NOMINATION ET DE REMUNERATION', NULL, NULL, 0, 0, '691.0000000000002 -201.99999999999991'),
(19, 'DEPARTEMENT DES CREDITS', 'DEPARTEMENT DES CREDITS', 64, NULL, 0, 0, '-40.000000000000036 -61.99999999999996'),
(21, 'SERVICE CREDITS COMMERCIAUX', 'Service Crédits Commerciaux', NULL, NULL, 0, 0, '-203.00000000000014 11.999999999999998'),
(22, 'SERVICE JURIDIQUE,RECOUVREMENT ET CONTENTIEUX', 'Service Juridique,Recouvrement et Contentieux ', NULL, NULL, 0, 0, '151.99999999999994 111'),
(23, 'SERVICE COMMERCIAL', 'Service Commercial', NULL, NULL, 0, 0, '342.99999999999994 161.0000000000001'),
(24, 'SERVICE ETRANGER', 'SERVICE ETRANGER', NULL, NULL, 0, 0, '334.9999999999997 81.00000000000007'),
(25, 'SERVICE CREDITS DES JEUNES', 'SERVICE CREDITS DES JEUNES', NULL, NULL, 0, 0, '-18 12'),
(26, 'DEPARTEMENT INFORMATIQUE', 'DEPARTEMENT IT', 6, NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service_ou_hierarchie`
--

CREATE TABLE `service_ou_hierarchie` (
  `ID_SERVICE_HIE` int(11) NOT NULL,
  `ID_FROM` int(11) NOT NULL,
  `ID_TO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `service_ou_hierarchie`
--

INSERT INTO `service_ou_hierarchie` (`ID_SERVICE_HIE`, `ID_FROM`, `ID_TO`) VALUES
(1, 1, 2),
(2, 1, 4),
(3, 1, 11),
(4, 1, 5),
(5, 14, 17),
(6, 3, 12),
(7, 14, 16),
(8, 14, 1),
(9, 11, 8),
(10, 14, 15),
(11, 13, 14),
(12, 16, 2),
(13, 17, 3),
(14, 14, 18),
(15, 5, 10),
(16, 11, 6),
(17, 11, 22),
(18, 15, 4),
(19, 2, 19),
(20, 5, 7),
(21, 5, 24),
(22, 5, 23),
(23, 19, 21),
(24, 19, 20),
(25, 1, 3),
(26, 19, 25);

-- --------------------------------------------------------

--
-- Table structure for table `stock_item`
--

CREATE TABLE `stock_item` (
  `ID_ITEM` int(11) NOT NULL,
  `DESCRIPTION` varchar(250) COLLATE gb2312_bin NOT NULL,
  `SERIE_NUMBER` text COLLATE gb2312_bin NOT NULL,
  `ID_TYPE` int(11) NOT NULL,
  `ID_MODEL` int(11) NOT NULL,
  `ID_MARQUE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

-- --------------------------------------------------------

--
-- Table structure for table `stock_item_marque`
--

CREATE TABLE `stock_item_marque` (
  `ID_MARQUE` int(11) NOT NULL,
  `ID_MODEL` int(11) NOT NULL,
  `DESCRIPTION` text COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

-- --------------------------------------------------------

--
-- Table structure for table `stock_item_model`
--

CREATE TABLE `stock_item_model` (
  `ID_MODEL` int(11) NOT NULL,
  `ID_TYPE` int(11) NOT NULL,
  `DESCRIPTION` text COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

-- --------------------------------------------------------

--
-- Table structure for table `stock_item_type`
--

CREATE TABLE `stock_item_type` (
  `ID_TYPE` int(11) NOT NULL,
  `DESCRIPTION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

-- --------------------------------------------------------

--
-- Table structure for table `type_congeold`
--

CREATE TABLE `type_congeold` (
  `ID_CONGE` int(11) NOT NULL,
  `DESCRIPTION_CONGE` varchar(200) COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `type_congeold`
--

INSERT INTO `type_congeold` (`ID_CONGE`, `DESCRIPTION_CONGE`) VALUES
(1, 'Congé annuel à retenir'),
(2, 'Congé de circonstance'),
(3, 'Congé sans solde'),
(4, 'Congé de récupération');

-- --------------------------------------------------------

--
-- Table structure for table `type_conges`
--

CREATE TABLE `type_conges` (
  `ID_TYPE_CONGE` int(11) NOT NULL,
  `DESCRIPTION_CONGE` varchar(100) COLLATE gb2312_bin NOT NULL,
  `A_COMPTER` int(11) NOT NULL COMMENT '0NON,1OUI'
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `type_conges`
--

INSERT INTO `type_conges` (`ID_TYPE_CONGE`, `DESCRIPTION_CONGE`, `A_COMPTER`) VALUES
(1, 'Congé Annuel', 1),
(2, 'Congé sans solde (à déduire des appointements)', 1),
(3, 'Congé de Circonstance', 0),
(4, 'Congé de Récupération', 0);

-- --------------------------------------------------------

--
-- Table structure for table `type_conge_champ`
--

CREATE TABLE `type_conge_champ` (
  `ID_TYPE_CHAMP` int(11) NOT NULL,
  `DESCIPTION_CHAMP` varchar(200) COLLATE gb2312_bin NOT NULL,
  `ID_TYPE_CONGE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `type_conge_champ`
--

INSERT INTO `type_conge_champ` (`ID_TYPE_CHAMP`, `DESCIPTION_CHAMP`, `ID_TYPE_CONGE`) VALUES
(1, 'Exercice', 1),
(2, 'Durée', 1),
(3, 'Motif', 1),
(4, 'Type de circonstance', 2),
(5, 'Durée', 2),
(6, 'A déduire des appointements-Durée', 3),
(7, 'Durée', 4);

-- --------------------------------------------------------

--
-- Table structure for table `type_product`
--

CREATE TABLE `type_product` (
  `TYPE_ID` int(11) NOT NULL,
  `TYPE_NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type_product`
--

INSERT INTO `type_product` (`TYPE_ID`, `TYPE_NAME`) VALUES
(1, 'ww'),
(2, 'aa'),
(3, 'wwee'),
(4, 'ff');

-- --------------------------------------------------------

--
-- Table structure for table `url`
--

CREATE TABLE `url` (
  `ID_URL` int(11) NOT NULL,
  `LINK_URL` text COLLATE gb2312_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `url`
--

INSERT INTO `url` (`ID_URL`, `LINK_URL`) VALUES
(1, '/parametrage/roles'),
(2, '/accueil'),
(4, '/parametrage/ou/list_ou'),
(5, '/parametrage/poste/list_posts'),
(6, '/parametrage/hierarchie'),
(7, '/parametrage/flux_conge'),
(19, '/profile/'),
(20, '/users/detail/'),
(21, '/parametrage/ou/update/'),
(22, '/parametrage/poste/update/'),
(23, '/users/list_users'),
(24, '/parametrage/conge_param'),
(28, '/parametrage/conge_init/list'),
(29, '/parametrage/conge_init/modif/'),
(30, '/conge/historique'),
(33, '/conge/modifier/'),
(34, '/conge/demande'),
(35, '/conge/detail/'),
(36, '/conge/pdf/'),
(37, '/notifications/notification_conge'),
(38, '/notifications/traiter_conge/'),
(39, '/parametrage/conge_solde_user'),
(40, '/parametrage/conge_tout'),
(41, '/parametrage/conge_tout/list'),
(44, '/parametrage/conge_tout/detail/'),
(46, '/'),
(47, '/parametrage/jours_feries');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `ID` int(20) NOT NULL,
  `ID_ADMIN` int(11) NOT NULL DEFAULT '0',
  `NOM` varchar(50) NOT NULL,
  `PRENOM` varchar(50) NOT NULL,
  `TELEPHONE` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PWD` varchar(50) NOT NULL,
  `ID_SERVICE` int(11) DEFAULT NULL,
  `ID_OU` int(11) NOT NULL DEFAULT '0',
  `ID_POSTE` int(11) NOT NULL DEFAULT '0',
  `CONNECTED` tinyint(4) DEFAULT '0',
  `DATE_CONNECT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `INTERNE_EXTERNE` varchar(100) NOT NULL DEFAULT 'INTERNE',
  `FOTO` varchar(200) DEFAULT NULL,
  `SIGNATURE` varchar(50) DEFAULT NULL,
  `DATE_EMBAUCHE` date DEFAULT NULL,
  `MATRICULE` varchar(20) DEFAULT NULL,
  `STATUT` int(11) NOT NULL DEFAULT '1' COMMENT '0 Bloqué 1Actif',
  `SOLDE_CONGE_INITIAL` int(11) NOT NULL DEFAULT '0',
  `DATE_SOLDE_CONGE` date DEFAULT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `GENRE` int(11) DEFAULT NULL COMMENT '1 Masculin 2Feminin',
  `ID_GRADE` int(11) DEFAULT NULL,
  `ID_FONCTION` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`ID`, `ID_ADMIN`, `NOM`, `PRENOM`, `TELEPHONE`, `EMAIL`, `USERNAME`, `PWD`, `ID_SERVICE`, `ID_OU`, `ID_POSTE`, `CONNECTED`, `DATE_CONNECT`, `INTERNE_EXTERNE`, `FOTO`, `SIGNATURE`, `DATE_EMBAUCHE`, `MATRICULE`, `STATUT`, `SOLDE_CONGE_INITIAL`, `DATE_SOLDE_CONGE`, `USER_ID`, `GENRE`, `ID_GRADE`, `ID_FONCTION`) VALUES
(1, 0, 'admin', 'admin', '12', 'admin@admin', 'fab', 'WS', 0, 0, 0, 0, '0000-00-00 00:00:00', 'INTERNE', 'uploads/profiles/1646752594567.jpg', 'uploads/signatures/s1647871408034.jpg', '2022-03-01', 'BIJE0012', 0, 0, NULL, NULL, 1, 0, 0),
(2, 0, 'aa', 'aa', '14', 'a@ss', 'fab1', 'WS', 0, 0, 0, 0, '0000-00-00 00:00:00', 'INTERNE', 'uploads/profiles/1642874513573.png', NULL, NULL, '', 0, 0, NULL, NULL, NULL, 0, 0),
(3, 0, 'veeam', 'service', '', 'veeam_service@bije.bi', 'veeam_service@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(4, 0, 'test', 'admin', '', 'test.admin@bije.bi', 'test.admin@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(5, 0, 'vcenter', 'admin', '', 'vcenter.admin@bije.bi', 'vcenter.admin@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(6, 1, 'KARENZO', 'Dieudonné', '+25775942049', 'dkarenzo@bije.bi', 'dkarenzo@bije.bi', '', 26, 0, 25, 0, '2022-11-04 09:34:18', 'EXTERNE', 'uploads/profiles/1647506956648.jpg', 'uploads/signatures/s1647499654785.jpg', '2020-06-15', 'BIJE0008', 1, 1, '2022-03-17', 6, 1, 0, 0),
(7, 0, 'NIYUHIRE', 'Sixte', '', 'sniyuhire@bije.bi', 'sniyuhire@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(8, 0, 'NDAYAMBAJE', 'Rutcher', '', 'rndayambaje@bije.bi', 'rndayambaje@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(9, 0, 'NSENGIYUMVA', 'Mireine', '', 'mnsengiyumva@bije.bi', 'mnsengiyumva@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(10, 0, 'NDAYISENGA', 'Godeberthe', '', 'gndayisenga@bije.bi', 'gndayisenga@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(11, 0, 'NDACASABA', 'Ruben', '', 'rndacasaba@bije.bi', 'rndacasaba@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(12, 0, 'NJEJIMANA', 'Claver', '', 'cnjejimana@bije.bi', 'cnjejimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(13, 0, 'test', 'Credit', '', 'test.credit@bije.bi', 'test.credit@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(14, 0, 'test', 'IT', '', 'test.it@bije.bi', 'test.it@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(15, 0, 'MANIRAMBONA', 'Fabrice', '+257 79 158 793', 'fmanirambona@bije.bi', 'fmanirambona@bije.bi', '', 7, 0, 14, 0, '2022-11-04 09:34:18', 'EXTERNE', 'uploads/profiles/1647507181942.jpg', 'uploads/signatures/s1647867315141.jpg', '2020-10-14', 'BIJE0012', 1, 1, '2022-03-04', 1, 1, 0, 0),
(16, 0, 'NINGABIRA', 'Théophile', '+257 71 80 81 89', 'tningabira@bije.bi', 'tningabira@bije.bi', '', 7, 0, 14, 0, '2022-11-04 09:34:18', 'EXTERNE', 'uploads/profiles/1647850319081.jpg', 'uploads/signatures/s1647877261231.jpg', '2020-10-19', 'BIJE0013', 1, 0, '2022-03-21', 16, 1, 0, 0),
(17, 0, 'HABIMANA', 'Fidèle', '+257 79 150 202', 'fhabimana@bije.bi', 'fhabimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(18, 0, 'KWIZERA', 'Arnaud', '+257 71 645459', 'akwizera@bije.bi', 'akwizera@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(19, 0, 'NGENDAKUMANA', 'Florence', '+257 79 709 125', 'fngendakumana@bije.bi', 'fngendakumana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(20, 0, 'NDIHOKUBWAYO', 'Joseph', '+257 68 064 261', 'jndihokubwayo@bije.bi', 'jndihokubwayo@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(21, 0, 'NIYOMWUNGERE', 'Therence', '+257 68 098 237', 'tniyomwungere@bije.bi', 'tniyomwungere@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(22, 0, 'NDAYIZEYE', 'Audace', '61100075', 'andayizeye@bije.bi', 'andayizeye@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(23, 0, 'cisco', 'cisco', '', 'cisco@bije.bi', 'cisco@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(24, 0, 'NKENGURUTSE', 'Geoffrey', '79590740', 'gnkengurutse@bije.bi', 'gnkengurutse@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(25, 0, 'NDAGIJIMANA', 'Christophe', '79151297', 'cndagijimana@bije.bi', 'cndagijimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(26, 0, 'KANYAMUNEZA', 'Gamaliel', '61978231', 'gkanyamuneza@bije.bi', 'gkanyamuneza@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(27, 0, 'NIYONKURU', 'Agnès', '79958843', 'aniyonkuru@bije.bi', 'aniyonkuru@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(28, 0, 'NTWARI', 'Abdon de Dieu', '79 969 669', 'antwari@bije.bi', 'antwari@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(29, 0, 'NKUNZIMANA', 'Jean Marie', '68050350', 'jmnkunzimana@bije.bi', 'jmnkunzimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(30, 0, 'MUBERA', 'Prosper', '79881317', 'pmubera@bije.bi', 'pmubera@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(31, 0, 'HAVYARIMANA', 'Antoine', '61973096', 'ahavyarimana@bije.bi', 'ahavyarimana@bije.bi', '', 10, 0, 19, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, 'null', 1, 0, NULL, NULL, NULL, 0, 0),
(32, 0, 'KWIZERA', 'Gloria', '68751704', 'gkwizera@bije.bi', 'gkwizera@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(33, 0, 'NDAYISENGA', 'Egide', '61795595', 'endayisenga@bije.bi', 'endayisenga@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(34, 0, 'CIZA', 'Jean Paul', '69128758', 'jpciza@bije.bi', 'jpciza@bije.bi', '', 0, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, '0000-00-00', '', 1, 0, NULL, NULL, 1, 0, 0),
(35, 0, 'NDIHOKUBWAYO', 'Mambo Lyna', '62655544', 'mlndihokubwayo@bije.bi', 'mlndihokubwayo@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(36, 0, 'ISHIMWE', 'Arlette', '69954164', 'aishimwe@bije.bi', 'aishimwe@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(37, 0, 'NDIKURIYO', 'Cynthia', '68924481', 'cndikuriyo@bije.bi', 'cndikuriyo@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(38, 0, 'NSHIMIRIMANA', 'Emmanuel', '61052309', 'enshimirimana@bije.bi', 'enshimirimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(39, 0, 'BIGIRIMANA', 'Dieudonné', '69103877', 'dbigirimana@bije.bi', 'dbigirimana@bije.bi', '', 10, 0, 21, 0, '2022-11-04 09:34:18', 'EXTERNE', 'uploads/profiles/1644168787142.png', NULL, '2021-08-02', ' ', 1, 0, '2022-02-28', 1, 2, 0, 0),
(40, 0, 'CUBAHIRO', 'Carine', '69365141', 'ccubahiro@bije.bi', 'ccubahiro@bije.bi', '', 0, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, 'null', 1, 0, NULL, NULL, NULL, 0, 0),
(41, 0, 'BURACA', 'Godfroid', '69454746', 'gburaca@bije.bi', 'gburaca@bije.bi', '', 9, 0, 11, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, '2022-03-10', 'null', 0, 0, NULL, NULL, NULL, 0, 0),
(42, 0, 'admin vcenter', '', '', 'admin.vcenter@bije.bi', 'admin.vcenter@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(43, 0, 'test1', '', '', 'test1@bije.bi', 'test1@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(44, 0, 'Harell', '', '', 'Harell@bije.bi', 'Harell@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(45, 0, 'MANIRAMBONA', 'Laurent', '79567456', 'lmanirambona@bije.bi', 'lmanirambona@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, 'null', 1, 0, NULL, NULL, 1, 0, 0),
(46, 0, 'NDAYIZEYE', 'François', '69704887', 'fndayizeye@bije.bi', 'fndayizeye@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(47, 0, 'Compensateur', '', '', 'Compensateur@bije.bi', 'Compensateur@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(48, 0, 'Trend', 'Micro', '', 'trendmicro@bije.bi', 'trendmicro@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(49, 0, 'MPAWENAYO', 'Jean Marie', '61000549', 'jmmpawenayo@bije.bi', 'jmmpawenayo@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(50, 0, 'NDIKUMWENAYO', 'Prosper', '71555742/68198115', 'pndikumwenayo@bije.bi', 'pndikumwenayo@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(51, 0, 'NDAYIKEZE', 'Médiatrice', '69704887/79539499', 'mndayikeze@bije.bi', 'mndayikeze@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(52, 0, 'E-controller', '', '', 'econtroller@bije.bi', 'econtroller@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, 0),
(53, 0, 'NINGABIRAAdmin', 'TheophileAdmin', '', 'tningabiraadmin@bije.bi', 'tningabiraadmin@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(54, 0, 'KARENZOAdmin', 'DieudonneAdmin', '', 'dkarenzoadmin@bije.bi', 'dkarenzoadmin@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(55, 0, 'MANIRAMBONAadmin', 'Fabriceadmin', '', 'fmanirambonaAdmin@bije.bi', 'fmanirambonaAdmin@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, 0, 0),
(56, 56, 'informaticien', 'informaticien', '45', 'manirambonafabrice@gmail.com', 'informaticien', 'X\\', 7, 0, 14, 0, '2022-03-17 20:05:54', 'INTERNE', NULL, 'uploads/signatures/s1648751615357.jpg', '2021-01-08', 'BIJE1236', 1, 0, '2022-03-31', 1, 1, 0, 0),
(57, 0, 'chef informatique', 'chef', '14', 'manirambonafabrice@gmail.com', 'chef_it', 'RZ', 7, 0, 8, 0, '2022-03-17 20:28:18', 'INTERNE', NULL, 'uploads/signatures/s1647954355910.jpg', '2020-03-19', '', 1, 0, NULL, NULL, 1, 0, 0),
(58, 0, 'directeur', 'operation', '459', 'manirambonafabrice@gmail.com', 'dop', 'U]', 5, 0, 3, 0, '2022-03-21 18:18:39', 'INTERNE', NULL, 'uploads/signatures/s1647953722854.jpg', NULL, 'BIJE1236', 1, 0, NULL, NULL, 1, 0, 0),
(59, 59, 'directeur', 'ajoint', '7899', 'manirambonafabrice@gmail.com', 'dga', 'UU', 1, 0, 2, 0, '2022-03-21 18:21:04', 'INTERNE', NULL, 'uploads/signatures/s1648753621021.jpg', NULL, 'BIJE0089', 1, 0, NULL, NULL, 2, 0, 0),
(60, 0, 'administrateur', 'directeur generale', '78956', 'manirambonafabrice@gmail.com', 'adg', 'PV', 1, 0, 1, 0, '2022-03-21 18:22:12', 'INTERNE', NULL, NULL, NULL, 'BIJE0060', 1, 0, NULL, NULL, 1, 0, 0),
(61, 1, 'Ressources ', 'humaines', '789458', 'manirambonafabrice@gmail.com', 'rh', 'CZ', 6, 0, 10, 0, '2022-03-30 11:44:12', 'INTERNE', NULL, NULL, NULL, 'bije1254', 1, 0, NULL, NULL, 2, 14, 4),
(62, 0, 'MUVUNYI', 'Trinité', '79419696/69525995', 'tmuvunyi@bije.bi', 'tmuvunyi@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(63, 0, 'NDIKURIYO', 'Félicité', '79944472/69062255', 'fndikuriyo@bije.bi', 'fndikuriyo@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(64, 0, 'MANIRAKIZA', 'Augustin', '79700149', 'amanirakiza@bije.bi', 'amanirakiza@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(65, 0, 'NIZIGIYIMANA', 'Sandrine', '', 'snizigiyimana@bije.bi', 'snizigiyimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(66, 0, 'IRAMBONA', 'Gertrude', '61094533', 'girambona@bije.bi', 'girambona@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(67, 0, 'MBONIHANKUYE', 'Ildephonse', '68404435', 'imbonihankuye@bije.bi', 'imbonihankuye@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(68, 0, 'BIGIRIMANA', 'Laurence', '69504271', 'lbigirimana@bije.bi', 'lbigirimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(69, 0, 'NIYUNGEKO', 'Protais', '', 'pniyungeko@bije.bi', 'pniyungeko@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(70, 0, 'HAKIZIMANA', 'Viateur', '61782812', 'vhakizimana@bije.bi', 'vhakizimana@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(71, 0, 'MANIRAMBONA', 'Emmanuel', '', 'emanirambona@bije.bi', 'emanirambona@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL),
(72, 0, 'NIYONZIMA', 'Frédéric', '69 967 173', 'fniyonzima@bije.bi', 'fniyonzima@bije.bi', '', NULL, 0, 0, 0, '2022-11-04 09:34:18', 'EXTERNE', NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs_role`
--

CREATE TABLE `utilisateurs_role` (
  `ID` int(11) NOT NULL,
  `ID_UT` int(11) NOT NULL,
  `ID_ROLE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COLLATE=gb2312_bin;

--
-- Dumping data for table `utilisateurs_role`
--

INSERT INTO `utilisateurs_role` (`ID`, `ID_UT`, `ID_ROLE`) VALUES
(26, 0, 3),
(129, 41, 3),
(137, 39, 3),
(168, 15, 2),
(169, 15, 3),
(173, 1, 1),
(174, 16, 1),
(181, 60, 3),
(183, 58, 3),
(184, 57, 3),
(192, 61, 7),
(193, 56, 3),
(195, 59, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agences`
--
ALTER TABLE `agences`
  ADD PRIMARY KEY (`AGENCE_ID`);

--
-- Indexes for table `archivage_repertories`
--
ALTER TABLE `archivage_repertories`
  ADD PRIMARY KEY (`ID_REPERTORIE`);

--
-- Indexes for table `archivage_repertories_deleted`
--
ALTER TABLE `archivage_repertories_deleted`
  ADD PRIMARY KEY (`ID_REPERTORIE`);

--
-- Indexes for table `archivage_repertories_shared`
--
ALTER TABLE `archivage_repertories_shared`
  ADD PRIMARY KEY (`ID_SHARED`);

--
-- Indexes for table `categorie_hierarchique`
--
ALTER TABLE `categorie_hierarchique`
  ADD PRIMARY KEY (`ID_CATEGORIE_HIE`);

--
-- Indexes for table `conge_demande`
--
ALTER TABLE `conge_demande`
  ADD PRIMARY KEY (`ID_CONGE_DEMAMDE`);

--
-- Indexes for table `conge_iterim_user`
--
ALTER TABLE `conge_iterim_user`
  ADD PRIMARY KEY (`ID_CONGE_INTERIM_USER`);

--
-- Indexes for table `conge_notification`
--
ALTER TABLE `conge_notification`
  ADD PRIMARY KEY (`ID_CONGE_NOTIFICATION`);

--
-- Indexes for table `conge_validation`
--
ALTER TABLE `conge_validation`
  ADD PRIMARY KEY (`ID_CONGE_VALIDATION`);

--
-- Indexes for table `defaut_parametre_couleur`
--
ALTER TABLE `defaut_parametre_couleur`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `defaut_parametre_couleur_old`
--
ALTER TABLE `defaut_parametre_couleur_old`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `flux_conge`
--
ALTER TABLE `flux_conge`
  ADD PRIMARY KEY (`ID_FLUX_CONGE`);

--
-- Indexes for table `fonctions`
--
ALTER TABLE `fonctions`
  ADD PRIMARY KEY (`ID_FONCTION`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`ID_GRADE`);

--
-- Indexes for table `hierarchie`
--
ALTER TABLE `hierarchie`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `jours_feries`
--
ALTER TABLE `jours_feries`
  ADD PRIMARY KEY (`ID_JOUR_FERIE`);

--
-- Indexes for table `ou`
--
ALTER TABLE `ou`
  ADD PRIMARY KEY (`ID_OU`);

--
-- Indexes for table `parametrage_augmentation_conge`
--
ALTER TABLE `parametrage_augmentation_conge`
  ADD PRIMARY KEY (`ID_PARAMTRAGE_AUGMENTATION`);

--
-- Indexes for table `parametrage_conge`
--
ALTER TABLE `parametrage_conge`
  ADD PRIMARY KEY (`ID_PARAMTRAGE_CONGE`);

--
-- Indexes for table `poste`
--
ALTER TABLE `poste`
  ADD PRIMARY KEY (`ID_POSTE`);

--
-- Indexes for table `presence`
--
ALTER TABLE `presence`
  ADD PRIMARY KEY (`PRESENCE_ID`);

--
-- Indexes for table `presence_time`
--
ALTER TABLE `presence_time`
  ADD PRIMARY KEY (`PRESENCE_TIME_ID`);

--
-- Indexes for table `profilold`
--
ALTER TABLE `profilold`
  ADD PRIMARY KEY (`ID_PROFIL`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ID_ROLE`);

--
-- Indexes for table `role_url`
--
ALTER TABLE `role_url`
  ADD PRIMARY KEY (`ID_ROLE_URL`);

--
-- Indexes for table `services_ou`
--
ALTER TABLE `services_ou`
  ADD PRIMARY KEY (`ID_SERVICE`);

--
-- Indexes for table `service_ou_hierarchie`
--
ALTER TABLE `service_ou_hierarchie`
  ADD PRIMARY KEY (`ID_SERVICE_HIE`);

--
-- Indexes for table `stock_item`
--
ALTER TABLE `stock_item`
  ADD PRIMARY KEY (`ID_ITEM`);

--
-- Indexes for table `stock_item_marque`
--
ALTER TABLE `stock_item_marque`
  ADD PRIMARY KEY (`ID_MARQUE`);

--
-- Indexes for table `stock_item_model`
--
ALTER TABLE `stock_item_model`
  ADD PRIMARY KEY (`ID_MODEL`);

--
-- Indexes for table `stock_item_type`
--
ALTER TABLE `stock_item_type`
  ADD PRIMARY KEY (`ID_TYPE`);

--
-- Indexes for table `type_congeold`
--
ALTER TABLE `type_congeold`
  ADD PRIMARY KEY (`ID_CONGE`);

--
-- Indexes for table `type_conges`
--
ALTER TABLE `type_conges`
  ADD PRIMARY KEY (`ID_TYPE_CONGE`);

--
-- Indexes for table `type_conge_champ`
--
ALTER TABLE `type_conge_champ`
  ADD PRIMARY KEY (`ID_TYPE_CHAMP`);

--
-- Indexes for table `type_product`
--
ALTER TABLE `type_product`
  ADD PRIMARY KEY (`TYPE_ID`);

--
-- Indexes for table `url`
--
ALTER TABLE `url`
  ADD PRIMARY KEY (`ID_URL`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `utilisateurs_role`
--
ALTER TABLE `utilisateurs_role`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agences`
--
ALTER TABLE `agences`
  MODIFY `AGENCE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `archivage_repertories`
--
ALTER TABLE `archivage_repertories`
  MODIFY `ID_REPERTORIE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `archivage_repertories_deleted`
--
ALTER TABLE `archivage_repertories_deleted`
  MODIFY `ID_REPERTORIE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `archivage_repertories_shared`
--
ALTER TABLE `archivage_repertories_shared`
  MODIFY `ID_SHARED` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categorie_hierarchique`
--
ALTER TABLE `categorie_hierarchique`
  MODIFY `ID_CATEGORIE_HIE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `conge_demande`
--
ALTER TABLE `conge_demande`
  MODIFY `ID_CONGE_DEMAMDE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `conge_iterim_user`
--
ALTER TABLE `conge_iterim_user`
  MODIFY `ID_CONGE_INTERIM_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `conge_notification`
--
ALTER TABLE `conge_notification`
  MODIFY `ID_CONGE_NOTIFICATION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `conge_validation`
--
ALTER TABLE `conge_validation`
  MODIFY `ID_CONGE_VALIDATION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `defaut_parametre_couleur`
--
ALTER TABLE `defaut_parametre_couleur`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `defaut_parametre_couleur_old`
--
ALTER TABLE `defaut_parametre_couleur_old`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `flux_conge`
--
ALTER TABLE `flux_conge`
  MODIFY `ID_FLUX_CONGE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `fonctions`
--
ALTER TABLE `fonctions`
  MODIFY `ID_FONCTION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `ID_GRADE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `hierarchie`
--
ALTER TABLE `hierarchie`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jours_feries`
--
ALTER TABLE `jours_feries`
  MODIFY `ID_JOUR_FERIE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ou`
--
ALTER TABLE `ou`
  MODIFY `ID_OU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `parametrage_augmentation_conge`
--
ALTER TABLE `parametrage_augmentation_conge`
  MODIFY `ID_PARAMTRAGE_AUGMENTATION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `parametrage_conge`
--
ALTER TABLE `parametrage_conge`
  MODIFY `ID_PARAMTRAGE_CONGE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `poste`
--
ALTER TABLE `poste`
  MODIFY `ID_POSTE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `presence`
--
ALTER TABLE `presence`
  MODIFY `PRESENCE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `presence_time`
--
ALTER TABLE `presence_time`
  MODIFY `PRESENCE_TIME_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `profilold`
--
ALTER TABLE `profilold`
  MODIFY `ID_PROFIL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `ID_ROLE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `role_url`
--
ALTER TABLE `role_url`
  MODIFY `ID_ROLE_URL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `services_ou`
--
ALTER TABLE `services_ou`
  MODIFY `ID_SERVICE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `service_ou_hierarchie`
--
ALTER TABLE `service_ou_hierarchie`
  MODIFY `ID_SERVICE_HIE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `stock_item`
--
ALTER TABLE `stock_item`
  MODIFY `ID_ITEM` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_item_marque`
--
ALTER TABLE `stock_item_marque`
  MODIFY `ID_MARQUE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_item_model`
--
ALTER TABLE `stock_item_model`
  MODIFY `ID_MODEL` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_item_type`
--
ALTER TABLE `stock_item_type`
  MODIFY `ID_TYPE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `type_congeold`
--
ALTER TABLE `type_congeold`
  MODIFY `ID_CONGE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `type_conges`
--
ALTER TABLE `type_conges`
  MODIFY `ID_TYPE_CONGE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `type_conge_champ`
--
ALTER TABLE `type_conge_champ`
  MODIFY `ID_TYPE_CHAMP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `type_product`
--
ALTER TABLE `type_product`
  MODIFY `TYPE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `url`
--
ALTER TABLE `url`
  MODIFY `ID_URL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `utilisateurs_role`
--
ALTER TABLE `utilisateurs_role`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
