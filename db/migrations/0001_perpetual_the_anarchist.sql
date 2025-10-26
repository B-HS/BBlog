ALTER TABLE `comments` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2025-10-24 05:09:55.023';--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-10-24 05:09:55.023';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2025-10-24 05:09:55.023';--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2025-10-24 05:09:55.023';