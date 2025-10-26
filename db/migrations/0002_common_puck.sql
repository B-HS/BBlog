CREATE TABLE `images` (
	`imageId` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(36) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`originalName` varchar(255) NOT NULL,
	`url` text NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`fileSize` int NOT NULL,
	`width` int NOT NULL,
	`height` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2025-10-24 08:48:30.820',
	`updated_at` datetime NOT NULL DEFAULT '2025-10-24 08:48:30.820',
	CONSTRAINT `images_imageId` PRIMARY KEY(`imageId`)
);
--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2025-10-24 08:48:30.820';--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-10-24 08:48:30.820';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2025-10-24 08:48:30.819';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-10-24 08:48:30.819';--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;