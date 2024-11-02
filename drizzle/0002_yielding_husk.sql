ALTER TABLE `comments` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2024-11-02 10:55:45.859';--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-02 10:55:45.859';--> statement-breakpoint
ALTER TABLE `images` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-02 10:55:45.860';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2024-11-02 10:55:45.859';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-02 10:55:45.859';--> statement-breakpoint
ALTER TABLE `visitors` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2024-11-02 10:55:45.860';--> statement-breakpoint
ALTER TABLE `images` ADD `extension` varchar(255) NOT NULL;