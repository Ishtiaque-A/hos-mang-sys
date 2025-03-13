php artisan queue:work


ALTER TABLE `organizations` ADD `special_plan_id` BIGINT NULL DEFAULT NULL AFTER `db_name`;
