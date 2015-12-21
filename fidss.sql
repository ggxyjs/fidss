/*
Navicat MySQL Data Transfer

Source Server         : ggx
Source Server Version : 50051
Source Host           : localhost:3306
Source Database       : fidss

Target Server Type    : MYSQL
Target Server Version : 50051
File Encoding         : 65001

Date: 2015-12-19 19:53:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_athy
-- ----------------------------
DROP TABLE IF EXISTS `t_athy`;
CREATE TABLE `t_athy` (
  `id` int(16) NOT NULL auto_increment,
  `title` char(50) default '',
  `link` char(50) default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_athy_of_org
-- ----------------------------
DROP TABLE IF EXISTS `t_athy_of_org`;
CREATE TABLE `t_athy_of_org` (
  `id` int(16) NOT NULL auto_increment,
  `org_id` int(16) NOT NULL,
  `athy_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_athy_of_role
-- ----------------------------
DROP TABLE IF EXISTS `t_athy_of_role`;
CREATE TABLE `t_athy_of_role` (
  `id` int(16) NOT NULL auto_increment,
  `role_id` int(16) NOT NULL,
  `athy_id` int(16) NOT NULL,
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_org
-- ----------------------------
DROP TABLE IF EXISTS `t_org`;
CREATE TABLE `t_org` (
  `id` int(16) NOT NULL auto_increment,
  `title` char(50) NOT NULL default '',
  `wbst_cfg` char(50) NOT NULL default '',
  `wbst_news_folder` char(50) NOT NULL default '',
  `sbjt_news_folder` char(50) NOT NULL default '',
  `wbst_update_task` int(2) NOT NULL,
  `sbjt_update_task` int(2) NOT NULL,
  `prjt_title` char(50) NOT NULL,
  `grade` int(2) NOT NULL default '1',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_qaa
-- ----------------------------
DROP TABLE IF EXISTS `t_qaa`;
CREATE TABLE `t_qaa` (
  `id` int(16) NOT NULL auto_increment,
  `pid` int(16) default NULL,
  `title` varchar(200) default '',
  `description` text,
  `qpeopleId` varchar(200) default '',
  `time` char(20) default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(16) NOT NULL auto_increment,
  `org_id` int(16) NOT NULL,
  `title` char(50) NOT NULL,
  `grade` int(16) NOT NULL,
  `create_datetime` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_sbjt
-- ----------------------------
DROP TABLE IF EXISTS `t_sbjt`;
CREATE TABLE `t_sbjt` (
  `id` int(16) NOT NULL auto_increment,
  `top_parent_id` int(16) NOT NULL,
  `parent_id` int(16) NOT NULL default '0',
  `is_category` int(2) NOT NULL default '0',
  `level_num` int(2) NOT NULL default '-1',
  `name_cn` varchar(200) NOT NULL default '',
  `name_en` varchar(200) NOT NULL default '',
  `star` int(2) NOT NULL default '0',
  `update_num` int(16) NOT NULL default '0',
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=441 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_sbjt_kw
-- ----------------------------
DROP TABLE IF EXISTS `t_sbjt_kw`;
CREATE TABLE `t_sbjt_kw` (
  `id` int(16) NOT NULL auto_increment,
  `parent_id` int(16) NOT NULL default '0',
  `sbjt_id` int(16) NOT NULL default '-1',
  `keyword` char(20) NOT NULL default '',
  `language` int(2) NOT NULL default '0',
  `type` int(2) NOT NULL default '0',
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=592 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_sbjt_news
-- ----------------------------
DROP TABLE IF EXISTS `t_sbjt_news`;
CREATE TABLE `t_sbjt_news` (
  `id` int(16) NOT NULL auto_increment,
  `sbjt_id` int(16) NOT NULL default '-1',
  `title` varchar(300) NOT NULL default '',
  `summary` text,
  `url` varchar(500) NOT NULL default '',
  `local_url` varchar(200) NOT NULL default '',
  `update_datetime` datetime NOT NULL,
  `se_id` int(16) NOT NULL default '-1',
  `star` int(2) NOT NULL default '0',
  `is_shown` int(2) NOT NULL default '0',
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=311066 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_sbjt_of_ug
-- ----------------------------
DROP TABLE IF EXISTS `t_sbjt_of_ug`;
CREATE TABLE `t_sbjt_of_ug` (
  `id` int(16) NOT NULL auto_increment,
  `ug_id` int(16) NOT NULL,
  `sbjt_id` int(16) NOT NULL,
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_sbjt_of_user
-- ----------------------------
DROP TABLE IF EXISTS `t_sbjt_of_user`;
CREATE TABLE `t_sbjt_of_user` (
  `id` int(16) NOT NULL auto_increment,
  `user_id` int(16) NOT NULL,
  `sbjt_id` int(16) NOT NULL,
  `relation` int(16) NOT NULL,
  `ug_id` int(16) NOT NULL,
  `edit_athy` int(16) NOT NULL,
  `serial_id` int(16) NOT NULL,
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_se
-- ----------------------------
DROP TABLE IF EXISTS `t_se`;
CREATE TABLE `t_se` (
  `id` int(16) NOT NULL auto_increment,
  `title` char(50) NOT NULL,
  `url` char(50) NOT NULL,
  `is_enabled` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_se_of_org
-- ----------------------------
DROP TABLE IF EXISTS `t_se_of_org`;
CREATE TABLE `t_se_of_org` (
  `id` int(16) NOT NULL auto_increment,
  `org_id` int(16) NOT NULL,
  `se_id` int(16) NOT NULL,
  `serial_id` int(16) NOT NULL,
  `is_enabled` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_ug
-- ----------------------------
DROP TABLE IF EXISTS `t_ug`;
CREATE TABLE `t_ug` (
  `id` int(16) NOT NULL auto_increment,
  `org_id` int(16) NOT NULL,
  `title` char(50) NOT NULL,
  `summary` text NOT NULL,
  `grade` int(16) NOT NULL default '-1',
  `kind` int(16) NOT NULL default '-1',
  `start_datetime` char(20) NOT NULL default '',
  `end_datetime` char(20) NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(16) NOT NULL auto_increment,
  `org_id` int(16) NOT NULL,
  `user_grade_in_org` int(16) NOT NULL,
  `username` varchar(20) NOT NULL,
  `pw` varchar(200) NOT NULL,
  `realname` varchar(20) NOT NULL,
  `gender` int(16) NOT NULL,
  `email` varchar(100) default NULL,
  `telephone` varchar(20) default NULL,
  `config` varchar(20) default NULL,
  `state` int(16) NOT NULL,
  `create_datetime` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_of_ug
-- ----------------------------
DROP TABLE IF EXISTS `t_user_of_ug`;
CREATE TABLE `t_user_of_ug` (
  `id` int(16) NOT NULL auto_increment,
  `ug_id` int(16) NOT NULL,
  `user_id` int(16) NOT NULL,
  `user_grade_in_ug` int(16) NOT NULL,
  `user_role_in_ug` int(16) NOT NULL default '1',
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` int(16) NOT NULL auto_increment,
  `role_id` int(16) NOT NULL,
  `user_id` int(16) NOT NULL,
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_wbst
-- ----------------------------
DROP TABLE IF EXISTS `t_wbst`;
CREATE TABLE `t_wbst` (
  `id` int(16) NOT NULL auto_increment,
  `top_parent_id` int(16) NOT NULL,
  `parent_id` int(16) NOT NULL default '0',
  `title` varchar(200) NOT NULL default '',
  `is_category` int(2) NOT NULL default '0',
  `level_num` int(2) NOT NULL default '-1',
  `url` varchar(200) NOT NULL default '',
  `sample_url` varchar(200) NOT NULL default '',
  `url_type` int(2) NOT NULL default '0',
  `update_method` int(2) NOT NULL,
  `config` char(10) NOT NULL default '',
  `active_status` int(2) NOT NULL default '0',
  `update_num` int(16) NOT NULL default '0',
  `update_datetime` datetime NOT NULL,
  `enable_vpn` int(2) NOT NULL default '0',
  `org_id` int(16) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_wbst_blog
-- ----------------------------
DROP TABLE IF EXISTS `t_wbst_blog`;
CREATE TABLE `t_wbst_blog` (
  `id` int(11) NOT NULL auto_increment,
  `wbst_id` int(11) default '0',
  `type` int(2) default '0' COMMENT '0为原创，1为转发',
  `title` varchar(200) default '',
  `blog` longtext,
  `blog_time` datetime NOT NULL,
  `img` varchar(50) default '',
  `is_shown` int(2) default '0',
  `org_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_wbst_kw
-- ----------------------------
DROP TABLE IF EXISTS `t_wbst_kw`;
CREATE TABLE `t_wbst_kw` (
  `id` int(16) NOT NULL auto_increment,
  `parent_id` int(16) NOT NULL default '0',
  `wbst_id` int(16) NOT NULL,
  `keyword` char(20) NOT NULL,
  `type` int(2) NOT NULL default '0',
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_wbst_news
-- ----------------------------
DROP TABLE IF EXISTS `t_wbst_news`;
CREATE TABLE `t_wbst_news` (
  `id` int(16) NOT NULL auto_increment,
  `wbst_id` int(16) NOT NULL default '-1',
  `title` varchar(300) NOT NULL default '',
  `summary` longtext,
  `url` varchar(500) NOT NULL default '',
  `local_url` varchar(200) NOT NULL default '',
  `update_datetime` datetime NOT NULL,
  `star` int(2) NOT NULL default '0',
  `is_shown` int(2) NOT NULL default '0',
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=272206 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_wbst_of_ug
-- ----------------------------
DROP TABLE IF EXISTS `t_wbst_of_ug`;
CREATE TABLE `t_wbst_of_ug` (
  `id` int(16) NOT NULL auto_increment,
  `ug_id` int(16) NOT NULL,
  `wbst_id` int(16) NOT NULL,
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_wbst_of_user
-- ----------------------------
DROP TABLE IF EXISTS `t_wbst_of_user`;
CREATE TABLE `t_wbst_of_user` (
  `id` int(16) NOT NULL auto_increment,
  `user_id` int(16) NOT NULL,
  `wbst_id` int(16) NOT NULL,
  `relation` int(16) NOT NULL,
  `ug_id` int(16) NOT NULL,
  `edit_athy` int(16) NOT NULL,
  `serial_id` int(16) NOT NULL,
  `org_id` int(16) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=588 DEFAULT CHARSET=utf8;
