CREATE TABLE `images` (
	`imageId` varchar(36) NOT NULL,
	`orgName` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2024-10-27 06:49:40.843',
	CONSTRAINT `images_imageId` PRIMARY KEY(`imageId`)
);
--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2024-10-27 06:49:40.843';--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-10-27 06:49:40.843';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2024-10-27 06:49:40.842';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-10-27 06:49:40.842';--> statement-breakpoint
ALTER TABLE `visitors` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-10-27 06:49:40.843';