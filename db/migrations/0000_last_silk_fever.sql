CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp(3),
	`refresh_token_expires_at` timestamp(3),
	`scope` text,
	`password` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`categoryId` int AUTO_INCREMENT NOT NULL,
	`category` varchar(255) NOT NULL,
	`isHide` boolean NOT NULL DEFAULT false,
	CONSTRAINT `categories_categoryId` PRIMARY KEY(`categoryId`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`commentId` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` varchar(36) NOT NULL,
	`comment` text NOT NULL,
	`updated_at` datetime NOT NULL DEFAULT '2025-10-24 04:54:24.427',
	`created_at` datetime NOT NULL DEFAULT '2025-10-24 04:54:24.427',
	`isHide` boolean NOT NULL DEFAULT false,
	CONSTRAINT `comments_commentId` PRIMARY KEY(`commentId`)
);
--> statement-breakpoint
CREATE TABLE `post_tags` (
	`postId` int NOT NULL,
	`tagId` int NOT NULL,
	CONSTRAINT `post_tags_postId_tagId_unique` UNIQUE(`postId`,`tagId`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`postId` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`updated_at` datetime NOT NULL DEFAULT '2025-10-24 04:54:24.427',
	`created_at` datetime NOT NULL DEFAULT '2025-10-24 04:54:24.427',
	`views` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT false,
	`isHide` boolean NOT NULL DEFAULT false,
	`isNotice` boolean NOT NULL DEFAULT false,
	`isComment` boolean NOT NULL DEFAULT true,
	CONSTRAINT `posts_postId` PRIMARY KEY(`postId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	`impersonated_by` text,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`tagId` int AUTO_INCREMENT NOT NULL,
	`tag` varchar(255) NOT NULL,
	CONSTRAINT `tags_tagId` PRIMARY KEY(`tagId`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	`role` text,
	`banned` boolean DEFAULT false,
	`ban_reason` text,
	`ban_expires` timestamp(3),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_postId_posts_postId_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`postId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_tags` ADD CONSTRAINT `post_tags_postId_posts_postId_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`postId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_tags` ADD CONSTRAINT `post_tags_tagId_tags_tagId_fk` FOREIGN KEY (`tagId`) REFERENCES `tags`(`tagId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_categoryId_categories_categoryId_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;