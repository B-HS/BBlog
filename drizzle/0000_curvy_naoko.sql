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
	`nickname` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`comment` text NOT NULL,
	`updated_at` datetime NOT NULL DEFAULT '2024-10-19 11:41:22.007',
	`created_at` datetime NOT NULL DEFAULT '2024-10-19 11:41:22.007',
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
	`updated_at` datetime NOT NULL DEFAULT '2024-10-19 11:41:22.006',
	`created_at` datetime NOT NULL DEFAULT '2024-10-19 11:41:22.006',
	`views` int NOT NULL DEFAULT 0,
	`isHide` boolean NOT NULL DEFAULT false,
	`isNotice` boolean NOT NULL DEFAULT false,
	`isComment` boolean NOT NULL DEFAULT true,
	CONSTRAINT `posts_postId` PRIMARY KEY(`postId`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`tagId` int AUTO_INCREMENT NOT NULL,
	`tag` varchar(255) NOT NULL,
	CONSTRAINT `tags_tagId` PRIMARY KEY(`tagId`)
);
--> statement-breakpoint
CREATE TABLE `visitors` (
	`visitorId` int AUTO_INCREMENT NOT NULL,
	`ip` varchar(255) NOT NULL,
	`path` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2024-10-19 11:41:22.007',
	CONSTRAINT `visitors_visitorId` PRIMARY KEY(`visitorId`)
);
--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_postId_posts_postId_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`postId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_tags` ADD CONSTRAINT `post_tags_postId_posts_postId_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`postId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_tags` ADD CONSTRAINT `post_tags_tagId_tags_tagId_fk` FOREIGN KEY (`tagId`) REFERENCES `tags`(`tagId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_categoryId_categories_categoryId_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`categoryId`) ON DELETE no action ON UPDATE no action;