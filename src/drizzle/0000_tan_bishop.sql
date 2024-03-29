CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL
);
