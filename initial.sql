CREATE TABLE `folder`  (
  `client_id` bigint UNSIGNED NOT NULL,
  `folder_id` bigint UNSIGNED NOT NULL,
  `folder_name` varchar(64) NOT NULL,
  `folder_description` varchar(255) NULL,
  PRIMARY KEY (`client_id`, `folder_id`)
);

CREATE TABLE `group`  (
  `group_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_name` varchar(64) NOT NULL,
  `founder_id` bigint UNSIGNED NOT NULL,
  `created_time` datetime NOT NULL,
  `members_num` int UNSIGNED NOT NULL,
  PRIMARY KEY (`group_id`)
);

CREATE TABLE `group_member`  (
  `belongs_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`belongs_id`)
);

CREATE TABLE `message`  (
  `message_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `sender_id` bigint UNSIGNED NULL DEFAULT 0,
  `client_id` bigint UNSIGNED NOT NULL,
  `push_type` int NOT NULL DEFAULT 0,
  `push_time` datetime NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`message_id`)
);

CREATE TABLE `subtask`  (
  `task_id` bigint UNSIGNED NOT NULL,
  `subtask_id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`task_id`, `subtask_id`)
);

CREATE TABLE `task`  (
  `task_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `register_id` bigint UNSIGNED NOT NULL,
  `create_time` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0,
  `priority` int NOT NULL DEFAULT 0,
  `deadline` datetime NULL,
  `group_belonging` bigint UNSIGNED NULL,
  `note` text NULL,
  `is_favor` tinyint(1) NOT NULL DEFAULT 0,
  `cycle` int NOT NULL DEFAULT 0,
  `belongs_folder_id` bigint UNSIGNED NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`task_id`)
);

CREATE TABLE `user_info`  (
  `client_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` varchar(32) NOT NULL,
  `passwd_hash` binary(255) NOT NULL,
  `avatar_path` varchar(255) NOT NULL DEFAULT '/static/default.png',
  `register_time` datetime NOT NULL,
  `intro` text NULL,
  PRIMARY KEY (`client_id`, `register_time`)
);

ALTER TABLE `folder` ADD CONSTRAINT `client_id` FOREIGN KEY (`client_id`) REFERENCES `user_info` (`client_id`);
ALTER TABLE `group` ADD CONSTRAINT `foundered_id` FOREIGN KEY (`founder_id`) REFERENCES `user_info` (`client_id`);
ALTER TABLE `group_member` ADD CONSTRAINT `group` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`);
ALTER TABLE `group_member` ADD CONSTRAINT `client` FOREIGN KEY (`client_id`) REFERENCES `user_info` (`client_id`);
ALTER TABLE `message` ADD FOREIGN KEY (`client_id`) REFERENCES `user_info` (`client_id`);
ALTER TABLE `subtask` ADD CONSTRAINT `task_belong` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`);
ALTER TABLE `task` ADD FOREIGN KEY (`register_id`) REFERENCES `user_info` (`client_id`);
ALTER TABLE `task` ADD FOREIGN KEY (`group_beglong`) REFERENCES `group` (`group_id`);
ALTER TABLE `task` ADD FOREIGN KEY (`register_id`, `belongs_folder_id`) REFERENCES `folder` (`client_id`, `folder_id`);

