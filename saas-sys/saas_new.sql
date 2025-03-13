-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 28, 2024 at 07:11 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saas_exist`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint UNSIGNED NOT NULL,
  `log_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint UNSIGNED DEFAULT NULL,
  `causer_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_id` bigint UNSIGNED DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `batch_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `log_name`, `description`, `subject_type`, `event`, `subject_id`, `causer_type`, `causer_id`, `properties`, `batch_uuid`, `created_at`, `updated_at`) VALUES
(2, 'default', 'created', 'App\\Models\\SubscriptionRequest', 'created', 36, NULL, NULL, '{\"attributes\": {\"id\": 36, \"name\": \"Napadol\", \"email\": \"admin@demo.com\", \"mobile\": \"01705541560\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"I need this system to test\", \"created_at\": \"2024-02-05T05:20:49.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-05T05:20:49.000000Z\", \"subscription_plan_id\": 2}}', NULL, '2024-02-04 23:20:49', '2024-02-04 23:20:49'),
(3, 'default', 'created', 'App\\Models\\Notification', 'created', 1, NULL, NULL, '{\"attributes\": {\"id\": 1, \"title\": \"New request\", \"message\": \"New subscription request submitted.\", \"priority\": 1, \"created_at\": \"2024-02-05T05:20:49.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-05T05:20:49.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-04 23:20:49', '2024-02-04 23:20:49'),
(4, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 1, NULL, NULL, '{\"attributes\": {\"id\": 1, \"user_id\": 1, \"created_at\": \"2024-02-05T05:20:49.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-05T05:20:49.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 1}}', NULL, '2024-02-04 23:20:49', '2024-02-04 23:20:49'),
(5, 'default', 'created', 'App\\Models\\Organization', 'created', 87, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 87, \"logo\": null, \"name\": \"Napadol\", \"email\": \"admin@demo.com\", \"mobile\": \"01705541560\", \"status\": 1, \"address\": \"\", \"db_name\": \"admindemocom_ETXWM\", \"meta_tags\": null, \"created_at\": \"2024-02-05T05:23:04.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-05T05:23:04.000000Z\", \"description\": null, \"contact_person_name\": \"Napadol\", \"contact_person_email\": \"admin@demo.com\", \"contact_person_mobile\": \"01705541560\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-02-04 23:23:04', '2024-02-04 23:23:04'),
(6, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 37, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 37, \"status\": 1, \"user_id\": 133, \"end_date\": \"2024-03-06\", \"created_at\": \"2024-02-05T05:23:07.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-02-05\", \"updated_at\": \"2024-02-05T05:23:07.000000Z\", \"user_limit\": 5, \"organization_id\": 87, \"subscription_plan_id\": 2}}', NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(7, 'default', 'created', 'App\\Models\\Purchase', 'created', 2, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 2, \"user_id\": 133, \"coupon_id\": null, \"created_at\": \"2024-02-05T05:23:07.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-02-05T05:23:07.000000Z\", \"user_limit\": 5, \"actual_price\": 5000, \"organization_id\": 87, \"payment_attempt_id\": null, \"subscription_plan_id\": 2, \"subscription_details_id\": 37}}', NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(8, 'default', 'created', 'App\\Models\\Setting', 'created', 42, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 42, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-02-05T05:23:07.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-05T05:23:07.000000Z\", \"contact_mail\": \"admin@demo.com\", \"contact_number\": \"01705541560\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 87, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(9, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 36, 'App\\Models\\User', 1, '{\"old\": {\"id\": 36, \"name\": \"Napadol\", \"email\": \"admin@demo.com\", \"mobile\": \"01705541560\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"I need this system to test\", \"created_at\": \"2024-02-05T05:20:49.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-05T05:20:49.000000Z\", \"subscription_plan_id\": 2}, \"attributes\": {\"id\": 36, \"name\": \"Napadol\", \"email\": \"admin@demo.com\", \"mobile\": \"01705541560\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"I need this system to test\", \"created_at\": \"2024-02-05T05:20:49.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-05T05:23:07.000000Z\", \"subscription_plan_id\": 2}}', NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(10, 'default', 'created', 'App\\Models\\Notification', 'created', 2, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 2, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-02-05T05:23:07.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-05T05:23:07.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(11, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 2, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 2, \"user_id\": 133, \"created_at\": \"2024-02-05T05:23:07.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-05T05:23:07.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 2}}', NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(12, 'default', 'created', 'App\\Models\\PayAsGoBillingBreakDown', 'created', 20, NULL, NULL, '{\"attributes\": {\"id\": 20, \"date\": \"2024-02-12\", \"status\": 1, \"user_bill\": 240, \"created_at\": \"2024-02-12T06:44:58.000000Z\", \"updated_at\": \"2024-02-12T06:44:58.000000Z\", \"user_count\": 24, \"storage_bill\": 10, \"storage_count\": 0.03, \"pay_as_go_billing_summaries_id\": 2}}', NULL, '2024-02-12 00:44:58', '2024-02-12 00:44:58'),
(13, 'default', 'created', 'App\\Models\\Notification', 'created', 3, NULL, NULL, '{\"attributes\": {\"id\": 3, \"title\": \"Daily Bill alert\", \"message\": \"Your Pay as go bill for for 2024-02-12 is 250\", \"priority\": 1, \"created_at\": \"2024-02-12T06:44:58.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-12T06:44:58.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 00:44:58', '2024-02-12 00:44:58'),
(14, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 3, NULL, NULL, '{\"attributes\": {\"id\": 3, \"user_id\": 100, \"created_at\": \"2024-02-12T06:44:58.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T06:44:58.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 3}}', NULL, '2024-02-12 00:44:58', '2024-02-12 00:44:58'),
(15, 'default', 'created', 'App\\Models\\SubscriptionRequest', 'created', 37, NULL, NULL, '{\"attributes\": {\"id\": 37, \"name\": \"Napadol\", \"email\": \"artest@gmail.com\", \"mobile\": \"01705541569\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"rgtdf\", \"created_at\": \"2024-02-12T06:55:40.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T06:55:40.000000Z\", \"subscription_plan_id\": 4}}', NULL, '2024-02-12 00:55:40', '2024-02-12 00:55:40'),
(16, 'default', 'created', 'App\\Models\\Notification', 'created', 4, NULL, NULL, '{\"attributes\": {\"id\": 4, \"title\": \"New request\", \"message\": \"New subscription request submitted.\", \"priority\": 1, \"created_at\": \"2024-02-12T06:55:40.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-12T06:55:40.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 00:55:40', '2024-02-12 00:55:40'),
(17, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 4, NULL, NULL, '{\"attributes\": {\"id\": 4, \"user_id\": 1, \"created_at\": \"2024-02-12T06:55:40.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T06:55:40.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 4}}', NULL, '2024-02-12 00:55:40', '2024-02-12 00:55:40'),
(18, 'default', 'created', 'App\\Models\\Organization', 'created', 88, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 88, \"logo\": null, \"name\": \"Napadol\", \"email\": \"artest@gmail.com\", \"mobile\": \"01705541569\", \"status\": 1, \"address\": \"\", \"db_name\": \"artestgmailcom_NKXUM\", \"meta_tags\": null, \"created_at\": \"2024-02-12T06:56:38.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T06:56:38.000000Z\", \"description\": null, \"contact_person_name\": \"Napadol\", \"contact_person_email\": \"artest@gmail.com\", \"contact_person_mobile\": \"01705541569\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(19, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 38, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 38, \"status\": 1, \"user_id\": 134, \"end_date\": \"2024-03-13\", \"created_at\": \"2024-02-12T06:56:38.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-02-12\", \"updated_at\": \"2024-02-12T06:56:38.000000Z\", \"user_limit\": 9, \"organization_id\": 88, \"subscription_plan_id\": 4}}', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(20, 'default', 'created', 'App\\Models\\Purchase', 'created', 3, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 3, \"user_id\": 134, \"coupon_id\": null, \"created_at\": \"2024-02-12T06:56:38.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-02-12T06:56:38.000000Z\", \"user_limit\": 9, \"actual_price\": 1000, \"organization_id\": 88, \"payment_attempt_id\": null, \"subscription_plan_id\": 4, \"subscription_details_id\": 38}}', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(21, 'default', 'created', 'App\\Models\\Setting', 'created', 43, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 43, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-02-12T06:56:38.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-12T06:56:38.000000Z\", \"contact_mail\": \"artest@gmail.com\", \"contact_number\": \"01705541569\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 88, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(22, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 37, 'App\\Models\\User', 1, '{\"old\": {\"id\": 37, \"name\": \"Napadol\", \"email\": \"artest@gmail.com\", \"mobile\": \"01705541569\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"rgtdf\", \"created_at\": \"2024-02-12T06:55:40.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T06:55:40.000000Z\", \"subscription_plan_id\": 4}, \"attributes\": {\"id\": 37, \"name\": \"Napadol\", \"email\": \"artest@gmail.com\", \"mobile\": \"01705541569\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"rgtdf\", \"created_at\": \"2024-02-12T06:55:40.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T06:56:38.000000Z\", \"subscription_plan_id\": 4}}', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(23, 'default', 'created', 'App\\Models\\Notification', 'created', 5, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 5, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-02-12T06:56:38.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-12T06:56:38.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(24, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 5, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 5, \"user_id\": 134, \"created_at\": \"2024-02-12T06:56:38.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T06:56:38.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 5}}', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(25, 'default', 'created', 'App\\Models\\Organization', 'created', 90, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 90, \"logo\": null, \"name\": \"Arafat\", \"email\": \"dev.arafat.zaimahtech@gmail.com\", \"mobile\": \"01705541561\", \"status\": 1, \"address\": \"\", \"db_name\": \"devarafatzaimahtechgmailcom_GNQWT\", \"meta_tags\": null, \"created_at\": \"2024-02-12T07:32:56.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T07:32:56.000000Z\", \"description\": null, \"contact_person_name\": \"Arafat\", \"contact_person_email\": \"dev.arafat.zaimahtech@gmail.com\", \"contact_person_mobile\": \"01705541561\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(26, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 39, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 39, \"status\": 1, \"user_id\": 135, \"end_date\": \"2024-03-13\", \"created_at\": \"2024-02-12T07:32:56.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-02-12\", \"updated_at\": \"2024-02-12T07:32:56.000000Z\", \"user_limit\": 3, \"organization_id\": 90, \"subscription_plan_id\": 7}}', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(27, 'default', 'created', 'App\\Models\\Purchase', 'created', 4, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 4, \"user_id\": 135, \"coupon_id\": null, \"created_at\": \"2024-02-12T07:32:56.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-02-12T07:32:56.000000Z\", \"user_limit\": 3, \"actual_price\": 10000, \"organization_id\": 90, \"payment_attempt_id\": null, \"subscription_plan_id\": 7, \"subscription_details_id\": 39}}', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(28, 'default', 'created', 'App\\Models\\Setting', 'created', 44, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 44, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-02-12T07:32:56.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-12T07:32:56.000000Z\", \"contact_mail\": \"dev.arafat.zaimahtech@gmail.com\", \"contact_number\": \"01705541561\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 90, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(29, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 18, 'App\\Models\\User', 1, '{\"old\": {\"id\": 18, \"name\": \"Arafat\", \"email\": \"dev.arafat.zaimahtech@gmail.com\", \"mobile\": \"01705541561\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"sdgf\", \"created_at\": \"2023-08-05T08:21:52.000000Z\", \"deleted_at\": null, \"updated_at\": \"2023-08-14T15:20:03.000000Z\", \"subscription_plan_id\": 7}, \"attributes\": {\"id\": 18, \"name\": \"Arafat\", \"email\": \"dev.arafat.zaimahtech@gmail.com\", \"mobile\": \"01705541561\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"sdgf\", \"created_at\": \"2023-08-05T08:21:52.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T07:32:56.000000Z\", \"subscription_plan_id\": 7}}', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(30, 'default', 'created', 'App\\Models\\Notification', 'created', 6, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 6, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-02-12T07:32:56.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-12T07:32:56.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(31, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 6, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 6, \"user_id\": 135, \"created_at\": \"2024-02-12T07:32:56.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-12T07:32:56.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 6}}', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(32, 'default', 'updated', 'App\\Models\\Setting', 'updated', 1, 'App\\Models\\User', 1, '{\"old\": {\"id\": 1, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2023-06-27T15:06:38.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-01-25T10:58:28.000000Z\", \"contact_mail\": \"example1@example.com\", \"contact_number\": \"1234567890\", \"is_notification\": 0, \"is_social_login\": 1, \"organization_id\": null, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}, \"attributes\": {\"id\": 1, \"logo\": \"http://localhost:8000/images/59cfbca6-846c-471d-9723-5a6f0e6a330f.png\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2023-06-27T15:06:38.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-12T09:20:38.000000Z\", \"contact_mail\": \"example1@example.com\", \"contact_number\": \"01705547563\", \"is_notification\": 0, \"is_social_login\": 1, \"organization_id\": null, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-12 03:20:38', '2024-02-12 03:20:38'),
(33, 'default', 'created', 'App\\Models\\LoginSession', 'created', 1, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 1, \"ip\": \"127.0.0.1\", \"token\": \"8KIlGRzc3ZCHUWUIjKklbyRgbIwtautQ\", \"to_url\": \"http://localhost:3002//register\", \"user_id\": 1, \"from_url\": \"localhost\", \"created_at\": \"2024-02-12T09:20:50.000000Z\", \"created_by\": 1, \"updated_at\": \"2024-02-12T09:20:50.000000Z\"}}', NULL, '2024-02-12 03:20:50', '2024-02-12 03:20:50'),
(34, 'default', 'created', 'App\\Models\\Organization', 'created', 91, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 91, \"logo\": null, \"name\": \"Rakibul Islam\", \"email\": \"admintyht@gmail.com\", \"mobile\": \"01705139111\", \"status\": 1, \"address\": \"\", \"db_name\": \"admintyhtgmailcom_CVUSP\", \"meta_tags\": null, \"created_at\": \"2024-02-13T04:58:37.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T04:58:37.000000Z\", \"description\": null, \"contact_person_name\": \"Rakibul Islam\", \"contact_person_email\": \"admintyht@gmail.com\", \"contact_person_mobile\": \"01705139111\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(35, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 40, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 40, \"status\": 1, \"user_id\": 136, \"end_date\": \"2024-03-14\", \"created_at\": \"2024-02-13T04:58:37.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-02-13\", \"updated_at\": \"2024-02-13T04:58:37.000000Z\", \"user_limit\": 3, \"organization_id\": 91, \"subscription_plan_id\": 7}}', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(36, 'default', 'created', 'App\\Models\\Purchase', 'created', 5, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 5, \"user_id\": 136, \"coupon_id\": null, \"created_at\": \"2024-02-13T04:58:37.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-02-13T04:58:37.000000Z\", \"user_limit\": 3, \"actual_price\": 10000, \"organization_id\": 91, \"payment_attempt_id\": null, \"subscription_plan_id\": 7, \"subscription_details_id\": 40}}', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(37, 'default', 'created', 'App\\Models\\Setting', 'created', 45, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 45, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-02-13T04:58:37.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-13T04:58:37.000000Z\", \"contact_mail\": \"admintyht@gmail.com\", \"contact_number\": \"01705139111\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 91, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(38, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 33, 'App\\Models\\User', 1, '{\"old\": {\"id\": 33, \"name\": \"Rakibul Islam\", \"email\": \"admintyht@gmail.com\", \"mobile\": \"01705139111\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"SS\", \"created_at\": \"2024-01-25T16:23:50.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-01-25T16:23:50.000000Z\", \"subscription_plan_id\": 7}, \"attributes\": {\"id\": 33, \"name\": \"Rakibul Islam\", \"email\": \"admintyht@gmail.com\", \"mobile\": \"01705139111\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"SS\", \"created_at\": \"2024-01-25T16:23:50.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T04:58:37.000000Z\", \"subscription_plan_id\": 7}}', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(39, 'default', 'created', 'App\\Models\\Notification', 'created', 7, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 7, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-02-13T04:58:37.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-13T04:58:37.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(40, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 7, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 7, \"user_id\": 136, \"created_at\": \"2024-02-13T04:58:37.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T04:58:37.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 7}}', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(41, 'default', 'created', 'App\\Models\\Organization', 'created', 92, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 92, \"logo\": null, \"name\": \"Jabed Akhter\", \"email\": \"zaimahtech@gmail.com\", \"mobile\": \"01714131050\", \"status\": 1, \"address\": \"\", \"db_name\": \"zaimahtechgmailcom_DPZOB\", \"meta_tags\": null, \"created_at\": \"2024-02-13T05:04:29.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:04:29.000000Z\", \"description\": null, \"contact_person_name\": \"Jabed Akhter\", \"contact_person_email\": \"zaimahtech@gmail.com\", \"contact_person_mobile\": \"01714131050\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(42, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 41, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 41, \"status\": 1, \"user_id\": 137, \"end_date\": \"2024-03-14\", \"created_at\": \"2024-02-13T05:04:29.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-02-13\", \"updated_at\": \"2024-02-13T05:04:29.000000Z\", \"user_limit\": 3, \"organization_id\": 92, \"subscription_plan_id\": 7}}', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(43, 'default', 'created', 'App\\Models\\Purchase', 'created', 6, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 6, \"user_id\": 137, \"coupon_id\": null, \"created_at\": \"2024-02-13T05:04:29.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-02-13T05:04:29.000000Z\", \"user_limit\": 3, \"actual_price\": 10000, \"organization_id\": 92, \"payment_attempt_id\": null, \"subscription_plan_id\": 7, \"subscription_details_id\": 41}}', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(44, 'default', 'created', 'App\\Models\\Setting', 'created', 46, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 46, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-02-13T05:04:29.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-13T05:04:29.000000Z\", \"contact_mail\": \"zaimahtech@gmail.com\", \"contact_number\": \"01714131050\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 92, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(45, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 31, 'App\\Models\\User', 1, '{\"old\": {\"id\": 31, \"name\": \"Jabed Akhter\", \"email\": \"zaimahtech@gmail.com\", \"mobile\": \"01714131050\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"test\", \"created_at\": \"2024-01-25T14:42:35.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-01-25T14:42:35.000000Z\", \"subscription_plan_id\": 7}, \"attributes\": {\"id\": 31, \"name\": \"Jabed Akhter\", \"email\": \"zaimahtech@gmail.com\", \"mobile\": \"01714131050\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"test\", \"created_at\": \"2024-01-25T14:42:35.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:04:29.000000Z\", \"subscription_plan_id\": 7}}', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(46, 'default', 'created', 'App\\Models\\Notification', 'created', 8, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 8, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-02-13T05:04:29.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-13T05:04:29.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(47, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 8, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 8, \"user_id\": 137, \"created_at\": \"2024-02-13T05:04:29.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:04:29.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 8}}', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(48, 'default', 'created', 'App\\Models\\Organization', 'created', 93, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 93, \"logo\": null, \"name\": \"Rakibul Islam\", \"email\": \"rakibul.zaimahtech@gmail.com\", \"mobile\": \"01705139111\", \"status\": 1, \"address\": \"\", \"db_name\": \"rakibulzaimahtechgmailcom_UDNIJ\", \"meta_tags\": null, \"created_at\": \"2024-02-13T05:12:42.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:12:42.000000Z\", \"description\": null, \"contact_person_name\": \"Rakibul Islam\", \"contact_person_email\": \"rakibul.zaimahtech@gmail.com\", \"contact_person_mobile\": \"01705139111\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(49, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 42, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 42, \"status\": 1, \"user_id\": 138, \"end_date\": \"2024-03-14\", \"created_at\": \"2024-02-13T05:12:42.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-02-13\", \"updated_at\": \"2024-02-13T05:12:42.000000Z\", \"user_limit\": 10, \"organization_id\": 93, \"subscription_plan_id\": 6}}', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(50, 'default', 'created', 'App\\Models\\Purchase', 'created', 7, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 7, \"user_id\": 138, \"coupon_id\": null, \"created_at\": \"2024-02-13T05:12:42.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-02-13T05:12:42.000000Z\", \"user_limit\": 10, \"actual_price\": 20000, \"organization_id\": 93, \"payment_attempt_id\": null, \"subscription_plan_id\": 6, \"subscription_details_id\": 42}}', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(51, 'default', 'created', 'App\\Models\\Setting', 'created', 47, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 47, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-02-13T05:12:42.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-13T05:12:42.000000Z\", \"contact_mail\": \"rakibul.zaimahtech@gmail.com\", \"contact_number\": \"01705139111\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 93, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(52, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 30, 'App\\Models\\User', 1, '{\"old\": {\"id\": 30, \"name\": \"Rakibul Islam\", \"email\": \"rakibul.zaimahtech@gmail.com\", \"mobile\": \"01705139111\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"AAA\", \"created_at\": \"2024-01-17T17:13:02.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-01-17T17:13:02.000000Z\", \"subscription_plan_id\": 6}, \"attributes\": {\"id\": 30, \"name\": \"Rakibul Islam\", \"email\": \"rakibul.zaimahtech@gmail.com\", \"mobile\": \"01705139111\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"AAA\", \"created_at\": \"2024-01-17T17:13:02.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:12:42.000000Z\", \"subscription_plan_id\": 6}}', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(53, 'default', 'created', 'App\\Models\\Notification', 'created', 9, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 9, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-02-13T05:12:42.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-13T05:12:42.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(54, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 9, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 9, \"user_id\": 138, \"created_at\": \"2024-02-13T05:12:42.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:12:42.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 9}}', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(55, 'default', 'created', 'App\\Models\\Organization', 'created', 94, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 94, \"logo\": null, \"name\": \"Ztl\", \"email\": \"ztl@gmail.com\", \"mobile\": \"01554885177\", \"status\": 1, \"address\": \"\", \"db_name\": \"ztlgmailcom_YMXTK\", \"meta_tags\": null, \"created_at\": \"2024-02-13T05:16:55.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:16:55.000000Z\", \"description\": null, \"contact_person_name\": \"Ztl\", \"contact_person_email\": \"ztl@gmail.com\", \"contact_person_mobile\": \"01554885177\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-02-12 23:16:55', '2024-02-12 23:16:55'),
(56, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 43, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 43, \"status\": 1, \"user_id\": 139, \"end_date\": \"2024-03-14\", \"created_at\": \"2024-02-13T05:16:56.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-02-13\", \"updated_at\": \"2024-02-13T05:16:56.000000Z\", \"user_limit\": 10, \"organization_id\": 94, \"subscription_plan_id\": 3}}', NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(57, 'default', 'created', 'App\\Models\\Purchase', 'created', 8, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 8, \"user_id\": 139, \"coupon_id\": null, \"created_at\": \"2024-02-13T05:16:56.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-02-13T05:16:56.000000Z\", \"user_limit\": 10, \"actual_price\": 0, \"organization_id\": 94, \"payment_attempt_id\": null, \"subscription_plan_id\": 3, \"subscription_details_id\": 43}}', NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(58, 'default', 'created', 'App\\Models\\Setting', 'created', 48, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 48, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-02-13T05:16:56.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-02-13T05:16:56.000000Z\", \"contact_mail\": \"ztl@gmail.com\", \"contact_number\": \"01554885177\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 94, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(59, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 21, 'App\\Models\\User', 1, '{\"old\": {\"id\": 21, \"name\": \"Ztl\", \"email\": \"ztl@gmail.com\", \"mobile\": \"01554885177\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"test\", \"created_at\": \"2023-11-05T12:19:17.000000Z\", \"deleted_at\": null, \"updated_at\": \"2023-11-05T12:19:17.000000Z\", \"subscription_plan_id\": 3}, \"attributes\": {\"id\": 21, \"name\": \"Ztl\", \"email\": \"ztl@gmail.com\", \"mobile\": \"01554885177\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"test\", \"created_at\": \"2023-11-05T12:19:17.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:16:56.000000Z\", \"subscription_plan_id\": 3}}', NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(60, 'default', 'created', 'App\\Models\\Notification', 'created', 10, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 10, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-02-13T05:16:56.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-02-13T05:16:56.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(61, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 10, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 10, \"user_id\": 139, \"created_at\": \"2024-02-13T05:16:56.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-02-13T05:16:56.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 10}}', NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(62, 'default', 'created', 'App\\Models\\SubscriptionRequest', 'created', 38, NULL, NULL, '{\"attributes\": {\"id\": 38, \"name\": \"Arafat Hossain\", \"email\": \"arafat99@gmail.com\", \"mobile\": \"01705500003\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"Hi dear neve fear , I am here\", \"created_at\": \"2024-04-22T10:08:14.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-22T10:08:14.000000Z\", \"subscription_plan_id\": 4}}', NULL, '2024-04-22 10:08:14', '2024-04-22 10:08:14'),
(63, 'default', 'created', 'App\\Models\\Notification', 'created', 11, NULL, NULL, '{\"attributes\": {\"id\": 11, \"title\": \"New request\", \"message\": \"New subscription request submitted.\", \"priority\": 1, \"created_at\": \"2024-04-22T10:08:14.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-04-22T10:08:14.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-04-22 10:08:14', '2024-04-22 10:08:14'),
(64, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 11, NULL, NULL, '{\"attributes\": {\"id\": 11, \"user_id\": 1, \"created_at\": \"2024-04-22T10:08:14.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-22T10:08:14.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 11}}', NULL, '2024-04-22 10:08:14', '2024-04-22 10:08:14'),
(65, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 12, NULL, NULL, '{\"attributes\": {\"id\": 12, \"user_id\": 141, \"created_at\": \"2024-04-22T10:08:14.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-22T10:08:14.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 11}}', NULL, '2024-04-22 10:08:14', '2024-04-22 10:08:14'),
(66, 'default', 'created', 'App\\Models\\Organization', 'created', 95, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 95, \"logo\": null, \"name\": \"Arafat Hossain\", \"email\": \"arafat99@gmail.com\", \"mobile\": \"01705500003\", \"status\": 1, \"address\": \"\", \"db_name\": \"arafat99gmailcom_MXKWS\", \"meta_tags\": null, \"created_at\": \"2024-04-22T10:10:20.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-22T10:10:20.000000Z\", \"description\": null, \"contact_person_name\": \"Arafat Hossain\", \"contact_person_email\": \"arafat99@gmail.com\", \"contact_person_mobile\": \"01705500003\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(67, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 44, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 44, \"status\": 1, \"user_id\": 148, \"end_date\": \"2024-05-22\", \"created_at\": \"2024-04-22T10:10:20.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-04-22\", \"updated_at\": \"2024-04-22T10:10:20.000000Z\", \"user_limit\": 9, \"organization_id\": 95, \"subscription_plan_id\": 4}}', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(68, 'default', 'created', 'App\\Models\\Purchase', 'created', 9, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 9, \"user_id\": 148, \"coupon_id\": null, \"created_at\": \"2024-04-22T10:10:20.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-04-22T10:10:20.000000Z\", \"user_limit\": 9, \"actual_price\": 1000, \"organization_id\": 95, \"payment_attempt_id\": null, \"subscription_plan_id\": 4, \"subscription_details_id\": 44}}', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(69, 'default', 'created', 'App\\Models\\Setting', 'created', 49, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 49, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-04-22T10:10:20.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-04-22T10:10:20.000000Z\", \"contact_mail\": \"arafat99@gmail.com\", \"contact_number\": \"01705500003\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 95, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(70, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 38, 'App\\Models\\User', 1, '{\"old\": {\"id\": 38, \"name\": \"Arafat Hossain\", \"email\": \"arafat99@gmail.com\", \"mobile\": \"01705500003\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"Hi dear neve fear , I am here\", \"created_at\": \"2024-04-22T10:08:14.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-22T10:08:14.000000Z\", \"subscription_plan_id\": 4}, \"attributes\": {\"id\": 38, \"name\": \"Arafat Hossain\", \"email\": \"arafat99@gmail.com\", \"mobile\": \"01705500003\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"Hi dear neve fear , I am here\", \"created_at\": \"2024-04-22T10:08:14.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-22T10:10:20.000000Z\", \"subscription_plan_id\": 4}}', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(71, 'default', 'created', 'App\\Models\\Notification', 'created', 12, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 12, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-04-22T10:10:20.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-04-22T10:10:20.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(72, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 13, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 13, \"user_id\": 148, \"created_at\": \"2024-04-22T10:10:20.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-22T10:10:20.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 12}}', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(73, 'default', 'created', 'App\\Models\\SubscriptionRequest', 'created', 39, NULL, NULL, '{\"attributes\": {\"id\": 39, \"name\": \"Abc Company\", \"email\": \"abc@gmail.com\", \"mobile\": \"01745454511\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"test\", \"created_at\": \"2024-04-27T07:13:35.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-27T07:13:35.000000Z\", \"subscription_plan_id\": 2}}', NULL, '2024-04-27 07:13:35', '2024-04-27 07:13:35'),
(74, 'default', 'created', 'App\\Models\\Notification', 'created', 13, NULL, NULL, '{\"attributes\": {\"id\": 13, \"title\": \"New request\", \"message\": \"New subscription request submitted.\", \"priority\": 1, \"created_at\": \"2024-04-27T07:13:35.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-04-27T07:13:35.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-04-27 07:13:35', '2024-04-27 07:13:35'),
(75, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 14, NULL, NULL, '{\"attributes\": {\"id\": 14, \"user_id\": 1, \"created_at\": \"2024-04-27T07:13:35.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-27T07:13:35.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 13}}', NULL, '2024-04-27 07:13:35', '2024-04-27 07:13:35'),
(76, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 15, NULL, NULL, '{\"attributes\": {\"id\": 15, \"user_id\": 141, \"created_at\": \"2024-04-27T07:13:35.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-27T07:13:35.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 13}}', NULL, '2024-04-27 07:13:35', '2024-04-27 07:13:35'),
(77, 'default', 'created', 'App\\Models\\Organization', 'created', 96, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 96, \"logo\": null, \"name\": \"Abc Company\", \"email\": \"abc@gmail.com\", \"mobile\": \"01745454511\", \"status\": 1, \"address\": \"\", \"db_name\": \"abcgmailcom_KYQAB\", \"meta_tags\": null, \"created_at\": \"2024-04-27T07:15:21.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-27T07:15:21.000000Z\", \"description\": null, \"contact_person_name\": \"Abc Company\", \"contact_person_email\": \"abc@gmail.com\", \"contact_person_mobile\": \"01745454511\", \"contact_person_designation\": \"Local Admin\"}}', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(78, 'default', 'created', 'App\\Models\\SubscriptionDetail', 'created', 45, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 45, \"status\": 1, \"user_id\": 149, \"end_date\": \"2024-05-27\", \"created_at\": \"2024-04-27T07:15:21.000000Z\", \"deleted_at\": null, \"start_date\": \"2024-04-27\", \"updated_at\": \"2024-04-27T07:15:21.000000Z\", \"user_limit\": 5, \"organization_id\": 96, \"subscription_plan_id\": 2}}', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(79, 'default', 'created', 'App\\Models\\Purchase', 'created', 10, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 10, \"user_id\": 149, \"coupon_id\": null, \"created_at\": \"2024-04-27T07:15:21.000000Z\", \"deleted_at\": null, \"payment_id\": null, \"sell_price\": 0, \"updated_at\": \"2024-04-27T07:15:21.000000Z\", \"user_limit\": 5, \"actual_price\": 5000, \"organization_id\": 96, \"payment_attempt_id\": null, \"subscription_plan_id\": 2, \"subscription_details_id\": 45}}', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(80, 'default', 'created', 'App\\Models\\Setting', 'created', 50, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 50, \"logo\": \"http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75\", \"is_2fa\": 0, \"is_sso\": 0, \"currency\": \"BDT\", \"created_at\": \"2024-04-27T07:15:21.000000Z\", \"is_api_key\": 0, \"updated_at\": \"2024-04-27T07:15:21.000000Z\", \"contact_mail\": \"abc@gmail.com\", \"contact_number\": \"01745454511\", \"is_notification\": 0, \"is_social_login\": 0, \"organization_id\": 96, \"is_direct_purchase\": 0, \"is_sms_notification\": 0, \"is_push_notification\": 0, \"is_email_notification\": 0}}', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(81, 'default', 'updated', 'App\\Models\\SubscriptionRequest', 'updated', 39, 'App\\Models\\User', 1, '{\"old\": {\"id\": 39, \"name\": \"Abc Company\", \"email\": \"abc@gmail.com\", \"mobile\": \"01745454511\", \"status\": 0, \"country\": \"Bangladesh\", \"message\": \"test\", \"created_at\": \"2024-04-27T01:13:35.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-27T01:13:35.000000Z\", \"subscription_plan_id\": 2}, \"attributes\": {\"id\": 39, \"name\": \"Abc Company\", \"email\": \"abc@gmail.com\", \"mobile\": \"01745454511\", \"status\": 2, \"country\": \"Bangladesh\", \"message\": \"test\", \"created_at\": \"2024-04-27T01:13:35.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-27T07:15:21.000000Z\", \"subscription_plan_id\": 2}}', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(82, 'default', 'created', 'App\\Models\\Notification', 'created', 14, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 14, \"title\": \"Organization Registered\", \"message\": \"Your organization is registered please update information and subscription plan.\", \"priority\": 1, \"created_at\": \"2024-04-27T07:15:21.000000Z\", \"deleted_at\": null, \"screen_tag\": 0, \"updated_at\": \"2024-04-27T07:15:21.000000Z\", \"notify_type\": 2, \"origin_type\": 1}}', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(83, 'default', 'created', 'App\\Models\\NotificationDetails', 'created', 16, 'App\\Models\\User', 1, '{\"attributes\": {\"id\": 16, \"user_id\": 149, \"created_at\": \"2024-04-27T07:15:21.000000Z\", \"deleted_at\": null, \"updated_at\": \"2024-04-27T07:15:21.000000Z\", \"seen_status\": 0, \"send_status\": 0, \"notification_id\": 14}}', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `api_keys` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `api_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purpose` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `audits`
--

CREATE TABLE `audits` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ccv` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `organization_id` bigint UNSIGNED NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `organization_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `division` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `address`, `organization_id`, `phone`, `email`, `logo`, `status`, `organization_name`, `contact_person_name`, `division`, `district`, `area`, `created_at`, `updated_at`) VALUES
(1, 'Test Branc 1', 'Lalbagh Road, Lalbagh , Dhaka', 79, '01705541567', 'admin@demo.com', NULL, '1', 'MHP', 'Mr Test', NULL, NULL, NULL, '2024-03-20 04:54:12', '2024-03-20 04:54:12'),
(2, 'Branch 2', 'Lalbagh Road, Lalbagh , Dhaka', 79, '01705541563', 'admin@demo.com', NULL, '1', 'MHP', 'Mr A', NULL, NULL, NULL, '2024-03-23 06:15:00', '2024-03-23 06:15:00'),
(3, 'Lalbagh', 'Lalbagh Road, Lalbagh , Dhaka', 79, '01705541567', 'admin@demo.com', NULL, '1', 'MHP', 'Mr Ahsan', NULL, NULL, NULL, '2024-03-24 05:49:07', '2024-03-24 05:49:07'),
(4, 'Banni Branch', 'test', 96, '01792796660', 'test@gmail.com', NULL, '1', 'Abc Company', 'Mr test 1', NULL, NULL, NULL, '2024-04-27 07:17:18', '2024-04-27 07:17:18'),
(5, 'Gulshan Branch', 'test', 96, '01792796661', 'b@gmail.com', NULL, '1', 'Abc Company', 'Jone do', NULL, NULL, NULL, '2024-04-27 07:25:24', '2024-04-27 07:25:24');

-- --------------------------------------------------------

--
-- Table structure for table `card_infos`
--

CREATE TABLE `card_infos` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ccv` int DEFAULT NULL,
  `expire_month` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_year` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `discount_type` tinyint NOT NULL DEFAULT '0' COMMENT '0:flat, 1:percentage',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `user_type` tinyint NOT NULL DEFAULT '0' COMMENT '0:all, 1:specific',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1:active, 0:inactive',
  `subscription_plan_type` tinyint NOT NULL DEFAULT '0' COMMENT '0:all, 1:specific',
  `created_by` bigint NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `amount`, `discount_type`, `start_date`, `end_date`, `user_type`, `status`, `subscription_plan_type`, `created_by`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'saasfdsdfasddef', 10, 1, '2023-05-28', '2024-05-28', 0, 1, 1, 5, NULL, '2023-07-05 11:36:27', '2023-07-05 11:36:27'),
(2, 'saasfdsdfasddf', 10, 1, '2023-05-28', '2024-05-28', 0, 1, 1, 3, NULL, '2023-07-05 11:36:43', '2023-07-23 08:20:37'),
(3, 'new 3sadf324', 10, 0, '2023-05-23', '2024-05-28', 0, 1, 1, 5, NULL, '2023-07-05 11:37:13', '2023-08-14 03:11:29'),
(4, 'new upcoming', 10, 0, '2024-05-23', '2024-05-28', 0, 1, 1, 5, NULL, '2023-07-05 11:38:18', '2023-08-14 03:11:29'),
(5, 'new sfd', 1, 1, '2014-05-23', '2014-05-28', 1, 1, 1, 1, NULL, '2023-07-05 11:38:35', '2023-08-14 03:12:54'),
(6, 'New copuon 100', 100, 1, '2023-08-14', '2023-08-31', 1, 1, 1, 1, NULL, '2023-08-14 03:14:40', '2023-08-14 03:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `coupon_subscription_plans`
--

CREATE TABLE `coupon_subscription_plans` (
  `id` bigint UNSIGNED NOT NULL,
  `coupon_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon_subscription_plans`
--

INSERT INTO `coupon_subscription_plans` (`id`, `coupon_id`, `subscription_plan_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL, NULL),
(2, 1, 2, NULL, NULL, NULL),
(3, 2, 1, NULL, NULL, NULL),
(4, 2, 2, NULL, NULL, NULL),
(5, 3, 1, NULL, NULL, NULL),
(6, 3, 2, NULL, NULL, NULL),
(7, 4, 1, NULL, NULL, NULL),
(8, 4, 2, NULL, NULL, NULL),
(9, 5, 1, NULL, NULL, NULL),
(10, 5, 2, NULL, NULL, NULL),
(11, 6, 3, NULL, NULL, NULL),
(12, 6, 7, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coupon_users`
--

CREATE TABLE `coupon_users` (
  `id` bigint UNSIGNED NOT NULL,
  `coupon_id` int NOT NULL,
  `user_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon_users`
--

INSERT INTO `coupon_users` (`id`, `coupon_id`, `user_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 5, 35, NULL, NULL, NULL),
(2, 5, 18, NULL, NULL, NULL),
(3, 6, 35, NULL, NULL, NULL),
(4, 6, 22, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dynamic_databases`
--

CREATE TABLE `dynamic_databases` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `failed_jobs`
--

INSERT INTO `failed_jobs` (`id`, `uuid`, `connection`, `queue`, `payload`, `exception`, `failed_at`) VALUES
(1, '7b7786b7-ddb7-448b-8f92-aa6d8273ea36', 'rabbitmq', 'default', '{\"uuid\":\"7b7786b7-ddb7-448b-8f92-aa6d8273ea36\",\"displayName\":\"App\\\\Jobs\\\\PayAsGoCalculationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\PayAsGoCalculationJob\",\"command\":\"O:30:\\\"App\\\\Jobs\\\\PayAsGoCalculationJob\\\":1:{s:36:\\\"\\u0000App\\\\Jobs\\\\PayAsGoCalculationJob\\u0000data\\\";a:1:{s:2:\\\"id\\\";i:38;}}\"},\"id\":\"469de08f-6d56-47b2-aa2e-cd524e7a1d73\"}', 'ErrorException: Attempt to read property \"organization_id\" on null in D:\\laragon\\mhp-saas-backend\\app\\Jobs\\PayAsGoCalculationJob.php:32\nStack trace:\n#0 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Bootstrap\\HandleExceptions.php(270): Illuminate\\Foundation\\Bootstrap\\HandleExceptions->handleError(2, \'Attempt to read...\', \'D:\\\\laragon\\\\mhp-...\', 32)\n#1 D:\\laragon\\mhp-saas-backend\\app\\Jobs\\PayAsGoCalculationJob.php(32): Illuminate\\Foundation\\Bootstrap\\HandleExceptions->Illuminate\\Foundation\\Bootstrap\\{closure}(2, \'Attempt to read...\', \'D:\\\\laragon\\\\mhp-...\', 32)\n#2 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\PayAsGoCalculationJob->handle()\n#3 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(41): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#4 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(93): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#5 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(37): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#6 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(661): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#7 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(128): Illuminate\\Container\\Container->call(Array)\n#8 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(141): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\PayAsGoCalculationJob))\n#9 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(116): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\PayAsGoCalculationJob))\n#10 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(132): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#11 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(124): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\PayAsGoCalculationJob), false)\n#12 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(141): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\PayAsGoCalculationJob))\n#13 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(116): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\PayAsGoCalculationJob))\n#14 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(126): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#15 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(VladimirYuldashev\\LaravelQueueRabbitMQ\\Queue\\Jobs\\RabbitMQJob), Object(App\\Jobs\\PayAsGoCalculationJob))\n#16 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(98): Illuminate\\Queue\\CallQueuedHandler->call(Object(VladimirYuldashev\\LaravelQueueRabbitMQ\\Queue\\Jobs\\RabbitMQJob), Array)\n#17 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(425): Illuminate\\Queue\\Jobs\\Job->fire()\n#18 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(375): Illuminate\\Queue\\Worker->process(\'rabbitmq\', Object(VladimirYuldashev\\LaravelQueueRabbitMQ\\Queue\\Jobs\\RabbitMQJob), Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(326): Illuminate\\Queue\\Worker->runJob(Object(VladimirYuldashev\\LaravelQueueRabbitMQ\\Queue\\Jobs\\RabbitMQJob), \'rabbitmq\', Object(Illuminate\\Queue\\WorkerOptions))\n#20 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->runNextJob(\'rabbitmq\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#21 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'rabbitmq\', \'default\')\n#22 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#23 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(41): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#24 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(93): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#25 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(37): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#26 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(661): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#27 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(183): Illuminate\\Container\\Container->call(Array)\n#28 D:\\laragon\\mhp-saas-backend\\vendor\\symfony\\console\\Command\\Command.php(326): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#29 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(153): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#30 D:\\laragon\\mhp-saas-backend\\vendor\\symfony\\console\\Application.php(1078): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\laragon\\mhp-saas-backend\\vendor\\symfony\\console\\Application.php(324): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\laragon\\mhp-saas-backend\\vendor\\symfony\\console\\Application.php(175): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Application.php(102): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#34 D:\\laragon\\mhp-saas-backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(155): Illuminate\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#35 D:\\laragon\\mhp-saas-backend\\artisan(37): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#36 {main}', '2024-02-12 00:45:02');

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive 1:active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `name`, `details`, `parent_id`, `status`, `deleted_at`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Referral letters & Prescriptions', 'A', 0, 1, NULL, 0, '2023-06-22 11:39:14', '2024-01-25 12:39:05'),
(2, 'Consultation from templates', 'A', 0, 1, NULL, 0, '2023-06-22 11:48:45', '2024-01-25 12:38:37'),
(3, 'Online Booking', 'A', 0, 1, NULL, 0, '2023-06-22 11:48:56', '2024-01-25 12:38:05'),
(4, 'Patient Records', 'S', 0, 1, NULL, 0, '2023-06-22 13:49:10', '2024-01-25 12:37:09'),
(5, 'Web and Mobile App Access', 'Test', 0, 1, NULL, 0, '2024-01-25 04:47:14', '2024-01-25 04:47:14'),
(6, '4 Ways real time Communication (SMS, Email, WhatsApp & Notification)', 'A', 0, 1, NULL, 0, '2024-01-25 12:39:28', '2024-01-25 12:39:28'),
(7, 'Reminders, Greetings, Offers', 'A', 0, 1, NULL, 0, '2024-01-25 12:39:41', '2024-01-25 12:39:41'),
(8, 'Web and Mobile App Access', 'A', 0, 0, NULL, 0, '2024-01-25 12:39:59', '2024-01-27 04:42:17'),
(9, 'Tele-consulting', 'A', 0, 1, NULL, 0, '2024-01-27 04:33:21', '2024-01-27 04:33:21'),
(10, 'Criteria based Bulk SMS sending*', 'A', 0, 1, NULL, 0, '2024-01-27 04:33:34', '2024-01-27 04:33:34'),
(11, 'Appointment notification by SMS*', 'A', 0, 1, NULL, 0, '2024-01-27 04:33:47', '2024-01-27 04:33:47'),
(12, 'Everything in Specialist, please', 'A', 0, 1, NULL, 0, '2024-01-27 04:34:05', '2024-01-27 04:34:05'),
(13, 'Patient Registration', 'A', 0, 1, NULL, 0, '2024-01-27 04:34:29', '2024-01-27 04:34:29'),
(14, 'Billing Management', 'A', 0, 1, NULL, 0, '2024-01-27 04:34:50', '2024-01-27 04:34:50'),
(15, 'Unlimited Users', 'A', 0, 1, NULL, 0, '2024-01-27 04:35:11', '2024-01-27 04:35:11'),
(16, 'Limited Invoice', 'A', 0, 1, NULL, 0, '2024-01-27 04:35:30', '2024-01-27 04:35:30'),
(17, 'QR Code System', 'A', 0, 1, NULL, 0, '2024-01-27 04:35:48', '2024-01-27 04:35:48'),
(18, '5 User/Collectors', 'A', 0, 1, NULL, 0, '2024-01-27 04:36:20', '2024-01-27 04:36:20'),
(19, '5 Franchise', 'A', 0, 1, NULL, 0, '2024-01-27 04:38:36', '2024-01-27 04:38:36'),
(20, 'Advanced Integrated Report- MIS', 'A', 0, 0, NULL, 0, '2024-01-27 04:38:50', '2024-01-27 04:48:36'),
(21, 'Unlimited Invoice', 'A', 0, 1, NULL, 0, '2024-01-27 04:45:52', '2024-01-27 04:45:52'),
(22, 'Unlimited User/Collectors', 'A', 0, 1, NULL, 0, '2024-01-27 04:46:13', '2024-01-27 04:46:13'),
(23, 'Unlimited Franchise', 'A', 0, 1, NULL, 0, '2024-01-27 04:46:32', '2024-01-27 04:46:32'),
(24, 'QR Coded Lab Report', 'A', 0, 1, NULL, 0, '2024-01-27 04:46:46', '2024-01-27 04:46:46'),
(25, 'Advanced Integrated Report- MIS', 'A', 0, 1, NULL, 0, '2024-01-27 04:47:02', '2024-01-27 04:47:02'),
(26, 'SMS Notification *', 'A', 0, 1, NULL, 0, '2024-01-27 04:50:25', '2024-01-27 04:50:25'),
(27, 'Machine Integrations', 'A', 0, 1, NULL, 0, '2024-01-27 04:50:46', '2024-01-27 04:50:46'),
(28, 'Data Exports', 'A', 0, 1, NULL, 0, '2024-01-27 04:51:02', '2024-01-27 04:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(25, 'default', '{\"uuid\":\"607bcb21-0bd2-4b74-bfc6-66555312790f\",\"displayName\":\"App\\\\Jobs\\\\PayAsGoCalculationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\PayAsGoCalculationJob\",\"command\":\"O:30:\\\"App\\\\Jobs\\\\PayAsGoCalculationJob\\\":1:{s:36:\\\"\\u0000App\\\\Jobs\\\\PayAsGoCalculationJob\\u0000data\\\";a:1:{s:2:\\\"id\\\";i:38;}}\"}}', 1, 1706934810, 1706934799, 1706934799),
(26, 'default', '{\"uuid\":\"0e181cc5-49e0-494a-a6ac-3614ed2b5862\",\"displayName\":\"App\\\\Jobs\\\\PayAsGoCalculationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\PayAsGoCalculationJob\",\"command\":\"O:30:\\\"App\\\\Jobs\\\\PayAsGoCalculationJob\\\":1:{s:36:\\\"\\u0000App\\\\Jobs\\\\PayAsGoCalculationJob\\u0000data\\\";a:1:{s:2:\\\"id\\\";i:38;}}\"}}', 1, 1706934821, 1706934819, 1706934819);

-- --------------------------------------------------------

--
-- Table structure for table `login_sessions`
--

CREATE TABLE `login_sessions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `login_sessions`
--

INSERT INTO `login_sessions` (`id`, `user_id`, `token`, `from_url`, `to_url`, `ip`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 1, '8KIlGRzc3ZCHUWUIjKklbyRgbIwtautQ', 'localhost', 'http://localhost:3002//register', '127.0.0.1', 1, '2024-02-12 03:20:50', '2024-02-12 03:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `mhp_sms`
--

CREATE TABLE `mhp_sms` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `is_api_type_parameter` int NOT NULL DEFAULT '1',
  `gateway_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorization` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `others` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_05_17_181447_create_roles_table', 1),
(6, '2022_05_17_181456_create_user_roles_table', 1),
(7, '2023_05_05_032537_create_organizations_table', 1),
(8, '2023_05_05_034457_create_features_table', 1),
(9, '2023_05_05_034547_create_subscription_plans_table', 1),
(10, '2023_05_05_034814_create_subscription_plan_features_table', 1),
(11, '2023_05_05_034834_create_subscription_requests_table', 1),
(12, '2023_05_05_034849_create_subscription_details_table', 1),
(13, '2023_05_05_034913_create_coupons_table', 1),
(14, '2023_05_05_035126_create_coupon_subscription_plans_table', 1),
(15, '2023_05_05_035204_create_coupon_users_table', 1),
(16, '2023_05_05_035225_create_purchases_table', 1),
(17, '2023_05_05_035240_create_purchase_attempts_table', 1),
(18, '2023_05_05_035304_create_payment_attempts_table', 1),
(19, '2023_05_05_035406_create_subscription_cancel_requests_table', 1),
(20, '2023_05_05_035423_create_api_keys_table', 1),
(22, '2023_05_05_035451_create_settings_table', 1),
(23, '2023_05_17_144146_create_dynamic_database_table', 1),
(24, '2023_06_22_155532_create_storage_sizes_table', 1),
(25, '2023_06_22_155651_create_validities_table', 1),
(26, '2023_07_12_151432_create_otps_table', 2),
(27, '2023_06_19_044219_create_notifications_table', 3),
(28, '2023_06_19_045635_create_notification_details_table', 3),
(29, '2023_08_01_165624_create_card_infos_table', 3),
(30, '2023_08_02_092902_create_sms_logs_table', 3),
(31, '2023_08_02_145650_create_subscription_detail_records_table', 3),
(32, '2023_08_19_061737_create_audits_table', 3),
(33, '2023_08_22_163403_create_activity_log_table', 3),
(34, '2023_08_22_163404_add_event_column_to_activity_log_table', 3),
(35, '2023_08_22_163405_add_batch_uuid_column_to_activity_log_table', 3),
(36, '2023_09_17_150346_create_refunds_table', 3),
(37, '2023_10_03_025731_create_payment_references_table', 3),
(38, '2023_10_08_151608_create_refund_references_table', 3),
(39, '2024_01_02_164453_create_login_sessions_table', 3),
(40, '2024_01_29_134750_create_pay_as_go_settings_table', 4),
(41, '2024_01_29_140338_create_pay_as_go_billing_details_table', 4),
(42, '2024_01_29_140405_create_pay_as_go_billing_summaries_table', 4),
(43, '2024_01_31_104248_create_pay_as_go_billing_break_downs_table', 4),
(44, '2024_02_02_050432_create_jobs_table', 4),
(45, '2024_02_12_114732_create_s_m_s_gateways_table', 5),
(46, '2024_02_13_121753_create_sms_gateway_details_table', 5),
(47, '2024_02_18_061307_create_purchase_sms_table', 5),
(48, '2024_02_25_111354_create_mhp_sms_table', 5),
(49, '2024_02_25_112459_create_sms_credentials_table', 5),
(50, '2024_02_25_112722_create_sms_allowed_countries_table', 5),
(51, '2024_02_25_123325_create_s_m_s_histories_table', 5),
(52, '2024_03_11_115948_create_branches_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `notify_type` tinyint NOT NULL DEFAULT '2' COMMENT '1:push, 2: both',
  `origin_type` tinyint NOT NULL DEFAULT '1' COMMENT '1:system, 2: order, 3:admin, 4:payment',
  `priority` tinyint NOT NULL DEFAULT '1' COMMENT '1:high, 2: medium, 3:low',
  `screen_tag` int NOT NULL DEFAULT '0' COMMENT 'related app screen identifier',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `title`, `message`, `notify_type`, `origin_type`, `priority`, `screen_tag`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'New request', 'New subscription request submitted.', 2, 1, 1, 0, '2024-02-04 23:20:49', '2024-02-04 23:20:49', NULL),
(2, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-02-04 23:23:07', '2024-02-04 23:23:07', NULL),
(3, 'Daily Bill alert', 'Your Pay as go bill for for 2024-02-12 is 250', 2, 1, 1, 0, '2024-02-12 00:44:58', '2024-02-12 00:44:58', NULL),
(4, 'New request', 'New subscription request submitted.', 2, 1, 1, 0, '2024-02-12 00:55:40', '2024-02-12 00:55:40', NULL),
(5, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-02-12 00:56:38', '2024-02-12 00:56:38', NULL),
(6, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-02-12 01:32:56', '2024-02-12 01:32:56', NULL),
(7, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-02-12 22:58:37', '2024-02-12 22:58:37', NULL),
(8, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-02-12 23:04:29', '2024-02-12 23:04:29', NULL),
(9, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-02-12 23:12:42', '2024-02-12 23:12:42', NULL),
(10, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-02-12 23:16:56', '2024-02-12 23:16:56', NULL),
(11, 'New request', 'New subscription request submitted.', 2, 1, 1, 0, '2024-04-22 10:08:14', '2024-04-22 10:08:14', NULL),
(12, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-04-22 10:10:20', '2024-04-22 10:10:20', NULL),
(13, 'New request', 'New subscription request submitted.', 2, 1, 1, 0, '2024-04-27 07:13:35', '2024-04-27 07:13:35', NULL),
(14, 'Organization Registered', 'Your organization is registered please update information and subscription plan.', 2, 1, 1, 0, '2024-04-27 13:15:21', '2024-04-27 13:15:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notification_details`
--

CREATE TABLE `notification_details` (
  `id` bigint UNSIGNED NOT NULL,
  `notification_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `send_status` tinyint NOT NULL DEFAULT '0' COMMENT '0:not send 1: send',
  `seen_status` tinyint NOT NULL DEFAULT '0' COMMENT '0:not seen 1: seen',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_details`
--

INSERT INTO `notification_details` (`id`, `notification_id`, `user_id`, `send_status`, `seen_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 0, 1, '2024-02-04 23:20:49', '2024-02-04 23:21:20', NULL),
(2, 2, 133, 0, 0, '2024-02-04 23:23:07', '2024-02-04 23:23:07', NULL),
(3, 3, 100, 0, 0, '2024-02-12 00:44:58', '2024-02-12 00:44:58', NULL),
(4, 4, 1, 0, 0, '2024-02-12 00:55:40', '2024-02-12 00:55:40', NULL),
(5, 5, 134, 0, 0, '2024-02-12 00:56:38', '2024-02-12 00:56:38', NULL),
(6, 6, 135, 0, 0, '2024-02-12 01:32:56', '2024-02-12 01:32:56', NULL),
(7, 7, 136, 0, 0, '2024-02-12 22:58:37', '2024-02-12 22:58:37', NULL),
(8, 8, 137, 0, 0, '2024-02-12 23:04:29', '2024-02-12 23:04:29', NULL),
(9, 9, 138, 0, 0, '2024-02-12 23:12:42', '2024-02-12 23:12:42', NULL),
(10, 10, 139, 0, 0, '2024-02-12 23:16:56', '2024-02-12 23:16:56', NULL),
(11, 11, 1, 0, 0, '2024-04-22 10:08:14', '2024-04-22 10:08:14', NULL),
(12, 11, 141, 0, 0, '2024-04-22 10:08:14', '2024-04-22 10:08:14', NULL),
(13, 12, 148, 0, 0, '2024-04-22 10:10:20', '2024-04-22 10:10:20', NULL),
(14, 13, 1, 0, 0, '2024-04-27 07:13:35', '2024-04-27 07:13:35', NULL),
(15, 13, 141, 0, 0, '2024-04-27 07:13:35', '2024-04-27 07:13:35', NULL),
(16, 14, 149, 0, 0, '2024-04-27 13:15:21', '2024-04-27 13:15:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person_designation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `db_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0: inactive 1:active',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `address`, `mobile`, `email`, `contact_person_name`, `contact_person_mobile`, `contact_person_email`, `contact_person_designation`, `description`, `logo`, `db_name`, `meta_tags`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'New Organization', 'New address', '123456', 'chaki@gmail.com', 'sdfsdfdsf', '123456', 'chaki@gmail.com', 'Local Admin', 'safdsafsdafsdaf', '25337360-3e3e-4e38-b2ea-862d02f9c371.png', 'pos_test', NULL, 1, NULL, '2023-06-22 12:11:43', '2023-07-06 13:43:44'),
(2, 'Organization 2', 'required|string', '0173243244', 'organizatiofsn@email.com', 'name', '32424243242', 'contact@gmail.com', 'admin', 'none', NULL, 'contact_gmail_com', 'string', 1, NULL, '2023-06-22 12:36:33', '2023-07-06 13:43:44'),
(3, 'aaacaasasadadc', '', '017328439243', 'aaa@gmail.com', 'aaacaasasadadc', '017328439243', 'aaa@gmail.com', 'Local Admin', NULL, NULL, 'aaagmailcom', NULL, 1, NULL, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(4, 'aaacaasasadadc', '', '017328439243', 'cccc@gmail.com', 'aaacaasasadadc', '017328439243', 'cccc@gmail.com', 'Local Admin', NULL, NULL, 'ccccgmailcom', NULL, 1, NULL, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(6, 'aaacaasasadadc', '', '017328439243', 'aaaadadacsc@gmail.com', 'aaacaasasadadc', '017328439243', 'aaaadadacsc@gmail.com', 'Local Admin', NULL, NULL, 'aaaadadacscgmailcom', NULL, 1, NULL, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(7, 'aaacaasasadadc', '', '017328439243', 'aaaacsc@gmail.com', 'aaacaasasadadc', '017328439243', 'aaaacsc@gmail.com', 'Local Admin', NULL, NULL, 'aaaacscgmailcom', NULL, 1, NULL, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(8, 'aaacaasasadadc', '', '01732849243', 'aaaacc@gmail.com', 'aaacaasasadadc', '01732849243', 'aaaacc@gmail.com', 'Local Admin', NULL, NULL, 'aaaaccgmailcom', NULL, 1, NULL, '2023-07-08 09:27:15', '2023-07-08 09:27:15'),
(11, 'aaacc', '', '01732849243', 'aaacc@gmail.com', 'aaacc', '01732849243', 'aaacc@gmail.com', 'Local Admin', NULL, NULL, 'aaaccgmailcom', NULL, 1, NULL, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 'xxx', '', '01732849243', 'xxx@gmail.com', 'xxx', '01732849243', 'xxx@gmail.com', 'Local Admin', NULL, NULL, 'xxxgmailcom', NULL, 1, NULL, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 'xxx', '', '01732849243', 'zzz@gmail.com', 'xxx', '01732849243', 'zzz@gmail.com', 'Local Admin', NULL, NULL, 'zzzgmailcom', NULL, 1, NULL, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 'xxx', '', '01732849243', 'zxc@gmail.com', 'xxx', '01732849243', 'zxc@gmail.com', 'Local Admin', NULL, NULL, 'zxcgmailcom', NULL, 1, NULL, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 'xxx', '', '01732849243', 'ccc@gmail.com', 'xxx', '01732849243', 'ccc@gmail.com', 'Local Admin', NULL, NULL, 'cccgmailcom', NULL, 1, NULL, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 'xxx', '', '01732849243', 'vvssv@gmail.com', 'xxx', '01732849243', 'vvssv@gmail.com', 'Local Admin', NULL, NULL, 'vvssvgmailcom', NULL, 1, NULL, '2023-07-08 04:31:52', '2023-07-08 04:31:52'),
(20, 'sdfsdfdsf', '', '01732849243', 'mm@gmail.com', 'sdfsdfdsf', '01732849243', 'mm@gmail.com', 'Local Admin', NULL, NULL, 'mmgmailcom', NULL, 1, NULL, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(21, 'kajol', '', '01732849243', 'kasdfjolchaki@gmail.com', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(22, 'kajol', '', '01732849243', 'sdf', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(23, 'kajol', '', '01732849243', 'kajdsfolchaki@gmail.com', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(25, 'kajol', '', '01732849243', 'kajolchaki@gmail.com', 'kajol', '01732849243', 'kajolchaki@gmail.com', 'Local Admin', NULL, NULL, 'kajolchakigmailcom', NULL, 1, NULL, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(26, 'zzz', '', '01111111199', 'sandy@gmail.com', 'zzz', '01111111199', 'sandy@gmail.com', 'Local Admin', NULL, NULL, 'sandygmailcom', NULL, 2, NULL, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(30, 'sdfsdfdsf', '', '01732849243', 'prosanta.k.c@gmail.com', 'sdfsdfdsf', '01732849243', 'prosanta.k.c@gmail.com', 'Local Admin', NULL, NULL, 'prosantakcgmailcom', NULL, 1, NULL, '2023-07-22 12:14:05', '2023-07-22 12:14:05'),
(74, 'Mhp', '', '01554885166', 'mhp@gmail.com', 'Mhp', '01554885166', 'mhp@gmail.com', 'Local Admin', NULL, NULL, 'mhpgmailcom', NULL, 1, NULL, '2023-10-19 11:14:23', '2023-10-19 11:14:23'),
(75, 'Doctor', '', '01554885100', 'doctor@gmail.com', 'Doctor', '01554885100', 'doctor@gmail.com', 'Local Admin', NULL, NULL, 'doctorgmailcom', NULL, 1, NULL, '2023-11-02 09:13:35', '2023-11-02 09:13:35'),
(76, 'Zaimahtech', '', '01792796661', 'ztlabcd@gmail.com', 'Zaimahtech', '01792796661', 'ztlabcd@gmail.com', 'Local Admin', NULL, NULL, 'ztlabcdgmailcom', NULL, 1, NULL, '2023-11-05 06:42:22', '2023-11-05 06:42:22'),
(77, 'Ztl', '', '01554885166', 'ztltest@gmail.com', 'Ztl', '01554885166', 'ztltest@gmail.com', 'Local Admin', NULL, NULL, 'ztltestgmailcom', NULL, 1, NULL, '2023-11-11 03:37:59', '2023-11-11 03:37:59'),
(78, 'Sandy', '', '01554885112', 'adminztl123@gmail.com', 'Sandy', '01554885112', 'adminztl123@gmail.com', 'Local Admin', NULL, NULL, 'adminztl123gmailcom', NULL, 1, NULL, '2023-11-11 06:43:44', '2023-11-11 06:43:44'),
(79, 'MHP', 'Rampur,Dhaka,Bangladesh', '01554885166', 'mhp@demo.com', 'MHP', '01554885166', 'mhp@demo.com', 'Local Admin', 'test', 'https://gdsaasbackend.macrohealthplus.org/logo9ebf89b2-189f-43cc-8396-7d43f32b72c8.jpeg', 'mhpdemocom', NULL, 1, NULL, '2023-11-11 10:08:15', '2024-01-15 05:16:22'),
(80, 'ztl_demo', '', '01533533198', 'ztl_demo@gmail.com', 'ztl_demo', '01533533198', 'ztl_demo@gmail.com', 'Local Admin', NULL, NULL, 'ztldemogmailcom', NULL, 1, NULL, '2023-12-20 10:26:08', '2023-12-20 10:26:08'),
(81, 'zabir raihan', '', '01833086035', 'zabir@gmail.com', 'zabir raihan', '01833086035', 'zabir@gmail.com', 'Local Admin', NULL, NULL, 'zabirgmailcom', NULL, 1, NULL, '2023-12-23 04:21:50', '2023-12-23 04:21:50'),
(82, 'Dr. Kamal Uddin Ahmed', '', '01856519555', 'dr.kamal.uddin.ahmed007@gmail.com', 'Dr. Kamal Uddin Ahmed', '01856519555', 'dr.kamal.uddin.ahmed007@gmail.com', 'Local Admin', NULL, NULL, 'drkamaluddinahmed007gmailcom', NULL, 1, NULL, '2024-01-04 11:31:11', '2024-01-04 11:31:11'),
(83, 'Husnae Ahmed', '', '01786378313', 'husnae.ahmed007@gmail.com', 'Husnae Ahmed', '01786378313', 'husnae.ahmed007@gmail.com', 'Local Admin', NULL, NULL, 'husnaeahmed007gmailcom', NULL, 1, NULL, '2024-01-04 12:04:04', '2024-01-04 12:04:04'),
(84, 'macrohealthplus', '', '+8801714131050', 'jabed@macrohealthplus.org', 'macrohealthplus', '+8801714131050', 'jabed@macrohealthplus.org', 'Local Admin', NULL, NULL, 'jabedmacrohealthplusorg', NULL, 1, NULL, '2024-01-25 09:46:45', '2024-01-25 09:46:45'),
(85, 'Dr. Md.Akik Hossain', '', '01711139201', 'drakik49mbbsrmc@gmail.com', 'Dr. Md.Akik Hossain', '01711139201', 'drakik49mbbsrmc@gmail.com', 'Local Admin', NULL, NULL, 'drakik49mbbsrmcgmailcom', NULL, 1, NULL, '2024-01-29 06:29:41', '2024-01-29 06:29:41'),
(86, 'Md. Akik Hossain', '', '01711139201', 'mdakikhossain74@gmail.com', 'Md. Akik Hossain', '01711139201', 'mdakikhossain74@gmail.com', 'Local Admin', NULL, NULL, 'mdakikhossain74gmailcom', NULL, 1, NULL, '2024-01-29 07:41:36', '2024-01-29 07:41:36'),
(87, 'Napadol', '', '01705541560', 'admin@demo.com', 'Napadol', '01705541560', 'admin@demo.com', 'Local Admin', NULL, NULL, 'admindemocom_ETXWM', NULL, 1, NULL, '2024-02-04 23:23:04', '2024-02-04 23:23:04'),
(88, 'Napadol', '', '01705541569', 'artest@gmail.com', 'Napadol', '01705541569', 'artest@gmail.com', 'Local Admin', NULL, NULL, 'artestgmailcom_NKXUM', NULL, 1, NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(90, 'Arafat', '', '01705541561', 'dev.arafat.zaimahtech@gmail.com', 'Arafat', '01705541561', 'dev.arafat.zaimahtech@gmail.com', 'Local Admin', NULL, NULL, 'devarafatzaimahtechgmailcom_GNQWT', NULL, 1, NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(91, 'Rakibul Islam', '', '01705139111', 'admintyht@gmail.com', 'Rakibul Islam', '01705139111', 'admintyht@gmail.com', 'Local Admin', NULL, NULL, 'admintyhtgmailcom_CVUSP', NULL, 1, NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(92, 'Jabed Akhter', '', '01714131050', 'zaimahtech@gmail.com', 'Jabed Akhter', '01714131050', 'zaimahtech@gmail.com', 'Local Admin', NULL, NULL, 'zaimahtechgmailcom_DPZOB', NULL, 1, NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(93, 'Rakibul Islam', '', '01705139111', 'rakibul.zaimahtech@gmail.com', 'Rakibul Islam', '01705139111', 'rakibul.zaimahtech@gmail.com', 'Local Admin', NULL, NULL, 'rakibulzaimahtechgmailcom_UDNIJ', NULL, 1, NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(94, 'Ztl', '', '01554885177', 'ztl@gmail.com', 'Ztl', '01554885177', 'ztl@gmail.com', 'Local Admin', NULL, NULL, 'ztlgmailcom_YMXTK', NULL, 1, NULL, '2024-02-12 23:16:55', '2024-02-12 23:16:55'),
(95, 'Arafat Hossain', '', '01705500003', 'arafat99@gmail.com', 'Arafat Hossain', '01705500003', 'arafat99@gmail.com', 'Local Admin', NULL, NULL, 'arafat99gmailcom_MXKWS', NULL, 1, NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(96, 'Abc Company', '', '01745454511', 'abc@gmail.com', 'Abc Company', '01745454511', 'abc@gmail.com', 'Local Admin', NULL, NULL, 'abcgmailcom_KYQAB', NULL, 1, NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` bigint UNSIGNED NOT NULL,
  `token` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive, 1:active, 2:used',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `token`, `email`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 9652, 'kajolchaki@gmail.com', 22, 1, '2023-07-16 11:08:27', '2023-07-16 11:08:27'),
(3, 4371, 'user@email.com', 3, 1, '2023-07-21 09:54:31', '2023-07-21 09:54:31'),
(4, 3485, 'user2@gmail.com', 5, 1, '2023-08-02 10:47:58', '2023-08-02 10:47:58'),
(5, 1787, 'user2@gmail.com', 5, 1, '2023-08-02 11:04:49', '2023-08-02 11:04:49'),
(6, 3439, 'user2@gmail.com', 5, 1, '2023-08-02 11:05:20', '2023-08-02 11:05:20'),
(8, 7346, 'user2@gmail.com', 5, 1, '2023-08-02 11:08:21', '2023-08-02 11:08:21'),
(9, 7839, 'user2@gmail.com', 5, 1, '2023-08-02 11:25:39', '2023-08-02 11:25:39'),
(10, 5834, 'ztltest@gmail.com', 96, 1, '2023-12-23 10:24:40', '2023-12-23 10:24:40'),
(11, 6469, 'ztltest@gmail.com', 96, 1, '2023-12-23 10:24:57', '2023-12-23 10:24:57'),
(12, 4272, 'ztltest@gmail.com', 96, 1, '2023-12-23 10:25:17', '2023-12-23 10:25:17');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_attempts`
--

CREATE TABLE `payment_attempts` (
  `id` bigint UNSIGNED NOT NULL,
  `purchase_attempt_id` int NOT NULL,
  `amount` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '2' COMMENT '0:failed, 1:success, 2:pending',
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_references`
--

CREATE TABLE `payment_references` (
  `id` bigint UNSIGNED NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'VALID / FAILED / CANCELLED',
  `tran_date` timestamp NOT NULL,
  `tran_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `val_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `store_amount` decimal(10,2) NOT NULL,
  `card_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_tran_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_issuer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_issuer_country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_issuer_country_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pay_as_go_billing_break_downs`
--

CREATE TABLE `pay_as_go_billing_break_downs` (
  `id` bigint UNSIGNED NOT NULL,
  `pay_as_go_billing_summaries_id` bigint NOT NULL,
  `date` date NOT NULL,
  `user_count` int NOT NULL,
  `user_bill` double(8,2) NOT NULL,
  `storage_count` double(8,2) NOT NULL,
  `storage_bill` double(8,2) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pay_as_go_billing_break_downs`
--

INSERT INTO `pay_as_go_billing_break_downs` (`id`, `pay_as_go_billing_summaries_id`, `date`, `user_count`, `user_bill`, `storage_count`, `storage_bill`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-01-01', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:09:54', '2024-02-03 01:09:54'),
(2, 2, '2024-02-01', 0, 10.00, 0.01, 10.00, 1, '2024-02-03 01:12:37', '2024-02-03 01:12:37'),
(3, 1, '2024-01-02', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:12:40', '2024-02-03 01:12:40'),
(4, 2, '2024-02-02', 0, 10.00, 0.01, 10.00, 1, '2024-02-03 01:12:56', '2024-02-03 01:12:56'),
(5, 1, '2024-01-03', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:12:59', '2024-02-03 01:12:59'),
(6, 2, '2024-02-03', 0, 10.00, 0.01, 10.00, 1, '2024-02-03 01:13:02', '2024-02-03 01:13:02'),
(7, 1, '2024-01-04', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:13:05', '2024-02-03 01:13:05'),
(8, 2, '2024-01-31', 0, 10.00, 0.01, 10.00, 1, '2024-02-03 01:13:08', '2024-02-03 01:13:08'),
(9, 1, '2024-01-05', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:13:12', '2024-02-03 01:13:12'),
(10, 2, '2024-01-30', 0, 10.00, 0.01, 10.00, 1, '2024-02-03 01:13:15', '2024-02-03 01:13:15'),
(11, 1, '2024-01-08', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:13:18', '2024-02-03 01:13:18'),
(12, 2, '2024-01-29', 0, 10.00, 0.01, 10.00, 1, '2024-02-03 01:13:21', '2024-02-03 01:13:21'),
(13, 1, '2024-01-06', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:13:24', '2024-02-03 01:13:24'),
(14, 2, '2024-02-26', 0, 10.00, 0.01, 10.00, 1, '2024-02-03 01:13:27', '2024-02-03 01:13:27'),
(15, 1, '2024-01-07', 2, 20.00, 0.03, 10.00, 1, '2024-02-03 01:13:31', '2024-02-03 01:13:31'),
(16, 2, '2024-02-10', 0, 10.00, 0.01, 10.00, 1, '2024-02-10 01:10:10', '2024-02-10 01:10:10'),
(17, 1, '2024-02-10', 2, 20.00, 0.03, 10.00, 1, '2024-02-10 01:10:13', '2024-02-10 01:10:13'),
(18, 2, '2024-02-10', 0, 10.00, 0.01, 10.00, 1, '2024-02-10 01:15:10', '2024-02-10 01:15:10'),
(19, 1, '2024-02-10', 2, 20.00, 0.03, 10.00, 1, '2024-02-10 01:15:13', '2024-02-10 01:15:13'),
(20, 2, '2024-02-12', 24, 240.00, 0.03, 10.00, 1, '2024-02-12 00:44:58', '2024-02-12 00:44:58');

-- --------------------------------------------------------

--
-- Table structure for table `pay_as_go_billing_details`
--

CREATE TABLE `pay_as_go_billing_details` (
  `id` bigint UNSIGNED NOT NULL,
  `pay_as_go_billing_summaries_id` bigint NOT NULL,
  `billing_date` date NOT NULL,
  `payment_date` date DEFAULT NULL,
  `billing_amount` double(8,2) NOT NULL,
  `payment_amount` double(8,2) DEFAULT NULL,
  `purchase_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1:bill generate, 2:bill paid,',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pay_as_go_billing_details`
--

INSERT INTO `pay_as_go_billing_details` (`id`, `pay_as_go_billing_summaries_id`, `billing_date`, `payment_date`, `billing_amount`, `payment_amount`, `purchase_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, '2024-02-03', NULL, 140.00, NULL, NULL, 1, '2024-02-03 02:20:36', '2024-02-03 02:20:36'),
(2, 1, '2024-02-03', '2024-02-05', 240.00, 240.00, '22', 2, '2024-02-03 02:20:40', '2024-02-05 08:52:38'),
(3, 2, '2024-02-03', NULL, 20.00, NULL, NULL, 1, '2024-02-03 02:25:08', '2024-02-03 02:25:08');

-- --------------------------------------------------------

--
-- Table structure for table `pay_as_go_billing_summaries`
--

CREATE TABLE `pay_as_go_billing_summaries` (
  `id` bigint UNSIGNED NOT NULL,
  `subscription_details_id` bigint NOT NULL,
  `start_date` date NOT NULL,
  `last_payment_date` date NOT NULL,
  `last_payment_amount` double(8,2) NOT NULL,
  `last_billing_date` date DEFAULT NULL,
  `due_amount` double(8,2) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pay_as_go_billing_summaries`
--

INSERT INTO `pay_as_go_billing_summaries` (`id`, `subscription_details_id`, `start_date`, `last_payment_date`, `last_payment_amount`, `last_billing_date`, `due_amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 38, '2024-02-03', '2024-02-03', 0.00, '2024-02-05', 0.00, 1, '2024-02-02 22:00:36', '2024-02-05 08:52:11'),
(2, 29, '2023-05-28', '2023-05-28', 0.00, '2024-02-03', 160.00, 1, '2024-02-03 07:11:42', '2024-02-03 02:25:08');

-- --------------------------------------------------------

--
-- Table structure for table `pay_as_go_settings`
--

CREATE TABLE `pay_as_go_settings` (
  `id` bigint UNSIGNED NOT NULL,
  `per_user` float NOT NULL COMMENT 'per user per day',
  `min_user` int NOT NULL DEFAULT '1',
  `per_gb_storage` float NOT NULL COMMENT 'per GB database per day',
  `min_storage` float NOT NULL DEFAULT '1',
  `status` tinyint NOT NULL DEFAULT '1',
  `created_by` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pay_as_go_settings`
--

INSERT INTO `pay_as_go_settings` (`id`, `per_user`, `min_user`, `per_gb_storage`, `min_storage`, `status`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 10, 1, 10, 1, 1, 1, '2024-02-02 05:56:36', '2024-02-02 05:56:36');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'hydra-api-token', 'bd436fb7625a3787cb2fdfea1acee72acd01b93092004d12b6e911fdaf17c5c8', '[\"admin\"]', '2023-06-22 12:11:43', '2023-06-22 11:35:14', '2023-06-22 12:11:43'),
(2, 'App\\Models\\User', 4, 'hydra-api-token', '0f3ecf475019adcd6b9eab8005e03ea3be8b36db3eae04ea14aab33f32e870d3', '[\"admin\"]', '2023-06-22 13:26:36', '2023-06-22 12:12:13', '2023-06-22 13:26:36'),
(3, 'App\\Models\\User', 1, 'hydra-api-token', '0337dd15621684c6d0fa177701a5550fea0e275321d9f958cfbf0b4f6bd87144', '[\"admin\"]', '2023-06-22 13:51:32', '2023-06-22 13:45:21', '2023-06-22 13:51:32'),
(4, 'App\\Models\\User', 4, 'hydra-api-token', '66cf96e1c5722d4898cac9f9cc4241751cc850a3339b9181af1c4034a579163e', '[\"admin\"]', '2023-06-26 10:17:35', '2023-06-26 10:01:42', '2023-06-26 10:17:35'),
(5, 'App\\Models\\User', 5, 'hydra-api-token', 'c3cf84a50277c456c674e12b73622b7d0b8bdbb571412cfca2646157679c068a', '[\"user\"]', '2023-06-26 22:33:22', '2023-06-26 22:32:16', '2023-06-26 22:33:22'),
(6, 'App\\Models\\User', 4, 'hydra-api-token', '9b4f79d8ec3960eb89d4ca7c2c9312c86f1e7e42a67831f87aff9f0fadf0e536', '[\"admin\"]', '2023-06-27 04:27:10', '2023-06-26 22:34:09', '2023-06-27 04:27:10'),
(7, 'App\\Models\\User', 1, 'hydra-api-token', '5d8dac38e1670ac8608fe42212fc75fd27a30a305e568ea9f695b8894b10211b', '[\"admin\"]', NULL, '2023-06-27 04:34:54', '2023-06-27 04:34:54'),
(8, 'App\\Models\\User', 1, 'hydra-api-token', '1235ef0e7108a5c16077f27fcf6e9041c1cb8853765f9781f25be46b798994ce', '[\"admin\"]', '2023-07-02 09:35:59', '2023-07-02 09:31:24', '2023-07-02 09:35:59'),
(9, 'App\\Models\\User', 5, 'hydra-api-token', 'f2ce4481e70dbac3899bdfb87b851418701677133eb9356a0f9be1a3653d0ac5', '[\"admin\"]', '2023-07-08 04:31:52', '2023-07-02 09:39:03', '2023-07-08 04:31:52'),
(10, 'App\\Models\\User', 5, 'hydra-api-token', '91e2609b6f0aefd54276ea0f72f4148086be826ba4b4c06bab9f847bbeba799c', '[\"admin\"]', NULL, '2023-07-04 12:41:31', '2023-07-04 12:41:31'),
(11, 'App\\Models\\User', 1, 'hydra-api-token', '09ef88fd285b6045bf33a23d2e4c7aa2ca577e4b8b39bae35591ac99ac54ca2a', '[\"admin\"]', '2023-07-11 13:20:19', '2023-07-08 11:47:39', '2023-07-11 13:20:19'),
(12, 'App\\Models\\User', 22, 'hydra-api-token', '868760b49396c9c96cd50c032622864dc0ff39b233a8a4b6ffddddc200517290', '[\"admin\"]', NULL, '2023-07-11 13:21:41', '2023-07-11 13:21:41'),
(14, 'App\\Models\\User', 22, 'hydra-api-token', '5b31d2b5738200b39fdecc2af8a71cc32bf056dda8452bd24bf5a16df9e4b242', '[\"admin\"]', NULL, '2023-07-16 11:19:36', '2023-07-16 11:19:36'),
(15, 'App\\Models\\User', 3, 'hydra-api-token', 'fe21dd3c7086cf866a2066f7569c367b72e97ed4611e10e48627007124f75d2f', '[\"user\"]', '2023-07-23 08:20:37', '2023-07-21 09:54:53', '2023-07-23 08:20:37'),
(16, 'App\\Models\\User', 5, 'hydra-api-token', '6042e7d04897869be75eeec8e164f908d3bee8078726a979d69dc18cf3c7c792', '[\"admin\"]', '2023-08-01 11:45:09', '2023-08-01 11:12:26', '2023-08-01 11:45:09'),
(17, 'App\\Models\\User', 5, 'hydra-api-token', '67b271731c2b70f4efd259734ac0e628bf57376f99c3fc38f9e5d65fa6a638a5', '[\"admin\"]', '2023-08-02 09:24:02', '2023-08-02 09:21:21', '2023-08-02 09:24:02'),
(18, 'App\\Models\\User', 5, 'hydra-api-token', 'c1631c7837fa01075892e77254e29e25bde0e43bae5249543451a29c7c67f024', '[\"admin\"]', NULL, '2023-08-02 09:21:46', '2023-08-02 09:21:46'),
(19, 'App\\Models\\User', 5, 'hydra-api-token', 'a0707c14ae63f694ce9a88eecb62ddee3292ae2c96ffd38c63518fafa212cbbc', '[\"admin\"]', NULL, '2023-08-02 09:44:34', '2023-08-02 09:44:34'),
(20, 'App\\Models\\User', 5, 'hydra-api-token', 'b4ef188c0eda490ab8815d1eb4b79b5389fe17512cf4b5d27ac09a22649be081', '[\"admin\"]', NULL, '2023-08-02 09:45:13', '2023-08-02 09:45:13'),
(21, 'App\\Models\\User', 5, 'hydra-api-token', '7c4cf3ff13bf13ed4c741cbd1c2db2b238af54ec21a581155785c62cf7347533', '[\"admin\"]', NULL, '2023-08-02 10:12:08', '2023-08-02 10:12:08'),
(22, 'App\\Models\\User', 5, 'hydra-api-token', 'dc1cdbdac6fcef64575827b69cb3a3be9fd9631c91d946ba2f2713d2f6668f81', '[\"admin\"]', NULL, '2023-08-02 10:13:34', '2023-08-02 10:13:34'),
(23, 'App\\Models\\User', 5, 'hydra-api-token', '11687d0e0f8933e78536e08cb38d3abb7cd323e1360a579bcd84118bb39f6f1f', '[\"admin\"]', NULL, '2023-08-02 10:15:04', '2023-08-02 10:15:04'),
(24, 'App\\Models\\User', 5, 'hydra-api-token', '4028824cf34a194eebec42823e3e5c8051b7effb9fd5f908bc7698481e605763', '[\"admin\"]', NULL, '2023-08-02 10:17:04', '2023-08-02 10:17:04'),
(25, 'App\\Models\\User', 5, 'hydra-api-token', 'cb63e093b72227ae614fd417586ed863f3b18c9ad6966028d8ab01f7269bc455', '[\"admin\"]', NULL, '2023-08-02 10:18:01', '2023-08-02 10:18:01'),
(26, 'App\\Models\\User', 5, 'hydra-api-token', 'ccf8d12d0e8fc7b1d18c445511bc22826b26606510747f51655070cf8ed8ac7f', '[\"admin\"]', NULL, '2023-08-02 10:18:22', '2023-08-02 10:18:22'),
(27, 'App\\Models\\User', 5, 'hydra-api-token', '8820c80dc16173b43117d73e8d509df0f7d20469575d084dad21451a877e12bf', '[\"admin\"]', NULL, '2023-08-02 10:19:08', '2023-08-02 10:19:08'),
(28, 'App\\Models\\User', 5, 'hydra-api-token', '321e2c0435ca6b82e4170daa53ae38438546bae349963fc1bc14cb9601eb6c69', '[\"admin\"]', '2023-08-02 10:23:40', '2023-08-02 10:20:12', '2023-08-02 10:23:40'),
(29, 'App\\Models\\User', 5, 'hydra-api-token', '36908ada7520c2e9b439418886ce653e4ef634e6b56a4fb8f41cd896e08f1cf3', '[\"admin\"]', NULL, '2023-08-02 10:42:17', '2023-08-02 10:42:17'),
(30, 'App\\Models\\User', 5, 'hydra-api-token', '977cdecdfb0b9e2db2b20cdbf7cd3a33019409b30283578ff8a0d73ea90d821e', '[\"admin\"]', NULL, '2023-08-02 10:42:19', '2023-08-02 10:42:19'),
(32, 'App\\Models\\User', 5, 'hydra-api-token', 'a67460b3f4fad9b1ed9524f5e9156b06007e1879f3e219f5923b350427ba95e7', '[\"admin\"]', NULL, '2023-08-02 10:43:34', '2023-08-02 10:43:34'),
(33, 'App\\Models\\User', 5, 'hydra-api-token', '6d87447b11962aad1adeddebf9e170ab8337087ef24b81a5b5b6cfc498235173', '[\"admin\"]', NULL, '2023-08-02 10:44:46', '2023-08-02 10:44:46'),
(34, 'App\\Models\\User', 5, 'hydra-api-token', 'c166619de2e86f561b10f770f5c5ed81321699ab1b67a6a75f9d404bf4ace5f7', '[\"admin\"]', NULL, '2023-08-02 10:45:07', '2023-08-02 10:45:07'),
(35, 'App\\Models\\User', 5, 'hydra-api-token', '97aa72a1404975d6bbc02d39d24e62360fc0f1c18d79ba65a394177af51ceab2', '[\"admin\"]', NULL, '2023-08-02 10:46:11', '2023-08-02 10:46:11'),
(36, 'App\\Models\\User', 5, 'hydra-api-token', '3cd49a6a7eb039a8a992d060fb015bebfd05d4d246ecb8f91475e06cfa75853f', '[\"admin\"]', NULL, '2023-08-02 10:46:36', '2023-08-02 10:46:36'),
(37, 'App\\Models\\User', 5, 'hydra-api-token', '094a1d59e22fbb9ab61036feb275533b77a64ee4902f6a267f7e229766790d2f', '[\"admin\"]', NULL, '2023-08-02 10:46:59', '2023-08-02 10:46:59'),
(38, 'App\\Models\\User', 5, 'hydra-api-token', '327ede3369897740d91e96841c4fb7989a0f80d1d2ce28decff99368186525ae', '[\"admin\"]', NULL, '2023-08-02 10:47:15', '2023-08-02 10:47:15'),
(39, 'App\\Models\\User', 5, 'hydra-api-token', '4f2245d736e66bc3303e8b7e2fc0f9203f80b709f4f2e5da7e1207f42cae587f', '[\"admin\"]', NULL, '2023-08-02 11:06:39', '2023-08-02 11:06:39'),
(42, 'App\\Models\\User', 5, 'hydra-api-token', 'c9bdf9fc8078f731de7dde9b5930181a99cef3582247c10b2795a218f675019d', '[\"admin\"]', NULL, '2023-08-02 11:27:10', '2023-08-02 11:27:10'),
(43, 'App\\Models\\User', 1, 'hydra-api-token', 'f631c5ca47b457da8ee12caf595ee9ed05d13aea77df5ecb6de2224d28a0d78d', '[\"admin\"]', NULL, '2023-08-02 11:29:48', '2023-08-02 11:29:48'),
(44, 'App\\Models\\User', 5, 'hydra-api-token', '2b34b8b5ea617725cbb14f3c5a23ed04d9d123ee7607600c60f8f11e9f421515', '[\"admin\"]', NULL, '2023-08-02 11:32:01', '2023-08-02 11:32:01'),
(45, 'App\\Models\\User', 5, 'hydra-api-token', '647d105f321830ac8a2edc77ce1a43131994ea3c8bc94e43d5b94000c146a79b', '[\"admin\"]', NULL, '2023-08-02 11:33:38', '2023-08-02 11:33:38'),
(46, 'App\\Models\\User', 5, 'hydra-api-token', '1bcda106be8abd5c8b6000cc40f9870844ffe80d7a7b971a2042ee8702de14b2', '[\"admin\"]', NULL, '2023-08-02 11:40:22', '2023-08-02 11:40:22'),
(47, 'App\\Models\\User', 5, 'hydra-api-token', 'a2057c6cc7413fe46bad64d71e3e62a35f9906c1678687e6573e305dd9d98083', '[\"admin\"]', NULL, '2023-08-02 11:51:38', '2023-08-02 11:51:38'),
(48, 'App\\Models\\User', 5, 'hydra-api-token', '85be0da674de1340c75fdde034c3579afcaed996c08f84cb554fa7c231069351', '[\"admin\"]', NULL, '2023-08-02 11:52:12', '2023-08-02 11:52:12'),
(49, 'App\\Models\\User', 5, 'hydra-api-token', '72cd82ae656bf821472874fdb04ed451eb4e41e73e9b5363acdf6c1b01d67a93', '[\"admin\"]', NULL, '2023-08-03 23:10:55', '2023-08-03 23:10:55'),
(50, 'App\\Models\\User', 5, 'hydra-api-token', '99be8392a69f152b030419d2375318caee898c316866b8aabd0d3c4dd5c45821', '[\"admin\"]', NULL, '2023-08-03 23:14:31', '2023-08-03 23:14:31'),
(51, 'App\\Models\\User', 1, 'hydra-api-token', '71b6b0bc4bdfb5aa9ff1c00e107f31bf661cff1722c42785485f31918ff1f358', '[\"admin\"]', NULL, '2023-08-05 01:09:53', '2023-08-05 01:09:53'),
(52, 'App\\Models\\User', 1, 'hydra-api-token', '4daa950c1669ec472c9457cd4bef0ee50a089ac400af4860fe4f144fe9059242', '[\"admin\"]', NULL, '2023-08-05 01:11:25', '2023-08-05 01:11:25'),
(53, 'App\\Models\\User', 1, 'hydra-api-token', '38b3f9655272a0f4589e820cd4a8355fb4b049709cb786ff0bb6f859aea00756', '[\"admin\"]', NULL, '2023-08-05 01:11:54', '2023-08-05 01:11:54'),
(55, 'App\\Models\\User', 5, 'hydra-api-token', '782224b88c96810f436ec23f7ad0b874b559773716fc5b92e7658d6e9bd24094', '[\"admin\"]', NULL, '2023-08-05 02:01:37', '2023-08-05 02:01:37'),
(56, 'App\\Models\\User', 5, 'hydra-api-token', 'e5b2740a339068a1ef810537700672ea28ca67d4971daaa05a206c96d88d72b3', '[\"admin\"]', NULL, '2023-08-05 02:03:18', '2023-08-05 02:03:18'),
(57, 'App\\Models\\User', 5, 'hydra-api-token', 'f9916a1b4b37d52db402b4f888cfaa58061e48d71a390dcd97fbed775a3676a7', '[\"admin\"]', NULL, '2023-08-05 02:03:29', '2023-08-05 02:03:29'),
(58, 'App\\Models\\User', 5, 'hydra-api-token', '552e405231200ce02f4feac15dec10e6f0db023be3b2a3dcef2fb17a2f04c451', '[\"admin\"]', NULL, '2023-08-05 02:04:07', '2023-08-05 02:04:07'),
(59, 'App\\Models\\User', 5, 'hydra-api-token', 'ed907aa1acebf990a2c244c4f04dd8d73c74ba908776ec071b84159d94ff6d78', '[\"admin\"]', NULL, '2023-08-05 02:04:59', '2023-08-05 02:04:59'),
(60, 'App\\Models\\User', 5, 'hydra-api-token', 'd80822206a96fecb23df949d359b218414aafd3af86e404ae81602247de502ff', '[\"admin\"]', NULL, '2023-08-05 02:06:37', '2023-08-05 02:06:37'),
(61, 'App\\Models\\User', 5, 'hydra-api-token', '4679a6bf2d32b365fed1d4c791674b37d3aeb0a55c67fe992d6a45ea358b7308', '[\"admin\"]', NULL, '2023-08-05 02:06:50', '2023-08-05 02:06:50'),
(62, 'App\\Models\\User', 5, 'hydra-api-token', '2d06c65e64b7ccf134a19e54a8f2ce5c1b3e7c57af38887f568e9e4b84a88dbf', '[\"admin\"]', NULL, '2023-08-05 02:07:54', '2023-08-05 02:07:54'),
(63, 'App\\Models\\User', 5, 'hydra-api-token', '55b03cb14a3f6285acd3931ad9d0d83fad00d985696a9fc5f0dc7a52d38a5098', '[\"admin\"]', NULL, '2023-08-05 02:09:30', '2023-08-05 02:09:30'),
(64, 'App\\Models\\User', 5, 'hydra-api-token', '47158f70ed8c8075173b2649517df554de5f25787a3650f076280bdcd309553f', '[\"admin\"]', NULL, '2023-08-05 02:09:59', '2023-08-05 02:09:59'),
(65, 'App\\Models\\User', 5, 'hydra-api-token', 'da5caec81f88ac14fe2356b3fac985be2c411f6bb16f492d7295de45e64735b5', '[\"admin\"]', NULL, '2023-08-05 02:12:03', '2023-08-05 02:12:03'),
(66, 'App\\Models\\User', 5, 'hydra-api-token', '2e1f14089f104fc8a8c2aea0a3a18a5e1cb89ee1f362698369b02c90e419f1b6', '[\"admin\"]', NULL, '2023-08-05 02:12:21', '2023-08-05 02:12:21'),
(68, 'App\\Models\\User', 1, 'hydra-api-token', 'd70d3b4080482458477d889f750f704ce85fb62d8d716b8da72fcfc435383a9a', '[\"admin\"]', '2023-08-05 02:33:22', '2023-08-05 02:22:39', '2023-08-05 02:33:22'),
(70, 'App\\Models\\User', 5, 'hydra-api-token', '31b930b2ead387a61da63491aa97c3442c18c7a70c5613769f14b2cecd24b84d', '[\"admin\"]', NULL, '2023-08-05 03:56:35', '2023-08-05 03:56:35'),
(71, 'App\\Models\\User', 5, 'hydra-api-token', '9723242adc7b84a60c64f8e464e2be118c4bf9f99b4638e4dd1ad7c3f6d64d79', '[\"admin\"]', NULL, '2023-08-05 03:58:13', '2023-08-05 03:58:13'),
(72, 'App\\Models\\User', 5, 'hydra-api-token', 'bcc51e1b12b5efde976cff8c64e4be70cecd5e2ad03811347722b47db6a6dbbe', '[\"admin\"]', NULL, '2023-08-05 04:00:32', '2023-08-05 04:00:32'),
(73, 'App\\Models\\User', 1, 'hydra-api-token', '3165ed4eaf22ecb0baac2b8ba5cb8f3f3afbee01e424077c1793e5d14fb7846f', '[\"admin\"]', '2023-08-06 04:26:20', '2023-08-06 03:01:34', '2023-08-06 04:26:20'),
(74, 'App\\Models\\User', 5, 'hydra-api-token', 'ce8a0e77651a49dc9455b072a324e18c74c248866f7f8b0a116028f1be3ec1e2', '[\"admin\"]', NULL, '2023-08-06 22:12:43', '2023-08-06 22:12:43'),
(75, 'App\\Models\\User', 5, 'hydra-api-token', 'd118662b23ae5ad7e1d6de74cc131b605d5fa5d1815f47a9e4845c0a49cf3969', '[\"admin\"]', NULL, '2023-08-06 23:15:21', '2023-08-06 23:15:21'),
(76, 'App\\Models\\User', 5, 'hydra-api-token', '74585f23627af35a754a86963de7a491b497c38ab1e952c10f5b34a5cf496e9c', '[\"admin\"]', NULL, '2023-08-07 00:09:26', '2023-08-07 00:09:26'),
(77, 'App\\Models\\User', 5, 'hydra-api-token', '47e778795d8385ba54220cad56a48f97ad39379c97755334c9795003cdce3e14', '[\"admin\"]', NULL, '2023-08-07 00:12:03', '2023-08-07 00:12:03'),
(83, 'App\\Models\\User', 80, 'hydra-api-token', '585d52588b327aee78f61c3e31b4c48b84cfa19b7aa58cc7d3bfb2249e32a7e2', '[\"admin\"]', '2023-10-19 05:17:16', '2023-10-19 05:16:04', '2023-10-19 05:17:16'),
(84, 'App\\Models\\User', 80, 'hydra-api-token', '5510646f35d227cf8828d3a498ea0234cbe8d013cbd6e6f1b7fcff1f28692eb5', '[\"admin\"]', '2023-10-19 05:21:10', '2023-10-19 05:16:16', '2023-10-19 05:21:10'),
(85, 'App\\Models\\User', 80, 'hydra-api-token', 'b73e062bf7a469f26570db66251bfc9b5149546dcbb6c1b3829566c7a6b3f02a', '[\"admin\"]', '2023-10-19 11:34:29', '2023-10-19 11:33:37', '2023-10-19 11:34:29'),
(86, 'App\\Models\\User', 81, 'hydra-api-token', '8a0821fce852c08bc2e4c521ba8d11259b1062e0352510fd1029246f6f9b41dd', '[\"user\"]', '2023-10-19 11:36:44', '2023-10-19 11:34:43', '2023-10-19 11:36:44'),
(87, 'App\\Models\\User', 80, 'hydra-api-token', 'a3f82f51d2abf327f3cc8f5289c3b7ba8abe794dcee0efd26c803c1633356779', '[\"admin\"]', NULL, '2023-10-19 11:36:44', '2023-10-19 11:36:44'),
(88, 'App\\Models\\User', 80, 'hydra-api-token', 'eb2b9e09d476442932b68bc012f19ec4c411aa965a9c24c4d5f4a5d3c15c8a55', '[\"admin\"]', NULL, '2023-10-19 11:36:44', '2023-10-19 11:36:44'),
(89, 'App\\Models\\User', 80, 'hydra-api-token', 'dae9e7dce2ae6dcba5025be4c2e666b06fd21238e897a2cb42569d41241a4310', '[\"admin\"]', '2023-10-19 11:55:54', '2023-10-19 11:36:44', '2023-10-19 11:55:54'),
(90, 'App\\Models\\User', 81, 'hydra-api-token', 'bc19c43122e201e2fe5a0f63ee7aea8925a4805ee407f6fa5e7c967b26770d96', '[\"user\"]', '2023-10-19 11:58:18', '2023-10-19 11:56:16', '2023-10-19 11:58:18'),
(91, 'App\\Models\\User', 80, 'hydra-api-token', 'f72454ad13cb548f2216bd5e5e435e42d7ec54293401325e80bcce617519e907', '[\"admin\"]', '2023-10-19 11:59:31', '2023-10-19 11:58:33', '2023-10-19 11:59:31'),
(92, 'App\\Models\\User', 81, 'hydra-api-token', '84fefe9792675891af9ad09488a44d0d9bce15c7b8daa9813e376d0b68c7a386', '[\"user\"]', '2023-10-21 03:56:05', '2023-10-19 12:03:37', '2023-10-21 03:56:05'),
(93, 'App\\Models\\User', 80, 'hydra-api-token', '312b0d84669f3d07805ad87ffbd96fb1546d2a40359723607903aa2c20aa1906', '[\"admin\"]', NULL, '2023-10-21 03:56:05', '2023-10-21 03:56:05'),
(94, 'App\\Models\\User', 80, 'hydra-api-token', '8b9ef5954d554e4f0801a6bf276652693e3d62feefd941ce67e18225520f165f', '[\"admin\"]', '2023-10-21 03:56:46', '2023-10-21 03:56:05', '2023-10-21 03:56:46'),
(95, 'App\\Models\\User', 81, 'hydra-api-token', 'fd6d078395bb49c704f52c172c8ed5e8e5466c0c06616e786d0b58d81ab8733a', '[\"user\"]', '2023-10-21 05:37:20', '2023-10-21 03:56:57', '2023-10-21 05:37:20'),
(96, 'App\\Models\\User', 81, 'hydra-api-token', '1cc6984a650b0bba2283e5777343b3685fc244359b0e8b96bcdcd74e70116202', '[\"user\"]', '2023-10-21 05:38:45', '2023-10-21 05:37:44', '2023-10-21 05:38:45'),
(97, 'App\\Models\\User', 81, 'hydra-api-token', 'ccadb03d1077973fc8bb85aee63a5a00adce8a1b69fc2ce1db16521c959aa7fc', '[\"user\"]', '2023-10-21 05:39:58', '2023-10-21 05:39:55', '2023-10-21 05:39:58'),
(98, 'App\\Models\\User', 80, 'hydra-api-token', '77d2fb3006fe89b2771819cd877c1189a9ff70d4e8b218c96400ceb2f36315c9', '[\"admin\"]', '2023-10-21 05:40:40', '2023-10-21 05:40:37', '2023-10-21 05:40:40'),
(99, 'App\\Models\\User', 81, 'hydra-api-token', '91b07838d1c9d6b042706a036084d510631e979e43ec850a5130e31e444fb2d1', '[\"user\"]', '2023-10-21 05:43:18', '2023-10-21 05:40:57', '2023-10-21 05:43:18'),
(100, 'App\\Models\\User', 81, 'hydra-api-token', '4b54775bfd83850d5b0068a4670504f6352c3c9382d5c796b5a963f43c20c99e', '[\"user\"]', NULL, '2023-10-21 05:43:19', '2023-10-21 05:43:19'),
(101, 'App\\Models\\User', 81, 'hydra-api-token', '1d965f6400a72ded90808e86f8adb27e1feb2bb8f776fd078fe6e3a64bcf1f15', '[\"user\"]', NULL, '2023-10-21 05:43:19', '2023-10-21 05:43:19'),
(102, 'App\\Models\\User', 81, 'hydra-api-token', '9b5daecd66710fbdf8fb3b8a47a17981eb68b25224d5067502e036f8cf0182d9', '[\"user\"]', '2023-10-21 05:58:31', '2023-10-21 05:43:19', '2023-10-21 05:58:31'),
(103, 'App\\Models\\User', 80, 'hydra-api-token', 'c39fdb3abb038675aa00ce68b4a3bf9aae822c972bef8cc0a929881140a69bf8', '[\"admin\"]', '2023-10-21 05:55:28', '2023-10-21 05:44:49', '2023-10-21 05:55:28'),
(104, 'App\\Models\\User', 81, 'hydra-api-token', '84bc7658e3325cf377a813f4eca5a91d7a154a72f1ab4f891fe7cabd150857ff', '[\"user\"]', NULL, '2023-10-21 05:58:32', '2023-10-21 05:58:32'),
(105, 'App\\Models\\User', 81, 'hydra-api-token', 'f50911479a976084d375ef8bee85e9e5aa8e513ad1adaa6d65de1389a0547674', '[\"user\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(106, 'App\\Models\\User', 81, 'hydra-api-token', '5817c4e45ff5989e6a266b252e835d80c8262e878618afa9ee5ce25a5ee60e2c', '[\"user\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(107, 'App\\Models\\User', 81, 'hydra-api-token', 'bedc2a155d1042ff18525643f109608da122f011749da85444aec35278ad6198', '[\"user\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(108, 'App\\Models\\User', 81, 'hydra-api-token', '839c06bee4557d7a65fdbb638e84175dd97c333babbe95f059e5a0699cfae50b', '[\"user\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(109, 'App\\Models\\User', 81, 'hydra-api-token', 'c3cb598b4a04d8874c33139f04b3e50899bfa6950d0cdf7b6f16b2062a0c450c', '[\"user\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(110, 'App\\Models\\User', 81, 'hydra-api-token', 'b69e34eced70df1166f22d865e47b99821f24ac2acf590e046c7d4339fb067ea', '[\"user\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(111, 'App\\Models\\User', 80, 'hydra-api-token', '1267cb3971cd45a569f3f9c65b285d0255cf3fdba969414f0c276ed31209a0c7', '[\"admin\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(112, 'App\\Models\\User', 80, 'hydra-api-token', 'acfba2122aafbe33802806324a25aab83e2572cd8909d0b644e195dd6c997589', '[\"admin\"]', NULL, '2023-10-21 05:59:32', '2023-10-21 05:59:32'),
(113, 'App\\Models\\User', 80, 'hydra-api-token', '3e85e35e8799a1184f3a119c4b2f36be50815fcb55aca0b3ad33ebf3dd20fec3', '[\"admin\"]', '2023-10-21 05:59:35', '2023-10-21 05:59:32', '2023-10-21 05:59:35'),
(114, 'App\\Models\\User', 81, 'hydra-api-token', '9915d51c2ca8f0852ae1b4139c9310d73566acca9672ce8e6ca5d7008cc47840', '[\"user\"]', '2023-10-21 06:54:36', '2023-10-21 05:59:57', '2023-10-21 06:54:36'),
(115, 'App\\Models\\User', 81, 'hydra-api-token', '8ef81306729a6adf3ccfc0d7a9e430cc1d192e29b7f24c5802a8bf53a01cb4bd', '[\"user\"]', '2023-10-21 06:58:42', '2023-10-21 06:54:41', '2023-10-21 06:58:42'),
(116, 'App\\Models\\User', 81, 'hydra-api-token', 'b4034fc0bbb458b056dd8d183589855bd0a294f39374d381404144e7ff69ca7f', '[\"user\"]', '2023-10-21 07:16:19', '2023-10-21 06:58:54', '2023-10-21 07:16:19'),
(117, 'App\\Models\\User', 80, 'hydra-api-token', '57670665bcbace3a29da2de0c0f295815d9129de3b413baf8750890976d9e8db', '[\"admin\"]', '2023-10-21 08:35:06', '2023-10-21 08:35:03', '2023-10-21 08:35:06'),
(118, 'App\\Models\\User', 81, 'hydra-api-token', '4ad42068855689b5b30b7fd69ee00af10c2db0228791cff9bdf6b021e4774b59', '[\"user\"]', '2023-10-21 08:39:40', '2023-10-21 08:35:15', '2023-10-21 08:39:40'),
(119, 'App\\Models\\User', 80, 'hydra-api-token', '48500593752e4072350e07c7e90fd6e38ec0dbd19895a40606b2d158b6a9f94d', '[\"admin\"]', '2023-10-21 08:56:35', '2023-10-21 08:56:24', '2023-10-21 08:56:35'),
(120, 'App\\Models\\User', 81, 'hydra-api-token', 'e9d57b3e2618e1e0e13c6e58decc1da22f76343fdcd9314fe8b8411315087df0', '[\"user\"]', '2023-10-21 08:58:53', '2023-10-21 08:56:45', '2023-10-21 08:58:53'),
(121, 'App\\Models\\User', 81, 'hydra-api-token', 'a9f1378587795509db30b8eda0559ff5b775b688205c818c5a3ed81cf9c3c5f0', '[\"user\"]', NULL, '2023-10-21 08:58:53', '2023-10-21 08:58:53'),
(122, 'App\\Models\\User', 81, 'hydra-api-token', '9f3764bd453487a18d72951ec98ec9f11775689e74266c5e98f7af7dc021f23c', '[\"user\"]', NULL, '2023-10-21 08:58:53', '2023-10-21 08:58:53'),
(123, 'App\\Models\\User', 81, 'hydra-api-token', 'b4a9d9ec2a3fc71ea8bd2f269cc0c4f57c9aa4cfea5da5df2d3eaa226b5dffc8', '[\"user\"]', '2023-10-21 09:02:12', '2023-10-21 08:58:53', '2023-10-21 09:02:12'),
(124, 'App\\Models\\User', 81, 'hydra-api-token', '289d554786484d250492b64e980d09c52eb33745064beb2ba66a98a54a9af3a0', '[\"user\"]', '2023-10-21 09:17:55', '2023-10-21 09:03:57', '2023-10-21 09:17:55'),
(125, 'App\\Models\\User', 81, 'hydra-api-token', '5499f97cfd877b9b29bb3596ae0beebe8e44ff895fb28f36457c31e604c65e87', '[\"user\"]', '2023-10-21 09:25:42', '2023-10-21 09:18:13', '2023-10-21 09:25:42'),
(126, 'App\\Models\\User', 81, 'hydra-api-token', '8f2b759ccd70cadd0e96ca10ec703a48e6b946c3cc64038262f9bd090683d526', '[\"user\"]', '2023-10-21 09:37:30', '2023-10-21 09:25:57', '2023-10-21 09:37:30'),
(127, 'App\\Models\\User', 80, 'hydra-api-token', 'bd470802c787a8e780097cc5e0e9d072e98d77e2e9faf119bdaabde9f7abf7d5', '[\"admin\"]', '2023-10-21 11:20:21', '2023-10-21 11:20:12', '2023-10-21 11:20:21'),
(128, 'App\\Models\\User', 81, 'hydra-api-token', '9820e7614f19bd4fdc58687167150e6ac1d868431106afd8c702fb29f2bc8872', '[\"user\"]', '2023-10-23 07:27:33', '2023-10-21 11:20:38', '2023-10-23 07:27:33'),
(129, 'App\\Models\\User', 80, 'hydra-api-token', '25fdb7fe36651ba2a5b619261b43fa4db05d7bb6c9b07b1fd3692a03b955f10a', '[\"admin\"]', '2023-10-21 11:31:53', '2023-10-21 11:23:13', '2023-10-21 11:31:53'),
(130, 'App\\Models\\User', 80, 'hydra-api-token', '7cfed7f5b2ae4236ed99f87e237097e63df237e9428ee8bc46d1d40ba45c230a', '[\"admin\"]', '2023-10-21 11:59:15', '2023-10-21 11:56:39', '2023-10-21 11:59:15'),
(131, 'App\\Models\\User', 80, 'hydra-api-token', '48badc8de0bf50a78fdecd750ea66ab23b5300b6a65a49fb5eed9821419a2fe5', '[\"admin\"]', NULL, '2023-10-21 11:56:39', '2023-10-21 11:56:39'),
(132, 'App\\Models\\User', 80, 'hydra-api-token', '4aa51ce3f66128db33381c8ac4640bd9ed6d2c4bb8332f34c724f266f6cb3e27', '[\"admin\"]', NULL, '2023-10-21 11:56:39', '2023-10-21 11:56:39'),
(133, 'App\\Models\\User', 80, 'hydra-api-token', '8523bc50a2ffee7b4b2a19e342d9bfb4647f888f41f5f3521c4777acedefbd10', '[\"admin\"]', NULL, '2023-10-21 11:56:39', '2023-10-21 11:56:39'),
(134, 'App\\Models\\User', 80, 'hydra-api-token', '06708aea0477f32e4134c99218119394e0e70c5ea3c9c7c3befe7abef3574d1b', '[\"admin\"]', NULL, '2023-10-21 11:56:39', '2023-10-21 11:56:39'),
(135, 'App\\Models\\User', 80, 'hydra-api-token', '2b2fc71183d390d1db296a85f43d8e9192677e9f8fe9b3ffbc5206e5f228283a', '[\"admin\"]', NULL, '2023-10-21 11:56:39', '2023-10-21 11:56:39'),
(136, 'App\\Models\\User', 80, 'hydra-api-token', '226ccd57414a03f7757e33b57f312cab6e15ecfc97ba588ba238d0f4667a39ec', '[\"admin\"]', NULL, '2023-10-21 11:56:39', '2023-10-21 11:56:39'),
(137, 'App\\Models\\User', 81, 'hydra-api-token', 'ad3c7f2cb43ae681ab80c2d94d7354fe0456111ba3f08158cadb0d0807fec98a', '[\"user\"]', '2023-10-21 12:00:39', '2023-10-21 11:59:38', '2023-10-21 12:00:39'),
(138, 'App\\Models\\User', 81, 'hydra-api-token', '72cb82c60df7ea32b9eede8771fe190dbdf54dbf9da043d8ab416967758c01f6', '[\"user\"]', NULL, '2023-10-21 12:00:39', '2023-10-21 12:00:39'),
(139, 'App\\Models\\User', 81, 'hydra-api-token', 'db4d796064b54c558c7210cf08c95e8abe3e621e832bf169ddbb238fa03c5858', '[\"user\"]', '2023-10-21 12:04:27', '2023-10-21 12:00:39', '2023-10-21 12:04:27'),
(140, 'App\\Models\\User', 81, 'hydra-api-token', 'd23b0caebb8ed33c781a705f0c015856e4c8c6e5644383bfd741c0f1a4e33d07', '[\"user\"]', '2023-10-22 01:34:51', '2023-10-22 01:20:01', '2023-10-22 01:34:51'),
(141, 'App\\Models\\User', 81, 'hydra-api-token', 'b31f7a44a230067e0636ab1a74e7ee3fb64cebf3b64020986689c1c63923084a', '[\"user\"]', '2023-10-22 07:04:42', '2023-10-22 01:35:12', '2023-10-22 07:04:42'),
(142, 'App\\Models\\User', 81, 'hydra-api-token', 'ff169b708e3ce293734ff190cbe9bf595a43348e0064016e74f58b831b719416', '[\"user\"]', '2023-10-22 02:08:15', '2023-10-22 01:59:08', '2023-10-22 02:08:15'),
(143, 'App\\Models\\User', 81, 'hydra-api-token', '20253f5357472768d466cf73bb87a67b3789df6ac476ed6cf441f4557ed17936', '[\"user\"]', '2023-10-22 02:09:19', '2023-10-22 02:08:18', '2023-10-22 02:09:19'),
(144, 'App\\Models\\User', 81, 'hydra-api-token', '73004633638316cb31fb39093e89449ed4937c95f10bff421716d0000409dddd', '[\"user\"]', '2023-10-26 12:12:53', '2023-10-22 02:09:22', '2023-10-26 12:12:53'),
(145, 'App\\Models\\User', 81, 'hydra-api-token', 'cceea20d5ea191602c8999a9fbac85f691934510019b6828758a151649a08abd', '[\"user\"]', NULL, '2023-10-22 02:09:22', '2023-10-22 02:09:22'),
(146, 'App\\Models\\User', 81, 'hydra-api-token', 'c594f028f76cbf178041ce656057ef33b843530bfcf9bdf2faae9d09f7314c67', '[\"user\"]', NULL, '2023-10-22 02:09:23', '2023-10-22 02:09:23'),
(147, 'App\\Models\\User', 80, 'hydra-api-token', '81dcccce9e6754e38047d3bdf36f3d5a6896861770329b13db2c1d551ee8e9fb', '[\"admin\"]', '2023-10-23 11:31:45', '2023-10-22 09:13:02', '2023-10-23 11:31:45'),
(148, 'App\\Models\\User', 80, 'hydra-api-token', '195efc5061cebc3882732a7cdd2fcc35c51974675688392f828c8d01f1019e2e', '[\"admin\"]', NULL, '2023-10-22 09:13:06', '2023-10-22 09:13:06'),
(149, 'App\\Models\\User', 80, 'hydra-api-token', '2fc3bda969400adabde4afc8a2329ead71c504074e9c49663f783746787ac6b1', '[\"admin\"]', NULL, '2023-10-22 09:36:42', '2023-10-22 09:36:42'),
(150, 'App\\Models\\User', 80, 'hydra-api-token', '9fe08c99ff11b3c777bfacd58fb181bfa9d3960fc98a49679093512a85f52e0a', '[\"admin\"]', NULL, '2023-10-22 09:36:52', '2023-10-22 09:36:52'),
(151, 'App\\Models\\User', 80, 'hydra-api-token', '436451ce9939b3be05d8e087f239ab4c9f63823b27577672f17cedbfeed36f92', '[\"admin\"]', NULL, '2023-10-22 09:37:43', '2023-10-22 09:37:43'),
(152, 'App\\Models\\User', 80, 'hydra-api-token', 'f2ba87a9c9f256eb7259c9996f8664a80a4c3fd142d41e3f657cf0331e54988c', '[\"admin\"]', NULL, '2023-10-22 09:38:44', '2023-10-22 09:38:44'),
(153, 'App\\Models\\User', 80, 'hydra-api-token', 'f4a72a747b2d1c558245cb1fc3eb38f3711ba12f16dc7df4a1889ef828522424', '[\"admin\"]', NULL, '2023-10-22 09:39:01', '2023-10-22 09:39:01'),
(154, 'App\\Models\\User', 80, 'hydra-api-token', '55ae460d60c4d108d2f947867a3b9aac7a1e728159e8201c9951daf3b3efbbc2', '[\"admin\"]', NULL, '2023-10-22 09:39:11', '2023-10-22 09:39:11'),
(155, 'App\\Models\\User', 80, 'hydra-api-token', '1ff32361c6a9160f552a54988c5ec720905e0c8cae36e9a9f0eea527e2b02c0a', '[\"admin\"]', NULL, '2023-10-22 09:39:23', '2023-10-22 09:39:23'),
(156, 'App\\Models\\User', 80, 'hydra-api-token', 'aa609b0d0078225368b1ee0f708b7d64a374d73ac09a760d8f2a715e7239da1a', '[\"admin\"]', NULL, '2023-10-22 09:39:42', '2023-10-22 09:39:42'),
(157, 'App\\Models\\User', 80, 'hydra-api-token', 'e36fb4f1c957e920316c0494e96c3b65560a067a4f8f7b1a71061de65968677a', '[\"admin\"]', NULL, '2023-10-22 09:40:14', '2023-10-22 09:40:14'),
(158, 'App\\Models\\User', 80, 'hydra-api-token', 'd20765e8b4d502d67c1203db215dd100ae4b76251a051e44b1035166f06c90ee', '[\"admin\"]', NULL, '2023-10-22 09:41:57', '2023-10-22 09:41:57'),
(159, 'App\\Models\\User', 80, 'hydra-api-token', '321f9e6e61ad82515629d1ac25adce51553ccb170799f00f19b0830b42e8a556', '[\"admin\"]', NULL, '2023-10-22 09:44:10', '2023-10-22 09:44:10'),
(160, 'App\\Models\\User', 80, 'hydra-api-token', 'e5ebe465b8fae52cb0cf73069ba883217a9445c7090ff34bf18b89bc598f5ac5', '[\"admin\"]', NULL, '2023-10-22 09:45:34', '2023-10-22 09:45:34'),
(161, 'App\\Models\\User', 80, 'hydra-api-token', '2df6de5b038cf8b91c8acd160e20d0a355ed4251f2dd5bd59a3e845ca8056340', '[\"admin\"]', NULL, '2023-10-22 09:47:09', '2023-10-22 09:47:09'),
(162, 'App\\Models\\User', 80, 'hydra-api-token', '6b92cb7192ebf33380f93f5d54bbbeeb854690525f127e91f33f185d2516f857', '[\"admin\"]', NULL, '2023-10-22 09:47:46', '2023-10-22 09:47:46'),
(163, 'App\\Models\\User', 80, 'hydra-api-token', 'fbb910e76d4381c7fe5c56e70cf376ad9599945dc94f26c90b7bc7b6cdd4140f', '[\"admin\"]', NULL, '2023-10-22 09:48:04', '2023-10-22 09:48:04'),
(164, 'App\\Models\\User', 80, 'hydra-api-token', '8da1052dfdde2619bba5ceaebc324f8dcced24eda4e5f18a2d48e35acc3d907e', '[\"admin\"]', NULL, '2023-10-22 09:48:50', '2023-10-22 09:48:50'),
(165, 'App\\Models\\User', 80, 'hydra-api-token', 'c83539479f8a9b033287d8e8780d04e28c2194b6bfecf1817a39b4a51b278da4', '[\"admin\"]', NULL, '2023-10-22 09:50:33', '2023-10-22 09:50:33'),
(166, 'App\\Models\\User', 80, 'hydra-api-token', 'fa96536db523feddcb68a2fd4d429001e13bf97538f71bd309833bfceefb4713', '[\"admin\"]', NULL, '2023-10-22 09:52:27', '2023-10-22 09:52:27'),
(167, 'App\\Models\\User', 80, 'hydra-api-token', '01fca1e9a3b94b25f182eea17c3799275c3dce82855429941d632513641c83f7', '[\"admin\"]', NULL, '2023-10-22 09:53:45', '2023-10-22 09:53:45'),
(168, 'App\\Models\\User', 80, 'hydra-api-token', '6790a1b727e4d2b28d2fbcb5e7b871fc350f1172a1f2fcfbf442f7c68a558420', '[\"admin\"]', NULL, '2023-10-22 09:55:32', '2023-10-22 09:55:32'),
(169, 'App\\Models\\User', 80, 'hydra-api-token', '51d33c26a890be83d377e60eb98186a5599275b8c35a70e9769635812032773e', '[\"admin\"]', NULL, '2023-10-22 09:57:05', '2023-10-22 09:57:05'),
(170, 'App\\Models\\User', 80, 'hydra-api-token', '1d16f8aea650619d47e0f35befa38bbdb14f5676bac25fc39e15ffa5a2fc0fe3', '[\"admin\"]', NULL, '2023-10-22 09:58:05', '2023-10-22 09:58:05'),
(171, 'App\\Models\\User', 80, 'hydra-api-token', 'ec3340db422b4f0026df666c5b13481d1e0aa01ac8576aa8d91a952c5ea8c999', '[\"admin\"]', NULL, '2023-10-22 10:09:02', '2023-10-22 10:09:02'),
(172, 'App\\Models\\User', 80, 'hydra-api-token', '464ff69791194ccbd7414337f05e75a5df2e65eabaa835562f6a4fa047aec335', '[\"admin\"]', NULL, '2023-10-22 10:09:06', '2023-10-22 10:09:06'),
(173, 'App\\Models\\User', 80, 'hydra-api-token', 'd51e5148d1851803a576a9c00728411ec891bd2d46751926c12a48e562bd31a7', '[\"admin\"]', NULL, '2023-10-22 10:09:15', '2023-10-22 10:09:15'),
(174, 'App\\Models\\User', 80, 'hydra-api-token', '33c35ad1b76e9292493fbdfe8f161e20d38f4bca2439ea5975a70de60a3cceac', '[\"admin\"]', NULL, '2023-10-22 10:09:58', '2023-10-22 10:09:58'),
(175, 'App\\Models\\User', 80, 'hydra-api-token', 'e9b7a0b3197e6ad50c716908bd2f5bc1545b00110564e642ceedfab953b45c6d', '[\"admin\"]', NULL, '2023-10-22 10:10:10', '2023-10-22 10:10:10'),
(176, 'App\\Models\\User', 80, 'hydra-api-token', 'bc42becdeed1f52521c1f827731d514a635c7bdb5eaaf186966eaa5ee9c8dc0d', '[\"admin\"]', NULL, '2023-10-22 10:30:00', '2023-10-22 10:30:00'),
(177, 'App\\Models\\User', 80, 'hydra-api-token', '54f2d2f4070c365d8d86fa997eab3c558b58ee1c4f9e11cf1629469ec096f256', '[\"admin\"]', NULL, '2023-10-22 10:31:18', '2023-10-22 10:31:18'),
(178, 'App\\Models\\User', 80, 'hydra-api-token', 'cbb220ab670b537d3ea6ce22295446f189a0368af0e88d1c92d817ccb6f96564', '[\"admin\"]', NULL, '2023-10-22 10:40:29', '2023-10-22 10:40:29'),
(179, 'App\\Models\\User', 80, 'hydra-api-token', 'd57bd1ac966eccd4809d7e0446f5e541fa5c0fe4d5353d55e4cf72b75224e807', '[\"admin\"]', NULL, '2023-10-22 11:07:25', '2023-10-22 11:07:25'),
(180, 'App\\Models\\User', 80, 'hydra-api-token', '67bcee22789bdd04dc11d44e65859e6dda3e54e796764a6ed8cfba160dad87ad', '[\"admin\"]', NULL, '2023-10-22 11:15:54', '2023-10-22 11:15:54'),
(181, 'App\\Models\\User', 80, 'hydra-api-token', '6fd14a6b8035b1b2aaba14efa7a03f266787ca79ceea79b39440c18290818d89', '[\"admin\"]', NULL, '2023-10-22 11:30:55', '2023-10-22 11:30:55'),
(182, 'App\\Models\\User', 80, 'hydra-api-token', 'b1d0afa116f6d73210bf26a2730d686616302564965aaab70b8903cb6d45a50b', '[\"admin\"]', NULL, '2023-10-22 11:34:17', '2023-10-22 11:34:17'),
(183, 'App\\Models\\User', 80, 'hydra-api-token', '984082c4059112175b0b72775e2524c07aa3f80640b8fd296d9c92a8f35e3b2a', '[\"admin\"]', NULL, '2023-10-22 12:00:33', '2023-10-22 12:00:33'),
(184, 'App\\Models\\User', 81, 'hydra-api-token', 'bc4addbfe2c1ab8d83e4ea5034b2ea8454bb94e4f18d18939cf90452c3b8ddad', '[\"user\"]', '2023-10-23 04:18:05', '2023-10-23 03:59:52', '2023-10-23 04:18:05'),
(185, 'App\\Models\\User', 80, 'hydra-api-token', 'bd827a5a2da21f540c3fd6d10aa2648480a67d2436be2f54c40c1711c4c0a42a', '[\"admin\"]', NULL, '2023-10-23 04:04:45', '2023-10-23 04:04:45'),
(186, 'App\\Models\\User', 81, 'hydra-api-token', '3e8f862ae7ad87441f6cd2111a255f0c3ab96c148f41c9a83ad2624b58c2e4ba', '[\"user\"]', '2023-10-31 04:08:53', '2023-10-23 04:06:33', '2023-10-31 04:08:53'),
(187, 'App\\Models\\User', 81, 'hydra-api-token', '34ba82da8ef74d69542043a7f468c206bff629d1051479d8d39592590b3c5c24', '[\"user\"]', NULL, '2023-10-23 04:31:10', '2023-10-23 04:31:10'),
(188, 'App\\Models\\User', 80, 'hydra-api-token', '185266e26f4d3c6a75c166e19fdb39694bfaffcbbd5e2451794bff06c1f83217', '[\"admin\"]', NULL, '2023-10-23 04:32:46', '2023-10-23 04:32:46'),
(189, 'App\\Models\\User', 80, 'hydra-api-token', '9b551a2cbc8a4e766ba1412bb405cc418413bf4b59f175d7aa373814b9a52093', '[\"admin\"]', NULL, '2023-10-23 04:32:59', '2023-10-23 04:32:59'),
(190, 'App\\Models\\User', 80, 'hydra-api-token', '7be538458ca7381475de01fdc582d0d5984524d0e69250f456c699095af774d7', '[\"admin\"]', NULL, '2023-10-23 04:33:56', '2023-10-23 04:33:56'),
(191, 'App\\Models\\User', 80, 'hydra-api-token', 'ee9a2b7e68ebd765f24fc94e160e68e91b9a586b625fece656fa6ef9675b7270', '[\"admin\"]', NULL, '2023-10-23 04:34:41', '2023-10-23 04:34:41'),
(192, 'App\\Models\\User', 80, 'hydra-api-token', 'bfe1c0856bda366d52eea99ac1644966051f161200be777e670c1cdbc4ff4ebb', '[\"admin\"]', NULL, '2023-10-23 04:35:34', '2023-10-23 04:35:34'),
(193, 'App\\Models\\User', 80, 'hydra-api-token', 'e23db30e6b2a2e12ba24262c92af581a76ec84352cb8f8dc7dd1557ad1fe97b0', '[\"admin\"]', NULL, '2023-10-23 04:36:23', '2023-10-23 04:36:23'),
(194, 'App\\Models\\User', 80, 'hydra-api-token', '0d8de6bfe9abe3d4810a3760acb9fc3f379d1facdb515feaa00c2d7b7cca3ba3', '[\"admin\"]', NULL, '2023-10-23 04:36:53', '2023-10-23 04:36:53'),
(195, 'App\\Models\\User', 80, 'hydra-api-token', '4a797b0345a6ad240f9341bb5e0eaadc14ed4004fe3630bbad6bd8bf0e117798', '[\"admin\"]', NULL, '2023-10-23 04:37:22', '2023-10-23 04:37:22'),
(196, 'App\\Models\\User', 80, 'hydra-api-token', '68f3f4e7c3ed871d3dd861e4e6247dd542c473f331ac1653ee4e1613482f44f4', '[\"admin\"]', NULL, '2023-10-23 04:43:06', '2023-10-23 04:43:06'),
(197, 'App\\Models\\User', 80, 'hydra-api-token', 'ff42dedb82291d9fc620528d1f765ccd50a2ab3d1415cbf5e90bbf374d888185', '[\"admin\"]', NULL, '2023-10-23 04:44:48', '2023-10-23 04:44:48'),
(198, 'App\\Models\\User', 80, 'hydra-api-token', '41652c27a2f33ded3589d7186bb65fbe9f4a83c518dd3587baf9187e2b471641', '[\"admin\"]', NULL, '2023-10-23 04:45:26', '2023-10-23 04:45:26'),
(199, 'App\\Models\\User', 80, 'hydra-api-token', '6a0aeb2cb69ceefb76ceab836a6f47498050a4b85e14bb513fc9ad32354d61d2', '[\"admin\"]', NULL, '2023-10-23 04:45:44', '2023-10-23 04:45:44'),
(200, 'App\\Models\\User', 80, 'hydra-api-token', '0138e77d5dadf28c88ad32ccf305d6f7ac18d0088472c9ca47a57958d4dff348', '[\"admin\"]', NULL, '2023-10-23 04:46:21', '2023-10-23 04:46:21'),
(201, 'App\\Models\\User', 80, 'hydra-api-token', '8181888eb870c271fa597d28079846cb4b9c42d57e954ca8a306bf5ff89a98e4', '[\"admin\"]', NULL, '2023-10-23 04:47:37', '2023-10-23 04:47:37'),
(202, 'App\\Models\\User', 81, 'hydra-api-token', '6dc0dfbc80d29630ce3a19b625d38a06db49cf3b24e123f14f2d684157b4eefa', '[\"user\"]', NULL, '2023-10-23 04:50:20', '2023-10-23 04:50:20'),
(203, 'App\\Models\\User', 81, 'hydra-api-token', 'c3b535bb168923a65c7421ddc965f93092125ff4d95b090c7b2d88050fce4f1a', '[\"user\"]', NULL, '2023-10-23 04:54:28', '2023-10-23 04:54:28'),
(204, 'App\\Models\\User', 81, 'hydra-api-token', '06fbfc93c8a1a0bbe8c9a5ce1938b8c89a88e108eb77b662bf01cdc3227f2fbc', '[\"user\"]', NULL, '2023-10-23 04:54:58', '2023-10-23 04:54:58'),
(205, 'App\\Models\\User', 81, 'hydra-api-token', '66e0d9ad64fe3268b971d84a331df8655dee32a53636ffb5bbfd5fb6d9b3336c', '[\"user\"]', NULL, '2023-10-23 04:55:38', '2023-10-23 04:55:38'),
(206, 'App\\Models\\User', 81, 'hydra-api-token', 'e9bbc07b5cc3635ba338ea32494c47a38164ce564a99f1c346d4259b152dfc85', '[\"user\"]', NULL, '2023-10-23 04:56:08', '2023-10-23 04:56:08'),
(207, 'App\\Models\\User', 81, 'hydra-api-token', '97495bfa0a03f1819249af33a515ab29da1de2c4c9cf42a6926e1e88642a763f', '[\"user\"]', NULL, '2023-10-23 04:56:48', '2023-10-23 04:56:48'),
(208, 'App\\Models\\User', 81, 'hydra-api-token', 'a10ecef3a7ae96fb17fc089ab76685af71a1ab84486621aa10dee1e67c98c2c8', '[\"user\"]', NULL, '2023-10-23 04:58:32', '2023-10-23 04:58:32'),
(209, 'App\\Models\\User', 81, 'hydra-api-token', '45afb8516d5b34e4d65cb73536762ce97e641530422e452b5836f436f1d66a63', '[\"user\"]', '2023-10-26 08:39:39', '2023-10-23 04:59:54', '2023-10-26 08:39:39'),
(210, 'App\\Models\\User', 82, 'hydra-api-token', '49e081137d3d715f3648c0a831905ded83ea447af6cd8a4984a76c71d869e244', '[\"user\"]', NULL, '2023-10-23 07:27:52', '2023-10-23 07:27:52'),
(211, 'App\\Models\\User', 81, 'hydra-api-token', 'e92d2e3b69e41d06605c0a162ea72825e4a98b23b14a2cab198318df5dea28ae', '[\"user\"]', '2023-10-23 11:30:59', '2023-10-23 11:29:58', '2023-10-23 11:30:59'),
(212, 'App\\Models\\User', 80, 'hydra-api-token', 'd3a3e4cb71548bd76937067c282ee7c96474c4b6bea28eba6d5599ec9c2dc4b4', '[\"admin\"]', NULL, '2023-10-23 11:31:00', '2023-10-23 11:31:00'),
(213, 'App\\Models\\User', 80, 'hydra-api-token', '0793e4f48a5f7a9b43273e993b230f029b002a62e2cd05e218861c7384acf3b4', '[\"admin\"]', NULL, '2023-10-23 11:31:00', '2023-10-23 11:31:00'),
(214, 'App\\Models\\User', 81, 'hydra-api-token', '2ccbacce58e7ee08f8afe9fc5c95ff060aeb618e71dce468b62ffc4aac869c4a', '[\"user\"]', '2023-10-23 11:33:18', '2023-10-23 11:32:17', '2023-10-23 11:33:18'),
(215, 'App\\Models\\User', 80, 'hydra-api-token', 'ad3cced5039b8abf0b67beda8e59e914c4d2823fe5533e7f877fb38a23b49143', '[\"admin\"]', NULL, '2023-10-23 11:33:18', '2023-10-23 11:33:18'),
(216, 'App\\Models\\User', 80, 'hydra-api-token', '0673e7e9dd7ae40af9a5c9a0f80cec5c30c7ac5ebfda17eeb49f1bd8f8604ad5', '[\"admin\"]', NULL, '2023-10-23 11:33:18', '2023-10-23 11:33:18'),
(217, 'App\\Models\\User', 80, 'hydra-api-token', '1a7d2bef81add0b583b90244aebc375d7dd3d9d029bf19bf6844d6d36f04d797', '[\"admin\"]', '2023-10-23 11:33:23', '2023-10-23 11:33:18', '2023-10-23 11:33:23'),
(218, 'App\\Models\\User', 81, 'hydra-api-token', 'f27f097243cd0948a021ea85840c846d2e6031ad42b200f68180d3c4d01ea3f8', '[\"user\"]', '2023-11-05 11:24:42', '2023-10-23 11:33:39', '2023-11-05 11:24:42'),
(219, 'App\\Models\\User', 80, 'hydra-api-token', 'baad9b2894f05da110581fe40d0c8e9f9e02aaaea0861934f11ca6c447e83057', '[\"admin\"]', '2023-10-23 11:34:03', '2023-10-23 11:33:43', '2023-10-23 11:34:03'),
(220, 'App\\Models\\User', 81, 'hydra-api-token', 'fabd0c0390a72239d75df49b99ecd944dd92957ca790cd0daeb4222d006673c7', '[\"user\"]', '2023-10-23 11:34:43', '2023-10-23 11:34:31', '2023-10-23 11:34:43'),
(221, 'App\\Models\\User', 81, 'hydra-api-token', 'e7ef9b453593c7021d6ceab312bcd3f15b411013d5b86eab67391a631f689ea6', '[\"user\"]', NULL, '2023-10-23 16:27:10', '2023-10-23 16:27:10'),
(222, 'App\\Models\\User', 81, 'hydra-api-token', 'e282090d391f82ef7a259bd89acc474be21ff0a9c4f9749a080115cce1c18e3e', '[\"user\"]', '2023-10-24 05:18:28', '2023-10-23 16:27:27', '2023-10-24 05:18:28'),
(223, 'App\\Models\\User', 81, 'hydra-api-token', '09f3ec4c1b686bf302c6798ab39e2ae3ee1fd452e859e849f981a7d0464ab052', '[\"user\"]', '2023-10-25 04:18:56', '2023-10-25 04:16:16', '2023-10-25 04:18:56'),
(224, 'App\\Models\\User', 81, 'hydra-api-token', 'b09ddf83fd2b18f4d9ea683fee44acca315a85b0d5c63805b6591e4e00f536e0', '[\"user\"]', NULL, '2023-10-25 04:18:56', '2023-10-25 04:18:56'),
(225, 'App\\Models\\User', 81, 'hydra-api-token', 'b6140728eb27340d2ddb84eac3e50021c5f61ffe44938dbc5bea4d82a99b487d', '[\"user\"]', NULL, '2023-10-25 04:18:56', '2023-10-25 04:18:56'),
(226, 'App\\Models\\User', 81, 'hydra-api-token', '6030baab6952441644d13b5aaad08bb5ad709e1d77dbbe7512c1d625ea7185ca', '[\"user\"]', NULL, '2023-10-25 04:18:56', '2023-10-25 04:18:56'),
(227, 'App\\Models\\User', 81, 'hydra-api-token', '81220c564c2f193abe7ab552f1a0da9941da443e52af056aebc519d2ae2c3128', '[\"user\"]', NULL, '2023-10-25 04:18:56', '2023-10-25 04:18:56'),
(228, 'App\\Models\\User', 81, 'hydra-api-token', 'e577cdb2d0d9d95b6b77f4eb8efc453701d6b71bca6e07affb8974b233578018', '[\"user\"]', '2023-10-25 04:20:06', '2023-10-25 04:18:56', '2023-10-25 04:20:06'),
(229, 'App\\Models\\User', 81, 'hydra-api-token', '4400eaeeedaf7afa7ce2b2e82b3a71483548d041f56c2615b940e9c1520e598e', '[\"user\"]', NULL, '2023-10-25 04:20:06', '2023-10-25 04:20:06'),
(230, 'App\\Models\\User', 81, 'hydra-api-token', '587e54478dbe16681d3321f38397b38249e29757785ff131db5535d4a1c3d6f1', '[\"user\"]', '2023-10-25 05:57:59', '2023-10-25 04:20:06', '2023-10-25 05:57:59'),
(231, 'App\\Models\\User', 81, 'hydra-api-token', '72b554267c11bb3072e6607d3c555c8e0ce143903de5a8c39cd63e633c44d305', '[\"user\"]', '2023-10-26 05:51:39', '2023-10-25 04:20:06', '2023-10-26 05:51:39'),
(232, 'App\\Models\\User', 81, 'hydra-api-token', '91a81014261c8bd794a1fc5716fea467d52b73de6bee0954f5889cf59644cf0c', '[\"user\"]', '2023-10-25 09:57:59', '2023-10-25 05:58:28', '2023-10-25 09:57:59'),
(233, 'App\\Models\\User', 81, 'hydra-api-token', '27a86ddd949a929936157f806f8bb7e82d9bd6fcacd791b423f7a0a8aa5f7632', '[\"user\"]', NULL, '2023-10-25 06:00:42', '2023-10-25 06:00:42'),
(234, 'App\\Models\\User', 80, 'hydra-api-token', 'a5b1b33c8e54edf5fd1faaf6d7e932204642e7d71f56f0ab2422c9c40fa376e2', '[\"admin\"]', '2023-10-25 09:56:48', '2023-10-25 09:55:16', '2023-10-25 09:56:48'),
(235, 'App\\Models\\User', 81, 'hydra-api-token', '83008ff65d9d746ada2287646086ddaf130244d71e80e270c50f7aac00183ce8', '[\"user\"]', '2023-10-25 09:59:53', '2023-10-25 09:58:00', '2023-10-25 09:59:53'),
(236, 'App\\Models\\User', 83, 'hydra-api-token', '8afbe4a5f557bd57218d5a47fc64d474d209a0afbadf4480c08d7a7419907293', '[\"user\"]', NULL, '2023-10-25 10:01:08', '2023-10-25 10:01:08'),
(237, 'App\\Models\\User', 83, 'hydra-api-token', 'bdbf10034635763fc761876c2a200ad7448d16af0973f2d1726d5dc4a56367b7', '[\"user\"]', NULL, '2023-10-25 10:17:13', '2023-10-25 10:17:13'),
(238, 'App\\Models\\User', 83, 'hydra-api-token', 'a9cc7bde3205ecba352f07c0a3f18035a9eaae34824d6c900fcf8b2cb91e9408', '[\"user\"]', NULL, '2023-10-25 10:17:59', '2023-10-25 10:17:59'),
(239, 'App\\Models\\User', 83, 'hydra-api-token', '3ce7695e84c0bad542c110b00a7799fc0d2afe76d0b8b698eb5d983799f5986f', '[\"user\"]', NULL, '2023-10-25 10:19:16', '2023-10-25 10:19:16'),
(240, 'App\\Models\\User', 83, 'hydra-api-token', '1bfbdd852c2f3b4df2188f1a37ff1ba8a2c4f741bc567bcb2506b455d5c40ec2', '[\"user\"]', NULL, '2023-10-25 10:20:34', '2023-10-25 10:20:34'),
(241, 'App\\Models\\User', 83, 'hydra-api-token', '306d2a984aebb17f9f08110093fc59ca4832d583342d86ffd62cbd372d205383', '[\"user\"]', NULL, '2023-10-25 10:21:34', '2023-10-25 10:21:34'),
(242, 'App\\Models\\User', 83, 'hydra-api-token', 'e9f9b57e3f7a7d2869d8c26771aaaf4138050b91087abbbd0acb9f1201992e87', '[\"user\"]', NULL, '2023-10-25 10:22:42', '2023-10-25 10:22:42'),
(243, 'App\\Models\\User', 81, 'hydra-api-token', '776b81665653cf668482bb915d2bcfe698f366df62c0c220ad00bcdd44b3e416', '[\"user\"]', '2023-10-25 12:26:50', '2023-10-25 12:26:31', '2023-10-25 12:26:50'),
(244, 'App\\Models\\User', 83, 'hydra-api-token', '74bac1c405853c4b2023608dcda4161a2d4fa5b885de0fa65bdde6a6f97a65f1', '[\"user\"]', NULL, '2023-10-26 04:16:41', '2023-10-26 04:16:41'),
(245, 'App\\Models\\User', 81, 'hydra-api-token', 'bfe591e657af89a5bf60b46ebb7fe17406ed76374ecbe2ee4f4f6c79f9debe5a', '[\"user\"]', NULL, '2023-10-26 04:21:35', '2023-10-26 04:21:35'),
(246, 'App\\Models\\User', 83, 'hydra-api-token', 'b47ee47b08ca7ec978d1fa83e5b87f4f2b4dbf2ab9cd7185890686d5eb97b758', '[\"user\"]', '2023-10-28 06:19:56', '2023-10-26 04:21:48', '2023-10-28 06:19:56'),
(247, 'App\\Models\\User', 80, 'hydra-api-token', '23fd3d9e728faa5c918e4f46712bc56a42ae2c2f6081171f5cead6444bec11de', '[\"admin\"]', '2023-10-26 04:29:19', '2023-10-26 04:29:18', '2023-10-26 04:29:19'),
(248, 'App\\Models\\User', 81, 'hydra-api-token', 'dc813659df11be9ae9eae70cb29a4b721cf4e12ae351690a725b8606699dd76f', '[\"user\"]', '2023-10-28 05:19:45', '2023-10-26 04:29:35', '2023-10-28 05:19:45'),
(249, 'App\\Models\\User', 81, 'hydra-api-token', 'cbbf3b6141d75f35829da7a756da374d37b6f84511a4857528eb1420a27c3a81', '[\"user\"]', '2023-10-28 06:46:12', '2023-10-26 04:35:16', '2023-10-28 06:46:12'),
(250, 'App\\Models\\User', 83, 'hydra-api-token', 'e72c21e1f799e8a9b58934f7b9df0b363468486eea9bfd44538f36d2a0723b89', '[\"user\"]', NULL, '2023-10-26 05:38:38', '2023-10-26 05:38:38'),
(251, 'App\\Models\\User', 81, 'hydra-api-token', 'c942d537627b4c56334ec2e25306d3bbb0578323674e30fa23e1ad8bd1be6ac6', '[\"user\"]', '2023-10-30 06:40:42', '2023-10-26 05:51:50', '2023-10-30 06:40:42'),
(252, 'App\\Models\\User', 83, 'hydra-api-token', 'b3bdf611f37d3c1a068a9e9db0a6d0b9e7d87ea4b0d2c69b2c471afd3b047f06', '[\"user\"]', NULL, '2023-10-26 06:11:06', '2023-10-26 06:11:06'),
(253, 'App\\Models\\User', 83, 'hydra-api-token', '5304eacd000b302b9b450f1d9bc8ca5894a8f3d48ec18c9a0ee24e60326edce2', '[\"user\"]', NULL, '2023-10-26 12:40:33', '2023-10-26 12:40:33'),
(254, 'App\\Models\\User', 81, 'hydra-api-token', 'd114b30b70544be91a6ab26e4c5bff811c895f5f51ab200d713c09f58c3e5433', '[\"user\"]', '2023-10-26 13:11:17', '2023-10-26 13:08:40', '2023-10-26 13:11:17'),
(255, 'App\\Models\\User', 81, 'hydra-api-token', '80627f958a5ae2aabb7046f6954a0f5ac6cc8114ce559cafc16be735a768b669', '[\"user\"]', '2023-11-06 21:57:04', '2023-10-26 13:12:21', '2023-11-06 21:57:04'),
(256, 'App\\Models\\User', 81, 'hydra-api-token', '42739eddb9bbb4603961603f150a0993689b79f0cf216cffdb335a97cdb7ac51', '[\"user\"]', '2023-10-29 13:33:27', '2023-10-28 04:16:37', '2023-10-29 13:33:27'),
(257, 'App\\Models\\User', 81, 'hydra-api-token', '8c2e1d71ac82fa0669d15cfa9afd448d9268456edaffae1c95597e0e094edf8a', '[\"user\"]', '2023-10-29 11:05:33', '2023-10-28 05:49:49', '2023-10-29 11:05:33'),
(258, 'App\\Models\\User', 81, 'hydra-api-token', '2309b3f24d334cd436b317bbfe1b55a7916d9276feeee2de3efa98f4cd135aba', '[\"user\"]', '2023-10-30 09:16:21', '2023-10-28 06:53:31', '2023-10-30 09:16:21'),
(259, 'App\\Models\\User', 81, 'hydra-api-token', 'e1efae42daa303faacbe9811bc290c461ee064efcab2f35d271447ddb8baf834', '[\"user\"]', '2023-10-29 18:23:29', '2023-10-29 18:21:44', '2023-10-29 18:23:29'),
(260, 'App\\Models\\User', 81, 'hydra-api-token', '8b8cc4d750c0ddc52f4884e132022c606b9e333662294f452493acfa0be9f461', '[\"user\"]', '2023-10-30 05:14:30', '2023-10-30 04:45:21', '2023-10-30 05:14:30'),
(261, 'App\\Models\\User', 81, 'hydra-api-token', 'a0352a8936e71eaccdb32c0fae0a40d1b782f7b31261916f0108ff84d66b98fc', '[\"user\"]', NULL, '2023-10-30 05:16:36', '2023-10-30 05:16:36'),
(262, 'App\\Models\\User', 81, 'hydra-api-token', 'ee00ff5bbc2c2166aa8be75be9a15051cba2668245aad1dc64c81cdac2a970a5', '[\"user\"]', '2023-10-30 05:18:10', '2023-10-30 05:16:46', '2023-10-30 05:18:10'),
(263, 'App\\Models\\User', 81, 'hydra-api-token', 'c30412ef31665440f58422b60d2bbc65bfe79f2c667b0c3c3d30f97329eedc63', '[\"user\"]', NULL, '2023-10-30 05:20:19', '2023-10-30 05:20:19'),
(264, 'App\\Models\\User', 83, 'hydra-api-token', 'a4a9c46f8a0ce7a41934b4f8c9b9fb5d5b1ac2402e5003e5f842d7dfa7aaef2a', '[\"user\"]', NULL, '2023-10-30 05:37:39', '2023-10-30 05:37:39'),
(265, 'App\\Models\\User', 83, 'hydra-api-token', '813ff2bcfc86d0ca37f3f2449e06e5ae79921e290f36025e2b7cca27292003b0', '[\"user\"]', NULL, '2023-10-30 05:49:35', '2023-10-30 05:49:35'),
(266, 'App\\Models\\User', 83, 'hydra-api-token', '7ea89c3d8f057b41cc54db1f5a240ad058bac37de075c0299c9ecb38f0eb2fa8', '[\"user\"]', NULL, '2023-10-30 05:52:26', '2023-10-30 05:52:26'),
(267, 'App\\Models\\User', 81, 'hydra-api-token', '6ebdddb4233e2878ea1a41c86d6ee540b543c46eb2a21b4fd6b08400b298bbb5', '[\"user\"]', '2023-11-08 04:17:31', '2023-10-30 08:42:58', '2023-11-08 04:17:31'),
(268, 'App\\Models\\User', 83, 'hydra-api-token', '301e915ce7488243acb7ce1aefa7a062e207bdd1327351a25ef5723738555bc1', '[\"user\"]', '2023-10-31 10:30:45', '2023-10-31 10:29:44', '2023-10-31 10:30:45'),
(269, 'App\\Models\\User', 81, 'hydra-api-token', '80304f45c5ea2b1c44f54893ce31a19f533c2e0a88fbc72071be4b91b54c1f8d', '[\"user\"]', NULL, '2023-10-31 10:31:05', '2023-10-31 10:31:05'),
(270, 'App\\Models\\User', 81, 'hydra-api-token', 'b2eca28a4d765b1dd27e212635c60f071570d673240d541940d59c894dd21a6d', '[\"user\"]', '2023-11-02 12:34:10', '2023-11-01 04:05:03', '2023-11-02 12:34:10'),
(271, 'App\\Models\\User', 81, 'hydra-api-token', '0a7983315f04e060a4e7741ba2a2605413a3ec246487ad793a0578eb25520b76', '[\"user\"]', '2023-11-01 04:30:30', '2023-11-01 04:14:21', '2023-11-01 04:30:30'),
(272, 'App\\Models\\User', 81, 'hydra-api-token', '85ca6859ad9fd8eb1f34f689c26ff04ed1ad652cd0e91497e20e0d61378c0036', '[\"user\"]', '2023-11-01 04:22:39', '2023-11-01 04:14:21', '2023-11-01 04:22:39'),
(273, 'App\\Models\\User', 81, 'hydra-api-token', '5b7e8e4502213b3eb8048a7a6f6166e3c34a8ebcdacce37418cff87c8b79ad76', '[\"user\"]', '2023-11-01 06:38:32', '2023-11-01 06:18:45', '2023-11-01 06:38:32'),
(274, 'App\\Models\\User', 81, 'hydra-api-token', '1c477bfb213e9bf3e8a1eabe895858997cd5afe48714b6dbb4453ff0f235d39b', '[\"user\"]', '2023-11-05 08:23:08', '2023-11-01 06:38:44', '2023-11-05 08:23:08'),
(275, 'App\\Models\\User', 81, 'hydra-api-token', '328fa72a3458847ab7ddd8f302353ab4fc5f15b5b21faebe57f3d35d84e3c4cf', '[\"user\"]', '2023-11-09 05:35:35', '2023-11-01 11:00:54', '2023-11-09 05:35:35');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(276, 'App\\Models\\User', 81, 'hydra-api-token', '2f122792dd2c199c406659cc12f72a3635a39d1b85c9eaad1c20c3f912904e52', '[\"user\"]', '2023-11-07 04:06:09', '2023-11-02 05:07:47', '2023-11-07 04:06:09'),
(277, 'App\\Models\\User', 81, 'hydra-api-token', '68dfb8987d93a85493b538ff215397f6fcb276dbc259394288e13f5f309c9984', '[\"user\"]', '2023-11-07 04:32:31', '2023-11-02 05:52:53', '2023-11-07 04:32:31'),
(280, 'App\\Models\\User', 84, 'hydra-api-token', 'ec55584b485c85b04580deeb8aec5b69f5c0d39fb83a28d554146b5f7f94459d', '[\"admin\"]', '2023-11-02 03:15:31', '2023-11-02 03:15:09', '2023-11-02 03:15:31'),
(281, 'App\\Models\\User', 84, 'hydra-api-token', 'e673b510c6412df3485e64dd83280801c54bd4bf8172d9a400b11a49e34577ae', '[\"admin\"]', '2023-11-02 09:25:40', '2023-11-02 09:25:38', '2023-11-02 09:25:40'),
(283, 'App\\Models\\User', 85, 'hydra-api-token', '7939052171486807a312f675e963a1ece592f7a45858241448d0248791201662', '[\"user\"]', NULL, '2023-11-02 09:28:52', '2023-11-02 09:28:52'),
(284, 'App\\Models\\User', 84, 'hydra-api-token', 'b664b30530f4cced81850f84f2e671286cfdff8185bca560ff66f8dc2362adfa', '[\"admin\"]', '2023-11-02 09:36:01', '2023-11-02 09:29:37', '2023-11-02 09:36:01'),
(285, 'App\\Models\\User', 85, 'hydra-api-token', '40f4c77518845f9ddf8368949411ea6ebaec806e0f65926a4a9a46464a5cb8f1', '[\"user\"]', '2023-11-02 09:36:48', '2023-11-02 09:36:15', '2023-11-02 09:36:48'),
(286, 'App\\Models\\User', 85, 'hydra-api-token', '26cc207b8d07292c0555b30a8ee8ccfe1ae967fd01e2f5b5322e72982a65d2cd', '[\"user\"]', '2023-11-02 09:37:03', '2023-11-02 09:37:02', '2023-11-02 09:37:03'),
(287, 'App\\Models\\User', 84, 'hydra-api-token', '97d6ef9123637137a4254573f9af6599db552d06dc341adcdc6cf771f751121b', '[\"admin\"]', '2023-11-02 10:02:12', '2023-11-02 09:37:31', '2023-11-02 10:02:12'),
(288, 'App\\Models\\User', 84, 'hydra-api-token', 'b31656958796cab971a62dcb1e93bddaf41f183c65ea6652bcc889281ed4e070', '[\"admin\"]', '2023-11-02 09:59:29', '2023-11-02 09:39:45', '2023-11-02 09:59:29'),
(290, 'App\\Models\\User', 89, 'hydra-api-token', '95e9571f9eaf1f5875688768d4766f73875dcf7ebb8a1d6b1da913b2ae4af0a2', '[\"user\"]', '2023-11-02 10:03:25', '2023-11-02 10:02:42', '2023-11-02 10:03:25'),
(291, 'App\\Models\\User', 84, 'hydra-api-token', '1d00a66265b73dee27a76ae546fecea6e77dbab3e8db49797ce7fd17f444baf7', '[\"admin\"]', '2023-11-02 10:06:34', '2023-11-02 10:03:59', '2023-11-02 10:06:34'),
(292, 'App\\Models\\User', 84, 'hydra-api-token', 'b5561fe64f362a2f78795a876ec86da50767ccfba4b60a8d3b8dc88fe0072f9c', '[\"admin\"]', '2023-11-02 10:35:59', '2023-11-02 10:05:53', '2023-11-02 10:35:59'),
(293, 'App\\Models\\User', 86, 'hydra-api-token', '21964cad60f587e6c548dd4b32af74985576d02cbf04b9b3204cf449bf9ba802', '[\"user\"]', '2023-11-02 10:08:03', '2023-11-02 10:06:54', '2023-11-02 10:08:03'),
(294, 'App\\Models\\User', 84, 'hydra-api-token', '2763a33bfef0fdea7c1a0119c0f0d733c918422bc2e7b59d08432db95423e589', '[\"admin\"]', '2023-11-02 11:00:18', '2023-11-02 10:08:15', '2023-11-02 11:00:18'),
(295, 'App\\Models\\User', 81, 'hydra-api-token', 'ca8db642c3c8e1bb828905a9ea2ac6a54060f5776b91aba8c7d76e579bda7132', '[\"user\"]', '2023-11-02 11:00:35', '2023-11-02 10:40:36', '2023-11-02 11:00:35'),
(296, 'App\\Models\\User', 85, 'hydra-api-token', 'b5ca282c2dc25970cac475f65d1eaf11d53f9669b637f95f1070d9c4af92ccce', '[\"user\"]', '2023-11-02 10:43:59', '2023-11-02 10:43:57', '2023-11-02 10:43:59'),
(297, 'App\\Models\\User', 84, 'hydra-api-token', 'c127353c2242e8f99819e8c5fe996ce493d7eaccdb52c0903ae78b0529202564', '[\"admin\"]', '2023-11-02 10:44:38', '2023-11-02 10:44:19', '2023-11-02 10:44:38'),
(298, 'App\\Models\\User', 86, 'hydra-api-token', 'c608317703ca3b5a64133096cac30b8d14214f756506a9a5696eb2469087de64', '[\"user\"]', '2023-11-02 10:46:07', '2023-11-02 10:45:02', '2023-11-02 10:46:07'),
(299, 'App\\Models\\User', 88, 'hydra-api-token', 'e4b23ae04a4c54f8bae584338b591184b64eb697f4680ac9b224922c091c6e6f', '[\"user\"]', '2023-11-02 10:47:12', '2023-11-02 10:46:11', '2023-11-02 10:47:12'),
(300, 'App\\Models\\User', 85, 'hydra-api-token', 'aa6a046f18cbc3ca187b9f3fb515e3f10ee42d61f24dc365e7ab3166d9bc21e1', '[\"user\"]', NULL, '2023-11-02 10:49:47', '2023-11-02 10:49:47'),
(301, 'App\\Models\\User', 85, 'hydra-api-token', 'e372f007c996350bcf715524d9de794bcc1fecd81bfabef7dd578c37bba15ed6', '[\"user\"]', NULL, '2023-11-02 10:49:47', '2023-11-02 10:49:47'),
(302, 'App\\Models\\User', 85, 'hydra-api-token', '04dd0f240f240bf10c0267f7121058f6e9d8f393b03a79647ef599fad4ecc6e1', '[\"user\"]', NULL, '2023-11-02 10:49:47', '2023-11-02 10:49:47'),
(303, 'App\\Models\\User', 85, 'hydra-api-token', '81241cec0ac400d9843deeea2145ac511202d7ff6b18ef848cf1cb4974906d1a', '[\"user\"]', NULL, '2023-11-02 10:49:48', '2023-11-02 10:49:48'),
(304, 'App\\Models\\User', 85, 'hydra-api-token', 'ade9ca7188e1ffae28f9ca4d9814063c604d46cdcd33f0e725b8fdda74b25a81', '[\"user\"]', NULL, '2023-11-02 10:50:48', '2023-11-02 10:50:48'),
(305, 'App\\Models\\User', 85, 'hydra-api-token', 'fcbcd3cad42136befdc01bb6368288e030765ba7b9c2b0cc60d94b0f60e43348', '[\"user\"]', NULL, '2023-11-02 10:52:48', '2023-11-02 10:52:48'),
(306, 'App\\Models\\User', 85, 'hydra-api-token', '1c97739902cdc0df2e1e9aacc64f53d68c5dd68c1b367de335830286668ed68a', '[\"user\"]', NULL, '2023-11-02 10:52:48', '2023-11-02 10:52:48'),
(307, 'App\\Models\\User', 85, 'hydra-api-token', 'dbb00efdbff4ac44cd0a149c32e589058d58ba55c1eb940a673854969f15c454', '[\"user\"]', NULL, '2023-11-02 10:52:48', '2023-11-02 10:52:48'),
(308, 'App\\Models\\User', 85, 'hydra-api-token', 'dc764decd1040777f44d377e4891ad8d8a46995800f9849a811b0db9b6bbc1e6', '[\"user\"]', NULL, '2023-11-02 10:52:48', '2023-11-02 10:52:48'),
(309, 'App\\Models\\User', 85, 'hydra-api-token', '8aa130430b7b9cdbcd37fba5eab91aa14244727373fe28aa51ad20c024d0c5a2', '[\"user\"]', '2023-11-02 10:55:50', '2023-11-02 10:52:48', '2023-11-02 10:55:50'),
(310, 'App\\Models\\User', 84, 'hydra-api-token', '7cfc024572341df6f2233c9306234a4645cc7d732c22d82315e4f56cb8dc3e44', '[\"admin\"]', NULL, '2023-11-02 10:53:49', '2023-11-02 10:53:49'),
(311, 'App\\Models\\User', 84, 'hydra-api-token', 'f2c91c0232aa60a554a1a582c0cd34a64a70fbad803c279bed4d237496ac3819', '[\"admin\"]', NULL, '2023-11-02 10:53:49', '2023-11-02 10:53:49'),
(312, 'App\\Models\\User', 84, 'hydra-api-token', '9d20c03d47f472d238814da68d36b7086a278399eef2a825bde77751bb317d9a', '[\"admin\"]', NULL, '2023-11-02 10:53:49', '2023-11-02 10:53:49'),
(313, 'App\\Models\\User', 84, 'hydra-api-token', '5bb767710ed6d3ab16dc05ac5ccd99ab438ab6b0a9cd7e07167f809bf31153bf', '[\"admin\"]', NULL, '2023-11-02 10:53:49', '2023-11-02 10:53:49'),
(314, 'App\\Models\\User', 84, 'hydra-api-token', '98e67860edac655699a9e63eef4668b7ee65cef9a94e683dfcc117072e13fa9f', '[\"admin\"]', NULL, '2023-11-02 10:53:49', '2023-11-02 10:53:49'),
(315, 'App\\Models\\User', 84, 'hydra-api-token', '4c5e395e50bdb22c239ec75718acbd21f27496ff5e06e7e27a55156f5c08df39', '[\"admin\"]', NULL, '2023-11-02 10:53:49', '2023-11-02 10:53:49'),
(316, 'App\\Models\\User', 84, 'hydra-api-token', 'eeb85ee880cb74576c86ee7a706c22e67dabf6d56ee2315d521da6eb5375c79d', '[\"admin\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(317, 'App\\Models\\User', 84, 'hydra-api-token', '1e5dc3faed85bc525a2cc8002687aa4876f09e65408a7dbd4d1328020320eaa9', '[\"admin\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(318, 'App\\Models\\User', 84, 'hydra-api-token', 'd33bce14a477ef1684042a7ac45fc482dc5aa3f7543f71be8e61cc3796f7d1d2', '[\"admin\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(319, 'App\\Models\\User', 84, 'hydra-api-token', '56ac04b0bc183bc7a65b10133d57e0a60bdbf87009ff34953c1b0126a5773309', '[\"admin\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(320, 'App\\Models\\User', 84, 'hydra-api-token', 'a85a19a2afde020cd5965ad24afbe27832c06ace79a28417d0118b7144c471db', '[\"admin\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(321, 'App\\Models\\User', 84, 'hydra-api-token', '825cf2716d16fb0ab789f1dd1ed025498d17da9ef3f74753e66652f62e889882', '[\"admin\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(322, 'App\\Models\\User', 85, 'hydra-api-token', '87ab6bbb292542680e491640f9f7ecf360c159037d132b395680121c4de895ea', '[\"user\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(323, 'App\\Models\\User', 85, 'hydra-api-token', 'e46a01735b1685a3e84b6d1f14af98ee4eac3960daf47a3a43ecc9bf206b3196', '[\"user\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(324, 'App\\Models\\User', 85, 'hydra-api-token', 'cd1e6fa987b81fc3b77789d73d8b206a4e6b945fff68e91c345d8a795c5212c5', '[\"user\"]', '2023-11-02 10:57:50', '2023-11-02 10:54:49', '2023-11-02 10:57:50'),
(325, 'App\\Models\\User', 85, 'hydra-api-token', '2dd8304d96241f4d872d620bc6d31921323ee3b027d4a89e1259a63a575d7f9d', '[\"user\"]', NULL, '2023-11-02 10:54:49', '2023-11-02 10:54:49'),
(326, 'App\\Models\\User', 84, 'hydra-api-token', '0bfb30fa404d28199f9af7a4021302e312d5a72847b6f4797a196c2a1424523a', '[\"admin\"]', NULL, '2023-11-02 10:57:50', '2023-11-02 10:57:50'),
(327, 'App\\Models\\User', 84, 'hydra-api-token', '3c28284ee59d122bea3ea9e24b7816d219a537c69d794f0a73192f7b9634b409', '[\"admin\"]', NULL, '2023-11-02 10:57:50', '2023-11-02 10:57:50'),
(328, 'App\\Models\\User', 81, 'hydra-api-token', '31785da3500788cbad3932280a84475a0056537621aca620f0ab6debdf798919', '[\"user\"]', '2023-11-04 04:24:43', '2023-11-02 11:01:16', '2023-11-04 04:24:43'),
(329, 'App\\Models\\User', 84, 'hydra-api-token', '267408e2f23f76613ee0751b756802feea7ed4c78f8d21262ce80cebe580bd60', '[\"admin\"]', '2023-11-02 14:07:24', '2023-11-02 11:24:51', '2023-11-02 14:07:24'),
(330, 'App\\Models\\User', 81, 'hydra-api-token', 'c92e7ebbe78c2286c5f4d5f1d27d05a1ef957538bcc88245210346e58362798c', '[\"user\"]', '2023-11-03 13:28:27', '2023-11-03 12:21:50', '2023-11-03 13:28:27'),
(331, 'App\\Models\\User', 81, 'hydra-api-token', '94438912fa1c543ff1232be025312fbb794f0f0938b46f31a2c71273583c7a1a', '[\"user\"]', '2023-11-04 05:21:56', '2023-11-04 03:55:30', '2023-11-04 05:21:56'),
(332, 'App\\Models\\User', 84, 'hydra-api-token', '45227b737a545233979a3308dd8607090377378a51ad247d7e65989e5deff0ef', '[\"admin\"]', '2023-11-04 04:11:48', '2023-11-04 04:11:20', '2023-11-04 04:11:48'),
(333, 'App\\Models\\User', 81, 'hydra-api-token', '9d90fe458a64936c6c01ae38c5a87587c7a3bc71eff3772b6495e68cb8d807e2', '[\"user\"]', '2023-11-04 04:25:43', '2023-11-04 04:21:03', '2023-11-04 04:25:43'),
(334, 'App\\Models\\User', 84, 'hydra-api-token', '8df3212e8313f962b95f42ecdd706bf062f5e38da9da930dba8ce85e7b58c63b', '[\"admin\"]', '2023-11-04 04:36:24', '2023-11-04 04:21:06', '2023-11-04 04:36:24'),
(335, 'App\\Models\\User', 81, 'hydra-api-token', 'badcb2119a95396dc75f8441380308df4757a0d5474cd9dcb8ef33cf3a8d1739', '[\"user\"]', '2023-11-04 04:44:02', '2023-11-04 04:35:56', '2023-11-04 04:44:02'),
(336, 'App\\Models\\User', 81, 'hydra-api-token', 'afb88beb3e5184555560e2f16fabcab3b091b28b14fa87e1acaa0fdb91389c4c', '[\"user\"]', '2023-11-04 05:09:17', '2023-11-04 04:36:35', '2023-11-04 05:09:17'),
(337, 'App\\Models\\User', 81, 'hydra-api-token', 'adf1590bb0125887feb68efaba63c14ec766b7fb77b59e2df9bb63c876fd983e', '[\"user\"]', '2023-11-04 05:18:31', '2023-11-04 04:52:37', '2023-11-04 05:18:31'),
(338, 'App\\Models\\User', 81, 'hydra-api-token', '4bca8656e8d6c29e9e2ec51c007bcad2b3d33e8fa97ade4703eee3a350bbe419', '[\"user\"]', '2023-11-04 05:31:49', '2023-11-04 05:23:40', '2023-11-04 05:31:49'),
(339, 'App\\Models\\User', 84, 'hydra-api-token', '20f328da53e350073ac8f193ee17ec37055bdc68b0a9871d8b4cb5451feff682', '[\"admin\"]', '2023-11-04 10:41:30', '2023-11-04 05:31:46', '2023-11-04 10:41:30'),
(340, 'App\\Models\\User', 81, 'hydra-api-token', '03965ef3ea24715d7bd733ad15fb81108463e977033d99d7826d071f0ed99e26', '[\"user\"]', '2023-11-07 11:17:07', '2023-11-04 05:31:53', '2023-11-07 11:17:07'),
(341, 'App\\Models\\User', 84, 'hydra-api-token', '1c2b08e5432a55c5d1009831aafaacf459e361567ef1411bcfb3cc4e4be15ec9', '[\"admin\"]', '2023-11-04 05:52:35', '2023-11-04 05:47:17', '2023-11-04 05:52:35'),
(343, 'App\\Models\\User', 85, 'hydra-api-token', 'e92adb0e0f79c509a24cf177c254d7dab250ccf77e3488289d5f8287bfe4795b', '[\"user\"]', '2023-11-04 05:54:11', '2023-11-04 05:53:10', '2023-11-04 05:54:11'),
(344, 'App\\Models\\User', 85, 'hydra-api-token', '7a0fe7a8b3c1805b2238a3e19ebbc26b9f672858dd2c222050f8389e200b6031', '[\"user\"]', NULL, '2023-11-04 05:54:11', '2023-11-04 05:54:11'),
(345, 'App\\Models\\User', 85, 'hydra-api-token', '0f742928bdae714e7dec72984b0b381c9cf1a2e79d3fec972fcc568c5a9ad38a', '[\"user\"]', NULL, '2023-11-04 05:54:11', '2023-11-04 05:54:11'),
(346, 'App\\Models\\User', 85, 'hydra-api-token', '275870b51c3d2fce2733040afaf0f298c957538c298abd11cda3c0ca26d8919e', '[\"user\"]', '2023-11-04 06:14:23', '2023-11-04 05:54:11', '2023-11-04 06:14:23'),
(349, 'App\\Models\\User', 84, 'hydra-api-token', 'a10643cc8f443fbd8db3a14fe7447a5994e2178aec61dcfdbca0e3456bc79186', '[\"admin\"]', '2023-11-04 06:08:21', '2023-11-04 06:05:12', '2023-11-04 06:08:21'),
(350, 'App\\Models\\User', 81, 'hydra-api-token', 'ad1f836c61f81e8d598c0421913b49cd96da12956006c6947d2dd96c97c5495d', '[\"user\"]', NULL, '2023-11-04 06:14:27', '2023-11-04 06:14:27'),
(351, 'App\\Models\\User', 81, 'hydra-api-token', '9f4a0e342192c45e2ffec904e55ed32a2e3417f9d93be6a024f8462450ab4bf8', '[\"user\"]', NULL, '2023-11-04 06:14:42', '2023-11-04 06:14:42'),
(352, 'App\\Models\\User', 90, 'hydra-api-token', '9c58eed553b35d70a7b8aa8fa5aeb93fed8e5ce4d14e7b39250eb87a8528e110', '[\"user\"]', '2023-11-04 06:15:12', '2023-11-04 06:14:51', '2023-11-04 06:15:12'),
(353, 'App\\Models\\User', 84, 'hydra-api-token', '7e8631d008e0dc21416e22fad0b52f87478f99fb49a695edd916d8f13cfb4588', '[\"admin\"]', '2023-11-04 06:15:34', '2023-11-04 06:15:31', '2023-11-04 06:15:34'),
(354, 'App\\Models\\User', 85, 'hydra-api-token', '48c1af8bf2614a7bcb8291c210a9798f1a7435ff0292196db4a4107a46d68063', '[\"user\"]', '2023-11-04 06:16:49', '2023-11-04 06:15:49', '2023-11-04 06:16:49'),
(355, 'App\\Models\\User', 85, 'hydra-api-token', '5a213b13a492f395cb7153b1b328d4b0dbb8a19a1978d7d2823c3ec804782087', '[\"user\"]', '2023-11-04 06:17:55', '2023-11-04 06:16:55', '2023-11-04 06:17:55'),
(356, 'App\\Models\\User', 85, 'hydra-api-token', 'd92ceafdcb843d4070b24a5c2ec4b69fd2a60a1d5f26eec8d1096b125a59348e', '[\"user\"]', NULL, '2023-11-04 06:17:55', '2023-11-04 06:17:55'),
(357, 'App\\Models\\User', 84, 'hydra-api-token', 'ac0eb6b867a0117d4fba24fe695fe576e998e54bef308af6cf01d65f093dba84', '[\"admin\"]', '2023-11-04 06:17:56', '2023-11-04 06:17:55', '2023-11-04 06:17:56'),
(358, 'App\\Models\\User', 85, 'hydra-api-token', 'b16f179d6adff6754705c363950126096ae2269384029a4f3df3a9a144e5aa8f', '[\"user\"]', '2023-11-04 06:22:33', '2023-11-04 06:18:24', '2023-11-04 06:22:33'),
(359, 'App\\Models\\User', 85, 'hydra-api-token', '07e8a1b2b3ee75e7a4920b1dfae6c7299d62a819fe599f98b78db12f8ec7671b', '[\"user\"]', '2023-11-04 06:24:35', '2023-11-04 06:23:34', '2023-11-04 06:24:35'),
(360, 'App\\Models\\User', 85, 'hydra-api-token', 'ca7c8b3c261c4b801e884340637a046bd9bbbe3adfb5b7f88d756c18d8929e9a', '[\"user\"]', NULL, '2023-11-04 06:24:35', '2023-11-04 06:24:35'),
(361, 'App\\Models\\User', 85, 'hydra-api-token', 'a3c6cb98ae73135ff9365f815418d62a09da52cae1b1d4bf3fdf90b09fcb74ef', '[\"user\"]', NULL, '2023-11-04 06:24:35', '2023-11-04 06:24:35'),
(362, 'App\\Models\\User', 85, 'hydra-api-token', '215a65da13027da75fed751eec950029891fcd2febb642cbbbcc87467d32ae11', '[\"user\"]', NULL, '2023-11-04 06:24:35', '2023-11-04 06:24:35'),
(363, 'App\\Models\\User', 85, 'hydra-api-token', 'df183ba57d74331e95132ba992cdfd4fe631fa26717e7a49a168226da5a7833e', '[\"user\"]', NULL, '2023-11-04 06:24:35', '2023-11-04 06:24:35'),
(364, 'App\\Models\\User', 85, 'hydra-api-token', '37843d1ab7ea18a9ab4f93448038452150574b68d9b7e3409f2fcbf6cb1f4263', '[\"user\"]', '2023-11-08 20:38:53', '2023-11-04 06:24:35', '2023-11-08 20:38:53'),
(365, 'App\\Models\\User', 85, 'hydra-api-token', 'b35d11f8216785faf226492d15ba95f5e61d0eb2d77995ec0f81277f4d10648c', '[\"user\"]', '2023-11-04 06:30:42', '2023-11-04 06:26:21', '2023-11-04 06:30:42'),
(366, 'App\\Models\\User', 85, 'hydra-api-token', '02f1ad2025a45682caba3e5572b82837302d1127260af530c56a20ff83caaa20', '[\"user\"]', '2023-11-04 06:32:38', '2023-11-04 06:31:39', '2023-11-04 06:32:38'),
(367, 'App\\Models\\User', 90, 'hydra-api-token', '17eb247de397bcf0505f86ab97fedadd693a092a3a795bfd550cdd7186b3a157', '[\"user\"]', '2023-11-04 07:15:59', '2023-11-04 06:32:57', '2023-11-04 07:15:59'),
(368, 'App\\Models\\User', 89, 'hydra-api-token', '484d0b5adbd662f6862d464ab048cc0b7b4f4e0254e23e7327941f1d0cb44234', '[\"user\"]', '2023-11-04 07:55:08', '2023-11-04 07:47:16', '2023-11-04 07:55:08'),
(369, 'App\\Models\\User', 89, 'hydra-api-token', '6aec2155044e2d26ff9adcb8de3ce02a9262e4b499484e49b3cd708294c58d50', '[\"user\"]', '2023-11-04 08:13:27', '2023-11-04 07:57:47', '2023-11-04 08:13:27'),
(370, 'App\\Models\\User', 91, 'hydra-api-token', '792b356640003d171fef849790068d25707bc73cc03f34bedc1d70e13dee8489', '[\"user\"]', '2023-11-05 04:20:41', '2023-11-04 10:41:49', '2023-11-05 04:20:41'),
(371, 'App\\Models\\User', 91, 'hydra-api-token', '910c0f95dae02b0438dea3b1f2b4d41b14ffa55f48c0a02d3ca256643583b20b', '[\"user\"]', '2023-11-04 11:51:39', '2023-11-04 11:12:08', '2023-11-04 11:51:39'),
(372, 'App\\Models\\User', 81, 'hydra-api-token', 'cc60f07a98014d8501bdafaf45d54ef8c35d7936353dcec155678fcdc3778657', '[\"user\"]', NULL, '2023-11-04 11:56:55', '2023-11-04 11:56:55'),
(373, 'App\\Models\\User', 89, 'hydra-api-token', '8f78c7dbab0486cc2b2e5e1fbec8cb1bfaf8b4047f53f1ef787bfe11a3b31304', '[\"user\"]', '2023-11-06 06:43:33', '2023-11-04 12:10:49', '2023-11-06 06:43:33'),
(374, 'App\\Models\\User', 85, 'hydra-api-token', '0e3dff2728e3dab6b57905d1102074f10e119f84bd2d30cec0a2df1ac52e2c7f', '[\"user\"]', '2023-11-04 13:21:30', '2023-11-04 13:11:04', '2023-11-04 13:21:30'),
(375, 'App\\Models\\User', 85, 'hydra-api-token', '8f1ed57f41eedb5b65827f737674773966fb9e3f9a28b7918fa0c7872b6c75b1', '[\"user\"]', NULL, '2023-11-04 13:12:04', '2023-11-04 13:12:04'),
(376, 'App\\Models\\User', 85, 'hydra-api-token', '184beaf3f8922d4954ab9a35bfde2cfa9beb43bcef91f143870951e9dc76baf6', '[\"user\"]', NULL, '2023-11-04 13:12:04', '2023-11-04 13:12:04'),
(377, 'App\\Models\\User', 85, 'hydra-api-token', 'e80b8481e09b7b1993c55ed88090a25722728834b120a480afd63a935d821a8f', '[\"user\"]', NULL, '2023-11-04 13:12:04', '2023-11-04 13:12:04'),
(378, 'App\\Models\\User', 85, 'hydra-api-token', '0caa7e21b5988804cf06d75498ea74515607cecd0913403b3e09645a10c23c77', '[\"user\"]', NULL, '2023-11-04 13:12:04', '2023-11-04 13:12:04'),
(379, 'App\\Models\\User', 85, 'hydra-api-token', '753df2b59c506bda20fd1095a18d7e64b94f945d5cf156a57698acc7c835c06d', '[\"user\"]', NULL, '2023-11-04 13:12:04', '2023-11-04 13:12:04'),
(380, 'App\\Models\\User', 85, 'hydra-api-token', '5748331fccbd989d644f5199be0d44c7d44d4e38726174ab817d8236bbd74677', '[\"user\"]', NULL, '2023-11-04 13:12:04', '2023-11-04 13:12:04'),
(381, 'App\\Models\\User', 85, 'hydra-api-token', 'fd5036b27905d72b35c10d25f78b454139113e33e3f6cbfa57e89aaca2376cc6', '[\"user\"]', NULL, '2023-11-04 13:21:31', '2023-11-04 13:21:31'),
(382, 'App\\Models\\User', 85, 'hydra-api-token', 'f67a1326056820781bfa397d84616dbdb098b03c390922211486f5e5e5e72b00', '[\"user\"]', NULL, '2023-11-04 13:21:31', '2023-11-04 13:21:31'),
(383, 'App\\Models\\User', 85, 'hydra-api-token', '9f1b47c5edd8e5a636f863465fcd946491f26fbd0237802bdd9e807fbfb7c7ab', '[\"user\"]', '2023-11-04 13:22:32', '2023-11-04 13:21:31', '2023-11-04 13:22:32'),
(384, 'App\\Models\\User', 85, 'hydra-api-token', '5ac02dc673619da51b2694b7c0418a3c833285b6d8b76a3a6c9de12a8739f579', '[\"user\"]', '2023-11-07 07:20:45', '2023-11-04 13:22:36', '2023-11-07 07:20:45'),
(385, 'App\\Models\\User', 85, 'hydra-api-token', 'a046d04339549cdb6e53950e8fe67be0fc26d30b6021842db4841e44dee6bc04', '[\"user\"]', NULL, '2023-11-04 13:22:36', '2023-11-04 13:22:36'),
(386, 'App\\Models\\User', 85, 'hydra-api-token', 'e267d4dc47b7ab154ab6e91bf9344221dac3b44f2d934144033e3fa96de7f884', '[\"user\"]', NULL, '2023-11-04 13:22:36', '2023-11-04 13:22:36'),
(387, 'App\\Models\\User', 85, 'hydra-api-token', 'a9568ec6b9ce51fb07dc7cefe0737fa0646cd8b19a31423e6f553a6afdd7d716', '[\"user\"]', NULL, '2023-11-04 13:22:36', '2023-11-04 13:22:36'),
(388, 'App\\Models\\User', 85, 'hydra-api-token', 'd51f5e28a87afd3c6f17e4720793b6e100b1486e0be04a3d5d2a18a161be10c0', '[\"user\"]', NULL, '2023-11-04 13:22:36', '2023-11-04 13:22:36'),
(389, 'App\\Models\\User', 85, 'hydra-api-token', '04f3977e081aa20c86f65f74b905881dec3e8caaa6c9daed8619aadc78746949', '[\"user\"]', NULL, '2023-11-04 13:22:36', '2023-11-04 13:22:36'),
(390, 'App\\Models\\User', 85, 'hydra-api-token', 'ce9c9f53e1d9030aea1d03fbda26e54fbb53b5784414e5a1bfbb3f04df5c973a', '[\"user\"]', NULL, '2023-11-04 13:23:37', '2023-11-04 13:23:37'),
(391, 'App\\Models\\User', 85, 'hydra-api-token', '68865cdbfc681e728b75047689874ed848696fd904d47e7f8cf1f26c64d736bf', '[\"user\"]', NULL, '2023-11-04 13:23:37', '2023-11-04 13:23:37'),
(392, 'App\\Models\\User', 85, 'hydra-api-token', 'ff8a164b845a2dd61bb4e623942f9c18bf4f8cbd1895b32aa1871080ca41659a', '[\"user\"]', NULL, '2023-11-04 13:23:37', '2023-11-04 13:23:37'),
(393, 'App\\Models\\User', 85, 'hydra-api-token', '0667ec8d1035cc06878bff4794a957f93a769798957bccf4f186d61b9c2c06e2', '[\"user\"]', NULL, '2023-11-04 13:23:37', '2023-11-04 13:23:37'),
(394, 'App\\Models\\User', 85, 'hydra-api-token', '15308e65e78b7e4909b4bb0f6ce8de9d559cff1a5c316bb3237183e8f6dddc6b', '[\"user\"]', NULL, '2023-11-04 13:23:37', '2023-11-04 13:23:37'),
(395, 'App\\Models\\User', 85, 'hydra-api-token', 'b4f8570fc09ced617989b218ca80608006324a77b1188bdc4a84d6f08990de6d', '[\"user\"]', NULL, '2023-11-04 13:23:37', '2023-11-04 13:23:37'),
(396, 'App\\Models\\User', 81, 'hydra-api-token', '72f3bc8224cd008ceea6c49194116814f211facd7707634f0620787264981626', '[\"user\"]', '2023-11-05 04:37:09', '2023-11-05 04:20:53', '2023-11-05 04:37:09'),
(398, 'App\\Models\\User', 85, 'hydra-api-token', '8236242c12435230827a70ae3ecf6f077e08d23ca3256e04464505797a16efe0', '[\"user\"]', '2023-11-05 09:28:47', '2023-11-05 06:30:12', '2023-11-05 09:28:47'),
(401, 'App\\Models\\User', 92, 'hydra-api-token', 'ae474aa4f1d727e96c910984fcafcb2e20f2eee316cd61b5bc1699f93fe25807', '[\"admin\"]', '2023-11-05 06:56:04', '2023-11-05 06:44:22', '2023-11-05 06:56:04'),
(402, 'App\\Models\\User', 92, 'hydra-api-token', '3f7c627ea9f498f1e760d0954d525f22655ebd71462bfb70c7dd5b819c055f39', '[\"admin\"]', '2023-11-05 06:45:00', '2023-11-05 06:44:53', '2023-11-05 06:45:00'),
(403, 'App\\Models\\User', 81, 'hydra-api-token', '7fe93a8117b726e46cf37858d4c2c7e1b7b267015fe7e51b72327108abac45f9', '[\"user\"]', '2023-11-05 10:17:08', '2023-11-05 08:25:23', '2023-11-05 10:17:08'),
(404, 'App\\Models\\User', 81, 'hydra-api-token', '443f7779be0faf83343a8bf98da198733e77c848cd675fe4200cb71b331de43c', '[\"user\"]', '2023-11-06 06:22:04', '2023-11-05 08:37:54', '2023-11-06 06:22:04'),
(405, 'App\\Models\\User', 91, 'hydra-api-token', '2eeb9c214dbe905f3be7fab4c0d5d44a8ef77b3cc73d148a6ac64bffcc7819c7', '[\"user\"]', '2023-11-05 17:45:53', '2023-11-05 17:42:27', '2023-11-05 17:45:53'),
(406, 'App\\Models\\User', 89, 'hydra-api-token', '3f8b93ad9605f1b39c030b298c47ec3de7d9963ee63083f28c5fb7034ba5d199', '[\"user\"]', '2023-11-05 17:46:05', '2023-11-05 17:44:50', '2023-11-05 17:46:05'),
(407, 'App\\Models\\User', 87, 'hydra-api-token', '3b25b765a31dd1be20c4d71d4e7d42420f940314720aedc60ee3abc63c3bec1e', '[\"user\"]', '2023-11-05 17:47:50', '2023-11-05 17:47:48', '2023-11-05 17:47:50'),
(408, 'App\\Models\\User', 85, 'hydra-api-token', '02054c59794e7cb252b95305a9f861b0cfe5515a85923dac270a7d67d3d333fb', '[\"user\"]', NULL, '2023-11-06 02:43:34', '2023-11-06 02:43:34'),
(409, 'App\\Models\\User', 85, 'hydra-api-token', 'f901c8557610e3c24820f31f5531d5d7c39903f1f90fd06f14041b59b19b3c1d', '[\"user\"]', NULL, '2023-11-06 02:43:34', '2023-11-06 02:43:34'),
(410, 'App\\Models\\User', 85, 'hydra-api-token', 'b08b6ab745d5edcdcc82b10b0dbfef24be04e336f152ce83ae4c023a501621f4', '[\"user\"]', NULL, '2023-11-06 02:43:34', '2023-11-06 02:43:34'),
(411, 'App\\Models\\User', 85, 'hydra-api-token', '5c7b17bdb2339c0cfa46b2f969c9d13827ca2281673320646285f47de0a47280', '[\"user\"]', NULL, '2023-11-06 02:43:34', '2023-11-06 02:43:34'),
(412, 'App\\Models\\User', 85, 'hydra-api-token', 'c7d56c668d9ec23b20d137980d2044e4b237dc23566704bd39c333d58e6e21d1', '[\"user\"]', '2023-11-06 03:11:31', '2023-11-06 02:43:34', '2023-11-06 03:11:31'),
(413, 'App\\Models\\User', 88, 'hydra-api-token', '0830a0793f68e3221b43013f69b4caf4da0dca5db0ee19100e685783ff1ad777', '[\"user\"]', '2023-11-06 21:58:44', '2023-11-06 02:46:14', '2023-11-06 21:58:44'),
(414, 'App\\Models\\User', 81, 'hydra-api-token', '031416d7a30eaa23eb7fc1ac20e029ca5efaf23beb6b473389ba6aff9004d69b', '[\"user\"]', NULL, '2023-11-06 04:31:49', '2023-11-06 04:31:49'),
(415, 'App\\Models\\User', 81, 'hydra-api-token', '9fce582b2b099c487afb62985665026f1e8c0e4bde1e207ddbb1cfa3c0722d35', '[\"user\"]', '2023-11-06 06:24:15', '2023-11-06 06:23:46', '2023-11-06 06:24:15'),
(416, 'App\\Models\\User', 89, 'hydra-api-token', '1e10f5180c817fa1c638eb112041d21ee6b23f68094a029b4f9571493ddd5f3d', '[\"user\"]', '2023-11-06 06:30:26', '2023-11-06 06:28:25', '2023-11-06 06:30:26'),
(417, 'App\\Models\\User', 91, 'hydra-api-token', '70d44ac391001322e7e88557f35e806ccd835a2667dbd97ddce4068fbfdfd71f', '[\"user\"]', '2023-11-06 06:38:38', '2023-11-06 06:32:28', '2023-11-06 06:38:38'),
(418, 'App\\Models\\User', 84, 'hydra-api-token', '9eaf5bb329a81444e4b006be460835ebe99fabc42c3e8cca31e04a63f3ffd67b', '[\"admin\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(419, 'App\\Models\\User', 84, 'hydra-api-token', '9e8c3ac9186379f43ea7b888c9196018cad9966077d9798df91bf8f79b836116', '[\"admin\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(420, 'App\\Models\\User', 84, 'hydra-api-token', '669a9f84d9fce248c3944d1d6e2d965863db74932204d4f6bdbfe3eef5976aba', '[\"admin\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(421, 'App\\Models\\User', 84, 'hydra-api-token', 'f18fdb2358338b05b1f66cd4091ce8a8e5bac6b1897effe5efb5f7447da4b8e4', '[\"admin\"]', '2023-11-06 06:37:33', '2023-11-06 06:36:30', '2023-11-06 06:37:33'),
(422, 'App\\Models\\User', 91, 'hydra-api-token', 'ab188ffd5e690fb912bdff534dfec1071952ef70e4cb8d3f36c6fd555502fcea', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(423, 'App\\Models\\User', 91, 'hydra-api-token', '235fe9e354ef2ab5ef3220e537a6426081beba9cf52465fe3cf844980d408117', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(424, 'App\\Models\\User', 91, 'hydra-api-token', 'b49dc2c59c8242a822f891d5fed1130475b699b9b40d16ce47d7e2c02fc6ea64', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(425, 'App\\Models\\User', 91, 'hydra-api-token', '7c2e7867dd95b49021a1f21693c50e5657296ffdcc4654da6c8f62d536fad8ac', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(426, 'App\\Models\\User', 91, 'hydra-api-token', 'ab6c878579a2d18bc90fcf4c8d8c9ecb1d8cb25ecc67c1c9ab8f2472fad05137', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(427, 'App\\Models\\User', 91, 'hydra-api-token', '5baec959ccfce718722da5dd6d071860613bbd04865d320c3fe9b0580197f398', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(428, 'App\\Models\\User', 91, 'hydra-api-token', 'f1cde5a11e5fc094469567d91e14873619246bfc0804e78db8046f7502a2937d', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(429, 'App\\Models\\User', 91, 'hydra-api-token', 'ea0dac80876fa8543af448ec69d81d5c2364d43f023d0241dc3be8f1fca86d86', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(430, 'App\\Models\\User', 91, 'hydra-api-token', '2e67698ed223ce6c5c26986283e115453156b44aa9634bb176c55636b0cdeb83', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(431, 'App\\Models\\User', 91, 'hydra-api-token', 'de5ff32b5a9c6545f35b526b26a2bd5c6775c5b693e5854429c50c1270eb0c76', '[\"user\"]', NULL, '2023-11-06 06:36:30', '2023-11-06 06:36:30'),
(432, 'App\\Models\\User', 91, 'hydra-api-token', '002021f954fc76895d359033f1a4224c4d38f307562008b8a1267394d3d6520d', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(433, 'App\\Models\\User', 91, 'hydra-api-token', '9aa1df9385380a9019c8cec02e0657be89587f57d722ee53ba1e8688e673d941', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(434, 'App\\Models\\User', 91, 'hydra-api-token', '6da9fbed581a69418c32f257c9c544cbb0f7c51d4e6bb14f560ed6fac479c2f0', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(435, 'App\\Models\\User', 91, 'hydra-api-token', '9cdc1da04eacd2b8d03698fcb5e5af67b4b12b1ffe1e9f960d6a2c66ec74d64d', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(436, 'App\\Models\\User', 91, 'hydra-api-token', '16e22a03bee25cf6ced8639952de3fef8a32e16e1a5d665fb211f13ddb95e1fe', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(437, 'App\\Models\\User', 91, 'hydra-api-token', '3a5552533a8234ecf96969845c2a9905b9aae60e9d6399fa2f8cbd72179b024f', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(438, 'App\\Models\\User', 91, 'hydra-api-token', '83550703e2e3a6313d0424ec8001366f78ebf1e07fe10a2ea3d3770ac8e32b64', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(439, 'App\\Models\\User', 91, 'hydra-api-token', 'eb30cf5d550894debcbb6e7a1127812acf2c18c41ed927d398af7efecefde339', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(440, 'App\\Models\\User', 91, 'hydra-api-token', 'b3b509df240f5b615ca18a35f2df3c9e83c2206c93520b70c36d2cc8c07ff8f2', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(441, 'App\\Models\\User', 91, 'hydra-api-token', '6da5fade7ff9de4890645baa6b619c32269fc3fee1e23ad92b2aa304001e5f21', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(442, 'App\\Models\\User', 91, 'hydra-api-token', 'cbecd2f110eea736b92c05b8e7d7640789e1d84e3b28482341a4802c5501ae40', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(443, 'App\\Models\\User', 91, 'hydra-api-token', 'cf88e7d1ee7e694a7ace51ec9f37ec9b57f96492a7a3127101bdad99541e7e43', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(444, 'App\\Models\\User', 91, 'hydra-api-token', '1205478f808f39af4d595c47c40168066799bd44886ae0a4052a70ed6bd1be86', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(445, 'App\\Models\\User', 91, 'hydra-api-token', 'fabc19f7ec9cbee8601c920c8f8cfd2f35de29d944773dff8adb65c544954259', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(446, 'App\\Models\\User', 91, 'hydra-api-token', '0e73d6c7b1188a1340bc9f1446123fa9d735dd1e81d33dae93301e0ec52b3a1f', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(447, 'App\\Models\\User', 91, 'hydra-api-token', '2b8fe9c223231a758199caa21146e45a628cdae7e3abd12f3d7cd95f8242ca37', '[\"user\"]', NULL, '2023-11-06 06:36:31', '2023-11-06 06:36:31'),
(448, 'App\\Models\\User', 91, 'hydra-api-token', '75833cdcd472fbba403f4ab29e560f25a5091e54380811868a9994bf737c861e', '[\"user\"]', '2023-11-06 06:41:32', '2023-11-06 06:36:31', '2023-11-06 06:41:32'),
(449, 'App\\Models\\User', 89, 'hydra-api-token', 'a62ad99e5e3718a11ecf9430c824033dfc3c2e856cdd3e112a450392683d8a96', '[\"user\"]', '2023-11-06 06:57:41', '2023-11-06 06:38:43', '2023-11-06 06:57:41'),
(450, 'App\\Models\\User', 91, 'hydra-api-token', '9e730438bf2fbcd2949e0fa89cc5328e4b999c5e47333c66ff1e827a476ad7fc', '[\"user\"]', '2023-11-06 09:05:32', '2023-11-06 06:41:32', '2023-11-06 09:05:32'),
(451, 'App\\Models\\User', 89, 'hydra-api-token', '25b7788cd85dc831e78db2db13f56a7c96dbf20ff3d8946b7407ad59f333dc75', '[\"user\"]', '2023-11-06 06:42:32', '2023-11-06 06:42:24', '2023-11-06 06:42:32'),
(452, 'App\\Models\\User', 89, 'hydra-api-token', '2b9bc9bc696b8207bf5f4899b4bea8a082413ba6a3e4525631bcfb5e683d6f64', '[\"user\"]', '2023-11-06 06:47:30', '2023-11-06 06:44:01', '2023-11-06 06:47:30'),
(453, 'App\\Models\\User', 85, 'hydra-api-token', 'fd0de9baa7ebb7b4c66f7c7d5ad5aa1224cc27a5f5bb6d0904511d6fc502cdaa', '[\"user\"]', '2023-11-06 11:47:51', '2023-11-06 06:48:01', '2023-11-06 11:47:51'),
(454, 'App\\Models\\User', 84, 'hydra-api-token', '724c1960ed2de5bc91cb80237baa6f95399de53507081b199b7de15289b4b5c1', '[\"admin\"]', '2023-11-06 10:32:10', '2023-11-06 06:57:56', '2023-11-06 10:32:10'),
(455, 'App\\Models\\User', 1, 'hydra-api-token', '7a41a571cbaae06ef86f8b235942f46a65aeecc280325fa886465f998e70a228', '[\"admin\"]', '2023-11-06 07:30:38', '2023-11-06 07:28:58', '2023-11-06 07:30:38'),
(456, 'App\\Models\\User', 84, 'hydra-api-token', 'b42c75d38c98a4313e41784bacdd2f572c6c512fe7f26a23ff654bbb956db71a', '[\"admin\"]', '2023-11-06 10:42:27', '2023-11-06 10:42:26', '2023-11-06 10:42:27'),
(457, 'App\\Models\\User', 81, 'hydra-api-token', 'ae1412b9a6a5465329fc344ac320a9ba2750405174432358989c5676de0d7d0c', '[\"user\"]', '2023-11-06 10:42:46', '2023-11-06 10:42:45', '2023-11-06 10:42:46'),
(458, 'App\\Models\\User', 84, 'hydra-api-token', '36ecebd41314fbda991172df40b72491e03b62108f1fc5114ff4f9d58641fd3e', '[\"admin\"]', '2023-11-06 10:48:43', '2023-11-06 10:48:27', '2023-11-06 10:48:43'),
(459, 'App\\Models\\User', 85, 'hydra-api-token', '1d9e6db54e69ca4961f79bc0576cd86c368f2f1e01ca291e1198b4dc0f6ec840', '[\"user\"]', '2023-11-09 06:22:16', '2023-11-06 10:48:52', '2023-11-09 06:22:16'),
(460, 'App\\Models\\User', 84, 'hydra-api-token', '4cbbe8c3a837bf8935a08e57f7679895481d7df53a2817364ae8bc663fa108b7', '[\"admin\"]', '2023-11-06 11:00:03', '2023-11-06 10:59:18', '2023-11-06 11:00:03'),
(461, 'App\\Models\\User', 91, 'hydra-api-token', '5f65e0427716fac645219f6f8db459d93145b0520e2cd0bed5f5193e03918e40', '[\"user\"]', '2023-11-08 10:19:28', '2023-11-06 11:00:40', '2023-11-08 10:19:28'),
(462, 'App\\Models\\User', 89, 'hydra-api-token', '3aaa1ddfbfc27d14f620e048096bd731afcd5bb8794ff1868dd78d4b69ed47dc', '[\"user\"]', '2023-11-08 13:53:45', '2023-11-06 11:51:15', '2023-11-08 13:53:45'),
(463, 'App\\Models\\User', 89, 'hydra-api-token', '04d997bcc0f0eac0d7cfd38279c3d8935702be470140f289a75f71733c81e187', '[\"user\"]', '2023-11-08 18:22:07', '2023-11-06 12:20:16', '2023-11-08 18:22:07'),
(464, 'App\\Models\\User', 85, 'hydra-api-token', '785882c27a5996853b406ee2766a21cb448c666b543c638d574ac9125c1b4f3a', '[\"user\"]', '2023-11-08 22:16:25', '2023-11-06 21:59:02', '2023-11-08 22:16:25'),
(465, 'App\\Models\\User', 81, 'hydra-api-token', '07cdb1e4968630d0e01136088bac960193010ac65955500794de36372c0e2cec', '[\"user\"]', '2023-11-12 08:20:19', '2023-11-07 04:10:43', '2023-11-12 08:20:19'),
(466, 'App\\Models\\User', 81, 'hydra-api-token', '3e1edfd7de397d2b0927010b4eead7134956e1434f80003484c2e9e4cfeb7ef5', '[\"user\"]', '2023-11-08 04:47:01', '2023-11-07 11:17:30', '2023-11-08 04:47:01'),
(467, 'App\\Models\\User', 85, 'hydra-api-token', 'ed8cb1d3618d1a7dcb7a0cc0f6702926373e4567034e48f01210ab9ef55469f6', '[\"user\"]', '2023-11-07 11:47:22', '2023-11-07 11:44:04', '2023-11-07 11:47:22'),
(468, 'App\\Models\\User', 85, 'hydra-api-token', '3fd1dc8f77d52e6f26ed59a02038dc32ee0507fa9974a9d270f36a0518e652d7', '[\"user\"]', '2023-11-07 12:05:43', '2023-11-07 11:47:32', '2023-11-07 12:05:43'),
(469, 'App\\Models\\User', 84, 'hydra-api-token', '1788a17f2c952c72eef6210a71fb75b99d5ca2fcca2981ebb97aa85dcd21c10d', '[\"admin\"]', '2023-11-08 05:38:08', '2023-11-07 12:06:09', '2023-11-08 05:38:08'),
(470, 'App\\Models\\User', 81, 'hydra-api-token', '251264f01094ae906873cc3d4a027a65747f02be2670c805c661c6adc7f908ce', '[\"user\"]', '2023-11-08 09:29:10', '2023-11-08 04:57:49', '2023-11-08 09:29:10'),
(473, 'App\\Models\\User', 94, 'hydra-api-token', 'a5f30967840420d20dbe31e1085260076e290cbb6e324e27ffe792aa264f5f66', '[\"user\"]', '2023-11-08 05:38:27', '2023-11-08 05:38:25', '2023-11-08 05:38:27'),
(474, 'App\\Models\\User', 85, 'hydra-api-token', '5e35f12733b3660ad36935218963ac3bcb2886b8c2c47d368a5cbb348e7dd865', '[\"user\"]', '2023-11-08 05:39:59', '2023-11-08 05:38:39', '2023-11-08 05:39:59'),
(475, 'App\\Models\\User', 94, 'hydra-api-token', 'ef9d8dc5ae8b03c070f0fa8c1a83347b0bdf0a7aa73bd4b7fcaa84305108af87', '[\"user\"]', '2023-11-09 06:21:48', '2023-11-08 05:40:13', '2023-11-09 06:21:48'),
(476, 'App\\Models\\User', 81, 'hydra-api-token', '0a8526197c564f453373bec9f4de21a4c6b9baf9eb1fc5447ced4bfc5dfb4f3e', '[\"user\"]', '2023-11-08 07:15:54', '2023-11-08 06:16:58', '2023-11-08 07:15:54'),
(477, 'App\\Models\\User', 81, 'hydra-api-token', 'edf1f0d291720f677ef44b126c2f91a39e15d35694c8cc0d23696feca7d75af5', '[\"user\"]', '2023-11-08 09:45:51', '2023-11-08 09:32:07', '2023-11-08 09:45:51'),
(478, 'App\\Models\\User', 81, 'hydra-api-token', 'dc75b844e23fd196a7a82500a49dddda94a0b13ae02b1023781b5c40387459a8', '[\"user\"]', '2023-11-08 11:36:04', '2023-11-08 09:46:27', '2023-11-08 11:36:04'),
(479, 'App\\Models\\User', 91, 'hydra-api-token', '84aab4c41c28e9c3502d2c6b7fef53d3d2ab56e3f50e323863d56965fe2bb612', '[\"user\"]', '2023-11-08 10:30:50', '2023-11-08 10:19:37', '2023-11-08 10:30:50'),
(480, 'App\\Models\\User', 81, 'hydra-api-token', '61035b65f4b402bdee64f5c7fce6dabf11cc0456ff4e1e347f25bc304d28692c', '[\"user\"]', '2023-11-08 11:49:02', '2023-11-08 11:36:54', '2023-11-08 11:49:02'),
(481, 'App\\Models\\User', 81, 'hydra-api-token', '3b636ec26049216ba14e254da7655da7bb22c328f350d234badbc8c1ebabe2d4', '[\"user\"]', '2023-11-09 04:11:55', '2023-11-08 11:55:06', '2023-11-09 04:11:55'),
(482, 'App\\Models\\User', 85, 'hydra-api-token', '68e17502612bba2644e4edf3ca1c713c62a9ec5bb264d2618625c777a0226935', '[\"user\"]', '2023-11-08 13:55:08', '2023-11-08 13:53:54', '2023-11-08 13:55:08'),
(483, 'App\\Models\\User', 81, 'hydra-api-token', '0fcfb5ecc89855d8164d4d3c537bdcc9c93db98acd6c783ea0047c8395d1b549', '[\"user\"]', '2023-11-09 03:13:53', '2023-11-09 03:12:23', '2023-11-09 03:13:53'),
(484, 'App\\Models\\User', 85, 'hydra-api-token', 'a34fc12cd912d1972b7f1142712758160d45bc1b1ad88c5212b4cb36b47dd990', '[\"user\"]', '2023-11-09 08:24:19', '2023-11-09 03:43:00', '2023-11-09 08:24:19'),
(485, 'App\\Models\\User', 85, 'hydra-api-token', '0c52271042fd7b2fb9bee408b17bcaf11b2141e0f1fb5476646366c349791090', '[\"user\"]', '2023-11-09 07:02:53', '2023-11-09 03:44:10', '2023-11-09 07:02:53'),
(486, 'App\\Models\\User', 81, 'hydra-api-token', 'ad0707935825e774a92e68212a08b1fb4ffb55eead6f871c4dd978c95a82f491', '[\"user\"]', '2023-11-09 04:23:01', '2023-11-09 04:21:42', '2023-11-09 04:23:01'),
(487, 'App\\Models\\User', 81, 'hydra-api-token', '2abe88d02cbcc7e4c5ff3cf5e58fc441d9d9f9f77d541cba4a2b456c8f43847f', '[\"user\"]', '2023-11-09 04:23:40', '2023-11-09 04:23:38', '2023-11-09 04:23:40'),
(488, 'App\\Models\\User', 81, 'hydra-api-token', 'b68cb2ad19a817bb6d96f51f29caa8769b9421b8c95a96ae79e0dd543f9fbfd5', '[\"user\"]', '2023-11-09 04:42:24', '2023-11-09 04:37:08', '2023-11-09 04:42:24'),
(489, 'App\\Models\\User', 81, 'hydra-api-token', 'f1655371690ed33316c538cec54f58504b91a7110014f5e8e06ab845caac52b0', '[\"user\"]', '2023-11-09 04:51:48', '2023-11-09 04:42:58', '2023-11-09 04:51:48'),
(490, 'App\\Models\\User', 81, 'hydra-api-token', '956ff61a3354799f582067754068b6d32b090c0481253de71699cdc5a9d63f76', '[\"user\"]', '2023-11-09 09:01:46', '2023-11-09 04:52:19', '2023-11-09 09:01:46'),
(491, 'App\\Models\\User', 84, 'hydra-api-token', 'e7a8b3f646583b1923954f30205efd08cb4775ed03908a12ec4584828f032164', '[\"admin\"]', '2023-11-09 05:54:47', '2023-11-09 05:54:23', '2023-11-09 05:54:47'),
(492, 'App\\Models\\User', 85, 'hydra-api-token', '09c150415ee5cb7c1f177c01b64ceadb9c1aa520b4d0af50e85ced435760faa6', '[\"user\"]', '2023-11-09 06:06:11', '2023-11-09 05:55:20', '2023-11-09 06:06:11'),
(493, 'App\\Models\\User', 85, 'hydra-api-token', '877d7e3387a8a2c5f9576ff6b96d7ef7538bbdf36c204f3095233abc8861536c', '[\"user\"]', '2023-11-09 08:32:23', '2023-11-09 05:56:06', '2023-11-09 08:32:23'),
(494, 'App\\Models\\User', 81, 'hydra-api-token', '5d28c53a4229081dd80f56066a5c4f7327325e58c25a69f1f931ec78ef164310', '[\"user\"]', '2023-11-09 09:38:44', '2023-11-09 06:00:44', '2023-11-09 09:38:44'),
(495, 'App\\Models\\User', 81, 'hydra-api-token', 'b4a1d11037feb79c924c15d7805c7b47207c9202b81d5bde100d65ca6244c093', '[\"user\"]', '2023-11-09 09:35:29', '2023-11-09 06:18:52', '2023-11-09 09:35:29'),
(496, 'App\\Models\\User', 85, 'hydra-api-token', '6719cf3bef2fcadf4eb0cc7c9eba92d28ff616adcf8cda8a5a2aa9de8919cefe', '[\"user\"]', '2023-11-09 07:25:40', '2023-11-09 06:21:12', '2023-11-09 07:25:40'),
(497, 'App\\Models\\User', 85, 'hydra-api-token', 'cf1e7527b1ac929535c0b5e0d402b51b2737cf8c5901aa6a9c80421d54e7f244', '[\"user\"]', '2023-11-09 06:22:29', '2023-11-09 06:22:29', '2023-11-09 06:22:29'),
(498, 'App\\Models\\User', 85, 'hydra-api-token', '1bd047106cbcdbfd95aab1d87c6059f1e042aca77d0501eb685a8308c30208e9', '[\"user\"]', '2023-11-09 06:31:36', '2023-11-09 06:23:15', '2023-11-09 06:31:36'),
(499, 'App\\Models\\User', 85, 'hydra-api-token', 'b77c5b0d7ed0928ee0ad362936b8d8ef9dc9c326b54db485f290886788b7a3ff', '[\"user\"]', '2023-11-09 06:24:56', '2023-11-09 06:24:28', '2023-11-09 06:24:56'),
(500, 'App\\Models\\User', 85, 'hydra-api-token', '8dd3519c027ee86833edb0fe3b389e7df32da1d062c233a04af66216825896ed', '[\"user\"]', '2023-11-09 08:25:23', '2023-11-09 06:25:14', '2023-11-09 08:25:23'),
(501, 'App\\Models\\User', 81, 'hydra-api-token', 'afaecc9b0fb3c92f68e444fe994291fb94c316922a67839cf01f7e857fd68b36', '[\"user\"]', '2023-11-09 09:17:59', '2023-11-09 06:26:44', '2023-11-09 09:17:59'),
(502, 'App\\Models\\User', 85, 'hydra-api-token', '9760ec1709f4a12e5db88f3b17df6c17068b6a28d5b5b6b1478d2bd079c42650', '[\"user\"]', '2023-11-09 06:27:18', '2023-11-09 06:27:11', '2023-11-09 06:27:18'),
(503, 'App\\Models\\User', 94, 'hydra-api-token', '0ef1e38b66b9c6686e89b64837db67af61a71303aef763e08c6bb1b95b42fc92', '[\"user\"]', '2023-11-09 07:26:39', '2023-11-09 06:28:18', '2023-11-09 07:26:39'),
(504, 'App\\Models\\User', 89, 'hydra-api-token', 'c5364d6971a56ffdd320a26ae8b3c514e10a8fe7b493718bb1c42d68721d9d76', '[\"user\"]', '2023-11-09 06:44:25', '2023-11-09 06:33:51', '2023-11-09 06:44:25'),
(505, 'App\\Models\\User', 81, 'hydra-api-token', 'e7a39ecedd6e777577edc1a9d2c04b3c1c66093e4bf97a68c204c692f445a646', '[\"user\"]', '2023-11-11 11:47:48', '2023-11-09 06:43:45', '2023-11-11 11:47:48'),
(506, 'App\\Models\\User', 85, 'hydra-api-token', '9a337538cf6c17892c6936c9e9579a4b0caddf0dfd2eca8202716cc584967a3f', '[\"user\"]', '2023-11-09 06:46:12', '2023-11-09 06:44:38', '2023-11-09 06:46:12'),
(507, 'App\\Models\\User', 85, 'hydra-api-token', '11391e095ecbac68772f71ab134ede2ae5545cffdfcf745dfcec27466a48445d', '[\"user\"]', '2023-11-09 06:47:09', '2023-11-09 06:46:23', '2023-11-09 06:47:09'),
(508, 'App\\Models\\User', 85, 'hydra-api-token', '4024eaa18f0cc05121793fd4650abf5ba39acb57836a5b3801a78ae3f4146b1d', '[\"user\"]', '2023-11-09 06:47:21', '2023-11-09 06:47:21', '2023-11-09 06:47:21'),
(509, 'App\\Models\\User', 84, 'hydra-api-token', 'f4340eb4b07e7ee0ef298a3e8f2b53fda57c31fb74fe1c157cdd81a8a3b3f1f0', '[\"admin\"]', '2023-11-09 06:48:12', '2023-11-09 06:47:41', '2023-11-09 06:48:12'),
(510, 'App\\Models\\User', 85, 'hydra-api-token', '90836cdf787e5b3df9f0840e974d96b5b1c22211b5c2b0043af88a26944f35a8', '[\"user\"]', '2023-11-09 06:48:55', '2023-11-09 06:48:21', '2023-11-09 06:48:55'),
(511, 'App\\Models\\User', 94, 'hydra-api-token', '35c824fc2add357d48eee4ea33bd73ddadc7d25516ae42645c2d9a29d72bd47f', '[\"user\"]', '2023-11-09 09:19:37', '2023-11-09 06:49:25', '2023-11-09 09:19:37'),
(512, 'App\\Models\\User', 89, 'hydra-api-token', 'f23e40b0db141e30fd2abd0f1d3315e4f412de8b31e99c4d9380e2dba7da93a2', '[\"user\"]', '2023-11-09 06:51:25', '2023-11-09 06:49:44', '2023-11-09 06:51:25'),
(513, 'App\\Models\\User', 85, 'hydra-api-token', 'e2c4f2984411434f7fdd5e04c409929c1f0d75831386973a025f9d4e9c7f3497', '[\"user\"]', '2023-11-09 07:15:15', '2023-11-09 06:58:12', '2023-11-09 07:15:15'),
(514, 'App\\Models\\User', 81, 'hydra-api-token', '7424100d133f04010a3b20b47df31498212e038a023640399c83626ea5e20889', '[\"user\"]', '2023-11-09 07:10:03', '2023-11-09 07:08:16', '2023-11-09 07:10:03'),
(515, 'App\\Models\\User', 85, 'hydra-api-token', '72f49edaf1c6c00bab15c7b23f31da70ceb7427d7d6a6fff70ea295dace005c0', '[\"user\"]', '2023-11-09 07:29:27', '2023-11-09 07:27:21', '2023-11-09 07:29:27'),
(516, 'App\\Models\\User', 81, 'hydra-api-token', '14af6a789ff42c72a0b9826b1b1e0216d9af03d32c29f4fb04ab383091875066', '[\"user\"]', '2023-11-09 08:38:07', '2023-11-09 08:37:25', '2023-11-09 08:38:07'),
(517, 'App\\Models\\User', 81, 'hydra-api-token', '4c3b2e3fcb9e696bd73336dcd8d5744997288fe3025be8a48c78f68af5799b6e', '[\"user\"]', '2023-11-14 10:35:09', '2023-11-09 08:38:22', '2023-11-14 10:35:09'),
(518, 'App\\Models\\User', 81, 'hydra-api-token', 'b006b500b2918421becd3f8766a2344fc034fb6365a4c898ef7e839508a41f45', '[\"user\"]', NULL, '2023-11-09 08:44:53', '2023-11-09 08:44:53'),
(519, 'App\\Models\\User', 81, 'hydra-api-token', '77ea1255134feeeb07138d8ea8016e6a43fe58fa7c95bb22b74bb5411fe50bc8', '[\"user\"]', NULL, '2023-11-09 08:48:27', '2023-11-09 08:48:27'),
(520, 'App\\Models\\User', 81, 'hydra-api-token', '68c69187f593b091f4321a755fb86f7b1b6fbd863024748a86864dcf7960dbd6', '[\"user\"]', '2023-11-09 09:04:03', '2023-11-09 08:59:10', '2023-11-09 09:04:03'),
(521, 'App\\Models\\User', 81, 'hydra-api-token', '3f60ebdb4d40ba660dbe6cddaa9795e08722cdcb571ce414b4b71396b3bac3d9', '[\"user\"]', NULL, '2023-11-09 09:09:01', '2023-11-09 09:09:01'),
(522, 'App\\Models\\User', 81, 'hydra-api-token', '181a868136c388b708d9f2d22ba1a2f35cfae2b3e71eaae6dd1182119d21329e', '[\"user\"]', NULL, '2023-11-09 09:20:30', '2023-11-09 09:20:30'),
(523, 'App\\Models\\User', 81, 'hydra-api-token', 'd0749e8b2548fbfc4892867f2b3a84ff551af5034e8ae2a0e309129fd34cb146', '[\"user\"]', NULL, '2023-11-09 10:48:10', '2023-11-09 10:48:10'),
(524, 'App\\Models\\User', 81, 'hydra-api-token', '68522d088322e6337178d7c50b2f5804b6cf606fd4f403981b25680d2467f40f', '[\"user\"]', NULL, '2023-11-09 10:48:14', '2023-11-09 10:48:14'),
(525, 'App\\Models\\User', 81, 'hydra-api-token', '7593741c94a798a755bdca625ae19da1901110bbb685bcc3853b00cf5c74e2c2', '[\"user\"]', '2023-11-11 10:08:11', '2023-11-09 10:52:06', '2023-11-11 10:08:11'),
(526, 'App\\Models\\User', 94, 'hydra-api-token', '4f68763e3f447dced060f0e8d46840d6e430c851e1d6793059910b91382c1f34', '[\"user\"]', '2023-11-09 10:56:14', '2023-11-09 10:55:48', '2023-11-09 10:56:14'),
(528, 'App\\Models\\User', 84, 'hydra-api-token', '715e5a49856858b2ac70b048db6933ade3abda0b84808170902096db76bcc968', '[\"admin\"]', '2023-11-09 11:16:56', '2023-11-09 11:11:55', '2023-11-09 11:16:56'),
(529, 'App\\Models\\User', 95, 'hydra-api-token', '78bb4e9144088dee8acb0c0772ab974965b33378a43a5ab934b8ba6f11e1cdf9', '[\"user\"]', NULL, '2023-11-09 11:15:27', '2023-11-09 11:15:27'),
(530, 'App\\Models\\User', 81, 'hydra-api-token', '9613ab65592105e58035f62d940b0c40e5d383b4bbbb21ad09de7f3d8e9a6726', '[\"user\"]', '2023-11-09 11:16:34', '2023-11-09 11:15:35', '2023-11-09 11:16:34'),
(531, 'App\\Models\\User', 81, 'hydra-api-token', '478b8a66fd4e146869d6ad3fd69e75c5ba8ee64731d0b072fb2786f8e03b1669', '[\"user\"]', '2023-11-09 11:16:31', '2023-11-09 11:15:50', '2023-11-09 11:16:31'),
(532, 'App\\Models\\User', 84, 'hydra-api-token', 'd441c61128645c7bf92b6c40d2ff8012c6cd39a6772d9fc1368551d454715913', '[\"admin\"]', '2023-11-09 11:20:31', '2023-11-09 11:17:14', '2023-11-09 11:20:31'),
(533, 'App\\Models\\User', 95, 'hydra-api-token', '993a7a4c8f217cb3abc5e4d6a4a7d5abf6579915ddb3b73a521ac1d8611c8993', '[\"user\"]', '2023-11-09 12:05:32', '2023-11-09 11:20:48', '2023-11-09 12:05:32'),
(534, 'App\\Models\\User', 95, 'hydra-api-token', '949316acdebd5a27ef06f0e4fc453bad2c9b50b7a82db0e95c18b6049182e8c5', '[\"user\"]', '2023-11-09 11:22:22', '2023-11-09 11:22:20', '2023-11-09 11:22:22'),
(535, 'App\\Models\\User', 95, 'hydra-api-token', 'ede155b0f66d15dfc14fab808ceada14c8b08572b6eac73026411addb0c1d789', '[\"user\"]', '2023-11-16 05:36:41', '2023-11-09 11:39:35', '2023-11-16 05:36:41'),
(536, 'App\\Models\\User', 81, 'hydra-api-token', '083fa0b373ba65768b464fef3eb985bd30d651f086a8bcdac0bcf52bf4d473de', '[\"user\"]', '2023-11-11 06:40:07', '2023-11-09 11:51:30', '2023-11-11 06:40:07'),
(537, 'App\\Models\\User', 85, 'hydra-api-token', '7d46d40d706143be7a848362ce5e4d7885b74342e0d8f3749dacea8648e7cb55', '[\"user\"]', '2023-11-11 03:24:43', '2023-11-09 12:06:10', '2023-11-11 03:24:43'),
(538, 'App\\Models\\User', 81, 'hydra-api-token', '2e08904839c81cfdb4e3fbe91d8a77b327eaae5ea270742273229fcea1629aef', '[\"user\"]', '2023-11-14 11:41:56', '2023-11-09 12:16:25', '2023-11-14 11:41:56'),
(539, 'App\\Models\\User', 84, 'hydra-api-token', 'ace3d573db87d8574e1934098a69850dfe6703ab2482732585c493c5008ef7bf', '[\"admin\"]', '2023-11-28 08:48:53', '2023-11-09 14:08:56', '2023-11-28 08:48:53'),
(540, 'App\\Models\\User', 95, 'hydra-api-token', '0cb92d0314e799c35da75dce6b84a0315ad42851cab7d33cf8b083770dd60f7d', '[\"user\"]', '2023-12-10 12:16:07', '2023-11-09 17:24:29', '2023-12-10 12:16:07'),
(541, 'App\\Models\\User', 95, 'hydra-api-token', 'aa974954f923959df8b07c61b2807731924ad245ffb9d208e81b6f06e56fcf47', '[\"user\"]', '2023-11-11 12:10:51', '2023-11-09 17:27:00', '2023-11-11 12:10:51'),
(542, 'App\\Models\\User', 85, 'hydra-api-token', '80ce6996b016fc82376da8f944ef588729531839b010da86e4a8c3b72e6faa63', '[\"user\"]', '2023-11-10 03:16:46', '2023-11-09 21:58:36', '2023-11-10 03:16:46'),
(543, 'App\\Models\\User', 85, 'hydra-api-token', 'd92bc530b3204ea0fd343b5c1f7b1ba62c1e45e92f190caebe266fb82ce4b629', '[\"user\"]', '2023-11-15 03:01:31', '2023-11-10 06:13:29', '2023-11-15 03:01:31'),
(544, 'App\\Models\\User', 81, 'hydra-api-token', '5120a5db4a4df42326b5b83d343c0948ead327fc3250f8ed22909289433fb983', '[\"user\"]', '2023-11-11 02:54:42', '2023-11-11 02:19:55', '2023-11-11 02:54:42'),
(545, 'App\\Models\\User', 81, 'hydra-api-token', 'f172df2373bb32384419955190137f772d8d239c4a8cb46d344584da253fdba7', '[\"user\"]', '2023-11-11 03:02:50', '2023-11-11 03:01:21', '2023-11-11 03:02:50');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(548, 'App\\Models\\User', 96, 'hydra-api-token', '5d724d08499403f33e9f9669f1c5968a2c81bc5860b3528beb6b4dfd29c99efd', '[\"admin\"]', '2023-11-11 03:43:30', '2023-11-11 03:38:47', '2023-11-11 03:43:30'),
(549, 'App\\Models\\User', 96, 'hydra-api-token', 'b2b16093c8c25a9950f5c8aa6ac1e9944c29e7edb6dd7a8960c5d4ba2f415c5d', '[\"admin\"]', '2023-11-11 03:44:26', '2023-11-11 03:39:25', '2023-11-11 03:44:26'),
(550, 'App\\Models\\User', 97, 'hydra-api-token', 'de1a25be756376087a4a8ba6763ad94c28d771f3fabd1fefac41a707667cc705', '[\"user\"]', '2023-11-11 03:45:40', '2023-11-11 03:45:05', '2023-11-11 03:45:40'),
(555, 'App\\Models\\User', 97, 'hydra-api-token', '760dbeed7d3c84a70408f18b0db18caa554917dc87e3747de8c875190be2afaa', '[\"user\"]', '2023-11-11 04:21:59', '2023-11-11 04:21:58', '2023-11-11 04:21:59'),
(556, 'App\\Models\\User', 96, 'hydra-api-token', 'c706a791e65c2bb2ff19ae6a14a46261574b14229707f75a4dce872217d1652d', '[\"admin\"]', '2023-11-11 04:25:52', '2023-11-11 04:22:17', '2023-11-11 04:25:52'),
(557, 'App\\Models\\User', 96, 'hydra-api-token', '90d42307395acf5e74c12eb2d0d0a023a9cbec68b1887dc19a21dcf99b5effb5', '[\"admin\"]', '2023-11-11 04:36:19', '2023-11-11 04:25:00', '2023-11-11 04:36:19'),
(558, 'App\\Models\\User', 96, 'hydra-api-token', '993bf100b33800f0e75d57cc0269cb0fe44860953f16e9edb96208bb4c459d12', '[\"admin\"]', '2023-11-11 04:27:55', '2023-11-11 04:26:46', '2023-11-11 04:27:55'),
(559, 'App\\Models\\User', 97, 'hydra-api-token', '9a98a1b69299a5763e05f3406d9dc8c632583f8bb3e0cd2346c73aa9d268e785', '[\"user\"]', '2023-11-11 04:30:12', '2023-11-11 04:28:29', '2023-11-11 04:30:12'),
(560, 'App\\Models\\User', 97, 'hydra-api-token', '249962a8902e9f4dc13730c72278701c134d7ad0c1ff3f2c4ee3c2b04e7a4972', '[\"user\"]', '2023-11-11 04:31:18', '2023-11-11 04:30:46', '2023-11-11 04:31:18'),
(561, 'App\\Models\\User', 81, 'hydra-api-token', '60ea4904c5442876a15987c9fa5c6d2310c7c3fba6578f4ada027221cc604512', '[\"user\"]', '2023-11-11 09:34:52', '2023-11-11 04:33:07', '2023-11-11 09:34:52'),
(562, 'App\\Models\\User', 97, 'hydra-api-token', 'ebce2728b9a5fa4bb96f408260612b33e8bbdb4e1a239d9f891ef3ec4266d48f', '[\"user\"]', '2023-11-11 04:36:58', '2023-11-11 04:36:57', '2023-11-11 04:36:58'),
(563, 'App\\Models\\User', 96, 'hydra-api-token', '029e228df6d319cadd5dfe7c7331a6b0928a3bdf82687437339ac9a9fd772d6b', '[\"admin\"]', NULL, '2023-11-11 04:37:28', '2023-11-11 04:37:28'),
(564, 'App\\Models\\User', 96, 'hydra-api-token', '5aa93e9f8bd59d3635ed8ef68a9c99d53a52a79ab5df87e91f782823b33ec0f7', '[\"admin\"]', NULL, '2023-11-11 04:37:34', '2023-11-11 04:37:34'),
(565, 'App\\Models\\User', 96, 'hydra-api-token', 'dc2ce977fafda80e91c929d8bf56aaed09c5384c65f2d3311ce5cbd98bb8f9a8', '[\"admin\"]', NULL, '2023-11-11 04:37:55', '2023-11-11 04:37:55'),
(566, 'App\\Models\\User', 96, 'hydra-api-token', '41ecf0878b20a4b559c8d0f1ee9fa938529e608a37400b96eed2d53ae048d836', '[\"admin\"]', NULL, '2023-11-11 04:38:09', '2023-11-11 04:38:09'),
(567, 'App\\Models\\User', 97, 'hydra-api-token', 'd913c50c7b156e6dbc7328da36d27d1ea7b76cdc0aaaebc614de54266c79a8fb', '[\"user\"]', '2023-11-11 04:39:18', '2023-11-11 04:38:34', '2023-11-11 04:39:18'),
(568, 'App\\Models\\User', 96, 'hydra-api-token', 'e1be5158fc0ae4f447abea845113d7c124d3b7570a739b6abaf1f91c70778a7f', '[\"admin\"]', NULL, '2023-11-11 04:41:43', '2023-11-11 04:41:43'),
(569, 'App\\Models\\User', 96, 'hydra-api-token', 'bd068026118863671afc83a34228e2c7842c5f9857cb67de1dda66a02d731aa5', '[\"admin\"]', NULL, '2023-11-11 04:42:20', '2023-11-11 04:42:20'),
(570, 'App\\Models\\User', 97, 'hydra-api-token', '4cb3751de0de57154269a0bfc4d3c62cbb9c242213c7c4c7030d57a36d40ddbd', '[\"user\"]', '2023-11-11 04:43:37', '2023-11-11 04:42:38', '2023-11-11 04:43:37'),
(571, 'App\\Models\\User', 96, 'hydra-api-token', 'f6950eeac7e2c684003ae40271ac55db602901401c91741795a4d77826e4404a', '[\"admin\"]', '2023-11-11 04:45:10', '2023-11-11 04:43:43', '2023-11-11 04:45:10'),
(572, 'App\\Models\\User', 97, 'hydra-api-token', 'ed58baf299c13e96f8bf9eb59e46ed9ad823049ce72281490f61b9fa2a99f892', '[\"user\"]', '2023-11-11 04:45:50', '2023-11-11 04:45:43', '2023-11-11 04:45:50'),
(573, 'App\\Models\\User', 96, 'hydra-api-token', '89bc17497bfe458e4b44ae48149443ccecccfc0caa1bd422aa607594167cf747', '[\"admin\"]', '2023-11-11 04:46:12', '2023-11-11 04:45:58', '2023-11-11 04:46:12'),
(574, 'App\\Models\\User', 97, 'hydra-api-token', '4833e3cca224383251a3e75e48570711b639a7bf994a59ff5a33fd87380c41ec', '[\"user\"]', '2023-11-11 04:46:25', '2023-11-11 04:46:25', '2023-11-11 04:46:25'),
(575, 'App\\Models\\User', 96, 'hydra-api-token', '128906c4ab6172cab27608bcf557ad206c17b716f49dd22f2cf826dac364594d', '[\"admin\"]', '2023-11-11 04:49:32', '2023-11-11 04:46:53', '2023-11-11 04:49:32'),
(576, 'App\\Models\\User', 97, 'hydra-api-token', '05f5b619dccfb507113e8d1de6a5acd1a467111ce01cc2642e64e283eb4af320', '[\"user\"]', '2023-11-11 04:49:47', '2023-11-11 04:49:46', '2023-11-11 04:49:47'),
(577, 'App\\Models\\User', 96, 'hydra-api-token', 'f966e32bd89a2bd59ec8f2153b272b330084483abf16d0e51c5d65aee0c1218b', '[\"admin\"]', '2023-11-11 04:52:02', '2023-11-11 04:51:21', '2023-11-11 04:52:02'),
(578, 'App\\Models\\User', 97, 'hydra-api-token', '94d2331445a3a99214c8d87b43929addffeeed1c5f2080c258dc681690414278', '[\"user\"]', '2023-11-11 04:52:14', '2023-11-11 04:52:13', '2023-11-11 04:52:14'),
(579, 'App\\Models\\User', 96, 'hydra-api-token', '937a7f085e0324b88752a7bc0293b586901b22aecca2b6392f54a8e894e811b5', '[\"admin\"]', '2023-11-11 04:54:04', '2023-11-11 04:53:37', '2023-11-11 04:54:04'),
(580, 'App\\Models\\User', 97, 'hydra-api-token', 'ea9cfa3880b61479784b6976cb2043e5d75367c7ad45ea8388390b9c8ca41d74', '[\"user\"]', '2023-11-11 04:54:16', '2023-11-11 04:54:15', '2023-11-11 04:54:16'),
(581, 'App\\Models\\User', 96, 'hydra-api-token', '110f3b28e89893fa0f830758926ff57312c48ebddfa550794c1217ab7370b972', '[\"admin\"]', '2023-11-11 06:24:05', '2023-11-11 04:54:31', '2023-11-11 06:24:05'),
(582, 'App\\Models\\User', 97, 'hydra-api-token', 'c8d5ad81982ace9936ac0f230366725c6ab2bdf36d5aac993a919237ea4551a8', '[\"user\"]', '2023-11-11 05:07:39', '2023-11-11 04:56:05', '2023-11-11 05:07:39'),
(583, 'App\\Models\\User', 85, 'hydra-api-token', 'a33f7ae17533698a3e86fc8212a3e24871be806c9c90efff7ede448c927ae2e8', '[\"user\"]', '2023-11-26 04:26:41', '2023-11-11 05:39:52', '2023-11-26 04:26:41'),
(588, 'App\\Models\\User', 98, 'hydra-api-token', '9717438c4ef91d1400e30f99fe73378e43de6039e1bba1d80fef50fb78027670', '[\"admin\"]', '2023-11-11 06:48:31', '2023-11-11 06:46:17', '2023-11-11 06:48:31'),
(590, 'App\\Models\\User', 99, 'hydra-api-token', '0f660031c9c9bfb34262003dff7a20dd702d93453596dcde296547384fc862a5', '[\"user\"]', NULL, '2023-11-11 06:48:55', '2023-11-11 06:48:55'),
(591, 'App\\Models\\User', 98, 'hydra-api-token', '0fa54e1efbb037d93770125c25326073edd90ef04aa7c028aba3527ea1312d99', '[\"admin\"]', '2023-11-11 06:51:22', '2023-11-11 06:49:13', '2023-11-11 06:51:22'),
(592, 'App\\Models\\User', 99, 'hydra-api-token', '06f1a3150f482649c77335bf278e767e7f2edf315a463bb43f0b11609f0006cc', '[\"user\"]', '2023-11-11 09:58:03', '2023-11-11 06:51:49', '2023-11-11 09:58:03'),
(594, 'App\\Models\\User', 82, 'hydra-api-token', 'd781612a23f7002449a00908e289e7baae783176153a24d62a18e63d7dddf514', '[\"user\"]', '2023-11-13 05:17:23', '2023-11-11 09:35:28', '2023-11-13 05:17:23'),
(595, 'App\\Models\\User', 85, 'hydra-api-token', 'e002b46ef4c426d9d1ed179728a1ad37ee2adb5c9965fb5e25ab66820d56adf4', '[\"user\"]', '2023-11-13 08:10:15', '2023-11-11 09:59:29', '2023-11-13 08:10:15'),
(597, 'App\\Models\\User', 81, 'hydra-api-token', '43a8c409681cd869fdcab7a64631b43caad23638823259b83a53693df48b9fa5', '[\"user\"]', '2023-11-11 10:38:24', '2023-11-11 10:08:57', '2023-11-11 10:38:24'),
(599, 'App\\Models\\User', 100, 'hydra-api-token', 'ed8dc8331e1da0997e2f6b76858e0cce58d80cdb0cd580d0a89a2d04150e9b31', '[\"admin\"]', '2023-11-11 10:41:31', '2023-11-11 10:11:14', '2023-11-11 10:41:31'),
(600, 'App\\Models\\User', 100, 'hydra-api-token', 'bd74f71b1818d392c690153e4d2d87b7011305c6c333edea111d7bad3366029d', '[\"admin\"]', '2023-11-11 10:16:06', '2023-11-11 10:11:38', '2023-11-11 10:16:06'),
(601, 'App\\Models\\User', 100, 'hydra-api-token', 'f9aa7f4098047eb5522cb196b0a10d0ae42a61a4a152f1f8a349963491c7d111', '[\"admin\"]', '2023-11-11 10:19:24', '2023-11-11 10:18:55', '2023-11-11 10:19:24'),
(602, 'App\\Models\\User', 102, 'hydra-api-token', '7820a1c9790f796487a87fdcb29b5ddf69ff4644535cac519e888da1490337f2', '[\"user\"]', '2023-11-11 11:17:43', '2023-11-11 10:19:54', '2023-11-11 11:17:43'),
(603, 'App\\Models\\User', 81, 'hydra-api-token', 'be8699a303bd430dbcdef912986afca30c44aca35da77c56f4faec0861f00e69', '[\"user\"]', '2023-11-11 11:01:58', '2023-11-11 10:50:26', '2023-11-11 11:01:58'),
(604, 'App\\Models\\User', 81, 'hydra-api-token', '7bf2549f82cbc7d280d55c15a55df369d7ebbde4b1aad8d38fd1fc5dc1ded8aa', '[\"user\"]', '2023-11-11 13:56:57', '2023-11-11 11:06:53', '2023-11-11 13:56:57'),
(605, 'App\\Models\\User', 102, 'hydra-api-token', 'ccf96846a87692daae580ef5b2b5fb6b6497af534a8c3920f4e0f3a871063970', '[\"user\"]', '2023-11-11 11:34:37', '2023-11-11 11:34:35', '2023-11-11 11:34:37'),
(606, 'App\\Models\\User', 100, 'hydra-api-token', 'eb78bb5e875c2e4fa40024909d86aa83b2d943d91638cf2ae218bd06878f3868', '[\"admin\"]', '2023-11-11 12:06:18', '2023-11-11 11:35:18', '2023-11-11 12:06:18'),
(608, 'App\\Models\\User', 81, 'hydra-api-token', '34669ca464ebb80e1b57121f780daf6c45f3eb9631637902465d703c6f7db68f', '[\"user\"]', '2024-01-04 11:08:52', '2023-11-11 12:02:35', '2024-01-04 11:08:52'),
(610, 'App\\Models\\User', 103, 'hydra-api-token', '26972a7f2079b9f1e9a9ee8d1cb2bfbd348410e737f1721a5466d62d2e31f6ce', '[\"user\"]', '2023-11-11 12:07:17', '2023-11-11 12:07:15', '2023-11-11 12:07:17'),
(611, 'App\\Models\\User', 103, 'hydra-api-token', 'd127143a3df67c28b2aa9217b9d7b980185401b1163f316357e319697946d57f', '[\"user\"]', '2023-11-22 12:08:04', '2023-11-11 12:10:00', '2023-11-22 12:08:04'),
(612, 'App\\Models\\User', 81, 'hydra-api-token', '3640a770408d17e82a2b9851c8d8f1bbe71b489c8d8909c42fb60b5073bea56f', '[\"user\"]', '2023-11-12 11:33:09', '2023-11-11 12:11:18', '2023-11-12 11:33:09'),
(613, 'App\\Models\\User', 81, 'hydra-api-token', '47948452cc906c108aab11a57fcacd1bb6ee4e4ef053850f39a1563005420a75', '[\"user\"]', '2023-11-11 13:57:19', '2023-11-11 13:57:16', '2023-11-11 13:57:19'),
(614, 'App\\Models\\User', 81, 'hydra-api-token', '1b61585d3adb043a7b9f042958518b6917bb438e182016b67aede386b1f36ae7', '[\"user\"]', '2023-11-11 16:26:53', '2023-11-11 14:15:35', '2023-11-11 16:26:53'),
(615, 'App\\Models\\User', 81, 'hydra-api-token', 'a976360dc76e8a88b47d127088fa38e25327f669290ad0a502cb3527abc935ee', '[\"user\"]', '2023-11-13 09:38:46', '2023-11-12 04:06:25', '2023-11-13 09:38:46'),
(616, 'App\\Models\\User', 81, 'hydra-api-token', '6dd4e063a02c505e59ddc9daa0b4910547c6218fc71b2230e9d8a91fc27882e8', '[\"user\"]', '2023-11-12 06:24:55', '2023-11-12 04:09:29', '2023-11-12 06:24:55'),
(617, 'App\\Models\\User', 96, 'hydra-api-token', 'a16c34bc48941a0688dad0e8a88d313ea6083b7dd40e880dbeb6f79d57f7f9fc', '[\"admin\"]', '2023-11-13 09:16:26', '2023-11-12 04:15:34', '2023-11-13 09:16:26'),
(618, 'App\\Models\\User', 85, 'hydra-api-token', 'c2ad7e98193b7c4e4acb3c9781128e16c44029da3c4bbeaa63688ff2f78d11e2', '[\"user\"]', '2023-11-12 04:17:18', '2023-11-12 04:17:16', '2023-11-12 04:17:18'),
(619, 'App\\Models\\User', 85, 'hydra-api-token', '4a82fc63d1c2ab52ace4c31ae18e177eafe913c4c6ebcbdd320ee955befd0e26', '[\"user\"]', '2023-12-03 02:49:54', '2023-11-12 04:18:39', '2023-12-03 02:49:54'),
(620, 'App\\Models\\User', 81, 'hydra-api-token', '25dbc8ee7b7844355d9861e0c90373d068f4a19d2d3fb7da28d33d81454f4154', '[\"user\"]', '2023-11-30 06:46:00', '2023-11-12 04:28:09', '2023-11-30 06:46:00'),
(621, 'App\\Models\\User', 81, 'hydra-api-token', '3991e4cf1723d80edbd70298a37f3bd18f963e75c7b4e40dc5992953432dae96', '[\"user\"]', '2023-11-12 06:27:17', '2023-11-12 05:38:20', '2023-11-12 06:27:17'),
(622, 'App\\Models\\User', 81, 'hydra-api-token', 'd1f75b6797781c5b2b13b009e50d3605b26281c33a11358282d07265f3618cf9', '[\"user\"]', '2023-11-14 04:30:39', '2023-11-12 06:43:05', '2023-11-14 04:30:39'),
(623, 'App\\Models\\User', 100, 'hydra-api-token', 'ae72850b477848f1c25657d74b20b7fa53ec5553be47d50d2104623f0bd24026', '[\"admin\"]', '2023-11-12 07:07:33', '2023-11-12 07:07:32', '2023-11-12 07:07:33'),
(624, 'App\\Models\\User', 100, 'hydra-api-token', '1f61715fff1c70cd4e291ec9455a266a5925b6618ed913535071b7681fd33d6a', '[\"admin\"]', '2023-11-12 10:47:50', '2023-11-12 07:08:43', '2023-11-12 10:47:50'),
(625, 'App\\Models\\User', 100, 'hydra-api-token', 'c8eda1fde3f3d3fda8a630fc982a022493f33a286848d00fc765b8735d9aa06d', '[\"admin\"]', '2023-11-12 13:16:41', '2023-11-12 10:47:56', '2023-11-12 13:16:41'),
(626, 'App\\Models\\User', 94, 'hydra-api-token', 'e3ebf8f718d29b98eca8c1818be8567bfd6d641f07ea128cb1d4f98c96f89a12', '[\"user\"]', NULL, '2023-11-12 11:35:19', '2023-11-12 11:35:19'),
(627, 'App\\Models\\User', 94, 'hydra-api-token', 'acc8f0b82c28d1d37ca643a27d5d247f429b465be45cfcc5e25d43a7f7becd78', '[\"user\"]', NULL, '2023-11-12 11:35:19', '2023-11-12 11:35:19'),
(628, 'App\\Models\\User', 94, 'hydra-api-token', 'b1cc4d81c2bda878de7d23f2a60f83324f96e556f37961697fa7df261a526340', '[\"user\"]', '2023-11-12 12:25:00', '2023-11-12 11:35:20', '2023-11-12 12:25:00'),
(629, 'App\\Models\\User', 81, 'hydra-api-token', '572041bd0e8aaa08ac559006c5f7f933d2d7ab9975130a92db6737bffd5df55d', '[\"user\"]', '2023-11-13 13:18:22', '2023-11-12 12:29:35', '2023-11-13 13:18:22'),
(630, 'App\\Models\\User', 85, 'hydra-api-token', '7ebb43c360434ca2d342b944f2208a14e0c18d266ef1ea850a93e3cec4d25eb7', '[\"user\"]', '2023-11-12 21:14:45', '2023-11-12 21:14:43', '2023-11-12 21:14:45'),
(631, 'App\\Models\\User', 85, 'hydra-api-token', 'c3b961e3a6e898bf6c8f312d9d625ddbef9d6fa3fb633ae6af316ee7a26fa978', '[\"user\"]', '2023-11-12 21:14:53', '2023-11-12 21:14:52', '2023-11-12 21:14:53'),
(632, 'App\\Models\\User', 81, 'hydra-api-token', 'e90d0ae7b823188dd6ee96945f26561f1d5d992599b6d0c502c7ecdd073e7e52', '[\"user\"]', '2023-11-27 11:47:58', '2023-11-13 04:37:08', '2023-11-27 11:47:58'),
(633, 'App\\Models\\User', 81, 'hydra-api-token', 'dfbb017a1f25edecf00526ba8438b26742c1f737bfb4d028d1e718b4242000e8', '[\"user\"]', '2023-11-13 08:45:40', '2023-11-13 05:15:54', '2023-11-13 08:45:40'),
(634, 'App\\Models\\User', 81, 'hydra-api-token', '5991468ab19df32f4e21e25bac606c88b15e612786b0be0e3cf66963e49570c4', '[\"user\"]', '2023-11-21 04:27:40', '2023-11-13 05:17:33', '2023-11-21 04:27:40'),
(635, 'App\\Models\\User', 97, 'hydra-api-token', '1ad6db7f874331a10167558c40f5928adee7164a3978c8b1d76b6dd8834029f3', '[\"user\"]', '2023-11-13 12:04:00', '2023-11-13 06:44:17', '2023-11-13 12:04:00'),
(636, 'App\\Models\\User', 85, 'hydra-api-token', '87b4ce12465db652c2668ee642ada245fba72e4126486e248727111e414855af', '[\"user\"]', '2023-11-15 08:25:51', '2023-11-13 07:08:09', '2023-11-15 08:25:51'),
(637, 'App\\Models\\User', 81, 'hydra-api-token', '9da0904b78881bf7893e05c7cc3a8fd85af9835799a0b2081e41f5ef2a9bcaab', '[\"user\"]', '2023-11-13 07:25:16', '2023-11-13 07:12:38', '2023-11-13 07:25:16'),
(638, 'App\\Models\\User', 85, 'hydra-api-token', '4208f03abbfd583499bf823d76fef3f382f1509f5994d16859f70799710f73c4', '[\"user\"]', '2023-11-13 08:10:30', '2023-11-13 08:10:29', '2023-11-13 08:10:30'),
(639, 'App\\Models\\User', 85, 'hydra-api-token', '3e6837a15ad76005ead78db7478e97155cc2dcaa07190af7053bb0ab8974d6ef', '[\"user\"]', '2023-11-13 08:13:58', '2023-11-13 08:12:41', '2023-11-13 08:13:58'),
(640, 'App\\Models\\User', 85, 'hydra-api-token', '509516ce8fd973bfe7400759068e6e8c322c1a04e57f702d64186d971f93ed8e', '[\"user\"]', '2023-11-15 10:41:55', '2023-11-13 08:14:09', '2023-11-15 10:41:55'),
(641, 'App\\Models\\User', 81, 'hydra-api-token', '05572ddd8d7e0ec2ced91b9131f18b9f5d3815363703a83e55170018f413acb7', '[\"user\"]', '2023-12-23 11:27:16', '2023-11-13 08:45:09', '2023-12-23 11:27:16'),
(642, 'App\\Models\\User', 81, 'hydra-api-token', 'bf63d1f9b2426546a49e8770786fb338577279f5d49c6f8c32dc9c2955480e12', '[\"user\"]', '2023-12-23 11:28:02', '2023-11-13 08:47:20', '2023-12-23 11:28:02'),
(644, 'App\\Models\\User', 81, 'hydra-api-token', 'dc9558c4289ce735beecd8fa85a57b20c6eb076b26188d38fc3321290244d50d', '[\"user\"]', '2023-11-13 09:11:34', '2023-11-13 09:11:14', '2023-11-13 09:11:34'),
(645, 'App\\Models\\User', 85, 'hydra-api-token', 'cc60984a32753b357647cc901694d297ce0216d6d80a140cf16b0ffba76fda1e', '[\"user\"]', '2023-11-13 09:13:57', '2023-11-13 09:12:28', '2023-11-13 09:13:57'),
(646, 'App\\Models\\User', 81, 'hydra-api-token', '251a7eae3b1c3eec0d56b504259e57594f5870c4865f77e0582091cea5bdb71a', '[\"user\"]', '2023-11-14 09:21:04', '2023-11-13 09:14:10', '2023-11-14 09:21:04'),
(647, 'App\\Models\\User', 81, 'hydra-api-token', '8e4a1dde2ba9b955b63049e5d2d2dae2a631e9d92a6f4e193cd46b389c4427e1', '[\"user\"]', '2023-11-14 05:39:01', '2023-11-13 09:44:59', '2023-11-14 05:39:01'),
(648, 'App\\Models\\User', 103, 'hydra-api-token', '1d4d005c46908591938622c2bf4049731e80e878a992b151d2f728dc6e6f08a2', '[\"user\"]', '2023-11-13 13:27:43', '2023-11-13 12:51:26', '2023-11-13 13:27:43'),
(649, 'App\\Models\\User', 100, 'hydra-api-token', 'cd22fc656c2d7fb9ee42166a4ff3d49bd76f6fec776e64416eb2b5a07df02df3', '[\"admin\"]', '2023-11-13 12:57:12', '2023-11-13 12:57:10', '2023-11-13 12:57:12'),
(650, 'App\\Models\\User', 100, 'hydra-api-token', '8cd0d3979434f7d8c534c32455c239231c7990274a487f820f2539baed65b0d5', '[\"admin\"]', '2023-11-13 13:01:34', '2023-11-13 13:01:17', '2023-11-13 13:01:34'),
(651, 'App\\Models\\User', 100, 'hydra-api-token', '646a95ceaa28fd41c03ecf3dff39beab92a75a54ee276dca1bd30306cd03dddf', '[\"admin\"]', '2023-11-13 13:03:13', '2023-11-13 13:02:53', '2023-11-13 13:03:13'),
(652, 'App\\Models\\User', 102, 'hydra-api-token', '16a4104793d365ae0b9a0f1bf4fa0396f57cd3da0d40729ac7ec05e8c4a71cec', '[\"user\"]', '2023-11-13 13:03:28', '2023-11-13 13:03:27', '2023-11-13 13:03:28'),
(653, 'App\\Models\\User', 100, 'hydra-api-token', 'b2eab247ec8b5d0c463bdf1525d3c58025521481e3a3badc5c5157966f1dd95a', '[\"admin\"]', '2023-11-14 07:55:17', '2023-11-13 13:03:56', '2023-11-14 07:55:17'),
(654, 'App\\Models\\User', 102, 'hydra-api-token', '6cd5c3a1648d53381a28de062f1b62aa92c80c699a3bb3c398bd80b5e37e4d23', '[\"user\"]', '2023-11-13 13:10:00', '2023-11-13 13:08:48', '2023-11-13 13:10:00'),
(655, 'App\\Models\\User', 102, 'hydra-api-token', '5c028bcec2ce3803207a45d3efab87fa8d0d96354bcd92b84f31bad7b564501d', '[\"user\"]', '2023-11-14 04:51:49', '2023-11-13 13:11:26', '2023-11-14 04:51:49'),
(656, 'App\\Models\\User', 100, 'hydra-api-token', 'b005bf32f75d47bbef56358bef73e52f3fc09db340dc2de6ae2ff7671722877c', '[\"admin\"]', '2023-11-13 14:41:13', '2023-11-13 13:19:02', '2023-11-13 14:41:13'),
(657, 'App\\Models\\User', 94, 'hydra-api-token', '92c096075436fd9f55c2f4afe781dd0cdb3890986c9917ea38c78138817354c0', '[\"user\"]', '2023-11-15 11:58:08', '2023-11-13 14:41:29', '2023-11-15 11:58:08'),
(658, 'App\\Models\\User', 96, 'hydra-api-token', 'f38cabbc25919f0b77a49a8650d70eb232c25ffc20006c294c35cb26bbc5a596', '[\"admin\"]', '2023-11-20 04:14:36', '2023-11-14 04:01:55', '2023-11-20 04:14:36'),
(659, 'App\\Models\\User', 97, 'hydra-api-token', '700e8d4f2658f6dd462a634baa9e96467f1dd84893d2ac380e378b33606258b6', '[\"user\"]', '2023-11-14 12:16:32', '2023-11-14 04:02:19', '2023-11-14 12:16:32'),
(660, 'App\\Models\\User', 81, 'hydra-api-token', '858b85f5eeedc562445f6d60392dff4c84edf4d210ae0ef375a9dd1b1aa95e4d', '[\"user\"]', '2023-11-19 10:35:46', '2023-11-14 04:49:20', '2023-11-19 10:35:46'),
(661, 'App\\Models\\User', 81, 'hydra-api-token', 'fde7e682362c2ed52594f920b5b873ba70b120f1753efb2441e532cf96034240', '[\"user\"]', '2023-11-14 09:13:47', '2023-11-14 04:53:15', '2023-11-14 09:13:47'),
(662, 'App\\Models\\User', 81, 'hydra-api-token', 'b070d561a8744434e6821c5f5b7df1d7918d313dc19f1ad564b1d2eb49c86241', '[\"user\"]', '2023-11-14 05:39:44', '2023-11-14 05:39:41', '2023-11-14 05:39:44'),
(663, 'App\\Models\\User', 81, 'hydra-api-token', 'c18b8593a900642cf851f64b6a32dbf6b79f4e7c46ea626cb8db08835298cd36', '[\"user\"]', '2023-11-14 10:01:05', '2023-11-14 05:47:51', '2023-11-14 10:01:05'),
(664, 'App\\Models\\User', 103, 'hydra-api-token', 'e07ca87753fd4ac1c31a56d41d08707b8dee525b39f392c0fc206e38bbcce2d1', '[\"user\"]', '2023-11-14 06:47:56', '2023-11-14 06:46:59', '2023-11-14 06:47:56'),
(665, 'App\\Models\\User', 103, 'hydra-api-token', '6620bdde40c6a72ad9bf1ea9f79b17669d1710b84e355af9966553611678deb6', '[\"user\"]', '2023-11-18 10:28:44', '2023-11-14 06:49:04', '2023-11-18 10:28:44'),
(666, 'App\\Models\\User', 85, 'hydra-api-token', '2ba44e471988532de26502f25b6b6822032f8d4185feafe894e68ab51a92d6b8', '[\"user\"]', '2023-11-18 07:16:37', '2023-11-14 07:48:11', '2023-11-18 07:16:37'),
(667, 'App\\Models\\User', 85, 'hydra-api-token', '63033d989a513b3c017d3031263b32de2b3caec2f605673abac58b28671a3653', '[\"user\"]', '2023-11-14 08:12:02', '2023-11-14 08:08:25', '2023-11-14 08:12:02'),
(668, 'App\\Models\\User', 100, 'hydra-api-token', 'eb69faddfe70edef68a8421594e4454392ce51ab805424e955fa62634f66addd', '[\"admin\"]', '2023-11-14 10:27:05', '2023-11-14 08:12:29', '2023-11-14 10:27:05'),
(669, 'App\\Models\\User', 81, 'hydra-api-token', 'df49681657bd785f6fa8caf3cb3fc31f45df328d7a5a4052b3a6d4f80deb71f7', '[\"user\"]', NULL, '2023-11-14 08:52:29', '2023-11-14 08:52:29'),
(670, 'App\\Models\\User', 81, 'hydra-api-token', 'cbb7451fcc96404263b0fdf46c02c0b5007a6e950d78405f74889a4b7baca45d', '[\"user\"]', NULL, '2023-11-14 08:53:06', '2023-11-14 08:53:06'),
(671, 'App\\Models\\User', 81, 'hydra-api-token', 'f9185a449caa4b56d5579a8d927610adbd0a2a4ee8011a78ce4ac905a532bc3d', '[\"user\"]', '2023-11-14 09:43:34', '2023-11-14 09:42:50', '2023-11-14 09:43:34'),
(672, 'App\\Models\\User', 85, 'hydra-api-token', '5460a2d9a91e3fe872866aaaf39ad835929077090f6db44cd63e84750968a4d7', '[\"user\"]', '2023-11-15 09:24:11', '2023-11-14 09:58:44', '2023-11-15 09:24:11'),
(673, 'App\\Models\\User', 81, 'hydra-api-token', 'f9d7b8d4958c4f7fec750ecd87b55595a87953bfa47ff52a3ea419d75e654fc5', '[\"user\"]', '2023-11-15 07:16:33', '2023-11-14 10:06:30', '2023-11-15 07:16:33'),
(674, 'App\\Models\\User', 103, 'hydra-api-token', '486e1d1738268bfd5d94a378d03b88b637fd0d998055f2c0ce420412a3ee37fc', '[\"user\"]', '2023-11-14 12:55:43', '2023-11-14 10:27:33', '2023-11-14 12:55:43'),
(675, 'App\\Models\\User', 81, 'hydra-api-token', '0d6f8cad03cfcacc9084b16a928be7ad63c9f220d51e97556df5903be7ddd796', '[\"user\"]', '2023-11-15 11:13:36', '2023-11-14 10:34:08', '2023-11-15 11:13:36'),
(676, 'App\\Models\\User', 103, 'hydra-api-token', '95877c881cc796ece29548df98121203d93d7c44570fc8cbf9629f8a31a19c41', '[\"user\"]', '2023-11-14 10:42:41', '2023-11-14 10:34:28', '2023-11-14 10:42:41'),
(677, 'App\\Models\\User', 81, 'hydra-api-token', '76d4c0d9ff7e01f07a6ff105b47bab89e4c6d0080bf3a98cba0e91a14ed9127d', '[\"user\"]', '2023-11-14 10:46:15', '2023-11-14 10:46:12', '2023-11-14 10:46:15'),
(678, 'App\\Models\\User', 81, 'hydra-api-token', '1093e8f684af67feaa12b116c592ca8abf9a19527f21534c59a9a78b6701356f', '[\"user\"]', '2023-12-03 02:19:32', '2023-11-14 10:58:22', '2023-12-03 02:19:32'),
(679, 'App\\Models\\User', 81, 'hydra-api-token', '274dc8bd2d51fc6c962c232ba96eb3270b82575d9329f6f2038f71f21306eddb', '[\"user\"]', '2023-11-19 09:56:14', '2023-11-14 11:25:27', '2023-11-19 09:56:14'),
(680, 'App\\Models\\User', 81, 'hydra-api-token', 'c67d4f33efc12b0eefff176b4810f2c5928db2756ef970a3b01c52ac8356908a', '[\"user\"]', '2023-11-14 11:58:09', '2023-11-14 11:58:00', '2023-11-14 11:58:09'),
(681, 'App\\Models\\User', 81, 'hydra-api-token', '5f135915fdac3ea947b81bbdd01e7df54c03c848f83bac58c0b0c311ae129012', '[\"user\"]', '2023-11-20 05:32:25', '2023-11-14 11:59:20', '2023-11-20 05:32:25'),
(683, 'App\\Models\\User', 100, 'hydra-api-token', 'e997084645cf0722eddcbdd37216e308404fc06ac92edf904554502698d31ea5', '[\"admin\"]', '2023-11-14 12:57:36', '2023-11-14 12:56:07', '2023-11-14 12:57:36'),
(684, 'App\\Models\\User', 104, 'hydra-api-token', 'dfc5747f788154f843bf51c765f34b53c669c3aca7565488e718d294d5585ff0', '[\"user\"]', '2023-11-14 12:58:36', '2023-11-14 12:58:32', '2023-11-14 12:58:36'),
(685, 'App\\Models\\User', 100, 'hydra-api-token', 'c40a59fcbd97e0f943015bcdf3b96d02d194dfdc4fd2f33e9ec79a7fc5769b8c', '[\"admin\"]', '2023-11-14 12:59:16', '2023-11-14 12:58:47', '2023-11-14 12:59:16'),
(686, 'App\\Models\\User', 104, 'hydra-api-token', '026b7b482a7989998d947b64a90d5b076fbb062d9ef3d7c2ed4cfce327b2835e', '[\"user\"]', '2023-11-15 06:40:33', '2023-11-14 12:59:37', '2023-11-15 06:40:33'),
(687, 'App\\Models\\User', 81, 'hydra-api-token', '9dea56f99a1eab02213b84b5c2ee97a954a0cf8eada2223c28ee55f118123d56', '[\"user\"]', '2023-11-15 04:34:17', '2023-11-15 03:10:00', '2023-11-15 04:34:17'),
(688, 'App\\Models\\User', 85, 'hydra-api-token', '62f5d243ba474c4590bc41d26cd294785bd21edaeb17fa0a2df4eca711814d7f', '[\"user\"]', '2023-11-15 04:38:40', '2023-11-15 03:13:52', '2023-11-15 04:38:40'),
(689, 'App\\Models\\User', 97, 'hydra-api-token', 'aa9fcd10e4fd71e339eea88efd6da3752059eea9c37e687c17c30acecfae8a30', '[\"user\"]', '2023-11-15 06:00:43', '2023-11-15 04:06:54', '2023-11-15 06:00:43'),
(690, 'App\\Models\\User', 81, 'hydra-api-token', '79ff9f9bdedddb1c9500066038e4b067bd80fb082db79b0e0b0050d33569f981', '[\"user\"]', '2023-11-17 01:33:01', '2023-11-15 04:38:47', '2023-11-17 01:33:01'),
(691, 'App\\Models\\User', 81, 'hydra-api-token', '02938ee332e0f4686959286fb48ad5ec8f0a9e3c1c4e75c24afdd26df28c9c32', '[\"user\"]', '2023-11-15 06:08:38', '2023-11-15 06:02:44', '2023-11-15 06:08:38'),
(692, 'App\\Models\\User', 97, 'hydra-api-token', '86ede07a29603c54b1a4699593e7b7439460be8e8736874c4fbf5c089b46f954', '[\"user\"]', '2023-11-15 12:09:42', '2023-11-15 06:18:03', '2023-11-15 12:09:42'),
(693, 'App\\Models\\User', 85, 'hydra-api-token', 'f8a6f4c5512e719b4362d3c264c085424885798ac06457c0c8daecbd3ed6030a', '[\"user\"]', '2023-11-15 06:43:00', '2023-11-15 06:41:07', '2023-11-15 06:43:00'),
(694, 'App\\Models\\User', 100, 'hydra-api-token', 'a89f18100e6c4122e3fceb8d46b30d43d83b6fa1ddcb024a83a1bbbd3365e12e', '[\"admin\"]', '2023-11-15 06:43:43', '2023-11-15 06:43:42', '2023-11-15 06:43:43'),
(695, 'App\\Models\\User', 100, 'hydra-api-token', '0cc327d8205a5e743b98ad9956e52d5b1956efaacb8981345173b752722d47a0', '[\"admin\"]', '2023-11-15 07:29:55', '2023-11-15 06:44:42', '2023-11-15 07:29:55'),
(696, 'App\\Models\\User', 85, 'hydra-api-token', 'c06ccb6e4382471b76c5c1e8738a854dd1e9956a1818d20b38418727700ecb50', '[\"user\"]', '2023-11-15 07:34:03', '2023-11-15 06:45:38', '2023-11-15 07:34:03'),
(697, 'App\\Models\\User', 81, 'hydra-api-token', 'b8f58f4d9879c8f2613bfaba0a814c1392bf1ec308b36255c4a5848141b7a4d8', '[\"user\"]', '2023-11-15 06:57:55', '2023-11-15 06:55:20', '2023-11-15 06:57:55'),
(698, 'App\\Models\\User', 100, 'hydra-api-token', 'f712e0189bbbf40e35d38fd96ff62359ccdad324052336ca962d6fe42cae3f24', '[\"admin\"]', '2023-11-15 07:35:13', '2023-11-15 07:30:15', '2023-11-15 07:35:13'),
(700, 'App\\Models\\User', 105, 'hydra-api-token', 'e4176f9b515dc81e16ce1e5383ad3b3cdebe9c0e69d4f4b9657934a928c4ae50', '[\"user\"]', '2023-11-15 07:44:30', '2023-11-15 07:35:48', '2023-11-15 07:44:30'),
(701, 'App\\Models\\User', 81, 'hydra-api-token', '6dbf5731634cff0b51aa907c95c183545494ce9b40bf5a66b40f7ce66660c967', '[\"user\"]', '2023-11-15 08:27:03', '2023-11-15 08:26:08', '2023-11-15 08:27:03'),
(702, 'App\\Models\\User', 105, 'hydra-api-token', 'fd2bb4f31edf17db31374bc8830f9a3a4bbbd9c5552416fc85a6830432be9207', '[\"user\"]', '2023-11-15 08:32:30', '2023-11-15 08:29:15', '2023-11-15 08:32:30'),
(703, 'App\\Models\\User', 81, 'hydra-api-token', '48c001e070b40bacf337de471b8edf6397a5cd5198416bbc1e03acfda5f5358c', '[\"user\"]', '2023-11-15 09:18:16', '2023-11-15 08:33:49', '2023-11-15 09:18:16'),
(704, 'App\\Models\\User', 105, 'hydra-api-token', '73ca70d9ab7ca01a42349ba1c2a7147978fdba5533d801755cf3aaa815fd23e2', '[\"user\"]', '2023-11-15 09:20:24', '2023-11-15 08:36:15', '2023-11-15 09:20:24'),
(705, 'App\\Models\\User', 81, 'hydra-api-token', 'd934a76a1d96e5ab8ced08cc95c6da7f6a2215a6b7dee30aa7b30f48bae786cb', '[\"user\"]', '2023-11-18 07:21:32', '2023-11-15 09:20:43', '2023-11-18 07:21:32'),
(706, 'App\\Models\\User', 105, 'hydra-api-token', 'fc13ff98ce696b94ee5d46dfdd6b8451d5e85a22c347acea1d77bc8b42d93450', '[\"user\"]', '2023-11-15 09:25:18', '2023-11-15 09:25:17', '2023-11-15 09:25:18'),
(707, 'App\\Models\\User', 105, 'hydra-api-token', 'af070f513883d1ac7f257a6d99f9c4ce162da260a0162cdd20f7e88421d6913f', '[\"user\"]', '2023-11-15 09:26:19', '2023-11-15 09:25:57', '2023-11-15 09:26:19'),
(708, 'App\\Models\\User', 104, 'hydra-api-token', 'aaddf211ca4f2c3f0f1578ebb4f3f10a65cd3c16530a9353bd3e91ffbab7d562', '[\"user\"]', '2023-11-15 09:35:43', '2023-11-15 09:30:25', '2023-11-15 09:35:43'),
(709, 'App\\Models\\User', 100, 'hydra-api-token', '91b5c44e7b1bab60f096a4cadd0f9d166a34095d8ff7fc429d3ebb5a642b2d0c', '[\"admin\"]', '2023-11-15 09:43:29', '2023-11-15 09:38:14', '2023-11-15 09:43:29'),
(710, 'App\\Models\\User', 104, 'hydra-api-token', '954818f78fa5a0dc79d2b091a40d6db6383d9152b7f21927ac4abd7395890348', '[\"user\"]', '2023-11-15 09:56:14', '2023-11-15 09:47:21', '2023-11-15 09:56:14'),
(711, 'App\\Models\\User', 100, 'hydra-api-token', '58b66cd28d968502bf693090055fa265704be605580fa1ac227a1178f81ee7dd', '[\"admin\"]', '2023-11-15 10:02:11', '2023-11-15 09:57:35', '2023-11-15 10:02:11'),
(712, 'App\\Models\\User', 100, 'hydra-api-token', '2f00945a767da9b853d6d648abc39802849f6f67c9d17bfc6feca76dc4cc379e', '[\"admin\"]', '2023-11-15 10:03:46', '2023-11-15 10:02:31', '2023-11-15 10:03:46'),
(713, 'App\\Models\\User', 104, 'hydra-api-token', 'dee56e8d1751eb4a79782916f9b62434dc2afd541df4dd75e868ac88b2ed8b60', '[\"user\"]', '2023-11-15 10:04:13', '2023-11-15 10:04:01', '2023-11-15 10:04:13'),
(714, 'App\\Models\\User', 106, 'hydra-api-token', '5a4230dba1bc8e78708f638dba8b36eeaf93656cca192024e0ad84ea4e184d02', '[\"user\"]', '2023-11-15 10:06:15', '2023-11-15 10:04:52', '2023-11-15 10:06:15'),
(715, 'App\\Models\\User', 104, 'hydra-api-token', '1e41e5db076081c37befa5c5de246c3de94d6d6c165ab3f7faad9fd51a946356', '[\"user\"]', '2023-11-15 10:07:15', '2023-11-15 10:06:35', '2023-11-15 10:07:15'),
(716, 'App\\Models\\User', 106, 'hydra-api-token', 'ea216f3c899069b12e0ddd9ec2a02eb1dfa9235dd560d38fa363cd9e5fb7123b', '[\"user\"]', '2023-11-15 10:12:38', '2023-11-15 10:07:30', '2023-11-15 10:12:38'),
(717, 'App\\Models\\User', 104, 'hydra-api-token', '889378173a1f5d5776620c9ee7ed4ffded53bffdc867602ea10171adee9bf842', '[\"user\"]', '2023-11-15 10:16:35', '2023-11-15 10:12:59', '2023-11-15 10:16:35'),
(718, 'App\\Models\\User', 81, 'hydra-api-token', 'ab40d78c1f7d6fef10b985e88920b63195bbf4f59af66ca80ae8f78f66c1ca41', '[\"user\"]', '2023-11-15 10:15:36', '2023-11-15 10:13:54', '2023-11-15 10:15:36'),
(719, 'App\\Models\\User', 106, 'hydra-api-token', '8ab072933587e41c1b31d2b010d1cabbbf039a6d16842c537fa79fdf3d1c955b', '[\"user\"]', '2023-11-15 11:37:16', '2023-11-15 10:16:44', '2023-11-15 11:37:16'),
(720, 'App\\Models\\User', 81, 'hydra-api-token', '9e7faf9cd010f36cef34737f7717f246bf5b41ede2d133c42a88850fcb080f08', '[\"user\"]', '2023-11-18 00:51:04', '2023-11-15 10:34:13', '2023-11-18 00:51:04'),
(721, 'App\\Models\\User', 81, 'hydra-api-token', '0c3bb101c095bfce82a5c1af7d7b10f78c34d70711a8f78ebb14d1beed0b26d5', '[\"user\"]', '2023-11-15 10:46:49', '2023-11-15 10:43:10', '2023-11-15 10:46:49'),
(722, 'App\\Models\\User', 105, 'hydra-api-token', '871e607a742a075bf33bf269f160c5b44f5f1cb101982c8bc02cb9baa17fa38c', '[\"user\"]', '2023-11-15 11:17:17', '2023-11-15 10:43:54', '2023-11-15 11:17:17'),
(723, 'App\\Models\\User', 81, 'hydra-api-token', 'fda378a2feb2a628c8a5b08560496b61b90b32dee161b1c14a0846684fb007bc', '[\"user\"]', '2023-11-16 10:13:54', '2023-11-15 10:51:55', '2023-11-16 10:13:54'),
(724, 'App\\Models\\User', 100, 'hydra-api-token', 'e14e7542dab94219df5c11ea42997448b8e5f026b869521891cdae06c18d4387', '[\"admin\"]', '2023-11-15 11:37:42', '2023-11-15 11:37:31', '2023-11-15 11:37:42'),
(725, 'App\\Models\\User', 81, 'hydra-api-token', 'a213b08e23e038d11ada41a8304266c44368329d49678c6a558fef33815d64ed', '[\"user\"]', '2023-11-16 06:42:01', '2023-11-15 11:38:46', '2023-11-16 06:42:01'),
(726, 'App\\Models\\User', 81, 'hydra-api-token', 'd876b6f8395df336088afb56705a5637de39a3452a7500d142f12289267ff522', '[\"user\"]', '2023-11-16 07:41:38', '2023-11-15 11:58:21', '2023-11-16 07:41:38'),
(727, 'App\\Models\\User', 81, 'hydra-api-token', '5c410a04dc0ad0f359c456cb0f72b2b875b2b6312931823cfc7ed483a59a47d6', '[\"user\"]', '2023-11-16 06:53:34', '2023-11-15 13:47:37', '2023-11-16 06:53:34'),
(728, 'App\\Models\\User', 97, 'hydra-api-token', '07aa48d368d626b94eeece2946d444c23081b95a8694c13cb48924198593237a', '[\"user\"]', '2023-11-16 08:51:51', '2023-11-16 05:40:21', '2023-11-16 08:51:51'),
(729, 'App\\Models\\User', 85, 'hydra-api-token', '618c001b72c38d45240b68838c833e4e291ff7d6ca197b0b7d432bc3e6034dc2', '[\"user\"]', '2023-11-16 08:41:10', '2023-11-16 05:42:46', '2023-11-16 08:41:10'),
(730, 'App\\Models\\User', 95, 'hydra-api-token', 'e7111dd0b035f4eaf3a5d31b86a479e6ee6d4872735d2e639d072af48a8861bb', '[\"user\"]', '2023-11-22 12:09:24', '2023-11-16 06:02:12', '2023-11-22 12:09:24'),
(731, 'App\\Models\\User', 100, 'hydra-api-token', '17c98a1b3902755f5f02359f96f85d808ddf7a90df0a1690a673c12513166380', '[\"admin\"]', '2023-11-16 06:45:38', '2023-11-16 06:45:38', '2023-11-16 06:45:38'),
(732, 'App\\Models\\User', 81, 'hydra-api-token', '8fc8024732ecc7463401194bc007c4cb56821ef6d7ddf2dad46220a8dd594941', '[\"user\"]', '2023-11-16 10:57:42', '2023-11-16 06:54:16', '2023-11-16 10:57:42'),
(733, 'App\\Models\\User', 81, 'hydra-api-token', '41990f59912ab50a5c6ecf6cb83cc28a2bd17666019dde13e40434744f119988', '[\"user\"]', '2023-11-18 10:31:40', '2023-11-16 06:54:25', '2023-11-18 10:31:40'),
(734, 'App\\Models\\User', 106, 'hydra-api-token', '9221430e5e709ee0546860824885d872049e48e31e3d74dc3cf511efa5593b01', '[\"user\"]', '2023-11-16 07:36:03', '2023-11-16 07:34:36', '2023-11-16 07:36:03'),
(735, 'App\\Models\\User', 104, 'hydra-api-token', 'a4bf20d45c0d76fd789b92701e2d02f01c0905e9b6f2cfee7c4f4cb403064946', '[\"user\"]', '2023-11-16 09:27:26', '2023-11-16 07:36:12', '2023-11-16 09:27:26'),
(736, 'App\\Models\\User', 95, 'hydra-api-token', 'a533e957d274672ff06670a22b2d3bec5aecb53f15ecc75376e48b6be422d007', '[\"user\"]', '2023-11-21 08:36:45', '2023-11-16 07:41:52', '2023-11-21 08:36:45'),
(737, 'App\\Models\\User', 105, 'hydra-api-token', '0de791c5a7c3ca739031530c1cd28c5c044926b7fe283c657a3f6169dc2702f4', '[\"user\"]', '2023-11-16 09:45:11', '2023-11-16 09:04:49', '2023-11-16 09:45:11'),
(738, 'App\\Models\\User', 81, 'hydra-api-token', '60d7e6b68915df56365cf449e758efb6a0e7091c1c36c1de91cac9626f68a12b', '[\"user\"]', '2023-11-16 10:40:45', '2023-11-16 09:45:37', '2023-11-16 10:40:45'),
(739, 'App\\Models\\User', 105, 'hydra-api-token', 'fd3d9a9784b6514b2e1a1d8222c7e640e733d931542550dadc7bdbfba139d866', '[\"user\"]', '2023-11-16 10:15:03', '2023-11-16 10:02:29', '2023-11-16 10:15:03'),
(740, 'App\\Models\\User', 105, 'hydra-api-token', '027cfe1e76f3e8e89016346bdcc470fca75cfe606f36b8e36d145a467415dd47', '[\"user\"]', '2023-11-16 10:19:14', '2023-11-16 10:15:12', '2023-11-16 10:19:14'),
(741, 'App\\Models\\User', 81, 'hydra-api-token', 'cf8c6779020fd97c12182ae673c825bdef95c0e74f14220a989e8b5797ad3d29', '[\"user\"]', '2023-11-18 07:55:03', '2023-11-16 10:15:53', '2023-11-18 07:55:03'),
(742, 'App\\Models\\User', 100, 'hydra-api-token', '4199ff87c7399945d4d42c01640f3308659161bb770d0a71f6ef70efd5c1f62b', '[\"admin\"]', '2023-11-16 10:37:00', '2023-11-16 10:36:51', '2023-11-16 10:37:00'),
(743, 'App\\Models\\User', 81, 'hydra-api-token', '3b4bccbbffa285bfd43a6c5bc363cb1ebafbdcdf05e978bcb296b5bd628b92e2', '[\"user\"]', '2023-11-16 10:37:19', '2023-11-16 10:37:16', '2023-11-16 10:37:19'),
(744, 'App\\Models\\User', 100, 'hydra-api-token', 'ee6f15d4e32d2a1eb7c25279dcd70242892908ae1ef93fbe79272b599d9708d3', '[\"admin\"]', '2023-11-16 11:03:22', '2023-11-16 10:38:28', '2023-11-16 11:03:22'),
(745, 'App\\Models\\User', 95, 'hydra-api-token', 'af91c8ff13c250d024c34588d5326b35062489488431cad0ae004c5282273e6b', '[\"user\"]', '2023-11-16 11:03:42', '2023-11-16 10:58:31', '2023-11-16 11:03:42'),
(746, 'App\\Models\\User', 81, 'hydra-api-token', '3a69b03738b1d0f983773c7ef9c074d509ef44de3e35b6c594947cc95cc26d4b', '[\"user\"]', '2023-11-21 08:47:18', '2023-11-16 11:03:35', '2023-11-21 08:47:18'),
(747, 'App\\Models\\User', 81, 'hydra-api-token', 'e681b8d51326fdd763134a9329366639a340becce2e0c7bd66c9805cae45e1b9', '[\"user\"]', '2023-11-21 06:54:11', '2023-11-16 11:04:07', '2023-11-21 06:54:11'),
(750, 'App\\Models\\User', 105, 'hydra-api-token', 'fab4a2d131fb73c18a23bb623ebcdb6c5ee9d8efd9d3e0a5ed0a9d34927b150f', '[\"user\"]', '2023-11-20 04:17:10', '2023-11-16 22:14:45', '2023-11-20 04:17:10'),
(751, 'App\\Models\\User', 81, 'hydra-api-token', '82381943a6bf785107967482afd30ca84ae125bc6762e2bde1c157499ce22eb4', '[\"user\"]', '2023-11-18 02:29:25', '2023-11-18 00:52:31', '2023-11-18 02:29:25'),
(752, 'App\\Models\\User', 81, 'hydra-api-token', '48a82c62e6b34d9a4743de0e45ca0a4c209f65f615946d4829f44367cd76574b', '[\"user\"]', '2023-11-18 04:49:11', '2023-11-18 03:58:21', '2023-11-18 04:49:11'),
(753, 'App\\Models\\User', 81, 'hydra-api-token', 'f6327d4c043c2cb2c7613e7e26aefe5c7dc243986b7cfdfaa26647838db4b81c', '[\"user\"]', '2023-11-18 10:07:47', '2023-11-18 04:00:47', '2023-11-18 10:07:47'),
(754, 'App\\Models\\User', 81, 'hydra-api-token', '51791d85e5ff1e4ca6bf8c43f209c80d57daf62232bb97dcbba2f8ef4618678b', '[\"user\"]', '2023-11-20 10:14:42', '2023-11-18 05:17:11', '2023-11-20 10:14:42'),
(755, 'App\\Models\\User', 84, 'hydra-api-token', '3c09ebbdfb670c05bd1273d4e37c4ad90c84e0a0be96587e9766bc77ebc04e8d', '[\"admin\"]', '2023-11-18 06:33:57', '2023-11-18 06:33:53', '2023-11-18 06:33:57'),
(756, 'App\\Models\\User', 81, 'hydra-api-token', 'dea21f69fb1e35323f088fce49a11ee85695addabed944fb3654b5c8537b7be6', '[\"user\"]', NULL, '2023-11-18 06:34:03', '2023-11-18 06:34:03'),
(757, 'App\\Models\\User', 85, 'hydra-api-token', 'dc888d3ffa121c820e113d333320e02e1bc2729caed86ba82dcfcb0b67603cda', '[\"user\"]', '2023-11-18 10:40:04', '2023-11-18 06:45:32', '2023-11-18 10:40:04'),
(758, 'App\\Models\\User', 105, 'hydra-api-token', 'b463b340a32d1c30d6fa5540cedb043f85f67b31cff8ca62f7f1deccb8975ece', '[\"user\"]', '2023-11-18 08:32:45', '2023-11-18 07:14:37', '2023-11-18 08:32:45'),
(759, 'App\\Models\\User', 105, 'hydra-api-token', '7501ed883cacd8378acd9386e44568dbacc6fda03b3ef328c81c83b49137c274', '[\"user\"]', '2023-11-18 07:23:29', '2023-11-18 07:21:51', '2023-11-18 07:23:29'),
(760, 'App\\Models\\User', 81, 'hydra-api-token', 'e6ce4e9b0def392aa4caff207fb3b31bec5e7a20a2d9ac3d79da82a90679456f', '[\"user\"]', '2023-11-18 22:21:36', '2023-11-18 07:23:51', '2023-11-18 22:21:36'),
(761, 'App\\Models\\User', 81, 'hydra-api-token', 'db40ba2e71822d598b505e26e29ea42f584956ea476e0e4067342e66bc6c186d', '[\"user\"]', '2023-11-18 08:36:26', '2023-11-18 08:19:59', '2023-11-18 08:36:26'),
(762, 'App\\Models\\User', 105, 'hydra-api-token', 'e9cc8b73b428dec4d92843c1d46e576784855c1ca222d764fd276495ac3c8667', '[\"user\"]', '2023-11-18 09:01:42', '2023-11-18 08:36:33', '2023-11-18 09:01:42'),
(763, 'App\\Models\\User', 81, 'hydra-api-token', 'f7b811bc3db01c71bbd3ba1a0d41a53e93b4b74696428f80ee9956ac1a67f7e3', '[\"user\"]', '2023-11-18 09:02:01', '2023-11-18 08:57:36', '2023-11-18 09:02:01'),
(764, 'App\\Models\\User', 105, 'hydra-api-token', 'bf29a63403740d94af0d841d3c1974a465622c626c5f8fca11ddc07743b3fc37', '[\"user\"]', '2023-11-18 22:32:27', '2023-11-18 09:02:08', '2023-11-18 22:32:27'),
(765, 'App\\Models\\User', 81, 'hydra-api-token', '841ffbcb383635ac2cb27914f07ea73d347b8666a64031cb07317da45ce4260e', '[\"user\"]', '2023-11-20 09:13:00', '2023-11-18 10:12:16', '2023-11-20 09:13:00'),
(766, 'App\\Models\\User', 81, 'hydra-api-token', '05537cca400cc48a2092219bf3e007ee69729da0c7795906bccbc2d9881628dc', '[\"user\"]', '2023-11-27 06:09:05', '2023-11-18 10:33:07', '2023-11-27 06:09:05'),
(767, 'App\\Models\\User', 81, 'hydra-api-token', '779e376ee12469465905141d7722d980dbdadecd63ed63803d3f9c076a77d412', '[\"user\"]', '2023-11-18 10:34:16', '2023-11-18 10:34:13', '2023-11-18 10:34:16'),
(768, 'App\\Models\\User', 81, 'hydra-api-token', 'ddb18f43d212a410cc79a2e1e4e0943207103fc6fb6b033c3382c2b7223220d9', '[\"user\"]', '2023-11-18 10:49:42', '2023-11-18 10:40:55', '2023-11-18 10:49:42'),
(769, 'App\\Models\\User', 85, 'hydra-api-token', 'fc5aec15d9e6b4ebeef4ce35b4ad879ea8bcd0cca51c21372e1a6c16cdde7b0b', '[\"user\"]', '2023-11-19 06:13:19', '2023-11-18 10:51:40', '2023-11-19 06:13:19'),
(770, 'App\\Models\\User', 105, 'hydra-api-token', '181687f8579ce28fae3407dfe4314b0c90ceea43399a24151b83f2d450f62fb3', '[\"user\"]', '2023-11-19 11:33:25', '2023-11-18 22:21:59', '2023-11-19 11:33:25'),
(771, 'App\\Models\\User', 81, 'hydra-api-token', '055b4c6fa711057e51425c87ea9f729a51b901bf7dbf227c52af4589ba0ddbcb', '[\"user\"]', '2023-11-18 22:45:45', '2023-11-18 22:32:46', '2023-11-18 22:45:45'),
(772, 'App\\Models\\User', 105, 'hydra-api-token', '11c9d3b5e25a442f66eaba616ff3b825f12e7a05e84100d08a12a113a3b732ec', '[\"user\"]', '2023-11-19 09:06:02', '2023-11-18 22:43:13', '2023-11-19 09:06:02'),
(773, 'App\\Models\\User', 97, 'hydra-api-token', '36c87a4a9f949fa6831e8099e93a126802353b5332916b33af960605e3685dc7', '[\"user\"]', '2023-11-19 10:46:55', '2023-11-19 04:13:32', '2023-11-19 10:46:55'),
(774, 'App\\Models\\User', 81, 'hydra-api-token', 'ba17cc71ee5e2f900de21b67e8f9854e8c4e4093a00d7b6dddfa8b501148a094', '[\"user\"]', '2023-11-25 12:52:27', '2023-11-19 04:59:31', '2023-11-25 12:52:27'),
(775, 'App\\Models\\User', 100, 'hydra-api-token', 'b9cb01038abc7d3d40ccb2a839207a3ae91689deeb5b2c57e14c5935c65d2aee', '[\"admin\"]', '2023-11-19 06:38:36', '2023-11-19 06:36:58', '2023-11-19 06:38:36'),
(776, 'App\\Models\\User', 102, 'hydra-api-token', 'd540f937ebc616cd1432c42b35c34424208c4f52eb620be199cf0406e9a9f7ac', '[\"user\"]', '2023-11-21 08:49:35', '2023-11-19 06:39:17', '2023-11-21 08:49:35'),
(777, 'App\\Models\\User', 81, 'hydra-api-token', 'efe86086a76716ac995c8a9c738fcc9612bd627175ebbb06db7dca98bbf5c5ac', '[\"user\"]', '2023-11-19 10:08:27', '2023-11-19 09:00:24', '2023-11-19 10:08:27'),
(778, 'App\\Models\\User', 105, 'hydra-api-token', 'fbc5a1b02d3454cfefa3a25e001dc6f988ebf53024b187a0c48757608183db58', '[\"user\"]', '2023-11-19 09:53:58', '2023-11-19 09:06:24', '2023-11-19 09:53:58'),
(779, 'App\\Models\\User', 81, 'hydra-api-token', 'f62126271da5df876211b8ca320547b428b7fd2d88a65a9184a731742dbfc37f', '[\"user\"]', NULL, '2023-11-19 09:32:59', '2023-11-19 09:32:59'),
(780, 'App\\Models\\User', 105, 'hydra-api-token', '2cccd8f862f9d270b98df11f8677672d8410a08d03c2bbdc15dd29260674607c', '[\"user\"]', '2023-11-19 10:09:06', '2023-11-19 10:08:58', '2023-11-19 10:09:06'),
(781, 'App\\Models\\User', 81, 'hydra-api-token', '62e8d3fe143f3a774e348bcb1dec2c31e19c2015d689cd7ba90ada2818ad7901', '[\"user\"]', '2023-11-19 10:14:47', '2023-11-19 10:09:31', '2023-11-19 10:14:47'),
(782, 'App\\Models\\User', 100, 'hydra-api-token', '019439e73aad4ecab86c4b8ea03d5153d9339ba9ad47324f0dd12816f3b7fd67', '[\"admin\"]', '2023-11-19 10:11:18', '2023-11-19 10:10:38', '2023-11-19 10:11:18'),
(783, 'App\\Models\\User', 95, 'hydra-api-token', '16e31cbc72a5f88a150770a4e72afd74e6b0afad4f8b717ade40c2eac38eb3f9', '[\"user\"]', '2023-11-19 10:14:57', '2023-11-19 10:12:43', '2023-11-19 10:14:57'),
(784, 'App\\Models\\User', 81, 'hydra-api-token', '2233f38f9e86da7f73db91898932820f8243cae347cf05b950f516a976f29f12', '[\"user\"]', '2023-11-19 10:16:09', '2023-11-19 10:15:16', '2023-11-19 10:16:09'),
(785, 'App\\Models\\User', 105, 'hydra-api-token', 'f51ab0ff84854ae57e7e191813d6d34ba89cbdd9d524f28a0a29df30837fb7f1', '[\"user\"]', '2023-11-19 10:18:36', '2023-11-19 10:16:17', '2023-11-19 10:18:36'),
(786, 'App\\Models\\User', 81, 'hydra-api-token', '9debcf53aba90383e48d00b97c4802284c8dbf7707a9d5e209680599a222a974', '[\"user\"]', '2023-11-19 10:39:49', '2023-11-19 10:19:09', '2023-11-19 10:39:49'),
(787, 'App\\Models\\User', 105, 'hydra-api-token', '07a0fd32c995b2cb1b2cdc2db2bd03bb800f860d60f3c5663a20a11022fa505e', '[\"user\"]', '2023-11-19 10:42:00', '2023-11-19 10:39:55', '2023-11-19 10:42:00'),
(788, 'App\\Models\\User', 95, 'hydra-api-token', '5f2628ee130b40999761b26ed94769aa7a46b4312626061fd6647745490ac3f0', '[\"user\"]', '2023-11-19 10:42:23', '2023-11-19 10:42:15', '2023-11-19 10:42:23'),
(789, 'App\\Models\\User', 100, 'hydra-api-token', 'a5b6f321dbe3bbd1662cb8511fe9c58ce8242a70b8c675873ca5277c5cdc0aa6', '[\"admin\"]', '2023-11-19 10:43:21', '2023-11-19 10:42:35', '2023-11-19 10:43:21'),
(790, 'App\\Models\\User', 100, 'hydra-api-token', 'd7a996887b84a984cdaa397d80f7aa62f83df654865d3df465c2f4fa633eba74', '[\"admin\"]', '2023-11-19 10:45:18', '2023-11-19 10:43:43', '2023-11-19 10:45:18'),
(791, 'App\\Models\\User', 95, 'hydra-api-token', 'd11c633cfb76ec7a1006a2ae4c1d02b97e9714b357978259c98f82ccde8ad1bd', '[\"user\"]', '2023-11-19 11:31:49', '2023-11-19 10:45:51', '2023-11-19 11:31:49'),
(792, 'App\\Models\\User', 105, 'hydra-api-token', '8c0bb7be80f41f0861afc62112f1881b317ef3ed0cdd133499c3545f026f494c', '[\"user\"]', '2023-11-20 11:46:51', '2023-11-19 10:59:40', '2023-11-20 11:46:51'),
(793, 'App\\Models\\User', 100, 'hydra-api-token', 'eb53502e359556ea78fd1c7b8fd468bff70ad297141f8145991e323b354ed7f7', '[\"admin\"]', '2023-11-19 11:37:38', '2023-11-19 11:34:23', '2023-11-19 11:37:38'),
(794, 'App\\Models\\User', 95, 'hydra-api-token', 'c00070b74a4c40a13b443ab7770f32a446093f1380b82c170f4a6814c6d7d717', '[\"user\"]', '2023-11-23 08:25:03', '2023-11-19 11:39:01', '2023-11-23 08:25:03'),
(795, 'App\\Models\\User', 95, 'hydra-api-token', '85972d9b05ebcc69025c4d17b3ca130701117e27a870e00370f6129cd39b5de9', '[\"user\"]', '2023-11-19 12:09:06', '2023-11-19 12:09:02', '2023-11-19 12:09:06'),
(796, 'App\\Models\\User', 95, 'hydra-api-token', '9a4dc2075018ed1eb75fd037c90e3ab58b075b460d5d6dac3913cd1bc19fb023', '[\"user\"]', '2023-11-20 00:55:54', '2023-11-20 00:53:20', '2023-11-20 00:55:54'),
(797, 'App\\Models\\User', 97, 'hydra-api-token', '726bfd0141c81e72b5a495e562e2dd3706ff4340ffa5355af1c79b5ba10f675c', '[\"user\"]', '2023-11-20 04:15:16', '2023-11-20 04:07:04', '2023-11-20 04:15:16'),
(798, 'App\\Models\\User', 85, 'hydra-api-token', '1032c7ca14b2ee93008a5f4020b1f2648de572af98cc13604e22bcc4719c5645', '[\"user\"]', '2023-11-20 04:13:40', '2023-11-20 04:13:31', '2023-11-20 04:13:40'),
(799, 'App\\Models\\User', 96, 'hydra-api-token', '20d654cbe665c19fb4150cb7fb2f025a7b2ebdac9afff5ed42a0f448f5110499', '[\"admin\"]', '2023-11-22 04:50:31', '2023-11-20 04:16:37', '2023-11-22 04:50:31'),
(800, 'App\\Models\\User', 97, 'hydra-api-token', '41981457ab826613b37cc15025de399da024912047669a33d980fd7ff9360b78', '[\"user\"]', '2023-11-20 06:49:46', '2023-11-20 04:17:24', '2023-11-20 06:49:46'),
(801, 'App\\Models\\User', 81, 'hydra-api-token', '9970fcd34b70ccbe215c376d0eb04fbfb21cf618896fb44c9c6e741bde4d8cbe', '[\"user\"]', '2023-11-30 06:44:42', '2023-11-20 04:22:32', '2023-11-30 06:44:42'),
(802, 'App\\Models\\User', 95, 'hydra-api-token', '66589c8c6dafe0a05c0a61dd91c63ba0888aaac71f022a6acbc2b22a57379796', '[\"user\"]', '2023-11-20 04:56:38', '2023-11-20 04:25:41', '2023-11-20 04:56:38'),
(803, 'App\\Models\\User', 95, 'hydra-api-token', 'ca7a3676d3dad4acf9fe7d4853c64192c190fd81a6a2893331a2933702df457f', '[\"user\"]', '2023-11-21 04:42:41', '2023-11-20 04:56:44', '2023-11-21 04:42:41'),
(804, 'App\\Models\\User', 81, 'hydra-api-token', 'a03aebd9f842f1c783298ccd46721008603be821fe025eaebb3d46112163713a', '[\"user\"]', '2023-11-20 05:10:54', '2023-11-20 05:05:37', '2023-11-20 05:10:54'),
(805, 'App\\Models\\User', 85, 'hydra-api-token', 'ba375553b26141a83873172a0fe26e0614f69c54ea12c0b2fbeabcad41ac5a6a', '[\"user\"]', '2023-11-20 05:21:41', '2023-11-20 05:21:34', '2023-11-20 05:21:41'),
(806, 'App\\Models\\User', 85, 'hydra-api-token', 'f2cbfd5cf32fbcc571a1cf06962ae252431447892755f7710f817a05b2119d29', '[\"user\"]', '2023-11-20 06:23:07', '2023-11-20 06:21:56', '2023-11-20 06:23:07'),
(807, 'App\\Models\\User', 102, 'hydra-api-token', '3d25fe5488bbeda44f18e2f0602216ab4e14ea9e1cc627904315a0a8a1e4156d', '[\"user\"]', '2023-11-20 06:23:43', '2023-11-20 06:23:40', '2023-11-20 06:23:43'),
(808, 'App\\Models\\User', 102, 'hydra-api-token', '131ce515d3a415a0fe230a36c4a3df951563fd71a6e253f2593afbd9af5d6137', '[\"user\"]', '2023-11-20 06:23:56', '2023-11-20 06:23:43', '2023-11-20 06:23:56'),
(809, 'App\\Models\\User', 102, 'hydra-api-token', 'f226fa4e0c3523e0040efc504b7541462117fa32e2211551df5f388dd43f0357', '[\"user\"]', '2023-11-20 08:56:38', '2023-11-20 06:52:00', '2023-11-20 08:56:38'),
(810, 'App\\Models\\User', 102, 'hydra-api-token', 'b7817738967102ba4f9e6966bc7a565e77cc1ff1f850db95200136861e1a7bf9', '[\"user\"]', '2023-11-20 06:52:12', '2023-11-20 06:52:08', '2023-11-20 06:52:12'),
(811, 'App\\Models\\User', 95, 'hydra-api-token', '6ec4c691288307693602b28f0aff63f9550ae0203e1f025650fe87c4bb570403', '[\"user\"]', '2023-11-20 09:58:50', '2023-11-20 08:49:04', '2023-11-20 09:58:50'),
(812, 'App\\Models\\User', 97, 'hydra-api-token', '44dfe0ab53ba221650c7e5ad7f2996b2cf71145d1284b82bdb7ab0cefe51fd6c', '[\"user\"]', '2023-11-20 08:58:08', '2023-11-20 08:58:04', '2023-11-20 08:58:08'),
(813, 'App\\Models\\User', 102, 'hydra-api-token', '731afa6c140330e7256fc87c5c6e640bacb7061b38beeef6f838827d4becf34c', '[\"user\"]', '2023-11-20 11:41:30', '2023-11-20 08:58:31', '2023-11-20 11:41:30'),
(814, 'App\\Models\\User', 105, 'hydra-api-token', '42aa6d4884094b3a109b611bedb4fa4a9d06e954d516923e44e53ffe31bc4052', '[\"user\"]', '2023-11-20 09:30:14', '2023-11-20 09:30:11', '2023-11-20 09:30:14'),
(815, 'App\\Models\\User', 81, 'hydra-api-token', '18ff5611ec3d406a83344acfb3f7d99dc2d4584027e546c36c9b424586204da7', '[\"user\"]', '2023-11-21 04:26:52', '2023-11-20 09:39:04', '2023-11-21 04:26:52');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(816, 'App\\Models\\User', 81, 'hydra-api-token', '9cc4750b08c49e36c04ee9ebf4840c69e12cf294eaf993bb6e70c5d63ffc4e65', '[\"user\"]', '2023-11-21 08:28:56', '2023-11-20 09:42:25', '2023-11-21 08:28:56'),
(817, 'App\\Models\\User', 95, 'hydra-api-token', 'e7cb3544315bd41d4827c6329000b8490314cff8389bfdc6949a25b92199288c', '[\"user\"]', '2023-11-21 08:36:27', '2023-11-20 11:47:23', '2023-11-21 08:36:27'),
(818, 'App\\Models\\User', 81, 'hydra-api-token', '44a7cb071ac28e4d875ce00f3b53a918ad4a824afa38dfb28c8e73c353121d66', '[\"user\"]', '2023-11-23 15:08:31', '2023-11-20 12:25:30', '2023-11-23 15:08:31'),
(819, 'App\\Models\\User', 102, 'hydra-api-token', '4977f9a8898a92431a197479fb40ba5dcbefdc586765c9915156c2804d024c08', '[\"user\"]', '2023-11-21 06:33:14', '2023-11-21 04:30:59', '2023-11-21 06:33:14'),
(820, 'App\\Models\\User', 102, 'hydra-api-token', '409d2f9c70e078d89991cc5b11c94fd3c485342615e9947ab568470768fab309', '[\"user\"]', '2023-11-21 05:57:55', '2023-11-21 04:31:23', '2023-11-21 05:57:55'),
(821, 'App\\Models\\User', 81, 'hydra-api-token', '6a9cd3e6538194a1b021f3378198804a83530cf45040ee4f8e4fbe86eccea485', '[\"user\"]', '2023-11-21 21:23:14', '2023-11-21 04:42:51', '2023-11-21 21:23:14'),
(822, 'App\\Models\\User', 102, 'hydra-api-token', '167e09033a67971f766f92f1df3bf85e7ecd5416c07ae0332f0699f4e60df63e', '[\"user\"]', '2023-11-23 06:46:38', '2023-11-21 04:56:42', '2023-11-23 06:46:38'),
(823, 'App\\Models\\User', 81, 'hydra-api-token', 'e311aa223924c45f35a77572c4076a61c10995cad860ab7e3cb06e4e76375846', '[\"user\"]', '2023-11-21 08:45:31', '2023-11-21 06:43:27', '2023-11-21 08:45:31'),
(824, 'App\\Models\\User', 81, 'hydra-api-token', 'ec270c0e684edabe68c4e247df8c9004167d665fe69326da4d9400bc25a053d2', '[\"user\"]', '2023-11-21 08:32:42', '2023-11-21 06:55:23', '2023-11-21 08:32:42'),
(825, 'App\\Models\\User', 81, 'hydra-api-token', '24bfd02ebcfdfd417559f3a4449366dc18c77821c768f9f795b82517dbc76943', '[\"user\"]', '2023-11-21 07:12:09', '2023-11-21 07:08:33', '2023-11-21 07:12:09'),
(826, 'App\\Models\\User', 81, 'hydra-api-token', '7b0b4d2cdbac13f6d2b837f3f0ecea9e58224016a65c545703c2195c15032326', '[\"user\"]', '2023-12-03 11:38:43', '2023-11-21 07:29:13', '2023-12-03 11:38:43'),
(827, 'App\\Models\\User', 95, 'hydra-api-token', '0da9e76bde85c36c3793cb529d5d88d4c9108fe4aa705fddb5e7b080349c9603', '[\"user\"]', '2023-11-21 08:33:43', '2023-11-21 08:29:09', '2023-11-21 08:33:43'),
(828, 'App\\Models\\User', 81, 'hydra-api-token', 'b5e1d94aadd7c34afd2800d5004044874fed59dd2cc6ee2cc0ac0dc3703b1f36', '[\"user\"]', '2023-11-21 08:33:04', '2023-11-21 08:32:33', '2023-11-21 08:33:04'),
(829, 'App\\Models\\User', 95, 'hydra-api-token', '07dad8e4d889208108694f154316041e72a361f3e16514d5105ba9da72d32de0', '[\"user\"]', '2023-11-26 10:16:00', '2023-11-21 08:34:03', '2023-11-26 10:16:00'),
(830, 'App\\Models\\User', 102, 'hydra-api-token', 'c57b0f9d64a237003d5a538e649f79c9e56b77b6335acbbbbeea38aa436c931d', '[\"user\"]', '2023-11-21 10:39:07', '2023-11-21 08:36:27', '2023-11-21 10:39:07'),
(831, 'App\\Models\\User', 81, 'hydra-api-token', '15190880712a1b2d7625e91ba4b6eb437e7e1727bd53165175da10749992272d', '[\"user\"]', '2023-11-21 08:36:44', '2023-11-21 08:36:42', '2023-11-21 08:36:44'),
(832, 'App\\Models\\User', 95, 'hydra-api-token', 'ba21dc3c1d40b5143c53a506c683b41d5dd5c7d3464561d94151f931dc41ef23', '[\"user\"]', '2023-11-21 08:39:12', '2023-11-21 08:37:01', '2023-11-21 08:39:12'),
(833, 'App\\Models\\User', 100, 'hydra-api-token', '3bd8bb6c8fdbfeae302e8b9df77802e6d1639ed5a85fe5fe67b487327633012f', '[\"admin\"]', '2023-11-21 08:41:41', '2023-11-21 08:38:05', '2023-11-21 08:41:41'),
(834, 'App\\Models\\User', 100, 'hydra-api-token', '723e0a978aa3368536d07ae24abd0304e7efec1b922b7b727b9f5de56cf43d24', '[\"admin\"]', '2023-11-21 08:41:39', '2023-11-21 08:39:57', '2023-11-21 08:41:39'),
(835, 'App\\Models\\User', 95, 'hydra-api-token', '33ce6e2510a84b2e972e141e5dc400408a2879caf10fb69b62bebe7cefec5e5e', '[\"user\"]', '2023-11-21 12:01:26', '2023-11-21 08:42:01', '2023-11-21 12:01:26'),
(836, 'App\\Models\\User', 95, 'hydra-api-token', 'cd0f22b7021a6af062e7204bf50d7d5afecdeb4d8b8d34d4281c9ac428d87324', '[\"user\"]', '2023-11-21 08:49:31', '2023-11-21 08:42:20', '2023-11-21 08:49:31'),
(837, 'App\\Models\\User', 100, 'hydra-api-token', '2a83147afc19547971b605a753047d4fe307cb02ce08d9a1ac6aab1b49ef616e', '[\"admin\"]', '2023-11-21 09:11:43', '2023-11-21 08:44:58', '2023-11-21 09:11:43'),
(838, 'App\\Models\\User', 102, 'hydra-api-token', '8666fc287ce98b4843c34e740b8052361ae1864e19cba7b7dbb052c6c1566840', '[\"user\"]', '2023-12-20 10:56:10', '2023-11-21 08:45:23', '2023-12-20 10:56:10'),
(839, 'App\\Models\\User', 100, 'hydra-api-token', 'ca468960c2697979cd906c50a815fc3d8a9c5b3dc2fe1a664b315b97c2374d68', '[\"admin\"]', '2023-11-21 08:47:41', '2023-11-21 08:47:31', '2023-11-21 08:47:41'),
(840, 'App\\Models\\User', 102, 'hydra-api-token', '1683fa6a36ca76a028778ae59d6d4218f6c4c0493e6c9036eb197c7c12d1bb82', '[\"user\"]', '2023-11-21 08:48:17', '2023-11-21 08:47:58', '2023-11-21 08:48:17'),
(841, 'App\\Models\\User', 100, 'hydra-api-token', 'f77b5ac31b31ad31fece81244de9f165189e4f366694089fc9d7345a72c15643', '[\"admin\"]', '2023-11-21 08:48:51', '2023-11-21 08:48:40', '2023-11-21 08:48:51'),
(842, 'App\\Models\\User', 103, 'hydra-api-token', '2c5f0c9a4f934245135bcac488b65681c2e691701c08e2c08f147f80e29eac1c', '[\"user\"]', '2023-11-21 08:51:36', '2023-11-21 08:51:35', '2023-11-21 08:51:36'),
(843, 'App\\Models\\User', 103, 'hydra-api-token', '63626c4e704cba221f9615163ddf4a34fe10b113edf217929ed467f1e61fb95c', '[\"user\"]', '2023-11-21 10:33:16', '2023-11-21 08:51:54', '2023-11-21 10:33:16'),
(844, 'App\\Models\\User', 100, 'hydra-api-token', '122244dbc47918d4990e53dfa9fd7b10605158fc88eae4f0c3f0bbe9b248e7d3', '[\"admin\"]', '2023-11-21 08:52:13', '2023-11-21 08:52:10', '2023-11-21 08:52:13'),
(845, 'App\\Models\\User', 103, 'hydra-api-token', '3a1f5fbe3daea4e25a615537f4a1eaee67990b69da26157fbb14abb0a5ac82bb', '[\"user\"]', '2023-11-23 08:59:30', '2023-11-21 08:52:55', '2023-11-23 08:59:30'),
(846, 'App\\Models\\User', 95, 'hydra-api-token', '2510238a7de3aade22d007b668794613e5362a8764c5f23efcbe4a97aae9391c', '[\"user\"]', '2023-11-21 09:28:52', '2023-11-21 08:55:21', '2023-11-21 09:28:52'),
(847, 'App\\Models\\User', 103, 'hydra-api-token', '572cfcc7d8d4c3a15452974e8e9c1f7820eb3ff472d9575e25bed71999ca4ebb', '[\"user\"]', '2023-11-22 12:23:17', '2023-11-21 08:59:17', '2023-11-22 12:23:17'),
(848, 'App\\Models\\User', 100, 'hydra-api-token', 'b8df379b5b54071d384e5a23659ba27a00b5a530432904061c2813d4ae7732fd', '[\"admin\"]', '2023-11-21 11:22:18', '2023-11-21 09:12:07', '2023-11-21 11:22:18'),
(849, 'App\\Models\\User', 81, 'hydra-api-token', 'b016061458d7c3f03fd8aabca4fd633571ef36a18fc37030cde62e57688e7563', '[\"user\"]', NULL, '2023-11-21 10:18:38', '2023-11-21 10:18:38'),
(850, 'App\\Models\\User', 102, 'hydra-api-token', '34c75b8041220c69b52b323d30617626251da4a82e43b1aa4b6cd567fd1d6a46', '[\"user\"]', '2023-11-21 10:34:06', '2023-11-21 10:33:47', '2023-11-21 10:34:06'),
(851, 'App\\Models\\User', 102, 'hydra-api-token', 'b953267c7cb71c368f0f6df0904e8a08d3b8f4d567817e7b7b6dcb4be005f5a4', '[\"user\"]', '2023-11-21 10:35:31', '2023-11-21 10:35:12', '2023-11-21 10:35:31'),
(852, 'App\\Models\\User', 85, 'hydra-api-token', 'd72bbccff294ee0283df963e6308220aca23f8866228634e9949972c6c70751e', '[\"user\"]', '2023-11-21 10:37:32', '2023-11-21 10:37:04', '2023-11-21 10:37:32'),
(853, 'App\\Models\\User', 81, 'hydra-api-token', '5bd7ffc91e33502ee55e940235db50b8a02ca885e2f991e7d3365e8df9120e82', '[\"user\"]', '2023-11-23 04:08:15', '2023-11-21 10:39:33', '2023-11-23 04:08:15'),
(854, 'App\\Models\\User', 102, 'hydra-api-token', '4f9df6f856808d68705c63b9d6dca71955f83a47e4f2ba0eaa80d758e29b3e83', '[\"user\"]', '2023-11-21 10:42:12', '2023-11-21 10:40:26', '2023-11-21 10:42:12'),
(856, 'App\\Models\\User', 100, 'hydra-api-token', '99744f828f42b09f5eb2915207de89fc7d15f5a62c329d965c9560e43970a6a6', '[\"admin\"]', '2023-11-21 10:45:38', '2023-11-21 10:43:46', '2023-11-21 10:45:38'),
(857, 'App\\Models\\User', 105, 'hydra-api-token', '4907d2f06699ad883274f556f9eb24d96f460276b82a157e1064881d6675f60c', '[\"user\"]', '2023-11-22 04:51:02', '2023-11-21 10:46:03', '2023-11-22 04:51:02'),
(858, 'App\\Models\\User', 105, 'hydra-api-token', 'e5071d3725cce7308ad6a9e2c5cbffcf97b2ba08544c1fddb931f982c1b75328', '[\"user\"]', '2023-11-21 12:34:50', '2023-11-21 11:23:36', '2023-11-21 12:34:50'),
(859, 'App\\Models\\User', 81, 'hydra-api-token', '0be6efbf8e125a4d9919e6fb0ce3f274e711abea581f51b2d55a61239fb2f4e4', '[\"user\"]', '2023-11-23 06:39:23', '2023-11-21 11:39:44', '2023-11-23 06:39:23'),
(860, 'App\\Models\\User', 85, 'hydra-api-token', '4b7fe2dc99b07810ce86b0d62e9ba779bef1b01a70b979326d628050918cd386', '[\"user\"]', '2023-11-21 12:35:20', '2023-11-21 12:02:42', '2023-11-21 12:35:20'),
(861, 'App\\Models\\User', 105, 'hydra-api-token', 'bf3a3d5b22b3c6b9748527e26d3ef191a1b5af9ce612ed8a0f9ed078a527fdad', '[\"user\"]', '2023-11-24 20:18:17', '2023-11-21 12:35:32', '2023-11-24 20:18:17'),
(862, 'App\\Models\\User', 105, 'hydra-api-token', '34659846488ded3b2ccb4d3210a3fbbea9739acff4738e813122e874a33ce4dd', '[\"user\"]', '2023-11-27 04:39:53', '2023-11-21 21:23:26', '2023-11-27 04:39:53'),
(863, 'App\\Models\\User', 81, 'hydra-api-token', 'b5632bf84703f2088ec7fe7be13ab20bda6a48cdb4ac6b11a517590e690d7597', '[\"user\"]', NULL, '2023-11-22 02:20:12', '2023-11-22 02:20:12'),
(864, 'App\\Models\\User', 81, 'hydra-api-token', '701ef5ee6779904cd4ccd19069b0aeada5c6265ea1412d007f9ee7a4e0d1f201', '[\"user\"]', NULL, '2023-11-22 02:22:35', '2023-11-22 02:22:35'),
(865, 'App\\Models\\User', 81, 'hydra-api-token', 'dcc282bf887e75fefbeaf3c80d535feb5fff36f7a0316fba7e631c0ad5d3000e', '[\"user\"]', NULL, '2023-11-22 02:24:13', '2023-11-22 02:24:13'),
(866, 'App\\Models\\User', 102, 'hydra-api-token', '094b68e88203e367727d682b7236cb94e8c483309e57e03622face785624f062', '[\"user\"]', '2023-11-23 05:55:26', '2023-11-22 04:51:27', '2023-11-23 05:55:26'),
(867, 'App\\Models\\User', 81, 'hydra-api-token', 'f3b5299a160e7a46d742844b78676e69340fc87e08d326f1c62d484132248cae', '[\"user\"]', '2023-11-23 04:53:28', '2023-11-22 05:22:48', '2023-11-23 04:53:28'),
(868, 'App\\Models\\User', 81, 'hydra-api-token', '1fdc6c17ef39f0a244c751a5196d63c28036bc89eb5df05db2408220157d7f45', '[\"user\"]', NULL, '2023-11-22 10:00:43', '2023-11-22 10:00:43'),
(869, 'App\\Models\\User', 85, 'hydra-api-token', '803e927d906d310ea70292c9fde0b1bca418befd209702a202222c4d29964346', '[\"user\"]', NULL, '2023-11-22 11:36:37', '2023-11-22 11:36:37'),
(870, 'App\\Models\\User', 85, 'hydra-api-token', 'ca0c01922dc9f43ac562cf2983a75c39dd9297ff93f8a03a0c48c7c323f4d166', '[\"user\"]', '2023-11-22 11:40:36', '2023-11-22 11:36:37', '2023-11-22 11:40:36'),
(871, 'App\\Models\\User', 100, 'hydra-api-token', 'ff1c5e7e8f8fe02cb7ead1b8b0077bf108bf63fcef508b975376b6a0f323d2a8', '[\"admin\"]', '2023-11-22 11:41:22', '2023-11-22 11:40:54', '2023-11-22 11:41:22'),
(872, 'App\\Models\\User', 103, 'hydra-api-token', '57091ca418735f56199ef17c21c7260d60f102357df575a6f20e610b15d83653', '[\"user\"]', '2023-11-22 12:00:23', '2023-11-22 11:41:56', '2023-11-22 12:00:23'),
(873, 'App\\Models\\User', 81, 'hydra-api-token', '90508d2cbc49b2737e7a18f44063afe6be70e48975b2877a8ccf78a5312a07e2', '[\"user\"]', '2023-11-23 09:56:01', '2023-11-22 12:23:26', '2023-11-23 09:56:01'),
(874, 'App\\Models\\User', 95, 'hydra-api-token', '65a9fe357ea77c96d04e7cdc27cf2dc7a8a23bde7e711dc79f87e4c3530c1dd9', '[\"user\"]', '2023-12-06 05:16:00', '2023-11-22 13:09:38', '2023-12-06 05:16:00'),
(875, 'App\\Models\\User', 103, 'hydra-api-token', 'ef5db7c386dca4c105b2c8dbdfae080adca4df14954713958b31bec9d797ee29', '[\"user\"]', '2023-11-26 05:18:49', '2023-11-22 13:39:15', '2023-11-26 05:18:49'),
(876, 'App\\Models\\User', 81, 'hydra-api-token', 'bd7d2a67ea481621082559ca682bd0ad63d319bcaecf74531561c9f93609db33', '[\"user\"]', NULL, '2023-11-22 14:18:28', '2023-11-22 14:18:28'),
(877, 'App\\Models\\User', 81, 'hydra-api-token', 'cc2b2ac5ca2b1c884b06df3ffce676529a9d9090216fd1447f60defdc78865db', '[\"user\"]', NULL, '2023-11-22 14:30:47', '2023-11-22 14:30:47'),
(878, 'App\\Models\\User', 81, 'hydra-api-token', 'fa1c5f4364554fcb76c096c3b2c207352c82131079e8640094fc153ce05c62d2', '[\"user\"]', NULL, '2023-11-22 14:56:03', '2023-11-22 14:56:03'),
(879, 'App\\Models\\User', 81, 'hydra-api-token', '06abdb96369e4ee097ffb4870716bcd00ad129c273d815420e8289db6579324d', '[\"user\"]', NULL, '2023-11-22 15:04:10', '2023-11-22 15:04:10'),
(880, 'App\\Models\\User', 81, 'hydra-api-token', '00645233762472af334b8b8d0e0cb165de0e4e5b7093bab70e02e02ebd1455b0', '[\"user\"]', NULL, '2023-11-22 15:05:08', '2023-11-22 15:05:08'),
(881, 'App\\Models\\User', 81, 'hydra-api-token', 'ef0a060ab239cb6525c955ecb24023a940cb2aff6da2e6001f62bf3e443c73d4', '[\"user\"]', NULL, '2023-11-22 16:09:03', '2023-11-22 16:09:03'),
(882, 'App\\Models\\User', 81, 'hydra-api-token', 'fd27b6bc743a0ae5fb66b384fa08c79a193a442d2bc38cfb4af0b3d6042b264b', '[\"user\"]', NULL, '2023-11-22 16:10:57', '2023-11-22 16:10:57'),
(883, 'App\\Models\\User', 102, 'hydra-api-token', 'ff30bc416ed9fb356aa6c6408db648be346f3768106e0dd3fa0cce6b69d1209f', '[\"user\"]', '2023-11-23 06:43:21', '2023-11-23 04:09:18', '2023-11-23 06:43:21'),
(884, 'App\\Models\\User', 102, 'hydra-api-token', '63753b939788fff7a25956d65329b7b1ba09ae6599ce230357ebc704f9d2b51f', '[\"user\"]', '2023-11-23 04:17:19', '2023-11-23 04:16:37', '2023-11-23 04:17:19'),
(885, 'App\\Models\\User', 100, 'hydra-api-token', '239382e74611fb40a944549aa2196bc14138d43e0ee0fc18e3ad6beedf6e769d', '[\"admin\"]', '2023-11-23 05:57:33', '2023-11-23 05:57:09', '2023-11-23 05:57:33'),
(886, 'App\\Models\\User', 102, 'hydra-api-token', '5fb96c61f502527e4f1826b55c0014dc73f0864750b8874007e8bc1033c0876f', '[\"user\"]', '2023-11-27 11:00:13', '2023-11-23 05:58:01', '2023-11-27 11:00:13'),
(887, 'App\\Models\\User', 81, 'hydra-api-token', 'c9c83e2b40086fd586efe8e182824bd932177b236c814a65a529ed833f0d0437', '[\"user\"]', '2023-11-23 06:50:50', '2023-11-23 05:59:51', '2023-11-23 06:50:50'),
(888, 'App\\Models\\User', 102, 'hydra-api-token', 'a1dec63bd941c67bed312fea73c59894c1a1986b07215ce8f3288052fb497d1b', '[\"user\"]', '2023-11-23 06:46:35', '2023-11-23 06:41:04', '2023-11-23 06:46:35'),
(889, 'App\\Models\\User', 102, 'hydra-api-token', 'aef1b7c4071f3aa5ac41fe55172ddab73b94414010960bce42898ddc53d57572', '[\"user\"]', '2023-11-23 12:09:46', '2023-11-23 06:44:14', '2023-11-23 12:09:46'),
(890, 'App\\Models\\User', 102, 'hydra-api-token', '296243a8204b81bee0aa2af24ddcc59ccac9e7d2e242f5097f8f092a638ddc96', '[\"user\"]', '2023-11-23 07:21:51', '2023-11-23 06:46:55', '2023-11-23 07:21:51'),
(891, 'App\\Models\\User', 102, 'hydra-api-token', 'aa5480211ac1c8d4ad277d8256eb21e2860e1880a49b10b6f66b29c4689566f5', '[\"user\"]', '2023-11-23 12:17:09', '2023-11-23 06:51:32', '2023-11-23 12:17:09'),
(892, 'App\\Models\\User', 102, 'hydra-api-token', '0b44643bf0fa95fb8ea8e78e995e3839e75bff2a583ffcd6ab1be2bacd5ee4a3', '[\"user\"]', NULL, '2023-11-23 07:01:04', '2023-11-23 07:01:04'),
(893, 'App\\Models\\User', 102, 'hydra-api-token', 'eb0f1bf0df2d54ca4ca2503cbf399a29792fb07a1f9e177343820aa27b70e056', '[\"user\"]', NULL, '2023-11-23 07:01:06', '2023-11-23 07:01:06'),
(894, 'App\\Models\\User', 102, 'hydra-api-token', '48e6dcb4e8bd0f95324b87bc7089e955ae5049edcad7a51936e2e78af1ec2ca1', '[\"user\"]', NULL, '2023-11-23 07:01:08', '2023-11-23 07:01:08'),
(895, 'App\\Models\\User', 102, 'hydra-api-token', '4ba4b5753432a4a1f1ff853b86f1464474e9987a75c0f3749c925852e9d40f2b', '[\"user\"]', NULL, '2023-11-23 07:13:13', '2023-11-23 07:13:13'),
(896, 'App\\Models\\User', 102, 'hydra-api-token', '5ff1e90c9e5c594e4fa3e64b38af5d3ae9f6e8e213e0a32bd03c35bd9dd26b02', '[\"user\"]', NULL, '2023-11-23 07:13:14', '2023-11-23 07:13:14'),
(897, 'App\\Models\\User', 105, 'hydra-api-token', 'd511fe85eccd522595afa72ea8d1b30f9dfc9fb5c8a0fbe4a159f63e749af3e7', '[\"user\"]', '2023-11-25 04:49:38', '2023-11-23 08:26:22', '2023-11-25 04:49:38'),
(898, 'App\\Models\\User', 81, 'hydra-api-token', 'e22719021b581d048981fe8e250cb585878bdfbb8f08a4a3b2096749469edcbf', '[\"user\"]', '2023-11-23 13:33:43', '2023-11-23 09:27:55', '2023-11-23 13:33:43'),
(899, 'App\\Models\\User', 81, 'hydra-api-token', '15808458685f160ee75870ceb83c8be80b694d2fceb85f15d9f6545df5a65310', '[\"user\"]', '2023-11-23 09:39:22', '2023-11-23 09:36:23', '2023-11-23 09:39:22'),
(900, 'App\\Models\\User', 102, 'hydra-api-token', 'bab4351149a326c7fecec9e00f5e95c6b971f7b8b4aed6319ffe8eba3c77cc79', '[\"user\"]', '2023-11-29 09:40:42', '2023-11-23 09:56:51', '2023-11-29 09:40:42'),
(901, 'App\\Models\\User', 102, 'hydra-api-token', '11a203058eaab2611afd26522b654de6d5fef1ef19cb3b18d760fddf6e292d53', '[\"user\"]', '2023-11-29 09:51:35', '2023-11-23 10:48:34', '2023-11-29 09:51:35'),
(902, 'App\\Models\\User', 100, 'hydra-api-token', '6f8243b603829a523de063f7691b80ec84057e7cbf94cd42d1dff968ed5ad274', '[\"admin\"]', '2023-11-25 13:15:02', '2023-11-23 11:52:00', '2023-11-25 13:15:02'),
(903, 'App\\Models\\User', 102, 'hydra-api-token', 'f1c155f0f381b01735f56ca043a43942ed5d9525d3ce032ba011b65c3fc578dc', '[\"user\"]', '2023-11-23 12:31:39', '2023-11-23 12:11:10', '2023-11-23 12:31:39'),
(904, 'App\\Models\\User', 102, 'hydra-api-token', 'e7d1c0136c23bd459558e589e94ea5f1067bd874c3813b36808cca95d294cdbc', '[\"user\"]', '2023-11-25 10:48:12', '2023-11-23 12:14:26', '2023-11-25 10:48:12'),
(905, 'App\\Models\\User', 102, 'hydra-api-token', '13af5ce8275bc78c5d6e6866d304e80cb6a509ec1c1e42a976dbef6996c67777', '[\"user\"]', NULL, '2023-11-23 12:14:27', '2023-11-23 12:14:27'),
(906, 'App\\Models\\User', 102, 'hydra-api-token', '51f7621c27183ecc1bffa9d56e2ea9af61636eb85781cfd0e2359b4af34da75d', '[\"user\"]', '2023-11-26 10:49:32', '2023-11-23 12:15:32', '2023-11-26 10:49:32'),
(907, 'App\\Models\\User', 103, 'hydra-api-token', '48d68ce6eba319addadf98a95e4f0bb63e259f8cc3fbb5b0727a994500f71e61', '[\"user\"]', '2023-11-30 19:03:59', '2023-11-23 21:14:23', '2023-11-30 19:03:59'),
(908, 'App\\Models\\User', 103, 'hydra-api-token', '7c75f016a34c51394b16b1e4494da296d9db3a4623fffaa11880f5c531546cd0', '[\"user\"]', '2023-11-24 17:29:41', '2023-11-23 21:32:39', '2023-11-24 17:29:41'),
(909, 'App\\Models\\User', 81, 'hydra-api-token', '98196d51f297884a00a35b45b46e6327a3530d145a9a38d7b5e477b43fb35117', '[\"user\"]', '2023-11-24 20:19:17', '2023-11-24 20:18:38', '2023-11-24 20:19:17'),
(910, 'App\\Models\\User', 95, 'hydra-api-token', 'd75fe2c4996eff3437b12b1e40413b593ad49dfdea4c35760aa5b69fe8495202', '[\"user\"]', '2023-11-25 04:47:42', '2023-11-24 20:19:34', '2023-11-25 04:47:42'),
(911, 'App\\Models\\User', 102, 'hydra-api-token', 'fa3ec6197d03b2965a52623bfb1c33f4411090e3565e09ace7c56a8e9332029c', '[\"user\"]', '2023-11-25 08:41:35', '2023-11-25 04:15:17', '2023-11-25 08:41:35'),
(912, 'App\\Models\\User', 81, 'hydra-api-token', 'c1f024cd4d3bc0ba54d1021ab08c0a708efc4ee0b5855b4c5410bafc5b82fb3c', '[\"user\"]', '2023-11-25 05:01:15', '2023-11-25 04:47:58', '2023-11-25 05:01:15'),
(913, 'App\\Models\\User', 81, 'hydra-api-token', 'e1e267a77c62f9d800b993158f2dbc53cd20d1a133017ebefad31b56e2f0b43f', '[\"user\"]', '2023-11-25 04:56:11', '2023-11-25 04:50:00', '2023-11-25 04:56:11'),
(914, 'App\\Models\\User', 105, 'hydra-api-token', '49d72d948c02ac63c69663b83970c5276b655332da911905e2d60019c848f83c', '[\"user\"]', '2023-11-25 10:38:26', '2023-11-25 04:55:14', '2023-11-25 10:38:26'),
(915, 'App\\Models\\User', 105, 'hydra-api-token', '537e8c1dae94d6bc3f3261eb3332a29d6c6460cf1f7c05d19ca359fb0c6abd94', '[\"user\"]', '2023-11-26 00:37:13', '2023-11-25 04:57:01', '2023-11-26 00:37:13'),
(916, 'App\\Models\\User', 104, 'hydra-api-token', '3dd12b2b0a5e99e61776d090bb3c8dc4240fa8f07eb528e0d5e2e325303a4929', '[\"user\"]', '2023-11-25 06:50:33', '2023-11-25 06:49:46', '2023-11-25 06:50:33'),
(917, 'App\\Models\\User', 100, 'hydra-api-token', '88202f75af924f8f63314c19d99a2ebd2d61fae307aa1dc375e997ad7ccd327a', '[\"admin\"]', '2023-11-25 07:04:40', '2023-11-25 06:53:21', '2023-11-25 07:04:40'),
(918, 'App\\Models\\User', 107, 'hydra-api-token', 'ea86d09dc834f48231570aca77846addf126f3bbfa4ba9af7777360c4bfa503c', '[\"user\"]', '2023-11-25 07:09:51', '2023-11-25 07:05:08', '2023-11-25 07:09:51'),
(919, 'App\\Models\\User', 100, 'hydra-api-token', '9524858afc568571644d4f3af574c90fb434889c319e9419cf13c47770fb47b4', '[\"admin\"]', '2023-11-25 07:11:01', '2023-11-25 07:10:27', '2023-11-25 07:11:01'),
(920, 'App\\Models\\User', 107, 'hydra-api-token', '1a480bbc6e92c8abcc448e70e7f8c53422ee8de9e19cf8ca6bb6e339b36d6906', '[\"user\"]', '2023-11-25 07:13:10', '2023-11-25 07:11:20', '2023-11-25 07:13:10'),
(921, 'App\\Models\\User', 103, 'hydra-api-token', 'b863de3e5e99bf6e818426a731d18e7277deb75865834dc1470a4e9be0e5ccaf', '[\"user\"]', '2023-11-25 07:17:56', '2023-11-25 07:17:43', '2023-11-25 07:17:56'),
(922, 'App\\Models\\User', 107, 'hydra-api-token', '7b34a776a4615da641f832cb0aa82ebce143951d96594f1e05bef94a23b7e51b', '[\"user\"]', '2023-11-25 07:18:14', '2023-11-25 07:18:06', '2023-11-25 07:18:14'),
(923, 'App\\Models\\User', 85, 'hydra-api-token', 'cd819f897802a43db1c701ca5f057446d5a9161b29fa15e986f77ba215ea6db7', '[\"user\"]', '2023-11-25 07:23:09', '2023-11-25 07:18:37', '2023-11-25 07:23:09'),
(924, 'App\\Models\\User', 103, 'hydra-api-token', '27d38f9368fd02c96e5fc1a3bf9f61ce2e41d92c3f44dd13a876143692ebe51f', '[\"user\"]', '2023-11-25 09:51:01', '2023-11-25 07:30:56', '2023-11-25 09:51:01'),
(925, 'App\\Models\\User', 81, 'hydra-api-token', 'a299f97f2e5d695996bda03e07054192eb5293eaf687462f307dd8d5e101cfa5', '[\"user\"]', '2023-12-20 09:15:22', '2023-11-25 08:25:48', '2023-12-20 09:15:22'),
(926, 'App\\Models\\User', 107, 'hydra-api-token', 'b0f3209a2bef27d20e8fcafa8bb9d39ce69670a811c8860846cac49d331f5d3c', '[\"user\"]', '2023-11-25 10:52:31', '2023-11-25 09:27:35', '2023-11-25 10:52:31'),
(927, 'App\\Models\\User', 107, 'hydra-api-token', '520b68ec4a7a723a0a4e507cf0052ac50fed2cc31c4a5efb22fda1948d5a1f1d', '[\"user\"]', '2023-11-25 11:22:55', '2023-11-25 09:57:59', '2023-11-25 11:22:55'),
(928, 'App\\Models\\User', 102, 'hydra-api-token', '2d4299d4e7129910da31d4304d87f8dd33d346e00fc004b651ac4291fb0399f6', '[\"user\"]', '2023-11-28 12:36:02', '2023-11-25 10:01:29', '2023-11-28 12:36:02'),
(929, 'App\\Models\\User', 107, 'hydra-api-token', '273ec52ee4d898c22549af692a577913dbcc88ff7b104cfd030ab7b030db9cef', '[\"user\"]', '2023-11-25 10:21:43', '2023-11-25 10:07:11', '2023-11-25 10:21:43'),
(930, 'App\\Models\\User', 107, 'hydra-api-token', 'db1c7f2f5029b90f3ce145b7c986075f597d7760c6f55df20bc724ce1d0cfe14', '[\"user\"]', '2023-11-25 10:21:58', '2023-11-25 10:21:50', '2023-11-25 10:21:58'),
(931, 'App\\Models\\User', 107, 'hydra-api-token', '3a9cc48ebd8d2b9a1f33cbb025b9404349c45aefefb6cca73a2f136a87b41d92', '[\"user\"]', '2023-11-25 13:00:03', '2023-11-25 10:23:48', '2023-11-25 13:00:03'),
(932, 'App\\Models\\User', 81, 'hydra-api-token', 'f77ca6250ec25c86dda2b70632c7fdb7171b8fa276498abaffad0f1365e0e9ad', '[\"user\"]', '2023-11-26 08:19:33', '2023-11-25 10:29:16', '2023-11-26 08:19:33'),
(933, 'App\\Models\\User', 107, 'hydra-api-token', '05f5d1cce7c02bd8375877eb06fc9f74acd895da1c1a393c4d10a636a3200450', '[\"user\"]', '2023-12-10 12:52:08', '2023-11-25 10:36:12', '2023-12-10 12:52:08'),
(934, 'App\\Models\\User', 102, 'hydra-api-token', '2cc49e42b46ba894902f17d7edd9cdd6a4148e7b268bf59d466807d279c54e6b', '[\"user\"]', '2023-11-25 10:49:20', '2023-11-25 10:48:34', '2023-11-25 10:49:20'),
(935, 'App\\Models\\User', 102, 'hydra-api-token', 'f57ff71e7700a286f0d3e48e1441d41ae8662c249c2ba4a42e7d9d8121a0894b', '[\"user\"]', '2023-11-25 10:53:49', '2023-11-25 10:49:26', '2023-11-25 10:53:49'),
(936, 'App\\Models\\User', 102, 'hydra-api-token', '8a24ec6b191cb85b5f5e2fadf9579323a1204ad21074411717622086490d2d61', '[\"user\"]', '2023-11-25 11:57:17', '2023-11-25 10:50:03', '2023-11-25 11:57:17'),
(937, 'App\\Models\\User', 102, 'hydra-api-token', 'f282d8fa9b304bbabd5fcaf05ea607b6164149f55adb61adfe9ada9062a23f42', '[\"user\"]', '2023-11-25 11:00:17', '2023-11-25 10:53:54', '2023-11-25 11:00:17'),
(938, 'App\\Models\\User', 102, 'hydra-api-token', '0c0d3c508171c1d36dc31b4059dd555d45a9fa048f861433a4f4f5c2c9207cf3', '[\"user\"]', '2023-11-29 10:18:27', '2023-11-25 10:54:54', '2023-11-29 10:18:27'),
(939, 'App\\Models\\User', 102, 'hydra-api-token', '216efbef182458a210486a1f80fa16cbcb79836a77c5b61c220ebc1316789069', '[\"user\"]', '2023-11-25 11:00:25', '2023-11-25 11:00:22', '2023-11-25 11:00:25'),
(940, 'App\\Models\\User', 102, 'hydra-api-token', '79c150d37df4fd6a24bd8b05bfcc102b8d9649873481b9b739c6eed070ee3c93', '[\"user\"]', '2023-11-25 11:09:28', '2023-11-25 11:03:35', '2023-11-25 11:09:28'),
(941, 'App\\Models\\User', 102, 'hydra-api-token', '11be6fdb5efe61d0b71b1ad6c75c75e97e42b1a74baebc6bbea4d604c727c49a', '[\"user\"]', '2024-01-04 05:51:20', '2023-11-25 11:08:53', '2024-01-04 05:51:20'),
(942, 'App\\Models\\User', 105, 'hydra-api-token', '2e6d6bdc34875dce3752d12b2ab0028390705c6267331689e42d21733498483f', '[\"user\"]', '2023-11-26 10:08:41', '2023-11-25 11:59:40', '2023-11-26 10:08:41'),
(943, 'App\\Models\\User', 100, 'hydra-api-token', '66f367afd73c6feebe512a0b70082cc73c4edba39e3aaa19d977fdd5d4b1f0f9', '[\"admin\"]', '2023-11-27 10:38:01', '2023-11-25 12:57:36', '2023-11-27 10:38:01'),
(944, 'App\\Models\\User', 102, 'hydra-api-token', '1d44d28ee0961e3cd72e37fd902e2e0b694562f512739f6e17b2adbd2ae2682b', '[\"user\"]', '2023-12-11 07:44:17', '2023-11-25 13:16:13', '2023-12-11 07:44:17'),
(945, 'App\\Models\\User', 81, 'hydra-api-token', 'c1260f29fd491db43fe92982547bdb689c9affdb6dd1a83313a30f9d0b801fe2', '[\"user\"]', '2023-11-28 19:15:01', '2023-11-25 18:42:54', '2023-11-28 19:15:01'),
(946, 'App\\Models\\User', 95, 'hydra-api-token', '17daf14b1d239318a125d31f2c0096a6746910cbcdce34a1422e49af5d063a9d', '[\"user\"]', '2023-11-26 00:37:48', '2023-11-26 00:37:35', '2023-11-26 00:37:48'),
(947, 'App\\Models\\User', 81, 'hydra-api-token', '4dce12667033d3eb7658dfeb76e37b476c9653797e8fb86448642ec12de06c16', '[\"user\"]', '2023-11-26 00:41:50', '2023-11-26 00:38:15', '2023-11-26 00:41:50'),
(948, 'App\\Models\\User', 105, 'hydra-api-token', '6305c501d2e174e80bc8510fb18716aa7ccf5a13d4a486fcc1676fbc883909eb', '[\"user\"]', '2023-11-26 01:08:05', '2023-11-26 00:42:03', '2023-11-26 01:08:05'),
(949, 'App\\Models\\User', 95, 'hydra-api-token', 'c4471cfa32a3853340480106ee5eb44333ee318b44b2d3b0dab84b3bcd091bbd', '[\"user\"]', NULL, '2023-11-26 01:08:24', '2023-11-26 01:08:24'),
(950, 'App\\Models\\User', 95, 'hydra-api-token', '1bcb01c9d7ce09fd6757bfe6ddeafd8c953b3cb8b4c35897746045c9e7ed7aa2', '[\"user\"]', '2023-11-26 01:08:38', '2023-11-26 01:08:25', '2023-11-26 01:08:38'),
(951, 'App\\Models\\User', 81, 'hydra-api-token', 'd15ed260438cab62c38fad4317ee8ad0afdb4e54b9692f128d68e87509d8990c', '[\"user\"]', '2023-11-26 01:09:18', '2023-11-26 01:09:01', '2023-11-26 01:09:18'),
(952, 'App\\Models\\User', 105, 'hydra-api-token', '9a6d6313ccc6c129ed4858aff9cde13a75a28c998c3afbd53ed3932486051300', '[\"user\"]', '2023-11-26 01:20:38', '2023-11-26 01:11:20', '2023-11-26 01:20:38'),
(953, 'App\\Models\\User', 81, 'hydra-api-token', 'a40dff60fff2a4e0f8505a905ee2025d78c1795283379486db5a4fce95f900a6', '[\"user\"]', '2023-11-26 01:23:47', '2023-11-26 01:21:00', '2023-11-26 01:23:47'),
(954, 'App\\Models\\User', 105, 'hydra-api-token', 'fa7b92ada3f0beca887e8019266d3ac91efb02c3e012ae04a58f2d035f03b76e', '[\"user\"]', '2023-11-27 07:47:40', '2023-11-26 01:24:22', '2023-11-27 07:47:40'),
(955, 'App\\Models\\User', 102, 'hydra-api-token', '4107dcf3c27543d6d97928eed256a79f085b437f2c1b0dd74eb604e4a75a24d3', '[\"user\"]', '2023-11-26 04:13:33', '2023-11-26 04:12:25', '2023-11-26 04:13:33'),
(956, 'App\\Models\\User', 102, 'hydra-api-token', '8e8d5c9f24e51f94c0d46ab3b9ee6d8bad968e5ac973503d3a6be2d0f07c8adc', '[\"user\"]', '2023-11-26 08:38:25', '2023-11-26 04:13:39', '2023-11-26 08:38:25'),
(957, 'App\\Models\\User', 105, 'hydra-api-token', '4482dd429c7576a8610949cc63153984cb5386f0cfd162d7e39fc1d75ad4a58a', '[\"user\"]', '2023-12-13 04:10:39', '2023-11-26 04:27:06', '2023-12-13 04:10:39'),
(958, 'App\\Models\\User', 100, 'hydra-api-token', '4426ce467dc66a95de09b503a07cd16f9eb1a4b244e75a1a34efc42258cbaf33', '[\"admin\"]', '2023-11-26 05:23:44', '2023-11-26 05:19:41', '2023-11-26 05:23:44'),
(959, 'App\\Models\\User', 102, 'hydra-api-token', 'ecb485ca457c25d918f1ae9222c0f8acae84f4001e9ea6d5a1e7fe002cfb47e7', '[\"user\"]', '2023-11-27 06:04:07', '2023-11-26 05:25:10', '2023-11-27 06:04:07'),
(960, 'App\\Models\\User', 107, 'hydra-api-token', 'f668245274be69d932b08e4ac6d2e46f4c44016a20fff0bf51e9031b6ba6125a', '[\"user\"]', '2023-11-26 07:49:00', '2023-11-26 07:47:12', '2023-11-26 07:49:00'),
(961, 'App\\Models\\User', 102, 'hydra-api-token', 'cf3b4c750c08d208d67d878dfffedb7b99018c5e82dfbdaf5c8de0809b8f6656', '[\"user\"]', '2023-11-26 10:23:18', '2023-11-26 08:38:33', '2023-11-26 10:23:18'),
(962, 'App\\Models\\User', 102, 'hydra-api-token', '7864a564be67a7c4840a7c1e771385c781c2cbb29307e56b028ca3ab3cdde47b', '[\"user\"]', '2023-11-26 08:58:51', '2023-11-26 08:58:31', '2023-11-26 08:58:51'),
(963, 'App\\Models\\User', 85, 'hydra-api-token', '627dca1013fbfad569ef6f355ffb9f20254c68b5615d08c16aa1780f542ff92d', '[\"user\"]', '2023-12-03 02:06:31', '2023-11-26 09:04:06', '2023-12-03 02:06:31'),
(964, 'App\\Models\\User', 107, 'hydra-api-token', 'd1fa6b7275f5085a23a294710a7302d3d33e0bbe8d3ea6a332f68bcc88aa6310', '[\"user\"]', '2023-11-26 09:59:16', '2023-11-26 09:58:41', '2023-11-26 09:59:16'),
(965, 'App\\Models\\User', 103, 'hydra-api-token', 'b24bbeb63a73989cea89f96588447a494d33bcd7a9405671cba27469fa7c868c', '[\"user\"]', '2023-11-26 10:01:05', '2023-11-26 09:59:45', '2023-11-26 10:01:05'),
(966, 'App\\Models\\User', 102, 'hydra-api-token', '8f5c84ef2295c14832b874b31eae2a0fe8c2ae9ba58175cbfcbe16f676bb0d6c', '[\"user\"]', '2023-11-26 10:02:00', '2023-11-26 10:01:26', '2023-11-26 10:02:00'),
(967, 'App\\Models\\User', 100, 'hydra-api-token', '555d08c30352e0638bfc66d7261eee05312174310272d1826ecc3ff246a4a48a', '[\"admin\"]', '2023-11-27 05:58:06', '2023-11-26 10:02:43', '2023-11-27 05:58:06'),
(968, 'App\\Models\\User', 105, 'hydra-api-token', 'd8575559d8c42d160e70e43dfea3ce44d150373439802eca0bda268e4052770c', '[\"user\"]', '2023-11-26 10:17:34', '2023-11-26 10:16:11', '2023-11-26 10:17:34'),
(969, 'App\\Models\\User', 81, 'hydra-api-token', '5f18ce073880e06d0233aaf31bb5963fd3fddff25c97405fd9f898d8965f576c', '[\"user\"]', '2023-11-26 10:17:58', '2023-11-26 10:17:48', '2023-11-26 10:17:58'),
(970, 'App\\Models\\User', 95, 'hydra-api-token', 'c1075add5d0cb9dc1458ff6884f4af29a1cf9548b588e95d4b94cd0aaae0fce1', '[\"user\"]', '2023-11-26 10:19:01', '2023-11-26 10:18:30', '2023-11-26 10:19:01'),
(971, 'App\\Models\\User', 105, 'hydra-api-token', '4fc3938e86aca1807e38c32f830876de30a76c1da0288ab389fb988a9220b867', '[\"user\"]', '2023-11-26 10:23:38', '2023-11-26 10:19:27', '2023-11-26 10:23:38'),
(972, 'App\\Models\\User', 95, 'hydra-api-token', '13893d264eca463907c4c6ee779221ea9a47ca5b9eefab5d292d745f6d8e1e27', '[\"user\"]', '2023-11-26 10:26:29', '2023-11-26 10:20:18', '2023-11-26 10:26:29'),
(973, 'App\\Models\\User', 102, 'hydra-api-token', 'cbeb760c84964cf4c38dde42d6affbf5f98a1a652982ea3b3200912271c2a3e8', '[\"user\"]', '2023-11-27 04:04:44', '2023-11-26 10:23:27', '2023-11-27 04:04:44'),
(974, 'App\\Models\\User', 105, 'hydra-api-token', '800355d51b439bc746bd622392b8ffdf2ae4774b229aba21ecfe546a6ce8c988', '[\"user\"]', '2023-12-17 12:17:14', '2023-11-26 10:26:38', '2023-12-17 12:17:14'),
(975, 'App\\Models\\User', 102, 'hydra-api-token', 'f9eecd449477f24f982fb7ecedb08484030af1cb69bff73801378693df73c3ca', '[\"user\"]', '2023-11-27 07:01:22', '2023-11-27 04:04:53', '2023-11-27 07:01:22'),
(976, 'App\\Models\\User', 102, 'hydra-api-token', '5dccfedbdfbb763f16ec0ad7899ab2baf2e5e63f37a9228e1ac9cd98d574c7cb', '[\"user\"]', NULL, '2023-11-27 04:38:55', '2023-11-27 04:38:55'),
(977, 'App\\Models\\User', 102, 'hydra-api-token', '62085d1419686620cce5ed9c92757466e3dacd4877e86087950e603c33fd0d56', '[\"user\"]', NULL, '2023-11-27 04:40:58', '2023-11-27 04:40:58'),
(978, 'App\\Models\\User', 102, 'hydra-api-token', '0c663432a81478978bb2bcb98504eb2678e46deb18819cd62f2aa965bc2caa73', '[\"user\"]', '2023-11-27 04:42:17', '2023-11-27 04:41:50', '2023-11-27 04:42:17'),
(979, 'App\\Models\\User', 81, 'hydra-api-token', '76b346450dccffe95b4619286735191f69fddb64f7ca45501c2fc69343b76598', '[\"user\"]', '2023-11-28 02:24:31', '2023-11-27 04:43:46', '2023-11-28 02:24:31'),
(980, 'App\\Models\\User', 103, 'hydra-api-token', 'e4acb2c78218da77975723e6c699dfdc4328aeffa18f5d60a3d61eb226a9a825', '[\"user\"]', '2023-11-28 06:36:33', '2023-11-27 06:00:14', '2023-11-28 06:36:33'),
(981, 'App\\Models\\User', 81, 'hydra-api-token', '5026140bc5a3fa369d5f3c4f243ddcde1b815bc00f8eff0a14999c50e6c6b081', '[\"user\"]', '2023-11-27 06:04:24', '2023-11-27 06:04:23', '2023-11-27 06:04:24'),
(982, 'App\\Models\\User', 103, 'hydra-api-token', '708f6eafda304bfb3333f6fba9237f3980b786d9b3cf4342700f60ec7ee7bbde', '[\"user\"]', '2023-11-27 06:05:47', '2023-11-27 06:05:39', '2023-11-27 06:05:47'),
(983, 'App\\Models\\User', 100, 'hydra-api-token', '2070f04a4eb0a452f10286b590e459b503e968e0b9be91cf461ee90d53fdfebe', '[\"admin\"]', '2023-11-27 06:34:21', '2023-11-27 06:06:50', '2023-11-27 06:34:21'),
(984, 'App\\Models\\User', 103, 'hydra-api-token', 'a44f0843df8d9216e8987fe4e9bb3ceda86d9d3a95f9543bb08932105fbccb41', '[\"user\"]', '2023-12-31 07:23:40', '2023-11-27 06:31:16', '2023-12-31 07:23:40'),
(985, 'App\\Models\\User', 103, 'hydra-api-token', '6ceb06b6d5065e69efe6f55f63ad24fc895f68367d95dfca71b53aaf90f98103', '[\"user\"]', '2023-11-27 07:12:08', '2023-11-27 06:34:35', '2023-11-27 07:12:08'),
(986, 'App\\Models\\User', 102, 'hydra-api-token', 'b54f5433a1fb1e3bbb55f0beee566414c77d1da864bb5298265fc8606cdeab2b', '[\"user\"]', '2023-12-11 10:48:51', '2023-11-27 06:42:20', '2023-12-11 10:48:51'),
(987, 'App\\Models\\User', 102, 'hydra-api-token', 'd2f98ad6b2890205950cc833e3736bd001ebfc2a014b07e12fb483adb0f83e68', '[\"user\"]', '2023-11-27 09:59:39', '2023-11-27 07:09:58', '2023-11-27 09:59:39'),
(988, 'App\\Models\\User', 102, 'hydra-api-token', 'f2d70eee31459958bed6396336a5b1f9253a500e345364c11a9c7ccd443e70d4', '[\"user\"]', '2023-11-27 10:28:54', '2023-11-27 07:12:44', '2023-11-27 10:28:54'),
(989, 'App\\Models\\User', 105, 'hydra-api-token', '1c00d3111f8b99bd98587ee61ce2043edc135ac1b6f0f4c019db5cd646ddbb43', '[\"user\"]', '2023-11-27 07:48:17', '2023-11-27 07:47:57', '2023-11-27 07:48:17'),
(990, 'App\\Models\\User', 95, 'hydra-api-token', 'c1649a9deacd348a194c5fe02b0e72bec7ab4a095c370034d04be77910f9b86f', '[\"user\"]', '2023-11-27 07:49:10', '2023-11-27 07:48:53', '2023-11-27 07:49:10'),
(991, 'App\\Models\\User', 105, 'hydra-api-token', '155428ce8a510364f4aa6d48b18135b45764d1c23d4d1704dac2c85d5ebddcf7', '[\"user\"]', '2023-12-17 13:03:07', '2023-11-27 07:50:40', '2023-12-17 13:03:07'),
(992, 'App\\Models\\User', 107, 'hydra-api-token', 'efb7b99fea2ad2999d981a843e3a401b0daa3bdf2a1bb5bd1f63621e11e90b94', '[\"user\"]', NULL, '2023-11-27 10:26:42', '2023-11-27 10:26:42'),
(993, 'App\\Models\\User', 107, 'hydra-api-token', '477508a2d2dc4627411c07f94d2837b9dacdc8c3cbbf304c021e061e72262984', '[\"user\"]', '2023-11-30 07:13:47', '2023-11-27 10:26:42', '2023-11-30 07:13:47'),
(994, 'App\\Models\\User', 102, 'hydra-api-token', '9a22af67a240044479ad7b948e39acddbdc71d30146b04d7b46e9e85a05eec9d', '[\"user\"]', '2023-11-27 11:01:06', '2023-11-27 10:28:14', '2023-11-27 11:01:06'),
(995, 'App\\Models\\User', 100, 'hydra-api-token', '2060535c2e077876d4fa7e3d359d14bda8cefae8b13907b36c0cd9538206ab0a', '[\"admin\"]', '2023-11-27 10:38:27', '2023-11-27 10:38:26', '2023-11-27 10:38:27'),
(996, 'App\\Models\\User', 102, 'hydra-api-token', 'cba8ebad6668c76feda75f89a9efdeb74447de65963db6009c92f3746d312000', '[\"user\"]', '2023-11-27 10:44:29', '2023-11-27 10:44:27', '2023-11-27 10:44:29'),
(997, 'App\\Models\\User', 85, 'hydra-api-token', 'c86bfb0c4921ee681217c224b2f4901fa90ca8b93042f6fb34c359404619d272', '[\"user\"]', '2023-11-27 10:52:41', '2023-11-27 10:45:55', '2023-11-27 10:52:41'),
(998, 'App\\Models\\User', 85, 'hydra-api-token', '598d399d02fd7cbadb9e5cb078c0857365816578d8fb5fccd0a428ae492c0062', '[\"user\"]', NULL, '2023-11-27 10:45:56', '2023-11-27 10:45:56'),
(999, 'App\\Models\\User', 102, 'hydra-api-token', '16417aae9c8d355b5abfb9c3c93f16249f1e9e235326412ccece3c31d71a3a7b', '[\"user\"]', '2023-11-27 11:01:55', '2023-11-27 10:58:11', '2023-11-27 11:01:55'),
(1000, 'App\\Models\\User', 85, 'hydra-api-token', 'a4fd6e7fd063b74fe02e58d10eae636141c0e20da32af666ca85248b8f2ccf3d', '[\"user\"]', '2023-11-29 10:22:16', '2023-11-27 11:00:21', '2023-11-29 10:22:16'),
(1001, 'App\\Models\\User', 102, 'hydra-api-token', 'b20fb44ed17ed39948e097d6e4c627b9b19bb8cf1818bf89ebe2600b9ccef90d', '[\"user\"]', '2023-11-30 10:42:14', '2023-11-27 11:01:13', '2023-11-30 10:42:14'),
(1002, 'App\\Models\\User', 85, 'hydra-api-token', '830815e0fbbbc6ef09d65ed65798530b8b58800fa87cfe32b0f71074b8b50bff', '[\"user\"]', '2023-11-27 11:03:43', '2023-11-27 11:02:30', '2023-11-27 11:03:43'),
(1003, 'App\\Models\\User', 102, 'hydra-api-token', '6d4a8249b8873329ed94b410072f36db78e54d7d0f59dea3879af9734f571d3e', '[\"user\"]', '2023-11-30 12:01:55', '2023-11-27 11:37:47', '2023-11-30 12:01:55'),
(1004, 'App\\Models\\User', 102, 'hydra-api-token', '1a06f09fa39d8fe2a7d3b4cf33cb29fdf44bb394f42a510fedc7d3ae06a6774c', '[\"user\"]', '2024-01-24 04:49:02', '2023-11-27 11:49:41', '2024-01-24 04:49:02'),
(1005, 'App\\Models\\User', 95, 'hydra-api-token', 'a2df2dd424d90f1a5bebf6e15e82e14f7f72fe98350ef5fb753dfbf60756ba24', '[\"user\"]', '2024-01-13 05:44:59', '2023-11-27 13:39:02', '2024-01-13 05:44:59'),
(1006, 'App\\Models\\User', 105, 'hydra-api-token', '18849ada5f8c35ce21a76e1e6051bf06cb5dce6980af13842b231408cf8af363', '[\"user\"]', '2023-12-04 23:27:54', '2023-11-28 02:24:52', '2023-12-04 23:27:54'),
(1007, 'App\\Models\\User', 100, 'hydra-api-token', '5fa2bd378617f1d7f687609f9ad7a57ab38c446be6fb8361b5811e6cb21a734f', '[\"admin\"]', '2023-11-28 12:41:49', '2023-11-28 06:36:52', '2023-11-28 12:41:49'),
(1008, 'App\\Models\\User', 85, 'hydra-api-token', 'b072bcdccbccd00194c4105ffbb89eb685f751d3e2f607d8d49348e3f2d0f9a4', '[\"user\"]', '2023-11-28 08:50:24', '2023-11-28 08:49:22', '2023-11-28 08:50:24'),
(1009, 'App\\Models\\User', 102, 'hydra-api-token', 'e5853abe36868fa431e44994666dcd88bb247cb66a017b27179213757ae02a4b', '[\"user\"]', '2023-11-28 10:51:15', '2023-11-28 08:51:00', '2023-11-28 10:51:15'),
(1010, 'App\\Models\\User', 105, 'hydra-api-token', '744d5f40f20a7557e4257977d9db89a0791b3e501c5f2a16ee124988b676d354', '[\"user\"]', NULL, '2023-11-28 10:01:56', '2023-11-28 10:01:56'),
(1011, 'App\\Models\\User', 105, 'hydra-api-token', 'a334db42af379fddd14344a0773b0e1fad5f2d264b608e8f7015f82173c5eb9e', '[\"user\"]', '2023-11-28 12:13:57', '2023-11-28 10:01:56', '2023-11-28 12:13:57'),
(1012, 'App\\Models\\User', 85, 'hydra-api-token', 'edbbed85e729989e6cfc49cfdfb8d04cf2a9c67fc88d575c00b345f345745bd4', '[\"user\"]', '2023-11-28 10:51:45', '2023-11-28 10:51:33', '2023-11-28 10:51:45'),
(1013, 'App\\Models\\User', 102, 'hydra-api-token', 'c9c963c44287355ffaa4f317d44cb71dd33cfdf28fce7e7109de037edb96b3a9', '[\"user\"]', '2024-01-06 09:59:24', '2023-11-28 10:52:34', '2024-01-06 09:59:24'),
(1014, 'App\\Models\\User', 102, 'hydra-api-token', '0a2947bd481706fc3fc109ab70d5ca4b4575912a6adf3a71a27efbd9da38d3aa', '[\"user\"]', '2023-12-02 03:56:20', '2023-11-28 12:43:38', '2023-12-02 03:56:20'),
(1015, 'App\\Models\\User', 100, 'hydra-api-token', 'a81b9468ad6340ac8e32533391a35962fd8b518f7e8b61dfec6867d931107c2d', '[\"admin\"]', '2023-11-28 12:51:07', '2023-11-28 12:45:40', '2023-11-28 12:51:07'),
(1016, 'App\\Models\\User', 103, 'hydra-api-token', '85f27d2a4d1fd01ed6cda77796f521f6eb669b1a32b19e3988ff39b6ab158924', '[\"user\"]', '2023-11-28 13:21:03', '2023-11-28 12:51:19', '2023-11-28 13:21:03'),
(1017, 'App\\Models\\User', 100, 'hydra-api-token', '3c560d024e59df0767f7602f2b51a0f7137cc2c0d6af7865eeb0873feec3065a', '[\"admin\"]', '2023-11-29 09:55:25', '2023-11-28 13:21:16', '2023-11-29 09:55:25'),
(1018, 'App\\Models\\User', 100, 'hydra-api-token', '643199666c2c411a1ee9063ee22896ff09833c11a2e1abf30fde36e3d9a333c8', '[\"admin\"]', '2023-11-30 04:56:31', '2023-11-29 04:15:17', '2023-11-30 04:56:31'),
(1019, 'App\\Models\\User', 102, 'hydra-api-token', 'd9fa01d43b27fad12428d01e042668efeb6801b588d240820e9194082be0a8fc', '[\"user\"]', '2023-11-30 10:10:21', '2023-11-29 05:29:41', '2023-11-30 10:10:21'),
(1020, 'App\\Models\\User', 81, 'hydra-api-token', 'bb76332178bd365c284bf5cb77e75c0a3da901808795f2d45c2b9d0b6e33ac2c', '[\"user\"]', '2023-11-29 09:06:17', '2023-11-29 06:07:21', '2023-11-29 09:06:17'),
(1021, 'App\\Models\\User', 102, 'hydra-api-token', 'ede0d4ac13366a0d551766cfc3ed978c055bf0d301354857d64217193c1526b6', '[\"user\"]', NULL, '2023-11-29 08:48:54', '2023-11-29 08:48:54'),
(1022, 'App\\Models\\User', 102, 'hydra-api-token', 'bf0155b701a354c6c1533dcd951ee0d03ac86ba8bdc86e06a6f720b874eb26ef', '[\"user\"]', '2023-12-24 06:43:46', '2023-11-29 09:07:51', '2023-12-24 06:43:46'),
(1023, 'App\\Models\\User', 102, 'hydra-api-token', 'c7cbf3b75e5fd3eddaef5794b4633db22216a264077037eceaf45c8720911658', '[\"user\"]', '2023-12-02 03:42:53', '2023-11-29 09:32:11', '2023-12-02 03:42:53'),
(1024, 'App\\Models\\User', 103, 'hydra-api-token', '881570fb01cf76b1ebf8a170c35b045935b6749ee852a758e4b4b51867772cce', '[\"user\"]', '2023-11-30 06:09:33', '2023-11-29 09:41:43', '2023-11-30 06:09:33'),
(1025, 'App\\Models\\User', 102, 'hydra-api-token', '95ce8616d767accfcc8d05c104cae201b49de39edd8ccf2845e81df3c14ac4dc', '[\"user\"]', '2023-11-29 12:00:30', '2023-11-29 12:00:27', '2023-11-29 12:00:30'),
(1026, 'App\\Models\\User', 102, 'hydra-api-token', 'bcf7c73f15fe425d900fea813536909131046901757dd875ed6c16cfb30b338d', '[\"user\"]', '2023-11-29 12:06:10', '2023-11-29 12:01:45', '2023-11-29 12:06:10'),
(1027, 'App\\Models\\User', 102, 'hydra-api-token', 'f6d034f72d49ba76bd4f4d888cb5c4b0f3aecc966300b9f57c34a3c5eca5f5e9', '[\"user\"]', '2023-12-10 15:55:30', '2023-11-29 12:07:53', '2023-12-10 15:55:30'),
(1028, 'App\\Models\\User', 102, 'hydra-api-token', '486b30943a543319b66a082a868eeb57cf81f74e1f63d9397871520f041e4e44', '[\"user\"]', '2023-11-30 03:28:13', '2023-11-29 12:14:41', '2023-11-30 03:28:13'),
(1029, 'App\\Models\\User', 102, 'hydra-api-token', 'c32f8d55c9004b763eb7970481d3ea4a8c06b62c4e19f637228c977f08310646', '[\"user\"]', '2024-01-31 10:28:45', '2023-11-29 15:38:39', '2024-01-31 10:28:45'),
(1030, 'App\\Models\\User', 103, 'hydra-api-token', '7d85b6e68cd695c3f2118a87f7419c3f65cb723491b83b7a51dffa0b96aaff10', '[\"user\"]', '2023-11-30 06:57:12', '2023-11-29 18:50:37', '2023-11-30 06:57:12'),
(1031, 'App\\Models\\User', 103, 'hydra-api-token', '8f1fbd78903e8f0cc8eba38b3b27a3b814b7c4232184a9a6056bda549d5942e4', '[\"user\"]', '2024-01-04 11:42:32', '2023-11-30 04:57:59', '2024-01-04 11:42:32'),
(1032, 'App\\Models\\User', 102, 'hydra-api-token', '529c3a6b68d1ec033a057008f29f5251a6058d08331f07d7c4f91931032a0a05', '[\"user\"]', '2023-12-20 12:14:09', '2023-11-30 05:25:44', '2023-12-20 12:14:09'),
(1033, 'App\\Models\\User', 102, 'hydra-api-token', '79a751c357687e8b90b7df18e080bf88c3b86b7ed70484d0bfe151f47d6a4efc', '[\"user\"]', '2023-11-30 11:56:43', '2023-11-30 06:11:06', '2023-11-30 11:56:43'),
(1034, 'App\\Models\\User', 100, 'hydra-api-token', '3455d183db552a0c98c2b2b94bf819838b6b48a551a9f39a309c78a16ea1d193', '[\"admin\"]', '2023-11-30 18:11:11', '2023-11-30 06:57:22', '2023-11-30 18:11:11'),
(1035, 'App\\Models\\User', 107, 'hydra-api-token', '3be753127d6529e7b3dff56e695a3d7da6104b70cf83f5ce81784eb8b2aaf8fc', '[\"user\"]', '2023-11-30 07:22:29', '2023-11-30 07:14:57', '2023-11-30 07:22:29'),
(1036, 'App\\Models\\User', 102, 'hydra-api-token', 'c6e9adfd4424a28ed04406c6fe8719afcd25f7dadc3ea0a1fa44e53fa4f99b6b', '[\"user\"]', '2023-11-30 07:20:30', '2023-11-30 07:17:55', '2023-11-30 07:20:30'),
(1037, 'App\\Models\\User', 102, 'hydra-api-token', '4c6e27f6bbc93e87360d2ff5c3169b6cf4e8b1a03a4e397aecc5269c037357f9', '[\"user\"]', '2023-11-30 11:56:59', '2023-11-30 07:23:11', '2023-11-30 11:56:59'),
(1038, 'App\\Models\\User', 102, 'hydra-api-token', 'd8c05c8bb66920ab1ae2fdda26a2a4193dc8bcfcd47652ceb33c5804cd4439b5', '[\"user\"]', NULL, '2023-11-30 08:31:32', '2023-11-30 08:31:32'),
(1039, 'App\\Models\\User', 102, 'hydra-api-token', 'f6abd982988417d761f0adb3fc1d703a3b7515bdfa9b8470d74fe0fb3f748968', '[\"user\"]', '2023-12-17 05:21:37', '2023-11-30 08:31:33', '2023-12-17 05:21:37'),
(1043, 'App\\Models\\User', 107, 'hydra-api-token', '940eac73ae928c93a756293333d2591e4496000c38d348bc0127478f773cf1be', '[\"user\"]', '2024-02-01 07:48:56', '2023-11-30 10:38:11', '2024-02-01 07:48:56'),
(1044, 'App\\Models\\User', 102, 'hydra-api-token', '07acbc81ba39f710d60e434d30d6b95b919416cc43cebb721d3f382f9db2e9e3', '[\"user\"]', '2023-11-30 11:50:55', '2023-11-30 10:43:01', '2023-11-30 11:50:55'),
(1045, 'App\\Models\\User', 102, 'hydra-api-token', 'd0d26b475d9b541c1ca077c25fdd7867105f9e56072a20a6dd66a2fe806e5d35', '[\"user\"]', '2023-12-02 04:07:44', '2023-11-30 11:51:00', '2023-12-02 04:07:44'),
(1046, 'App\\Models\\User', 102, 'hydra-api-token', '5df708372fcc9682b47d96be2fc537b3fb87fab9e9ae25082812df46b3f2f085', '[\"user\"]', '2023-11-30 11:59:45', '2023-11-30 11:54:15', '2023-11-30 11:59:45'),
(1047, 'App\\Models\\User', 102, 'hydra-api-token', '169a1eff794d254fbcd1216038ffcce668cd70b35a5a24333633bc187aa8b6f4', '[\"user\"]', '2023-12-02 10:58:28', '2023-11-30 12:01:05', '2023-12-02 10:58:28'),
(1048, 'App\\Models\\User', 102, 'hydra-api-token', 'f7305f7e6f8dc6290888aee9b3b8fe25ff989e5647caa980c7b862f6c2a82ac1', '[\"user\"]', '2023-12-02 11:04:59', '2023-11-30 12:02:56', '2023-12-02 11:04:59'),
(1049, 'App\\Models\\User', 81, 'hydra-api-token', '9666e1915b5c414ef522aeb7749aea0de52b817ba8fa4275b49660ab14fda62b', '[\"user\"]', '2023-12-02 04:20:28', '2023-11-30 12:03:18', '2023-12-02 04:20:28'),
(1050, 'App\\Models\\User', 102, 'hydra-api-token', 'f42d75dabe7161d62d497ea7946c4656b5912bb9fc60bf8140683d0a4687f233', '[\"user\"]', '2024-01-11 14:04:32', '2023-11-30 12:08:32', '2024-01-11 14:04:32'),
(1051, 'App\\Models\\User', 102, 'hydra-api-token', 'fe28e1b64c8d8a3a9b57924c3a3ec9b5140f6727f48b8ec70222301ecf1768df', '[\"user\"]', '2023-12-02 03:55:37', '2023-11-30 12:11:00', '2023-12-02 03:55:37'),
(1052, 'App\\Models\\User', 102, 'hydra-api-token', 'cc7f4c8ea9e4c106deeaa714fd7785c91c25bb2da71403685ac1176f007c16d5', '[\"user\"]', '2023-11-30 12:17:47', '2023-11-30 12:17:23', '2023-11-30 12:17:47'),
(1053, 'App\\Models\\User', 102, 'hydra-api-token', 'e794cfe6d1954647e1f7404e04f6b0110d3800ab634b2eeba7648457f16fed26', '[\"user\"]', '2023-11-30 12:18:30', '2023-11-30 12:17:51', '2023-11-30 12:18:30'),
(1054, 'App\\Models\\User', 102, 'hydra-api-token', '9818121e77434191d5ae4f395778e1ef8cbad93e7c8aa7513e2b02e8d2532206', '[\"user\"]', '2023-11-30 12:26:06', '2023-11-30 12:20:39', '2023-11-30 12:26:06'),
(1055, 'App\\Models\\User', 102, 'hydra-api-token', '1146241173bcc275bf20debe9e898f646d746f5d792141b2aff51929b3a9e1dc', '[\"user\"]', '2023-12-09 12:33:12', '2023-11-30 12:30:42', '2023-12-09 12:33:12'),
(1056, 'App\\Models\\User', 103, 'hydra-api-token', '21131bbf1d6971846f34535064139f45e91143cec5a4a91e0fe3893e7ee81169', '[\"user\"]', '2023-11-30 18:44:43', '2023-11-30 18:11:28', '2023-11-30 18:44:43'),
(1057, 'App\\Models\\User', 100, 'hydra-api-token', 'f2a384bdc961d25858f4a296a2b2bf36d9f7feef04017f085643c6410502b2a0', '[\"admin\"]', '2023-11-30 18:48:23', '2023-11-30 18:44:56', '2023-11-30 18:48:23'),
(1058, 'App\\Models\\User', 109, 'hydra-api-token', 'f2cf8b049a16c49af38e3481dd9c58f5e9b77b8a26e42d8b1f3bf90266ad4701', '[\"user\"]', '2023-11-30 18:49:04', '2023-11-30 18:48:47', '2023-11-30 18:49:04'),
(1059, 'App\\Models\\User', 100, 'hydra-api-token', 'baa76a162b196d57f0434b82e3f99c63c26fb3259281311f66f32b8358b80a48', '[\"admin\"]', '2023-11-30 18:49:54', '2023-11-30 18:49:48', '2023-11-30 18:49:54'),
(1060, 'App\\Models\\User', 109, 'hydra-api-token', '916cd14e7bd95181eb3c6efb3a46b41efb46dcf2b9038d58c90489c5e5fdcdb7', '[\"user\"]', '2023-11-30 19:00:00', '2023-11-30 18:50:18', '2023-11-30 19:00:00'),
(1061, 'App\\Models\\User', 109, 'hydra-api-token', '69ceef2853a08a6684ef4abd3ad94db415e56f7dc4694203d4cc976b25d24329', '[\"user\"]', '2023-11-30 19:06:00', '2023-11-30 19:02:02', '2023-11-30 19:06:00'),
(1062, 'App\\Models\\User', 109, 'hydra-api-token', 'ce8ff64407d4a1e8b19ecc4dab35d92306caf3b5a0abc15e4ca0b366bda2d61b', '[\"user\"]', '2023-11-30 19:06:41', '2023-11-30 19:06:41', '2023-11-30 19:06:41'),
(1063, 'App\\Models\\User', 109, 'hydra-api-token', 'cc7812915daa0eaf2bb510ace7c8f4b7f9dd420bd64e3a635b9abb414f6a94f1', '[\"user\"]', '2023-11-30 19:09:50', '2023-11-30 19:07:22', '2023-11-30 19:09:50'),
(1064, 'App\\Models\\User', 100, 'hydra-api-token', '1740565ea7ce1d63e92f9e04d42620418c5d27d5f73f6c0bb46187cbc515cfa8', '[\"admin\"]', '2023-11-30 19:10:56', '2023-11-30 19:10:10', '2023-11-30 19:10:56'),
(1065, 'App\\Models\\User', 103, 'hydra-api-token', '5b437c3a4a0b64e770cba13b44421dd1232e3ea2569fdc3c773f43369fb988b6', '[\"user\"]', '2023-11-30 19:12:57', '2023-11-30 19:12:55', '2023-11-30 19:12:57'),
(1066, 'App\\Models\\User', 103, 'hydra-api-token', 'd1ca80330fd8faee5be7aef89ffb778a4abc5e99e38ac550a5a72d2ae0359035', '[\"user\"]', '2023-11-30 19:30:59', '2023-11-30 19:15:07', '2023-11-30 19:30:59'),
(1067, 'App\\Models\\User', 103, 'hydra-api-token', 'd9f107197e0743a6b7694dbb33cd093a1d21c28e4517998883c8f3ee7b95dc22', '[\"user\"]', '2023-11-30 19:32:29', '2023-11-30 19:17:15', '2023-11-30 19:32:29'),
(1068, 'App\\Models\\User', 109, 'hydra-api-token', '6098f2f5bdf45d62368800bdccf1c1db0ef21a6b0c9cd9b06ac48c128f2ab3e0', '[\"user\"]', '2023-11-30 19:31:58', '2023-11-30 19:31:26', '2023-11-30 19:31:58'),
(1070, 'App\\Models\\User', 109, 'hydra-api-token', 'c57ad010a2a8a6a3659b0e0f8809972a25eefc979c43205de8b8092359a7df33', '[\"user\"]', '2023-12-02 09:46:50', '2023-12-02 03:43:08', '2023-12-02 09:46:50');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1071, 'App\\Models\\User', 109, 'hydra-api-token', '1134fb785c753c0015dfcd69ecc3a2b35e7ce48f5d95ee1c9966062715cedd11', '[\"user\"]', '2023-12-08 15:05:53', '2023-12-02 03:52:13', '2023-12-08 15:05:53'),
(1072, 'App\\Models\\User', 109, 'hydra-api-token', 'eb9812bb4dd5bd2abb5bd5b5308405401bea8aa36b5cfb2e6a7984be92fb3866', '[\"user\"]', '2023-12-02 04:20:42', '2023-12-02 03:56:06', '2023-12-02 04:20:42'),
(1073, 'App\\Models\\User', 109, 'hydra-api-token', 'bcc5a5bdc01fb58a153afc8421a88ba21627a236c95ac81319e63979f0be860d', '[\"user\"]', NULL, '2023-12-02 03:58:34', '2023-12-02 03:58:34'),
(1074, 'App\\Models\\User', 109, 'hydra-api-token', '5400345440bfa9a800a1f67852e5781fd8e24f94699d2fd6908b4d47e11839d8', '[\"user\"]', NULL, '2023-12-02 04:04:07', '2023-12-02 04:04:07'),
(1075, 'App\\Models\\User', 109, 'hydra-api-token', '040d1fdc5d98a75881f4f995e4b9d7796e5016e2ed3f8cdfb9627b5ae6e065c7', '[\"user\"]', '2023-12-02 04:14:36', '2023-12-02 04:06:26', '2023-12-02 04:14:36'),
(1076, 'App\\Models\\User', 102, 'hydra-api-token', '5939698a1cd8f1a5a9a814eb4e7113dd19c9aa1eb635fdb40d215086a4a665d9', '[\"user\"]', '2023-12-02 09:13:00', '2023-12-02 04:07:49', '2023-12-02 09:13:00'),
(1077, 'App\\Models\\User', 109, 'hydra-api-token', '2feeca71f70c09f40e5d129bca963b743f30ea11d2b1a9eadd9464d8ca3fc7d8', '[\"user\"]', NULL, '2023-12-02 04:07:56', '2023-12-02 04:07:56'),
(1078, 'App\\Models\\User', 109, 'hydra-api-token', 'b79a70bc28ec3314c7bc25d12aa7154c7f8b39ea48f7c2ed050f20bd643a0fac', '[\"user\"]', '2023-12-02 11:26:09', '2023-12-02 04:18:19', '2023-12-02 11:26:09'),
(1079, 'App\\Models\\User', 102, 'hydra-api-token', '9fa77edf66d1a953408cb871083e7c32fd05e331bd3242c7726d8160c8350569', '[\"user\"]', '2023-12-02 12:18:35', '2023-12-02 04:20:48', '2023-12-02 12:18:35'),
(1080, 'App\\Models\\User', 102, 'hydra-api-token', '68f53392ba1a0a9f52a58428681911653bb4fb7057528c2b4c0d8e4515ffdf9b', '[\"user\"]', '2023-12-02 04:44:43', '2023-12-02 04:35:15', '2023-12-02 04:44:43'),
(1081, 'App\\Models\\User', 102, 'hydra-api-token', '3c8232342e05539abe28ed439edd429b689a4ca72fa3034db4862308320491c9', '[\"user\"]', '2023-12-02 05:28:08', '2023-12-02 05:27:16', '2023-12-02 05:28:08'),
(1082, 'App\\Models\\User', 102, 'hydra-api-token', '19ad1b3cee421a2d852b388e1151477d6a911f7ceb00528eb36ccfa182efca93', '[\"user\"]', '2023-12-02 11:19:17', '2023-12-02 05:31:18', '2023-12-02 11:19:17'),
(1083, 'App\\Models\\User', 102, 'hydra-api-token', '14d7e45bf97c5c4aa4968a55f09243628a029c6d1982c3556b6c2fe0784d09e7', '[\"user\"]', '2023-12-02 05:36:57', '2023-12-02 05:32:14', '2023-12-02 05:36:57'),
(1084, 'App\\Models\\User', 102, 'hydra-api-token', '9026a365ae95474ac8d25f92e999cbefaade8039066a508f7586f4fab549b228', '[\"user\"]', '2023-12-03 06:21:05', '2023-12-02 05:37:10', '2023-12-03 06:21:05'),
(1085, 'App\\Models\\User', 102, 'hydra-api-token', '4cdc7f05d0974f8cbac2157445d08934455ebe78791d581c98721d0281c2aa3e', '[\"user\"]', '2023-12-02 06:05:13', '2023-12-02 05:59:48', '2023-12-02 06:05:13'),
(1086, 'App\\Models\\User', 102, 'hydra-api-token', '271e33aa300049496dc4357f02cc3d60947d12edb4f890902e2ee7b6ccd6c0e9', '[\"user\"]', '2023-12-02 07:52:03', '2023-12-02 06:17:13', '2023-12-02 07:52:03'),
(1087, 'App\\Models\\User', 102, 'hydra-api-token', '49751900de8aa1b6e26f4ad6101b3fbdf5018ebd03c9cf550216bca7515aa86b', '[\"user\"]', '2023-12-03 05:47:35', '2023-12-02 09:13:16', '2023-12-03 05:47:35'),
(1088, 'App\\Models\\User', 102, 'hydra-api-token', '6be3fdb3e96d7bb733f70e92c2fddeda8c140ca99f1096c3df2ec68502e38647', '[\"user\"]', '2023-12-06 07:07:55', '2023-12-02 09:40:26', '2023-12-06 07:07:55'),
(1089, 'App\\Models\\User', 102, 'hydra-api-token', 'dd3ba921aac73c8a38d8f145cef24891f3cd1a96103503535d953d081f4ecb47', '[\"user\"]', '2023-12-04 09:33:11', '2023-12-02 09:47:19', '2023-12-04 09:33:11'),
(1090, 'App\\Models\\User', 102, 'hydra-api-token', 'a1185dbbd949970a7bd2e7fdb820748a3f79acd4dbd8f226535ebc68039e7b7f', '[\"user\"]', '2023-12-04 04:49:50', '2023-12-02 09:52:50', '2023-12-04 04:49:50'),
(1091, 'App\\Models\\User', 100, 'hydra-api-token', 'c255322ef5a6696daef618c2511506065c99db45ca120ec1310440a1a3d034a9', '[\"admin\"]', '2023-12-02 12:01:09', '2023-12-02 12:01:05', '2023-12-02 12:01:09'),
(1092, 'App\\Models\\User', 105, 'hydra-api-token', '2446ef9648e99d75101f1836ddb923ef91596ee1c59e8251bd32ca2169b4598e', '[\"user\"]', '2023-12-03 08:18:31', '2023-12-02 12:02:09', '2023-12-03 08:18:31'),
(1093, 'App\\Models\\User', 81, 'hydra-api-token', 'ab56c361c61260761341f4b25308eaf93406c170da508c44e8dc6cb784aec54e', '[\"user\"]', '2023-12-02 12:30:40', '2023-12-02 12:19:42', '2023-12-02 12:30:40'),
(1094, 'App\\Models\\User', 102, 'hydra-api-token', 'e6b8498fd9f97046c8466fa323260c56840b8573a7465d5721401117cca5bca4', '[\"user\"]', '2023-12-03 10:54:41', '2023-12-02 12:31:19', '2023-12-03 10:54:41'),
(1095, 'App\\Models\\User', 105, 'hydra-api-token', '2b064844ad13b640d9ad512bd8b7485220db8c19394cf2538baad3dbafd169b5', '[\"user\"]', '2023-12-17 11:53:36', '2023-12-03 02:06:40', '2023-12-17 11:53:36'),
(1096, 'App\\Models\\User', 105, 'hydra-api-token', '50e70fc974678f3c1539d4ecf7dfad7c7e0181d24d6f3c7f05ee888e5a5d619b', '[\"user\"]', '2023-12-09 07:15:46', '2023-12-03 02:21:57', '2023-12-09 07:15:46'),
(1097, 'App\\Models\\User', 105, 'hydra-api-token', 'c4c0e6a604a21745487892cb5b2a492126255c53ad8ee4cc71a745090aac8ca1', '[\"user\"]', '2024-02-02 09:16:43', '2023-12-03 02:50:07', '2024-02-02 09:16:43'),
(1098, 'App\\Models\\User', 102, 'hydra-api-token', '6a609d3aebd447465a17438f85f5623d28d1b2ab6d39d9b83291fcc68e1d8484', '[\"user\"]', '2023-12-04 04:08:06', '2023-12-03 05:47:42', '2023-12-04 04:08:06'),
(1099, 'App\\Models\\User', 102, 'hydra-api-token', 'bd07b05ec98c9a02dc011c8202731b43bb0ce726b966b5ff16ab9dc81e4a1876', '[\"user\"]', '2023-12-03 06:23:01', '2023-12-03 05:52:51', '2023-12-03 06:23:01'),
(1100, 'App\\Models\\User', 102, 'hydra-api-token', '850aa3e971120e4d30a40d0e579628297dcd92a6fb5cc5379f582fbe96342be6', '[\"user\"]', '2023-12-03 06:21:34', '2023-12-03 06:21:33', '2023-12-03 06:21:34'),
(1101, 'App\\Models\\User', 81, 'hydra-api-token', 'f9c1604514af48b2dba59e8afe9cb4c9496668ab2819d362b56a488258d76154', '[\"user\"]', '2023-12-03 07:02:15', '2023-12-03 06:56:04', '2023-12-03 07:02:15'),
(1102, 'App\\Models\\User', 102, 'hydra-api-token', '0a9c2f3157bb92085134034965bbf57e70397d7d871095a090334d6ab2d32b9a', '[\"user\"]', '2023-12-03 07:27:02', '2023-12-03 07:03:30', '2023-12-03 07:27:02'),
(1103, 'App\\Models\\User', 102, 'hydra-api-token', 'aa0f1b6e2b0859d0c758dbe2e7e4b4a6c917b0b1c558bceb2b55691621eb5120', '[\"user\"]', '2023-12-03 08:41:14', '2023-12-03 08:37:28', '2023-12-03 08:41:14'),
(1104, 'App\\Models\\User', 102, 'hydra-api-token', '3045dfb1d97e060e96c82422ca3b5bac7944703b4b95ae7961579c65ec729b06', '[\"user\"]', '2023-12-03 08:39:54', '2023-12-03 08:39:50', '2023-12-03 08:39:54'),
(1105, 'App\\Models\\User', 102, 'hydra-api-token', '8333aebc3bf5f8a3ce7923e68200bac77a61817a32a411830c211e5f02f34522', '[\"user\"]', '2023-12-03 08:44:35', '2023-12-03 08:44:33', '2023-12-03 08:44:35'),
(1106, 'App\\Models\\User', 102, 'hydra-api-token', '9b13e2675de11a72c6da602d0e867e2a84c687d09a852ba38b095f7f8957ff4a', '[\"user\"]', '2023-12-03 10:10:21', '2023-12-03 08:57:36', '2023-12-03 10:10:21'),
(1107, 'App\\Models\\User', 102, 'hydra-api-token', '3c1c9f2bc2a5d602809487a9d10d7dea6148348c71265c34cee3b2dcf3dc90e5', '[\"user\"]', '2023-12-03 09:08:15', '2023-12-03 09:08:13', '2023-12-03 09:08:15'),
(1108, 'App\\Models\\User', 102, 'hydra-api-token', '2820816cd5a506c24377f2c8ed78b32ccea9eda149479fbfbbbf2b716833682b', '[\"user\"]', '2023-12-03 09:10:18', '2023-12-03 09:10:07', '2023-12-03 09:10:18'),
(1109, 'App\\Models\\User', 102, 'hydra-api-token', '4b26ea2dc5b7530032a609ee007bf5240b714be53d76044914e68349f7281e8b', '[\"user\"]', '2023-12-03 09:17:46', '2023-12-03 09:17:31', '2023-12-03 09:17:46'),
(1110, 'App\\Models\\User', 102, 'hydra-api-token', '3fff24d12e28a16d46cd135a7d4227471c9b7ede6d971882090f03d09d69bec2', '[\"user\"]', '2023-12-03 09:20:57', '2023-12-03 09:20:52', '2023-12-03 09:20:57'),
(1111, 'App\\Models\\User', 109, 'hydra-api-token', '4795eee4a3cfa0bc8bdb0fb6ed8d8cb6651bce8da864743e37127bdd3ebcc99b', '[\"user\"]', '2023-12-03 09:54:55', '2023-12-03 09:32:32', '2023-12-03 09:54:55'),
(1112, 'App\\Models\\User', 102, 'hydra-api-token', 'c588ea00844501485675b3419e7bfd0b989de0a2cc7d02c55987f00fa95c0550', '[\"user\"]', '2023-12-03 09:49:18', '2023-12-03 09:49:16', '2023-12-03 09:49:18'),
(1113, 'App\\Models\\User', 102, 'hydra-api-token', '71ed02583a9500ee85132465480c1d2fc0e775584f0612f5e210512dfedef9bc', '[\"user\"]', '2023-12-03 09:51:10', '2023-12-03 09:51:03', '2023-12-03 09:51:10'),
(1114, 'App\\Models\\User', 103, 'hydra-api-token', 'bc7a8cb160d5c9dbf237ea81e3c6285a19ea373b0b8587b2f71fed10f38beec1', '[\"user\"]', '2023-12-03 10:22:34', '2023-12-03 09:56:19', '2023-12-03 10:22:34'),
(1115, 'App\\Models\\User', 109, 'hydra-api-token', 'ff5d7b16f33e7af390ede578456eb7d32c75d3b758a140c9ecdd96a59d404231', '[\"user\"]', '2023-12-03 10:23:02', '2023-12-03 10:23:02', '2023-12-03 10:23:02'),
(1116, 'App\\Models\\User', 102, 'hydra-api-token', '8d079b68293040a3ebe367380d811d51d6534037c53f5f70508a97c68570aead', '[\"user\"]', '2023-12-05 11:04:46', '2023-12-03 10:26:42', '2023-12-05 11:04:46'),
(1117, 'App\\Models\\User', 100, 'hydra-api-token', 'dc8b82e7ef9f95ef18885d5aae5d15f04560f84380803b89664c398eee026d19', '[\"admin\"]', '2023-12-04 09:08:18', '2023-12-03 10:50:25', '2023-12-04 09:08:18'),
(1118, 'App\\Models\\User', 81, 'hydra-api-token', '6255d24dea824d507a8348b0fc07720e1f5004d4913cede22ba73e8f0d2e7421', '[\"user\"]', '2023-12-03 10:56:17', '2023-12-03 10:55:07', '2023-12-03 10:56:17'),
(1119, 'App\\Models\\User', 102, 'hydra-api-token', '78aab80b75f9504100404463b0f7734ea8371730ef28ed8e001af432f65ef44a', '[\"user\"]', '2023-12-03 10:57:44', '2023-12-03 10:56:41', '2023-12-03 10:57:44'),
(1120, 'App\\Models\\User', 100, 'hydra-api-token', '79a7636b74f45527677dee7653579daa16b202e0d6c861a292cd5f1134b0ab28', '[\"admin\"]', '2023-12-03 11:41:50', '2023-12-03 11:01:50', '2023-12-03 11:41:50'),
(1121, 'App\\Models\\User', 102, 'hydra-api-token', '1b8ef2f4f7906e6724e6c6c562f44b83424d133a3f7e1e12707fa58bc5e399cc', '[\"user\"]', '2023-12-03 11:01:57', '2023-12-03 11:01:51', '2023-12-03 11:01:57'),
(1122, 'App\\Models\\User', 102, 'hydra-api-token', '631552a3ebf64e5e918e1bad7d0fc77f37040618b432dda7a6836d0526224d68', '[\"user\"]', '2023-12-03 11:18:59', '2023-12-03 11:18:55', '2023-12-03 11:18:59'),
(1123, 'App\\Models\\User', 102, 'hydra-api-token', '93e56dc5b549cf3064ee071ddde730bfa8c750608ccc1ac9696f775a5472a0b2', '[\"user\"]', '2023-12-04 04:35:40', '2023-12-03 11:28:11', '2023-12-04 04:35:40'),
(1124, 'App\\Models\\User', 103, 'hydra-api-token', 'd47a0f38bdb07ad4067440a354b4df1faaa1692321a07d8a53f84e9571419701', '[\"user\"]', '2023-12-07 10:38:13', '2023-12-03 11:39:17', '2023-12-07 10:38:13'),
(1125, 'App\\Models\\User', 103, 'hydra-api-token', '4dee40b999ecf7a20b3ad68dfcef67e92fb656376f351b2141e0b91ad0d40860', '[\"user\"]', '2023-12-03 12:07:35', '2023-12-03 11:43:05', '2023-12-03 12:07:35'),
(1126, 'App\\Models\\User', 100, 'hydra-api-token', '47c06228ee8302adadc40aa3aa906c42b2ce689c2ecfc0e0b6ac4c319b5ba373', '[\"admin\"]', '2023-12-03 13:20:09', '2023-12-03 12:08:56', '2023-12-03 13:20:09'),
(1127, 'App\\Models\\User', 103, 'hydra-api-token', 'bb4db61ca358070fba4ed0cfcab28fffbf10463fd012b432179562c78bbfabf1', '[\"user\"]', '2023-12-08 09:32:56', '2023-12-03 13:20:23', '2023-12-08 09:32:56'),
(1128, 'App\\Models\\User', 102, 'hydra-api-token', '8368c2bf054e89c3dd3d0d337b1ba7f2ce6935c9c3b97ee4eecbda3b5235ddce', '[\"user\"]', '2023-12-04 05:43:15', '2023-12-04 04:37:06', '2023-12-04 05:43:15'),
(1129, 'App\\Models\\User', 102, 'hydra-api-token', '7745374a94f3196ea2cae3a9c1871a85a2988b0b6d0fb14a9ddbc2a01e024878', '[\"user\"]', '2023-12-04 06:38:38', '2023-12-04 04:49:56', '2023-12-04 06:38:38'),
(1130, 'App\\Models\\User', 102, 'hydra-api-token', '366a18e97ef0bedef7b2a1b605ff13fe1cd1051b8a1aae9c4552366a0c587231', '[\"user\"]', '2023-12-04 08:58:57', '2023-12-04 05:45:44', '2023-12-04 08:58:57'),
(1131, 'App\\Models\\User', 102, 'hydra-api-token', '74cf4d64422830546b1d0d56c1765834dd8d3d751ec19d446dfe972b2d8c9532', '[\"user\"]', '2023-12-05 04:20:53', '2023-12-04 05:47:21', '2023-12-05 04:20:53'),
(1132, 'App\\Models\\User', 102, 'hydra-api-token', '15d7aabe9d43fc52141bd6d82a12f0f2466277fc12fed825664c3c0c8df135fc', '[\"user\"]', '2023-12-05 04:03:20', '2023-12-04 05:47:44', '2023-12-05 04:03:20'),
(1133, 'App\\Models\\User', 102, 'hydra-api-token', '38d47995c10d1c7089989f5cf76d87c38bf2ef3efaf89bc0d84f1bda0d42aad7', '[\"user\"]', '2023-12-04 06:17:16', '2023-12-04 06:17:13', '2023-12-04 06:17:16'),
(1134, 'App\\Models\\User', 102, 'hydra-api-token', 'f02b2bcc8a8049d7d4a33977c3673f3eeaf34e0a5345e8e7cbc7110319937e27', '[\"user\"]', '2023-12-09 12:17:10', '2023-12-04 09:26:48', '2023-12-09 12:17:10'),
(1135, 'App\\Models\\User', 102, 'hydra-api-token', '370801c22a60befb16c5de3e08cf8ed9a7c0739308de36ec38de5e2e47658d4d', '[\"user\"]', '2023-12-05 06:37:53', '2023-12-04 09:28:02', '2023-12-05 06:37:53'),
(1136, 'App\\Models\\User', 103, 'hydra-api-token', 'd834c05a56a2052ad0ccd0bc6093fe7c29b09817466ccf9de0b4a63612e21387', '[\"user\"]', '2023-12-05 06:22:50', '2023-12-04 09:38:11', '2023-12-05 06:22:50'),
(1137, 'App\\Models\\User', 102, 'hydra-api-token', '446216c63f658ce2842ce245c31935ecf32232fb850534e8b2419ede43484e62', '[\"user\"]', '2023-12-10 07:21:06', '2023-12-04 09:38:30', '2023-12-10 07:21:06'),
(1138, 'App\\Models\\User', 100, 'hydra-api-token', '8caf3b9c92d4073983936b1ab26f27e0ef1e1b8589c116e53d0c857ceb621843', '[\"admin\"]', '2023-12-05 06:19:11', '2023-12-04 09:40:44', '2023-12-05 06:19:11'),
(1139, 'App\\Models\\User', 102, 'hydra-api-token', '5d3c6dd6a56a0f788127ad62bd2ae1aafff3d34a1a5a015153fd6f173609ddc5', '[\"user\"]', '2023-12-04 11:08:58', '2023-12-04 11:06:45', '2023-12-04 11:08:58'),
(1140, 'App\\Models\\User', 102, 'hydra-api-token', '4fd0f251007c9435fccb6151e1ffe0d72cf10babd45e581b2fb29805351382bc', '[\"user\"]', '2023-12-20 10:02:58', '2023-12-04 11:17:01', '2023-12-20 10:02:58'),
(1141, 'App\\Models\\User', 105, 'hydra-api-token', '14520425e0cb1a0fb7cfd485ed11c62a13b400b9a4238e81f63a9b24f9574e78', '[\"user\"]', '2023-12-21 23:36:17', '2023-12-04 23:28:03', '2023-12-21 23:36:17'),
(1142, 'App\\Models\\User', 102, 'hydra-api-token', '282610809dcbd21869b823f99fd0c81b161289b4ce15b7990d65a68c4e1da25b', '[\"user\"]', '2023-12-10 09:38:24', '2023-12-05 05:34:35', '2023-12-10 09:38:24'),
(1143, 'App\\Models\\User', 109, 'hydra-api-token', 'dd944e61743000969653e00c3de49c2304bb58e4ad1651259dd67e0e15abd2ca', '[\"user\"]', '2023-12-05 07:26:33', '2023-12-05 06:19:26', '2023-12-05 07:26:33'),
(1144, 'App\\Models\\User', 102, 'hydra-api-token', '899ceff0b25545206b7bd6ed02a0b1037d31272042b9db981283e72d5e3bba7a', '[\"user\"]', '2023-12-10 09:55:57', '2023-12-05 06:22:58', '2023-12-10 09:55:57'),
(1145, 'App\\Models\\User', 102, 'hydra-api-token', '4bf0a7b800bd224c85b8734d465b08123d6701da1befd2ee1a8dc7cf6d82ea40', '[\"user\"]', '2023-12-06 05:22:08', '2023-12-05 06:38:17', '2023-12-06 05:22:08'),
(1146, 'App\\Models\\User', 102, 'hydra-api-token', '7993a172cb1a0f7688e8781adeaa15829ed8bae27951d2863abe80c63c087a23', '[\"user\"]', '2023-12-05 11:29:13', '2023-12-05 06:43:07', '2023-12-05 11:29:13'),
(1147, 'App\\Models\\User', 103, 'hydra-api-token', '17fe08a999087816955032f7f36087fc9068690ed8ef499f788b619e1cdc3550', '[\"user\"]', '2023-12-05 07:33:26', '2023-12-05 07:27:10', '2023-12-05 07:33:26'),
(1148, 'App\\Models\\User', 103, 'hydra-api-token', '132d57118d8e52a0aaecb6e9ad0888959df4cfc52806216ea84017fd0ab81909', '[\"user\"]', '2023-12-05 07:45:27', '2023-12-05 07:34:28', '2023-12-05 07:45:27'),
(1149, 'App\\Models\\User', 103, 'hydra-api-token', 'c0f5314f5c3609af8ede1980a8b666fa4ce09fcc945bf8808155c420b3ef3d83', '[\"user\"]', '2023-12-05 10:50:07', '2023-12-05 07:45:40', '2023-12-05 10:50:07'),
(1150, 'App\\Models\\User', 102, 'hydra-api-token', '3b725a6cfae6105ab1143e273e65c9a3cf93d58209ed722d36c58634f8542279', '[\"user\"]', '2023-12-05 09:05:29', '2023-12-05 09:02:32', '2023-12-05 09:05:29'),
(1151, 'App\\Models\\User', 102, 'hydra-api-token', '8b6762cb3969b5f5a5590d2838869dc88f7ab5b8af79b362cbb10c381b9beac2', '[\"user\"]', '2023-12-05 09:43:31', '2023-12-05 09:28:15', '2023-12-05 09:43:31'),
(1152, 'App\\Models\\User', 102, 'hydra-api-token', '8b89b0ddf8f84a1566613da7c2825b84fdbfcf7960853e17ac146769f8fab242', '[\"user\"]', '2023-12-05 09:49:46', '2023-12-05 09:49:44', '2023-12-05 09:49:46'),
(1153, 'App\\Models\\User', 102, 'hydra-api-token', 'b6a23f416de1022f1b26842f18c84bec91fb70b94d7a1bdc9d5fa7c50818ad5e', '[\"user\"]', '2023-12-05 09:50:22', '2023-12-05 09:50:20', '2023-12-05 09:50:22'),
(1154, 'App\\Models\\User', 102, 'hydra-api-token', '3e44bd06ca548b33022e14bf51df97b7ef8b630ac47a0d92828e45fa12052a95', '[\"user\"]', '2023-12-05 09:51:34', '2023-12-05 09:51:30', '2023-12-05 09:51:34'),
(1155, 'App\\Models\\User', 102, 'hydra-api-token', '1cfec59840ed50978357f341b3406aa577873deae7abd8e3edef4f93897f29a9', '[\"user\"]', '2023-12-05 09:51:53', '2023-12-05 09:51:49', '2023-12-05 09:51:53'),
(1156, 'App\\Models\\User', 102, 'hydra-api-token', '81469d740b6e18ce52443d97e13f45c1d19b4f89ceb9afec1f01ace0532bca5a', '[\"user\"]', '2023-12-05 09:58:23', '2023-12-05 09:53:33', '2023-12-05 09:58:23'),
(1157, 'App\\Models\\User', 102, 'hydra-api-token', 'b3f333c13f74af6e415e5bb9e6e36de43599637393b6721244de8fbd2734fbc6', '[\"user\"]', '2023-12-05 10:00:20', '2023-12-05 10:00:15', '2023-12-05 10:00:20'),
(1158, 'App\\Models\\User', 102, 'hydra-api-token', '3c21f16196dfcf17dada70a35575e293a7f7eda4e9282ceb4ceafb11ed00b2b7', '[\"user\"]', '2023-12-05 10:00:42', '2023-12-05 10:00:37', '2023-12-05 10:00:42'),
(1159, 'App\\Models\\User', 102, 'hydra-api-token', '38faff015fb6224e4401583ff4b622900c29aed6114320a00da418826a0a9cba', '[\"user\"]', '2023-12-05 10:00:54', '2023-12-05 10:00:50', '2023-12-05 10:00:54'),
(1160, 'App\\Models\\User', 102, 'hydra-api-token', '16b76ad3e83c57d3f4993eb7f468a8baa036070cff56c462620f0402230a79e3', '[\"user\"]', '2023-12-05 11:18:16', '2023-12-05 10:02:30', '2023-12-05 11:18:16'),
(1161, 'App\\Models\\User', 100, 'hydra-api-token', 'f797e76690282b158dd11877418c763594c06fc5719da69217a93a5fd4fc8ae4', '[\"admin\"]', '2023-12-06 06:54:20', '2023-12-05 10:50:26', '2023-12-06 06:54:20'),
(1162, 'App\\Models\\User', 102, 'hydra-api-token', '348415c666fc193fc853fcc8b6188be90d0616575f69ebd8ae8efe82a509fe3d', '[\"user\"]', '2023-12-05 11:20:21', '2023-12-05 11:20:16', '2023-12-05 11:20:21'),
(1163, 'App\\Models\\User', 102, 'hydra-api-token', '2c5f2645ea2743dd68ea8b69ff60c42a2909be75ec96040245d590a429b3f320', '[\"user\"]', '2023-12-05 11:21:05', '2023-12-05 11:20:28', '2023-12-05 11:21:05'),
(1164, 'App\\Models\\User', 102, 'hydra-api-token', '93af0e83c44821f45080c6478c5a557e6b7a4354056c777976874c3ef2de2e99', '[\"user\"]', '2023-12-05 11:22:08', '2023-12-05 11:22:05', '2023-12-05 11:22:08'),
(1165, 'App\\Models\\User', 102, 'hydra-api-token', 'cf0ee6bb50ede20f65b41d68b5029060b50a34a8d5112a24aba34066c33a0024', '[\"user\"]', '2023-12-05 11:24:09', '2023-12-05 11:22:43', '2023-12-05 11:24:09'),
(1166, 'App\\Models\\User', 102, 'hydra-api-token', 'b2187c0a9da25543567c87719143547f5b1af5d4ef4314146ae0146a27acd64f', '[\"user\"]', '2023-12-05 11:27:25', '2023-12-05 11:27:09', '2023-12-05 11:27:25'),
(1167, 'App\\Models\\User', 102, 'hydra-api-token', '38cfb28bf65bcdcb2608b47642f02c23173be23b27a57150a5f5d0a3a8794f0a', '[\"user\"]', '2023-12-05 11:27:43', '2023-12-05 11:27:41', '2023-12-05 11:27:43'),
(1168, 'App\\Models\\User', 102, 'hydra-api-token', '6acfcdca3ed60b2ff8cfc49e020a4559946ae0ecd4bda89b4e1ae15634d0e3ba', '[\"user\"]', '2023-12-05 11:30:45', '2023-12-05 11:30:43', '2023-12-05 11:30:45'),
(1169, 'App\\Models\\User', 102, 'hydra-api-token', 'bc0e485826b21365e817b5ba20a7b4a2d2781848b2819b943b0d4eb5bf9b0e0a', '[\"user\"]', '2023-12-05 11:30:58', '2023-12-05 11:30:53', '2023-12-05 11:30:58'),
(1170, 'App\\Models\\User', 102, 'hydra-api-token', 'b0bbb37f8522a0215994f2cbff0f983d8d36672b54b5698bcefcfb9ce4d91b72', '[\"user\"]', '2023-12-05 11:31:09', '2023-12-05 11:31:05', '2023-12-05 11:31:09'),
(1171, 'App\\Models\\User', 102, 'hydra-api-token', '210a77070b46c6c27ce904b3ce8fccdca562cd3adfa43a6da1651a1339429d02', '[\"user\"]', '2023-12-05 11:31:33', '2023-12-05 11:31:29', '2023-12-05 11:31:33'),
(1172, 'App\\Models\\User', 102, 'hydra-api-token', '47c365686ac13dd69883347bb80017d201a047ab67d52d99b73e77d22838e9ce', '[\"user\"]', '2023-12-05 11:31:58', '2023-12-05 11:31:51', '2023-12-05 11:31:58'),
(1173, 'App\\Models\\User', 102, 'hydra-api-token', '70ad1ef27abf913cf74de11a84ec801b6df51364a5ad484151674b3428d5574b', '[\"user\"]', '2023-12-06 10:34:58', '2023-12-05 11:33:30', '2023-12-06 10:34:58'),
(1174, 'App\\Models\\User', 102, 'hydra-api-token', 'a18e6982a3ab207c13957b0aad0ff1797329fb49da7c8c154b82ae930e23c720', '[\"user\"]', '2023-12-05 11:35:51', '2023-12-05 11:35:30', '2023-12-05 11:35:51'),
(1175, 'App\\Models\\User', 102, 'hydra-api-token', '5a67a10c641c3f93313b2655a1048d069b543ab9018af9ba1b0d1e780b674a72', '[\"user\"]', '2023-12-05 11:38:24', '2023-12-05 11:38:22', '2023-12-05 11:38:24'),
(1176, 'App\\Models\\User', 102, 'hydra-api-token', '5c1de91116f0f0232f2b78f789e1b752bb1009924703c9d12eef636f29b2d69c', '[\"user\"]', '2023-12-05 11:38:37', '2023-12-05 11:38:32', '2023-12-05 11:38:37'),
(1177, 'App\\Models\\User', 102, 'hydra-api-token', '3c47d5f1cda828086608d45bd6bc257a35be712c785e7d7e395ec7745e901c5d', '[\"user\"]', '2023-12-05 11:38:48', '2023-12-05 11:38:44', '2023-12-05 11:38:48'),
(1178, 'App\\Models\\User', 102, 'hydra-api-token', 'a1a1a8b51b76850c95a37aad73f88a69316849305904f19db1ce5266ac762273', '[\"user\"]', '2023-12-05 11:38:59', '2023-12-05 11:38:55', '2023-12-05 11:38:59'),
(1179, 'App\\Models\\User', 102, 'hydra-api-token', 'e91cdc02f393f8b8465a33c2150cca207f1112f1adbe8299f8ac03582a888aee', '[\"user\"]', '2023-12-05 11:39:13', '2023-12-05 11:39:07', '2023-12-05 11:39:13'),
(1180, 'App\\Models\\User', 102, 'hydra-api-token', '3fc65e9454fbbcbf5b16ca1a8c0058e5b1dd948a4345375d0b9fce617d98857d', '[\"user\"]', '2023-12-05 11:43:03', '2023-12-05 11:42:38', '2023-12-05 11:43:03'),
(1181, 'App\\Models\\User', 102, 'hydra-api-token', '196943a41fc41941232047c567d88e10c6f94c84cf4fc7f5a590e13a3cc3ff1c', '[\"user\"]', '2023-12-05 11:56:20', '2023-12-05 11:56:18', '2023-12-05 11:56:20'),
(1182, 'App\\Models\\User', 102, 'hydra-api-token', '810ddc2210a91c931131d84de3da0a10d30769e685d9155ad88524f3adb6938b', '[\"user\"]', '2023-12-05 11:56:32', '2023-12-05 11:56:31', '2023-12-05 11:56:32'),
(1183, 'App\\Models\\User', 102, 'hydra-api-token', '133405f64822acbc17f28b1a41f830be4d66570dbca736709ae08b611afeaec3', '[\"user\"]', '2023-12-05 11:57:41', '2023-12-05 11:57:37', '2023-12-05 11:57:41'),
(1184, 'App\\Models\\User', 102, 'hydra-api-token', '4c4c0b83605a2e827a6d4f13d5eb9995a7cb49956ccbef933be9fea47c364076', '[\"user\"]', '2023-12-05 11:57:54', '2023-12-05 11:57:49', '2023-12-05 11:57:54'),
(1185, 'App\\Models\\User', 102, 'hydra-api-token', '04b33034d75a7cf2ea47068094c648bd0135cad8d7c44aacee250789e5c82cc6', '[\"user\"]', '2023-12-05 11:58:05', '2023-12-05 11:58:01', '2023-12-05 11:58:05'),
(1186, 'App\\Models\\User', 102, 'hydra-api-token', '6bd3b457ed06f9f97880b0677d2ee51f993a5ad435413299e3d9184c0b5cc8b9', '[\"user\"]', '2023-12-05 11:58:16', '2023-12-05 11:58:12', '2023-12-05 11:58:16'),
(1187, 'App\\Models\\User', 102, 'hydra-api-token', 'f857a3b232f6765a4ae66b83fafe81037e40362595399811edef4720f131a34d', '[\"user\"]', '2023-12-05 11:58:30', '2023-12-05 11:58:24', '2023-12-05 11:58:30'),
(1188, 'App\\Models\\User', 102, 'hydra-api-token', '1dc4ff8bfc6216a0365db57ce6bfd89e765e5c95703ea91a3fcf59905cd1f2d8', '[\"user\"]', '2023-12-05 11:58:39', '2023-12-05 11:58:36', '2023-12-05 11:58:39'),
(1189, 'App\\Models\\User', 102, 'hydra-api-token', '4cf6bdba02c5f4c0ea11760341b45ffbf1be443c3251a79c64a6ddf8281e3d94', '[\"user\"]', '2023-12-05 11:58:49', '2023-12-05 11:58:47', '2023-12-05 11:58:49'),
(1190, 'App\\Models\\User', 102, 'hydra-api-token', '8bd50d1fc10075b612efdac9a5120b5d98389f0a7b65c6849827466612319d06', '[\"user\"]', '2023-12-05 11:58:59', '2023-12-05 11:58:56', '2023-12-05 11:58:59'),
(1191, 'App\\Models\\User', 102, 'hydra-api-token', '5e94674ba1621c85d7e48c354aaf1207d4ef1ffa8f5e9ee0b008bb85ebd64808', '[\"user\"]', '2023-12-05 11:59:16', '2023-12-05 11:59:14', '2023-12-05 11:59:16'),
(1192, 'App\\Models\\User', 102, 'hydra-api-token', '8d700032a34ce39825ded9ce23f181734799cd0b69303e68aa13c27b40face00', '[\"user\"]', '2023-12-06 04:08:47', '2023-12-06 04:08:24', '2023-12-06 04:08:47'),
(1193, 'App\\Models\\User', 102, 'hydra-api-token', '3e4398a3ba845916039b58cc5176f22b3f489c60c613e05cdb46334c9e69648e', '[\"user\"]', '2023-12-06 04:36:01', '2023-12-06 04:26:28', '2023-12-06 04:36:01'),
(1194, 'App\\Models\\User', 102, 'hydra-api-token', '1d14651fb51bc936fe87d01127090d0bcc0ca1972ab6e944071b86c02e8be046', '[\"user\"]', '2023-12-06 09:26:24', '2023-12-06 04:40:50', '2023-12-06 09:26:24'),
(1195, 'App\\Models\\User', 102, 'hydra-api-token', 'fbe414b1a32fbd81899ebdf7b68c3023e6d3fedb401c56534e1330dace11aa86', '[\"user\"]', '2023-12-23 10:53:09', '2023-12-06 05:16:21', '2023-12-23 10:53:09'),
(1196, 'App\\Models\\User', 102, 'hydra-api-token', 'f334869979c1333ef8af4020f878db0717f4e2f67aea82b2f95798b49a6ab8bd', '[\"user\"]', '2023-12-06 06:03:33', '2023-12-06 06:03:31', '2023-12-06 06:03:33'),
(1197, 'App\\Models\\User', 109, 'hydra-api-token', 'fb758384a3f1913cb3a1a1e01b8d793b9db4e4cfdba580e1e0b899fb7c33a2dd', '[\"user\"]', '2023-12-06 07:50:29', '2023-12-06 06:54:29', '2023-12-06 07:50:29'),
(1198, 'App\\Models\\User', 103, 'hydra-api-token', '29b0c0ef2527f07e930623d2346ada2940e0a9337ed6b5feef1c0bcd93b1c9ff', '[\"user\"]', '2023-12-09 07:14:29', '2023-12-06 07:50:36', '2023-12-09 07:14:29'),
(1199, 'App\\Models\\User', 109, 'hydra-api-token', 'e8dc1970022a2a00a205726f0c290ba9c51ab2860789f0e8e8181227f5e26981', '[\"user\"]', NULL, '2023-12-06 08:36:29', '2023-12-06 08:36:29'),
(1200, 'App\\Models\\User', 102, 'hydra-api-token', '84efe716f5a96e23610b533cc99036866bf55c5443734fbf923fbb8b77eeeb85', '[\"user\"]', NULL, '2023-12-06 08:37:00', '2023-12-06 08:37:00'),
(1201, 'App\\Models\\User', 102, 'hydra-api-token', '1d0e49ae12e82525cf49841d548126e2d38de84528574f616e1c4c6e56b770a2', '[\"user\"]', NULL, '2023-12-06 08:53:09', '2023-12-06 08:53:09'),
(1202, 'App\\Models\\User', 102, 'hydra-api-token', '359b2c4a14a75dea579e895be8c77996a2a001a5db10cc764adbbabc2c58ee28', '[\"user\"]', '2023-12-06 08:55:29', '2023-12-06 08:55:26', '2023-12-06 08:55:29'),
(1203, 'App\\Models\\User', 102, 'hydra-api-token', '21222d3068811929db9a000f98ee94b719f6ff0a5ec3ccd438d2860493d276b4', '[\"user\"]', NULL, '2023-12-06 09:00:04', '2023-12-06 09:00:04'),
(1204, 'App\\Models\\User', 102, 'hydra-api-token', '5860499d3cdddcb2eb097f3ec1681baa470714754a89b9df7f8eadbfe3447d96', '[\"user\"]', NULL, '2023-12-06 09:01:55', '2023-12-06 09:01:55'),
(1205, 'App\\Models\\User', 102, 'hydra-api-token', 'b93c3886c1219ba359f136b607c0beb73baded8f37aec6e58d886b836702166b', '[\"user\"]', NULL, '2023-12-06 09:02:07', '2023-12-06 09:02:07'),
(1206, 'App\\Models\\User', 102, 'hydra-api-token', '487673fd14009ee251d67d493e65b0ae5128b4540bae89ea754afe41cb92f413', '[\"user\"]', NULL, '2023-12-06 09:05:08', '2023-12-06 09:05:08'),
(1207, 'App\\Models\\User', 102, 'hydra-api-token', 'e081ab6e5c5632796ae797243c7d45071e04facbd6ad5c30aafbd3acb83667a5', '[\"user\"]', NULL, '2023-12-06 09:07:31', '2023-12-06 09:07:31'),
(1208, 'App\\Models\\User', 102, 'hydra-api-token', '816d996b073bcf2dcdf8b65ad1616456d7405f3a431315a29e93192c6492c8a5', '[\"user\"]', NULL, '2023-12-06 09:07:54', '2023-12-06 09:07:54'),
(1209, 'App\\Models\\User', 102, 'hydra-api-token', '9ee0eaaef4763aba15c8acbe7090fbbf6b7fdc48ca254b093b11b3aea608dac9', '[\"user\"]', '2023-12-06 10:12:09', '2023-12-06 09:08:17', '2023-12-06 10:12:09'),
(1210, 'App\\Models\\User', 102, 'hydra-api-token', '90561140f52a70944a1d62c6a9335d1c8ff75c9e4ef6514a657fc8eac470a130', '[\"user\"]', '2023-12-07 04:41:51', '2023-12-06 10:35:23', '2023-12-07 04:41:51'),
(1211, 'App\\Models\\User', 102, 'hydra-api-token', 'f584942a8bc3459fd947fe0d9a58d2b5730313cece58751ead836830b3325a2e', '[\"user\"]', '2023-12-09 09:31:10', '2023-12-06 12:15:05', '2023-12-09 09:31:10'),
(1212, 'App\\Models\\User', 102, 'hydra-api-token', 'c92a4ecab0aaf860640834916741d60fd797497d3188d56a4f1dc691b827d1fa', '[\"user\"]', '2023-12-11 05:12:31', '2023-12-07 04:42:15', '2023-12-11 05:12:31'),
(1213, 'App\\Models\\User', 102, 'hydra-api-token', '85ae86cf84d4e62adc813387146ac6c90bcdc172f50025879f71bd781a464f46', '[\"user\"]', '2023-12-07 08:53:08', '2023-12-07 08:36:02', '2023-12-07 08:53:08'),
(1214, 'App\\Models\\User', 102, 'hydra-api-token', '944b60c07674a226e7ac059a7a1e6c269af406d1fc8a41b12e7ac301274a2770', '[\"user\"]', NULL, '2023-12-07 08:37:04', '2023-12-07 08:37:04'),
(1215, 'App\\Models\\User', 102, 'hydra-api-token', '93fb68f6ae0d5b4d18e590c99fadf19c81af70463a4290606f49d197b7c2720a', '[\"user\"]', '2023-12-07 13:07:00', '2023-12-07 08:49:02', '2023-12-07 13:07:00'),
(1216, 'App\\Models\\User', 102, 'hydra-api-token', '978560326f03c958bd7e0c3aee556d252f38d467247aec2b4cf5c4173450b64e', '[\"user\"]', '2024-01-23 10:39:01', '2023-12-07 08:53:26', '2024-01-23 10:39:01'),
(1217, 'App\\Models\\User', 102, 'hydra-api-token', '8e31044fd4e09473b50c2c05fa50f0315209c251b7e7dc40be4fa448d16b677a', '[\"user\"]', '2023-12-07 08:57:22', '2023-12-07 08:56:56', '2023-12-07 08:57:22'),
(1218, 'App\\Models\\User', 102, 'hydra-api-token', '82d8ae4b7457a2eb03ac76d2056468df5cc57b4c278f98eec0460b89a801734e', '[\"user\"]', '2023-12-07 09:04:44', '2023-12-07 09:03:48', '2023-12-07 09:04:44'),
(1219, 'App\\Models\\User', 102, 'hydra-api-token', '76f578a1facae45a92ecb8b39aaf9344b1e7de27bf1cf18dfe381676965e5ff5', '[\"user\"]', '2023-12-18 13:11:35', '2023-12-07 14:01:50', '2023-12-18 13:11:35'),
(1220, 'App\\Models\\User', 95, 'hydra-api-token', '6cd6304b6876a3c4d0e4ad80424dec9e4410e2be1f95955154f9d8d6102b0775', '[\"user\"]', '2023-12-08 09:47:55', '2023-12-08 09:33:54', '2023-12-08 09:47:55'),
(1221, 'App\\Models\\User', 100, 'hydra-api-token', 'c37b5dcb7a9f8159ea045910b8ae2643ef3e1fa62b998d3ea97488360bb465d0', '[\"admin\"]', '2023-12-09 09:27:51', '2023-12-08 09:48:27', '2023-12-09 09:27:51'),
(1222, 'App\\Models\\User', 102, 'hydra-api-token', '1076f0f1f8acb063f6c5b280a80feafa7b2f3c297ec9fe168fdcac3f9ae23cba', '[\"user\"]', '2023-12-09 09:25:42', '2023-12-08 15:42:07', '2023-12-09 09:25:42'),
(1223, 'App\\Models\\User', 102, 'hydra-api-token', '7eb08c83b4b311de7abcf9c20c734a288fb5e88cb8a49b6f72ee1de336b985fb', '[\"user\"]', '2023-12-09 05:00:16', '2023-12-09 04:46:03', '2023-12-09 05:00:16'),
(1224, 'App\\Models\\User', 109, 'hydra-api-token', '61b6cf24b6738199c67d1610a9b8a2b9aaca214060f61f843de0d9f72e974179', '[\"user\"]', '2023-12-09 07:15:05', '2023-12-09 07:14:43', '2023-12-09 07:15:05'),
(1225, 'App\\Models\\User', 100, 'hydra-api-token', '62b4d59d7b437323026da3362ed20c3c4e3f378303fbf04c692ea0a59938b4c6', '[\"admin\"]', '2023-12-09 07:33:28', '2023-12-09 07:16:28', '2023-12-09 07:33:28'),
(1226, 'App\\Models\\User', 103, 'hydra-api-token', 'b39b9bfa343a5ccd0c5835422d1c01b58add406dfe91ecfc03c264d484a21497', '[\"user\"]', '2023-12-09 08:13:29', '2023-12-09 07:40:29', '2023-12-09 08:13:29'),
(1227, 'App\\Models\\User', 100, 'hydra-api-token', 'a6d6f2791032b6a65f08d094a9c7bd58c808b749d3911098ac710098336a24b3', '[\"admin\"]', '2023-12-09 08:44:05', '2023-12-09 08:16:43', '2023-12-09 08:44:05'),
(1228, 'App\\Models\\User', 109, 'hydra-api-token', 'c98e10217267e66b2a7373426a6f05ada42c174758d8089aa9e581cdaf2d341a', '[\"user\"]', '2023-12-09 09:21:46', '2023-12-09 08:44:24', '2023-12-09 09:21:46'),
(1229, 'App\\Models\\User', 103, 'hydra-api-token', '30e87af9a484d6689c978693d91c54052c06abadbf202434cb883bab6403d416', '[\"user\"]', '2023-12-09 09:45:53', '2023-12-09 09:28:07', '2023-12-09 09:45:53'),
(1230, 'App\\Models\\User', 103, 'hydra-api-token', '7f96d75e1122d6e2f7e2fb49094a9f739283566683b99d5ed6ab26e53434aab3', '[\"user\"]', '2023-12-09 09:34:21', '2023-12-09 09:32:47', '2023-12-09 09:34:21'),
(1231, 'App\\Models\\User', 109, 'hydra-api-token', 'b4262ab6df433a9c6c5c05e1dbc2c3b05fc30b1795441375998b89a06d3c5166', '[\"user\"]', '2023-12-09 09:35:26', '2023-12-09 09:34:50', '2023-12-09 09:35:26'),
(1232, 'App\\Models\\User', 102, 'hydra-api-token', '0c782ee13d73181077f2d0a6563ffe6ad983710396c8ea3bb9b3c21fbd4ec4fe', '[\"user\"]', NULL, '2023-12-09 09:36:01', '2023-12-09 09:36:01'),
(1233, 'App\\Models\\User', 102, 'hydra-api-token', '4a3758b6dc06478ffaece00b01738cd4d782a32454a7cc40f8e890449ab50c20', '[\"user\"]', '2023-12-09 12:31:50', '2023-12-09 09:38:23', '2023-12-09 12:31:50'),
(1234, 'App\\Models\\User', 100, 'hydra-api-token', 'c0162363891f2b16764a99cc3efeb9b3f083d74d9ce51966ac61ccc1393f6598', '[\"admin\"]', '2023-12-11 08:23:49', '2023-12-09 09:46:47', '2023-12-11 08:23:49'),
(1235, 'App\\Models\\User', 109, 'hydra-api-token', '7c4904a31f0ad40722678fa8fb4717afd27808f7232677fa332ea1da7596918e', '[\"user\"]', '2023-12-09 09:58:03', '2023-12-09 09:54:11', '2023-12-09 09:58:03'),
(1236, 'App\\Models\\User', 109, 'hydra-api-token', 'ca7c83aa9fa23c185b1e54030b4ddcbd70dd8938175a426a9511afb6db5c1e8e', '[\"user\"]', '2023-12-10 07:07:41', '2023-12-09 11:06:26', '2023-12-10 07:07:41'),
(1237, 'App\\Models\\User', 102, 'hydra-api-token', '77e03ead867e59ab67c4985995a5eb639c03f59f0334152639c2841e9c209bb7', '[\"user\"]', '2023-12-10 09:08:27', '2023-12-09 11:07:42', '2023-12-10 09:08:27'),
(1238, 'App\\Models\\User', 100, 'hydra-api-token', '962da4981b726e9dd524d30be6a7265ed593a6e0d6aa5e0b5f4304a6ba562dc5', '[\"admin\"]', '2023-12-09 11:10:38', '2023-12-09 11:10:13', '2023-12-09 11:10:38'),
(1239, 'App\\Models\\User', 105, 'hydra-api-token', 'fab1362da3b64840f0d9f1f39aa92e6db1fe4610c16cdb644fa3c4c2dfc5ac7c', '[\"user\"]', NULL, '2023-12-09 11:10:56', '2023-12-09 11:10:56'),
(1240, 'App\\Models\\User', 105, 'hydra-api-token', '36ce72b99461fb77ee30a08c67d006aa17831efe47b289a9e6dc14f009da606a', '[\"user\"]', '2023-12-09 11:11:01', '2023-12-09 11:10:56', '2023-12-09 11:11:01'),
(1241, 'App\\Models\\User', 105, 'hydra-api-token', '86ac176229751e185524d627658d5f9e6b5f68bfc837a9886eb6d81a9d5d8206', '[\"user\"]', '2023-12-10 08:02:01', '2023-12-09 11:23:08', '2023-12-10 08:02:01'),
(1242, 'App\\Models\\User', 109, 'hydra-api-token', '6897b48f08651a7a8388af3f051d070f7752282101a2993cc91321f3af2a5874', '[\"user\"]', '2023-12-09 11:26:38', '2023-12-09 11:23:19', '2023-12-09 11:26:38'),
(1243, 'App\\Models\\User', 105, 'hydra-api-token', '549f3a7aad58b739ed7d97f75255b009625174e129791e25f3f894e756977c72', '[\"user\"]', '2023-12-10 05:28:59', '2023-12-09 11:32:49', '2023-12-10 05:28:59'),
(1244, 'App\\Models\\User', 102, 'hydra-api-token', 'f5e864790ed329ec5ee1994181cfdb2d93a0fd922147151dbfc87a9773acc048', '[\"user\"]', '2023-12-11 06:51:16', '2023-12-09 12:33:30', '2023-12-11 06:51:16'),
(1245, 'App\\Models\\User', 102, 'hydra-api-token', '764fd2ae18d6c4ce0c2005e0de154aa18c728e6503db9f52b3d61feafc5730ab', '[\"user\"]', '2023-12-09 17:51:06', '2023-12-09 17:50:14', '2023-12-09 17:51:06'),
(1246, 'App\\Models\\User', 102, 'hydra-api-token', '4b925b7e81f5bd6e7b822487b8f4f316d5ba86c10bbaddcb3e9d51722f5f5f67', '[\"user\"]', '2023-12-10 07:05:39', '2023-12-10 04:32:52', '2023-12-10 07:05:39'),
(1247, 'App\\Models\\User', 109, 'hydra-api-token', '6ad6536a222231f6444c7c81c7abdda995081bba13073379984eb1faac16a2f1', '[\"user\"]', '2023-12-10 06:16:09', '2023-12-10 05:29:16', '2023-12-10 06:16:09'),
(1248, 'App\\Models\\User', 100, 'hydra-api-token', 'd213bdabbd1532959d54cb8d303af23e6b789b6dedd12376498323f01cf8efd9', '[\"admin\"]', '2023-12-10 06:48:02', '2023-12-10 06:20:55', '2023-12-10 06:48:02'),
(1249, 'App\\Models\\User', 100, 'hydra-api-token', '72480e57e57c86fc3d0ede4219d5f124e8a1a22caf5d6a11f8e104ee22ce93ea', '[\"admin\"]', '2023-12-10 09:22:51', '2023-12-10 06:38:51', '2023-12-10 09:22:51'),
(1250, 'App\\Models\\User', 100, 'hydra-api-token', '50351b2d8f82a8692cb9d0027d9e874f8b258cffa26bdf8f0ebbb94b7c8eebb8', '[\"admin\"]', '2023-12-10 06:55:16', '2023-12-10 06:51:46', '2023-12-10 06:55:16'),
(1251, 'App\\Models\\User', 100, 'hydra-api-token', 'ed78eedb97eb74f20767e943bc08d33baec3c849836557816ddbcbda984f24ab', '[\"admin\"]', '2023-12-10 07:01:36', '2023-12-10 06:56:06', '2023-12-10 07:01:36'),
(1252, 'App\\Models\\User', 100, 'hydra-api-token', '90d0ed153797ff00a10818ba38d254c48f3de94dcf7a0b1ddbb1e0d3a7b14b28', '[\"admin\"]', '2023-12-10 07:41:41', '2023-12-10 07:05:04', '2023-12-10 07:41:41'),
(1253, 'App\\Models\\User', 110, 'hydra-api-token', '6b107a2107c652863b0ce0ffeb9362693d5b627d03c89d396e8196ec313e7083', '[\"user\"]', '2023-12-10 07:08:28', '2023-12-10 07:08:11', '2023-12-10 07:08:28'),
(1254, 'App\\Models\\User', 109, 'hydra-api-token', '083564d7109421fa9019c18e362e7e606d646568868533f1ca63c450c7617d52', '[\"user\"]', '2023-12-10 08:45:23', '2023-12-10 07:19:34', '2023-12-10 08:45:23'),
(1255, 'App\\Models\\User', 102, 'hydra-api-token', '4e1cad956dad66d93e45188500244d6f67dea4214f93fa44e81b2e0f1d149b8a', '[\"user\"]', '2023-12-10 08:17:25', '2023-12-10 07:21:10', '2023-12-10 08:17:25'),
(1256, 'App\\Models\\User', 102, 'hydra-api-token', '77e0f41db308a965c46fbff5dfbfccaf43ddc50fa064b89e262e4e52674a0f5e', '[\"user\"]', '2023-12-10 07:27:20', '2023-12-10 07:21:19', '2023-12-10 07:27:20'),
(1257, 'App\\Models\\User', 102, 'hydra-api-token', 'b764f5b1e03badb42eb71dc7c7135d0cc93dd103ff8ec83823154e0359518724', '[\"user\"]', '2023-12-23 04:24:07', '2023-12-10 07:21:29', '2023-12-23 04:24:07'),
(1258, 'App\\Models\\User', 102, 'hydra-api-token', 'e7adf00ac361c2d98c1ec1248345e68f7be7134e4e6377f46052144452041022', '[\"user\"]', '2023-12-10 07:28:44', '2023-12-10 07:27:17', '2023-12-10 07:28:44'),
(1259, 'App\\Models\\User', 109, 'hydra-api-token', '9c8ea3af79c79e4cdb7d9646002ae2fa97e7cdaaa8f6a9b4912928a9a602f5b1', '[\"user\"]', '2023-12-10 07:46:33', '2023-12-10 07:44:38', '2023-12-10 07:46:33'),
(1260, 'App\\Models\\User', 100, 'hydra-api-token', '1b580d0a8e720a90da66e0d13587ebc58a502e032792fe1374b9f34be9999ed6', '[\"admin\"]', '2023-12-10 08:33:29', '2023-12-10 08:33:28', '2023-12-10 08:33:29'),
(1261, 'App\\Models\\User', 110, 'hydra-api-token', 'b03b8f7dca4d42dc681e9bc58d1c2ced197e8580068f01c59ec474fa8fdf04db', '[\"user\"]', '2023-12-10 09:18:09', '2023-12-10 08:34:48', '2023-12-10 09:18:09'),
(1262, 'App\\Models\\User', 109, 'hydra-api-token', 'f64c213be69171b7c2d4f5726dac0058f1e5d2feac75b339644cab31ce1ea59d', '[\"user\"]', '2023-12-10 09:36:58', '2023-12-10 08:46:34', '2023-12-10 09:36:58'),
(1263, 'App\\Models\\User', 110, 'hydra-api-token', '43122eabf0be1d6a3271757b2250dd1b02c0b65d4df5dbb0ccc2acc640568a20', '[\"user\"]', '2023-12-10 08:58:12', '2023-12-10 08:48:29', '2023-12-10 08:58:12'),
(1264, 'App\\Models\\User', 102, 'hydra-api-token', '299f24fb1113645050ed18bafeffffb25a0a7d2c0453fc4ded234b05bea36eb3', '[\"user\"]', '2023-12-11 07:21:20', '2023-12-10 08:54:12', '2023-12-11 07:21:20'),
(1265, 'App\\Models\\User', 109, 'hydra-api-token', '353bac58ae69896307c13d855daac689f2be1e38ac555d933167d6f6b47b089d', '[\"user\"]', '2023-12-10 10:15:43', '2023-12-10 09:18:58', '2023-12-10 10:15:43'),
(1266, 'App\\Models\\User', 102, 'hydra-api-token', '18d517e94216ed79ae978f445ab4da76655c29200533c6cbd65e047a5df3b1b1', '[\"user\"]', '2023-12-10 09:27:59', '2023-12-10 09:27:46', '2023-12-10 09:27:59'),
(1267, 'App\\Models\\User', 109, 'hydra-api-token', '2ac49596f8d8ca29bf601ac23be0e51c7e235dad86d81b5ae4dc6cbdeee32900', '[\"user\"]', '2023-12-10 09:37:23', '2023-12-10 09:37:21', '2023-12-10 09:37:23'),
(1268, 'App\\Models\\User', 102, 'hydra-api-token', 'a1e8fc00aa273f019655342f8a0e309f1e706ab910eb54c5e32dc023787632eb', '[\"user\"]', '2023-12-11 11:03:37', '2023-12-10 09:39:02', '2023-12-11 11:03:37'),
(1269, 'App\\Models\\User', 109, 'hydra-api-token', '41bdac3956503711c5eafd5a8bac921a5d82d13c2d436ae3c51807f590806d7c', '[\"user\"]', '2023-12-10 09:48:34', '2023-12-10 09:44:13', '2023-12-10 09:48:34'),
(1270, 'App\\Models\\User', 102, 'hydra-api-token', 'aa8dd3a61df2ee83b57bec15d33395e0e738d879b5f6d0d8e101da8bbe1ec634', '[\"user\"]', '2023-12-10 09:46:48', '2023-12-10 09:46:47', '2023-12-10 09:46:48'),
(1271, 'App\\Models\\User', 109, 'hydra-api-token', '2119e680913396cefcd046d7b2807eeeb3397c3a5abea8d292d8c6773a7735b6', '[\"user\"]', '2023-12-10 10:36:20', '2023-12-10 09:50:52', '2023-12-10 10:36:20'),
(1272, 'App\\Models\\User', 102, 'hydra-api-token', 'aef7dc17f803e24acbba122e9889dc4702a755ab7564a576979249c58d089042', '[\"user\"]', '2023-12-10 09:57:48', '2023-12-10 09:54:47', '2023-12-10 09:57:48'),
(1273, 'App\\Models\\User', 109, 'hydra-api-token', '7db5332c220177616d18b8328104d8618235ac807ab7f1c8adac44254dfc1c6d', '[\"user\"]', '2023-12-10 09:59:00', '2023-12-10 09:55:31', '2023-12-10 09:59:00'),
(1274, 'App\\Models\\User', 109, 'hydra-api-token', '3e6d68a552e2476fb2ca9bd35d860a3445ac29c40eec23292d97b0db551598db', '[\"user\"]', '2023-12-10 10:17:10', '2023-12-10 09:56:28', '2023-12-10 10:17:10'),
(1275, 'App\\Models\\User', 109, 'hydra-api-token', '89ec751bb46ed842202e6f75dc32850dcf6a85ce12fda31e7fd422fe7a7a6723', '[\"user\"]', '2023-12-10 10:16:19', '2023-12-10 10:01:10', '2023-12-10 10:16:19'),
(1276, 'App\\Models\\User', 109, 'hydra-api-token', 'e52a868f4516c55a91e3090a90407c5c9176acbcc411f59b2bbd55fe9c5f6df2', '[\"user\"]', '2023-12-10 12:41:45', '2023-12-10 10:16:46', '2023-12-10 12:41:45'),
(1277, 'App\\Models\\User', 102, 'hydra-api-token', 'caa97e35f1f68c8c46a23cb75d6df8cd08b62ceda13e2bda1074a39f73ced00d', '[\"user\"]', '2023-12-10 10:17:30', '2023-12-10 10:17:22', '2023-12-10 10:17:30'),
(1278, 'App\\Models\\User', 102, 'hydra-api-token', 'd77845018720272bb8d4be8198a1558d539351f67a90c7560d78df7a6911f7a2', '[\"user\"]', '2023-12-10 10:18:26', '2023-12-10 10:18:24', '2023-12-10 10:18:26'),
(1279, 'App\\Models\\User', 109, 'hydra-api-token', '5a2825b6faea08ab24eddf1957d075e8ee4f51af2b628689cc9c23b6c4524503', '[\"user\"]', NULL, '2023-12-10 10:20:26', '2023-12-10 10:20:26'),
(1280, 'App\\Models\\User', 103, 'hydra-api-token', '45368bc055e9e202f207ef83f82028e388ac105eeede69f2b2f537bc0f2731bc', '[\"user\"]', '2023-12-10 10:23:22', '2023-12-10 10:23:20', '2023-12-10 10:23:22'),
(1281, 'App\\Models\\User', 109, 'hydra-api-token', '65d4c0750d4c779189e9cb1c3ebf00c46c11b31de725299b18f4237ef9f67785', '[\"user\"]', '2023-12-10 10:27:08', '2023-12-10 10:25:51', '2023-12-10 10:27:08'),
(1282, 'App\\Models\\User', 109, 'hydra-api-token', 'a3299a3856c82eb7acee4bf57b448c582c9221e90320945329cfe4eff01aa8ed', '[\"user\"]', '2023-12-10 12:06:54', '2023-12-10 10:26:41', '2023-12-10 12:06:54'),
(1283, 'App\\Models\\User', 102, 'hydra-api-token', '5d38b6f6e0eb38c645184b5777773b300aab503a7300dfce8040f7929d2e9a62', '[\"user\"]', '2024-01-03 04:18:53', '2023-12-10 10:35:37', '2024-01-03 04:18:53'),
(1284, 'App\\Models\\User', 102, 'hydra-api-token', '5d91cd3eefd8f434ee7f142da8cd987d6c1a6d875e4a2a13d334743b17e0c212', '[\"user\"]', '2023-12-18 09:14:30', '2023-12-10 10:36:46', '2023-12-18 09:14:30'),
(1285, 'App\\Models\\User', 109, 'hydra-api-token', '8574f4a87f58d90c312bbc1541a38e00c6052842ca73c05aca19ba2b28dde3b6', '[\"user\"]', '2023-12-10 16:56:20', '2023-12-10 10:36:58', '2023-12-10 16:56:20'),
(1286, 'App\\Models\\User', 102, 'hydra-api-token', '472e0ba1bd87dc1d1b2896c8b80bbe93d8fc6a4ab42179f8347179e8000ffcf6', '[\"user\"]', '2023-12-13 11:57:06', '2023-12-10 10:46:50', '2023-12-13 11:57:06'),
(1287, 'App\\Models\\User', 102, 'hydra-api-token', '228ad0910fea567c30526e41ebcd908ae8d7017c44e01925fc084f2fc8723351', '[\"user\"]', '2023-12-10 12:13:27', '2023-12-10 12:01:19', '2023-12-10 12:13:27'),
(1288, 'App\\Models\\User', 102, 'hydra-api-token', 'c52ad8da6548fe59ece97b6440657270c564e3d8c5d0e651823d27a775bf8492', '[\"user\"]', '2023-12-12 10:57:03', '2023-12-10 12:07:29', '2023-12-12 10:57:03'),
(1289, 'App\\Models\\User', 102, 'hydra-api-token', '380bd4033163b781df4fb87fbbcecf92a663d0fea1786c72afeabd73cda1f53e', '[\"user\"]', '2023-12-10 12:18:51', '2023-12-10 12:08:35', '2023-12-10 12:18:51'),
(1290, 'App\\Models\\User', 102, 'hydra-api-token', '6a4612ca8ab27d9f9448515a3c3c6051f2263045366415e22cc444a82e0957e1', '[\"user\"]', '2023-12-11 12:21:26', '2023-12-10 12:16:43', '2023-12-11 12:21:26'),
(1291, 'App\\Models\\User', 102, 'hydra-api-token', '79cb34789cb077265569f68ce38d90ca6a255af079c82e8e8fa117f728c30d57', '[\"user\"]', '2023-12-12 12:23:40', '2023-12-10 12:55:34', '2023-12-12 12:23:40'),
(1292, 'App\\Models\\User', 102, 'hydra-api-token', '2d2b041c20610218648ea5177479393d7db8e8feb7d106e6f945e5a905a1cb5b', '[\"user\"]', '2023-12-12 13:58:23', '2023-12-10 14:42:43', '2023-12-12 13:58:23'),
(1293, 'App\\Models\\User', 105, 'hydra-api-token', '48e3acd94730bec8ad5fac371c40b3a605e06360bc1064d93981daddb5001101', '[\"user\"]', '2023-12-19 12:46:39', '2023-12-11 01:05:48', '2023-12-19 12:46:39'),
(1294, 'App\\Models\\User', 102, 'hydra-api-token', '3d85f5a844e2abf48b34170dbc9d085e5ee636dcbc6484d8aa3840f9e44d60a6', '[\"user\"]', '2023-12-11 05:06:58', '2023-12-11 04:54:24', '2023-12-11 05:06:58'),
(1295, 'App\\Models\\User', 102, 'hydra-api-token', '683eb8971041a54b605e88b9d958b8126176d3c52b0004464bfba9681a85ba2e', '[\"user\"]', '2023-12-11 05:13:51', '2023-12-11 05:13:36', '2023-12-11 05:13:51'),
(1296, 'App\\Models\\User', 102, 'hydra-api-token', 'e3b84c51a3944271805bcef2fa54776d2a6abab1caa4db97037c5ec775c9b3dd', '[\"user\"]', '2023-12-11 06:01:01', '2023-12-11 05:35:37', '2023-12-11 06:01:01'),
(1297, 'App\\Models\\User', 102, 'hydra-api-token', '25533fd695049cddbd8b35e0f57c5fb68754b0afdea1772d366906e7ede5e4b0', '[\"user\"]', '2023-12-11 06:04:46', '2023-12-11 06:03:06', '2023-12-11 06:04:46'),
(1298, 'App\\Models\\User', 109, 'hydra-api-token', '71555bdb41c1bf3a8e6b1583055aee88336b404a838482f5c986d0d6079b3e49', '[\"user\"]', '2023-12-11 07:28:56', '2023-12-11 06:03:47', '2023-12-11 07:28:56'),
(1299, 'App\\Models\\User', 102, 'hydra-api-token', 'f47d63a52d43e5f1fa0bb552e33c58bcf0f3019226c09243321546b0724ea050', '[\"user\"]', '2023-12-11 06:07:46', '2023-12-11 06:07:35', '2023-12-11 06:07:46'),
(1300, 'App\\Models\\User', 102, 'hydra-api-token', '64661b403d9c814547353072bada5c95faab07302f8353505457d80df3e8a795', '[\"user\"]', '2023-12-11 06:56:42', '2023-12-11 06:13:48', '2023-12-11 06:56:42'),
(1301, 'App\\Models\\User', 109, 'hydra-api-token', '445edd68848acd516d335b7dfee53475d6adec6f5b96845ae5d1f534210081eb', '[\"user\"]', '2023-12-23 11:11:51', '2023-12-11 06:34:54', '2023-12-23 11:11:51'),
(1302, 'App\\Models\\User', 102, 'hydra-api-token', 'c1134e6cf115eaae814b6d02b13c6402047db45f928b489eb3dcc07fd2178b69', '[\"user\"]', '2023-12-20 06:31:20', '2023-12-11 06:38:12', '2023-12-20 06:31:20'),
(1303, 'App\\Models\\User', 102, 'hydra-api-token', '23f2d80041e73ef0bd57f5c0061d996d31c39b417ee04ba5f709eb7dfd16bc20', '[\"user\"]', '2023-12-11 06:55:50', '2023-12-11 06:51:27', '2023-12-11 06:55:50'),
(1304, 'App\\Models\\User', 100, 'hydra-api-token', '0ad9fd00447daf440fdf9b816f7a984337cd7068112068f36085a01fffdaf278', '[\"admin\"]', '2023-12-11 08:18:34', '2023-12-11 07:45:37', '2023-12-11 08:18:34'),
(1305, 'App\\Models\\User', 100, 'hydra-api-token', '6b79851195667cdf6bcfb1fda3a84a9ed51b1b23653f30f94c258b561ca5a22c', '[\"admin\"]', '2023-12-11 08:09:38', '2023-12-11 08:05:05', '2023-12-11 08:09:38'),
(1306, 'App\\Models\\User', 100, 'hydra-api-token', '48ff790b192df8261affed9f89e82929a5e5221b2e0b0528c3cc7f84d1af20d5', '[\"admin\"]', '2023-12-11 08:11:05', '2023-12-11 08:09:48', '2023-12-11 08:11:05'),
(1307, 'App\\Models\\User', 100, 'hydra-api-token', 'c70da9892bf3bccd4f0289dffe6cecee9d1b69b925943abef9460553c4e4897e', '[\"admin\"]', '2023-12-12 12:38:44', '2023-12-11 08:24:32', '2023-12-12 12:38:44'),
(1308, 'App\\Models\\User', 103, 'hydra-api-token', '91a2c7f743011dd536ff6c804472f6dbd6d557bdc6b0d646f958eb8f66a6a40a', '[\"user\"]', '2023-12-11 08:27:02', '2023-12-11 08:26:58', '2023-12-11 08:27:02'),
(1309, 'App\\Models\\User', 109, 'hydra-api-token', 'cdb3e42beae0e784eb9e6bcea588fc7f96ebc655e7c9be8955d41ed7bc22f096', '[\"user\"]', '2023-12-11 08:30:13', '2023-12-11 08:30:11', '2023-12-11 08:30:13'),
(1310, 'App\\Models\\User', 103, 'hydra-api-token', 'd4d40eade20ea9671b9fbeb09de0df6a533753bf09cebb55634bcfa37eda54b6', '[\"user\"]', '2023-12-14 17:35:34', '2023-12-11 08:32:51', '2023-12-14 17:35:34'),
(1311, 'App\\Models\\User', 109, 'hydra-api-token', 'dec5a8847cc7ccc6d35ffe9a74addd4187161ac20a2f2395c4e7e85b1ce2e13c', '[\"user\"]', '2023-12-11 12:13:00', '2023-12-11 08:37:50', '2023-12-11 12:13:00'),
(1314, 'App\\Models\\User', 102, 'hydra-api-token', '1c5dfdbca12db152a0cb60aa70d6f4c308bf7c84d91cd10e7d194fe167ae7619', '[\"user\"]', '2023-12-17 12:05:46', '2023-12-11 11:06:56', '2023-12-17 12:05:46'),
(1315, 'App\\Models\\User', 103, 'hydra-api-token', '182ae2663954047ad5de1be704a308b30f27dcb1e77bcd466029c35c0d2381e0', '[\"user\"]', '2023-12-11 12:14:09', '2023-12-11 12:13:19', '2023-12-11 12:14:09'),
(1316, 'App\\Models\\User', 109, 'hydra-api-token', '91e53f6cd45f079f12598d0748303494dfd5a5ffca02fde48fdd32d483ad4d0d', '[\"user\"]', '2023-12-21 10:33:16', '2023-12-11 12:16:32', '2023-12-21 10:33:16'),
(1317, 'App\\Models\\User', 102, 'hydra-api-token', 'c88d1d0b91b3d77cbe9aeb10fb9c9dd1a9e437b56141737bff289aa653c6c188', '[\"user\"]', '2023-12-12 12:53:06', '2023-12-12 12:25:49', '2023-12-12 12:53:06'),
(1318, 'App\\Models\\User', 103, 'hydra-api-token', '838065db8c17df248a44ff53161b412ebec21716044f409748e09d7912b58c69', '[\"user\"]', '2023-12-20 06:51:48', '2023-12-12 12:38:58', '2023-12-20 06:51:48'),
(1319, 'App\\Models\\User', 103, 'hydra-api-token', '6c779f409ccdc92a8fdfdea921f511cd9ccc9c748730d67e3e6c413139afd95a', '[\"user\"]', '2023-12-23 12:41:52', '2023-12-12 12:53:56', '2023-12-23 12:41:52'),
(1320, 'App\\Models\\User', 102, 'hydra-api-token', 'be3224ec3bb11409c9936a20785dd2d6a0e25d25c74c673b220d17ab89584a83', '[\"user\"]', '2023-12-12 13:55:00', '2023-12-12 13:53:33', '2023-12-12 13:55:00');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1321, 'App\\Models\\User', 102, 'hydra-api-token', '9a225400667e797bb62dbfe9f654341b31fc618ab53d680866af530b873ca556', '[\"user\"]', NULL, '2023-12-13 05:52:31', '2023-12-13 05:52:31'),
(1322, 'App\\Models\\User', 102, 'hydra-api-token', '9bba436a119b371f5632d045f3851a87082d4c929cf9e5ad8bf66083795096de', '[\"user\"]', NULL, '2023-12-13 05:56:47', '2023-12-13 05:56:47'),
(1323, 'App\\Models\\User', 102, 'hydra-api-token', 'd3784a09d5979447e653adb8acc4f2bf925717305c8864b616c623790e168c88', '[\"user\"]', NULL, '2023-12-13 06:07:17', '2023-12-13 06:07:17'),
(1324, 'App\\Models\\User', 102, 'hydra-api-token', '4d9ebcc5c20d1a4febd12b9d1e675177ec441c6cae06176decf5b7db4d879854', '[\"user\"]', NULL, '2023-12-13 06:28:15', '2023-12-13 06:28:15'),
(1325, 'App\\Models\\User', 102, 'hydra-api-token', '5add96599f5701395ec2866421014aba0b55fd2f621257311d6637061caebe06', '[\"user\"]', NULL, '2023-12-13 06:29:54', '2023-12-13 06:29:54'),
(1326, 'App\\Models\\User', 102, 'hydra-api-token', '06a048496d225cd4acb2bfbe8cd3cc489b7640b0f8973bd5cf45c29ffc3c536c', '[\"user\"]', NULL, '2023-12-13 06:31:15', '2023-12-13 06:31:15'),
(1327, 'App\\Models\\User', 102, 'hydra-api-token', 'f3ddc877812d9529ee11778728cea92ef0562c9e3601a3f91acfe66cf5e10899', '[\"user\"]', NULL, '2023-12-13 06:40:03', '2023-12-13 06:40:03'),
(1328, 'App\\Models\\User', 102, 'hydra-api-token', '004785ec70f2e96fd87976dce2416f35fc15865ff0ddbefc2a6d30041277ae13', '[\"user\"]', NULL, '2023-12-13 06:49:15', '2023-12-13 06:49:15'),
(1329, 'App\\Models\\User', 102, 'hydra-api-token', '010ce2139e6322958da9febb85089eaa5e35190cc7b8293d0b43076094cddc67', '[\"user\"]', NULL, '2023-12-13 07:00:38', '2023-12-13 07:00:38'),
(1330, 'App\\Models\\User', 102, 'hydra-api-token', '0c69e8269998fce28435b445f9bd086e7a0801ea799bd89f441cd27e1a27137c', '[\"user\"]', NULL, '2023-12-13 07:04:03', '2023-12-13 07:04:03'),
(1331, 'App\\Models\\User', 102, 'hydra-api-token', 'baa512e718788d8eef0b66485d0017cfcf93c48fbca79e6b4d5b1d21439fa2b9', '[\"user\"]', NULL, '2023-12-13 07:04:03', '2023-12-13 07:04:03'),
(1332, 'App\\Models\\User', 102, 'hydra-api-token', '20a309102629c8450a072fe3c630530673f6b225aadf0a891a4fde37b2366e69', '[\"user\"]', '2023-12-14 11:55:32', '2023-12-13 10:35:44', '2023-12-14 11:55:32'),
(1333, 'App\\Models\\User', 102, 'hydra-api-token', '7e4797e6ea63c461ac952b0b358a7ca2a10b6d1a0d9a2f21abcc4dc41a65e065', '[\"user\"]', '2023-12-18 04:29:37', '2023-12-13 12:06:50', '2023-12-18 04:29:37'),
(1334, 'App\\Models\\User', 102, 'hydra-api-token', 'eb3e033c0099f9bf411beda2145d578caaaa5ca274897ecafdd3238ee5393816', '[\"user\"]', '2023-12-14 04:34:48', '2023-12-14 04:12:05', '2023-12-14 04:34:48'),
(1335, 'App\\Models\\User', 102, 'hydra-api-token', '17db4339b42e8b52f8658ba4f01f54af71d5755fcf3cb86390530a24afda4efb', '[\"user\"]', '2023-12-14 05:25:02', '2023-12-14 04:38:03', '2023-12-14 05:25:02'),
(1336, 'App\\Models\\User', 102, 'hydra-api-token', 'a98805bfe6e9e34a4a13553f4f46ac7d598fc22b72b85419adf442a26b291d24', '[\"user\"]', '2023-12-14 11:51:17', '2023-12-14 11:14:30', '2023-12-14 11:51:17'),
(1337, 'App\\Models\\User', 102, 'hydra-api-token', '81c15c303ed069b7cfe6d851960eee065715232ac405709357f133a78b59753b', '[\"user\"]', '2023-12-30 09:02:57', '2023-12-14 11:56:02', '2023-12-30 09:02:57'),
(1338, 'App\\Models\\User', 102, 'hydra-api-token', '5dde193cb71bd76a0282a765ed1470086c252e1baccccdcd5c34f0e102aaaca2', '[\"user\"]', '2023-12-18 04:08:29', '2023-12-17 09:31:43', '2023-12-18 04:08:29'),
(1339, 'App\\Models\\User', 107, 'hydra-api-token', '652c85b3c932f5f076ae799309738c5a7c57f47c010985804e8887c698951517', '[\"user\"]', '2023-12-17 10:28:30', '2023-12-17 10:11:45', '2023-12-17 10:28:30'),
(1340, 'App\\Models\\User', 102, 'hydra-api-token', '083cec1799b9f4bf67e29d1c11f663b31ce2e8405c6bd3989cabb58bf83a3d27', '[\"user\"]', '2023-12-23 04:35:46', '2023-12-17 11:15:26', '2023-12-23 04:35:46'),
(1341, 'App\\Models\\User', 105, 'hydra-api-token', 'ace731bbd97347eb7b4cd1442be647791a9bf44f947a5e88fbd9fd904cbbbc45', '[\"user\"]', '2023-12-17 11:58:40', '2023-12-17 11:57:06', '2023-12-17 11:58:40'),
(1342, 'App\\Models\\User', 105, 'hydra-api-token', '083ff4f601369443fc4b734c0cc902ada303a5958e9b265824b3980a871aee32', '[\"user\"]', '2023-12-17 12:09:01', '2023-12-17 12:05:04', '2023-12-17 12:09:01'),
(1343, 'App\\Models\\User', 105, 'hydra-api-token', '7d0c5c384842817136a45f4d85f498047f934a5a675e2d40799c68d8a7a09581', '[\"user\"]', '2023-12-17 12:09:17', '2023-12-17 12:09:09', '2023-12-17 12:09:17'),
(1344, 'App\\Models\\User', 105, 'hydra-api-token', '88183a7358a2fa1b4f92eb9d36a50600e864f785beed14015be95f7a5fa8c334', '[\"user\"]', '2023-12-17 12:12:43', '2023-12-17 12:10:44', '2023-12-17 12:12:43'),
(1345, 'App\\Models\\User', 105, 'hydra-api-token', '546a2ca49a7d2678e576238e0a43646e67c640d3ee1f3aae53f56da8cce4d71c', '[\"user\"]', '2023-12-26 10:13:51', '2023-12-17 12:12:51', '2023-12-26 10:13:51'),
(1346, 'App\\Models\\User', 105, 'hydra-api-token', '52dc8f4d0e98f26863b913308000e8b4eccd3a244f61e0c62215fd7553e7dda1', '[\"user\"]', '2023-12-17 12:13:56', '2023-12-17 12:13:46', '2023-12-17 12:13:56'),
(1347, 'App\\Models\\User', 105, 'hydra-api-token', 'f1f75e19b3fe4b2b11903e07d2e37ce3a6583aa5111ba7a3dec890a1021411ab', '[\"user\"]', '2023-12-17 12:14:58', '2023-12-17 12:14:40', '2023-12-17 12:14:58'),
(1348, 'App\\Models\\User', 102, 'hydra-api-token', '6b20eafd4be4485599f0ad4f279c14ff90626a2c4cf50dad5333ed428b593f54', '[\"user\"]', '2023-12-17 18:47:37', '2023-12-17 12:17:20', '2023-12-17 18:47:37'),
(1349, 'App\\Models\\User', 102, 'hydra-api-token', '0ff38105d98673efd67745c7567912b936adfd1b00842a336ada7236c016ffa1', '[\"user\"]', '2023-12-18 07:08:07', '2023-12-18 04:17:16', '2023-12-18 07:08:07'),
(1350, 'App\\Models\\User', 102, 'hydra-api-token', 'baebc15df93494bc1abc0b24b45f417cc8596cd37fee6b57bd9e6aa9e6e1e884', '[\"user\"]', '2023-12-21 05:45:41', '2023-12-18 04:20:37', '2023-12-21 05:45:41'),
(1351, 'App\\Models\\User', 102, 'hydra-api-token', 'a28ebee452611ba72444836204ca4ab7154e838c983d9e14c5538e03ad93696d', '[\"user\"]', '2023-12-24 05:52:53', '2023-12-18 07:08:29', '2023-12-24 05:52:53'),
(1352, 'App\\Models\\User', 103, 'hydra-api-token', '7cc31c3a8aa71af054b91910182d4d3141c8f66d1532585e55c00872c777e714', '[\"user\"]', '2023-12-19 05:12:41', '2023-12-18 09:47:54', '2023-12-19 05:12:41'),
(1353, 'App\\Models\\User', 102, 'hydra-api-token', 'd7b039fae4bff4506391a1657b65b9b48019256f20ccc60499389ffcd75b4c91', '[\"user\"]', '2023-12-26 10:22:22', '2023-12-19 05:12:48', '2023-12-26 10:22:22'),
(1356, 'App\\Models\\User', 105, 'hydra-api-token', 'de04b6cfa019ffa0b2209369627f981791d2c05262d6f99296b5bd4278f6d4dc', '[\"user\"]', '2023-12-20 22:40:24', '2023-12-19 12:51:33', '2023-12-20 22:40:24'),
(1357, 'App\\Models\\User', 1, 'hydra-api-token', 'be3be850eac205e816fea787fbd7c61d002fe9bfe2afbfb68f3aa4457ef930fc', '[\"admin\"]', '2023-12-23 04:21:40', '2023-12-20 05:41:37', '2023-12-23 04:21:40'),
(1358, 'App\\Models\\User', 102, 'hydra-api-token', 'f0c9f2156b3758c35ac3979516b4db5857ac2a35ae86782be5788b5ddf18b070', '[\"user\"]', '2023-12-23 04:26:01', '2023-12-20 06:34:07', '2023-12-23 04:26:01'),
(1359, 'App\\Models\\User', 102, 'hydra-api-token', '34b04ba20a9b7dd821010041e82280efbf8dd508e6b868b381f212ba4a77bc9a', '[\"user\"]', '2023-12-20 06:38:33', '2023-12-20 06:38:24', '2023-12-20 06:38:33'),
(1360, 'App\\Models\\User', 102, 'hydra-api-token', 'bd344017a0726cabe24cc9f03f3501aba6c2609f56cb70dc9a4393167a3d5c7e', '[\"user\"]', '2023-12-20 12:29:12', '2023-12-20 06:50:10', '2023-12-20 12:29:12'),
(1361, 'App\\Models\\User', 102, 'hydra-api-token', '3bbe733e48c3188620e1941833c691cb0086d2532efb7ba237a7e365b9651d02', '[\"user\"]', '2023-12-23 10:32:17', '2023-12-20 06:52:11', '2023-12-23 10:32:17'),
(1362, 'App\\Models\\User', 102, 'hydra-api-token', '80d8b9c4146c64ff5b9f914a674c097b730f4809736edbe4d173de7c6b6ba3d1', '[\"user\"]', '2023-12-20 10:04:30', '2023-12-20 10:04:29', '2023-12-20 10:04:30'),
(1366, 'App\\Models\\User', 102, 'hydra-api-token', '4f1b3c00320ce0b376d446fa85b0c66aac367f2a5146750893bcb423194d1e31', '[\"user\"]', '2023-12-20 10:43:40', '2023-12-20 10:38:23', '2023-12-20 10:43:40'),
(1367, 'App\\Models\\User', 102, 'hydra-api-token', '5669c04bdd5e563f59f468ac13f78cfefaac4a677a052915100974a28d356f5f', '[\"user\"]', '2023-12-24 17:23:59', '2023-12-20 10:45:18', '2023-12-24 17:23:59'),
(1368, 'App\\Models\\User', 102, 'hydra-api-token', '1fc0f5a022bf216aabee4adac4e7141d73dbf5fbe9d853881f0cf744ae77d1d4', '[\"user\"]', '2023-12-20 17:11:32', '2023-12-20 16:45:48', '2023-12-20 17:11:32'),
(1369, 'App\\Models\\User', 105, 'hydra-api-token', '03699ae9423b9942887c04f3f02dbb9685a678019b36affb649c37b37838e65f', '[\"user\"]', '2023-12-23 12:33:16', '2023-12-20 22:42:42', '2023-12-23 12:33:16'),
(1370, 'App\\Models\\User', 102, 'hydra-api-token', 'efc4b584f13fdd9477b8b3715fcd821ab393424c567540a340e12dea6c9ea682', '[\"user\"]', '2023-12-21 04:31:50', '2023-12-21 04:31:48', '2023-12-21 04:31:50'),
(1371, 'App\\Models\\User', 102, 'hydra-api-token', 'd25f51ab5e6672245099aa3bec04fa742a8febec9985d9725bc96e15dd67286b', '[\"user\"]', '2024-01-01 10:49:45', '2023-12-21 05:40:56', '2024-01-01 10:49:45'),
(1372, 'App\\Models\\User', 109, 'hydra-api-token', '44394a753fba1d659ed1dc32acef2484aa19cb1ce0330a235105bf920e8171ce', '[\"user\"]', '2023-12-24 05:14:20', '2023-12-21 10:34:33', '2023-12-24 05:14:20'),
(1373, 'App\\Models\\User', 102, 'hydra-api-token', 'b0c57d37595b5053084b47cc77287540ef2bdaab6520833af30f6f7551c58256', '[\"user\"]', '2023-12-21 12:20:55', '2023-12-21 12:12:32', '2023-12-21 12:20:55'),
(1374, 'App\\Models\\User', 1, 'hydra-api-token', 'e55bdf6ce9185c5901183fa6c6a825244c2ff05774a21a4bb7c271001e535188', '[\"admin\"]', '2023-12-23 04:23:25', '2023-12-23 04:23:01', '2023-12-23 04:23:25'),
(1375, 'App\\Models\\User', 96, 'hydra-api-token', 'cdcb0d4e908a587e211ea82cb5f6c77bbd9cb7674ca25d1ecdf28169ecb7c051', '[\"admin\"]', '2023-12-23 04:24:22', '2023-12-23 04:24:22', '2023-12-23 04:24:22'),
(1376, 'App\\Models\\User', 96, 'hydra-api-token', '5f1b3089cb4509e7d35e4ddc89a950f105c6ece1b0808ac20b01306a0ff0034c', '[\"admin\"]', '2023-12-23 09:02:30', '2023-12-23 04:25:35', '2023-12-23 09:02:30'),
(1377, 'App\\Models\\User', 96, 'hydra-api-token', 'beb204c13e7f6063d7f140f13699c0992bbf7752487eb84f5ab4814ab1d4acb8', '[\"admin\"]', '2023-12-23 04:26:44', '2023-12-23 04:26:18', '2023-12-23 04:26:44'),
(1378, 'App\\Models\\User', 102, 'hydra-api-token', '7d6e6ac11fd4b6085f11010fbcccfb76c2ed35008fc92454fde16882046f3054', '[\"user\"]', '2023-12-23 04:27:53', '2023-12-23 04:27:52', '2023-12-23 04:27:53'),
(1379, 'App\\Models\\User', 96, 'hydra-api-token', 'b5e4d8242ce530fbefa00ae820e812bd6a2b57f916cf56cb183615e939a5d8ea', '[\"admin\"]', '2023-12-23 05:02:42', '2023-12-23 04:28:08', '2023-12-23 05:02:42'),
(1380, 'App\\Models\\User', 102, 'hydra-api-token', '81c5f2b8c97ed97f96a5f001a3605489c196ea9c9d859b7a67cdee22f92d2296', '[\"user\"]', '2023-12-23 09:39:07', '2023-12-23 04:44:50', '2023-12-23 09:39:07'),
(1381, 'App\\Models\\User', 96, 'hydra-api-token', '87d0a602bfd63b5cf2209d117e65ecac01192d4e0ead82dd45788db37f6f0200', '[\"admin\"]', '2023-12-23 05:24:27', '2023-12-23 05:20:59', '2023-12-23 05:24:27'),
(1382, 'App\\Models\\User', 96, 'hydra-api-token', 'fd30fcdef0dd2f6c328a4bf62df6335eaa716775248fe64b6cb2dde7acb0c5ef', '[\"admin\"]', '2023-12-23 05:27:37', '2023-12-23 05:27:34', '2023-12-23 05:27:37'),
(1383, 'App\\Models\\User', 96, 'hydra-api-token', 'c1ae4f98278775d96e3dce7d2c6480bc5eb277c68c9b7ed7c76f693c5ad75df1', '[\"admin\"]', '2023-12-23 09:21:08', '2023-12-23 05:40:59', '2023-12-23 09:21:08'),
(1384, 'App\\Models\\User', 102, 'hydra-api-token', '6ffcce1c5ef16b3c103438859b266f16d2c2f032df48516ea12e986499fbe6f4', '[\"user\"]', NULL, '2023-12-23 05:43:34', '2023-12-23 05:43:34'),
(1385, 'App\\Models\\User', 102, 'hydra-api-token', '586d975ce432634d3e418a573b81aa46aad79f72e8974b331ec2b8cc777dc7a9', '[\"user\"]', '2023-12-23 07:45:15', '2023-12-23 06:30:40', '2023-12-23 07:45:15'),
(1386, 'App\\Models\\User', 102, 'hydra-api-token', 'abeeeae8a2b3e8f6b5b7c40285a82a0d91ae8ecd9961ff93d188492d81f8ae03', '[\"user\"]', '2023-12-23 06:35:50', '2023-12-23 06:31:05', '2023-12-23 06:35:50'),
(1387, 'App\\Models\\User', 102, 'hydra-api-token', '2fa375f386a8a732080203b818fa810f0209defd2b03286a9b3190a7fcd65a6e', '[\"user\"]', '2023-12-23 09:48:07', '2023-12-23 07:10:53', '2023-12-23 09:48:07'),
(1388, 'App\\Models\\User', 102, 'hydra-api-token', 'bb42ed080b21bc74d940b927d6c570a63914c3dfc70a172beb1770afde36478d', '[\"user\"]', '2023-12-26 06:32:13', '2023-12-23 07:52:12', '2023-12-26 06:32:13'),
(1389, 'App\\Models\\User', 102, 'hydra-api-token', 'a857972ff00a464757618efbd7ef954b615c0fa917bfbbfa5cca87c39c71f9b2', '[\"user\"]', '2023-12-23 07:52:29', '2023-12-23 07:52:19', '2023-12-23 07:52:29'),
(1390, 'App\\Models\\User', 102, 'hydra-api-token', '3c7a836b82f40e6b7d31cbc0f22d536efb3eb3c6badbdcb9a34469143839db63', '[\"user\"]', '2023-12-23 12:29:20', '2023-12-23 09:02:58', '2023-12-23 12:29:20'),
(1391, 'App\\Models\\User', 96, 'hydra-api-token', 'b9daa044b65ac3c4419510a08fd294dc2cdf30b2a8d7e71e90cdcd48d313a380', '[\"admin\"]', '2023-12-24 10:35:45', '2023-12-23 09:23:16', '2023-12-24 10:35:45'),
(1392, 'App\\Models\\User', 102, 'hydra-api-token', '26e8609e874228998d85b2fa01027507c1338e42017fe4042d982458c7b8bc38', '[\"user\"]', '2023-12-23 11:12:13', '2023-12-23 09:47:58', '2023-12-23 11:12:13'),
(1394, 'App\\Models\\User', 103, 'hydra-api-token', 'fe1d587f1620104b42a36f4957ebb01efd06c97df90e26d24b55c3b9de0eeafa', '[\"user\"]', '2023-12-23 10:32:51', '2023-12-23 10:32:38', '2023-12-23 10:32:51'),
(1395, 'App\\Models\\User', 100, 'hydra-api-token', '10a680ab9e2c89f583c1cbb658541cb24026ea8c4ba57ed40af7919df617b74a', '[\"admin\"]', '2023-12-23 10:35:19', '2023-12-23 10:33:09', '2023-12-23 10:35:19'),
(1397, 'App\\Models\\User', 102, 'hydra-api-token', '4b88f28e4bfe85ce37c6b0eb5ffaec859281e53fbc70b6ffac200774296a6908', '[\"user\"]', NULL, '2023-12-23 11:06:34', '2023-12-23 11:06:34'),
(1398, 'App\\Models\\User', 102, 'hydra-api-token', 'b21c5ee7296cf2106e2441aec8b9df41a0b1ef4ac5bffc9a0ccdef8c627310f6', '[\"user\"]', '2023-12-30 08:29:57', '2023-12-23 11:27:30', '2023-12-30 08:29:57'),
(1399, 'App\\Models\\User', 103, 'hydra-api-token', '884d5913bc473d49190f0535a24227e213e24536a036e222bcf1ee6caa62f9a6', '[\"user\"]', '2023-12-31 09:57:37', '2023-12-23 12:38:13', '2023-12-31 09:57:37'),
(1400, 'App\\Models\\User', 105, 'hydra-api-token', '5a7adc7361f594afea59b7b3419b010b67c59ba34dfc33505ca3cc599d2259d4', '[\"user\"]', '2023-12-23 12:39:37', '2023-12-23 12:39:35', '2023-12-23 12:39:37'),
(1401, 'App\\Models\\User', 105, 'hydra-api-token', 'e942d190333116f8adf88316e42f7884ce57c317e13977bd274fb349ab1bb924', '[\"user\"]', '2023-12-23 12:40:00', '2023-12-23 12:39:42', '2023-12-23 12:40:00'),
(1402, 'App\\Models\\User', 105, 'hydra-api-token', 'ca481918b0762b2f5fb3af0565c1e96ed74029971cc904b4e0d349b67f897f8f', '[\"user\"]', '2023-12-30 04:14:04', '2023-12-23 12:40:00', '2023-12-30 04:14:04'),
(1403, 'App\\Models\\User', 102, 'hydra-api-token', 'f9932c7ba3e300033b8fed2f4eebedae182a07daaa9e89b364af0dd94dbd4e92', '[\"user\"]', '2023-12-24 12:53:52', '2023-12-23 12:41:10', '2023-12-24 12:53:52'),
(1404, 'App\\Models\\User', 102, 'hydra-api-token', '74c6bb47a4d159808d87be0cb7ee04294d03bd39efd79b8fcc454b2d1952932d', '[\"user\"]', '2023-12-23 22:27:01', '2023-12-23 12:41:25', '2023-12-23 22:27:01'),
(1405, 'App\\Models\\User', 102, 'hydra-api-token', '1823cb83bb1d2304ab61ef185ab2abd6edca1c9c0373356ef228e029b29b7316', '[\"user\"]', '2023-12-24 06:24:23', '2023-12-23 12:44:10', '2023-12-24 06:24:23'),
(1406, 'App\\Models\\User', 109, 'hydra-api-token', '5ac163de01cf752f3f1b19fc9eb68c4a10da00d49b72cb3de3679e9aa83c343e', '[\"user\"]', '2023-12-24 06:10:11', '2023-12-24 05:27:34', '2023-12-24 06:10:11'),
(1407, 'App\\Models\\User', 102, 'hydra-api-token', '8cb57af10f39452c30fef86b032c8a60ddf6060a04b61b9235df11c452233ef1', '[\"user\"]', NULL, '2023-12-24 05:37:54', '2023-12-24 05:37:54'),
(1408, 'App\\Models\\User', 102, 'hydra-api-token', '0d733fd459f5a5ac8c66bf628b2c9c5719dd23e0a7d50113a63f0b1c8b5c435f', '[\"user\"]', NULL, '2023-12-24 05:38:23', '2023-12-24 05:38:23'),
(1409, 'App\\Models\\User', 102, 'hydra-api-token', '357d7b127473fe21c226d1bf1e26675902367d42d24178f2b80234c97f992923', '[\"user\"]', NULL, '2023-12-24 05:40:05', '2023-12-24 05:40:05'),
(1410, 'App\\Models\\User', 102, 'hydra-api-token', '1bb4da45d5e83e2c562437793e17c372f349ec48d3a504d5f580b95cb2951615', '[\"user\"]', NULL, '2023-12-24 05:40:26', '2023-12-24 05:40:26'),
(1411, 'App\\Models\\User', 102, 'hydra-api-token', '51fd236f99a3baed5e7a02d94640eb65e4a711c668feae35b6f2b816c9ce4ff8', '[\"user\"]', '2023-12-24 05:46:24', '2023-12-24 05:46:22', '2023-12-24 05:46:24'),
(1412, 'App\\Models\\User', 102, 'hydra-api-token', 'b1a02ece7615f560ea2ab7545b4c8d1f91e7647314dbba592b1620ccb0c67325', '[\"user\"]', '2023-12-24 06:47:53', '2023-12-24 06:47:51', '2023-12-24 06:47:53'),
(1413, 'App\\Models\\User', 102, 'hydra-api-token', 'dd0ed2f2e127b08fd4329117595459732e3098670547059c5b69dee6a7054624', '[\"user\"]', '2023-12-24 11:43:23', '2023-12-24 06:48:03', '2023-12-24 11:43:23'),
(1414, 'App\\Models\\User', 102, 'hydra-api-token', '1a957b7a3f6d0e2727f30cba57312e78017a904ff97c3d0ff11a4f2d25429178', '[\"user\"]', '2023-12-24 07:02:38', '2023-12-24 06:55:06', '2023-12-24 07:02:38'),
(1415, 'App\\Models\\User', 102, 'hydra-api-token', '26f351069b88f363a56a51956a973ff3060b63bab8f8864716bda66ee8691141', '[\"user\"]', '2023-12-26 04:53:59', '2023-12-24 10:36:42', '2023-12-26 04:53:59'),
(1416, 'App\\Models\\User', 102, 'hydra-api-token', 'fa1bc54c5c48d1cff648bce6b4dde0b3ec31fc291a7a966d9e8bf5e775173f6b', '[\"user\"]', '2023-12-24 11:47:19', '2023-12-24 11:47:15', '2023-12-24 11:47:19'),
(1417, 'App\\Models\\User', 109, 'hydra-api-token', 'f847d010723a3e2e8858ea75769ca597d3f35529e57ecf1fe87a2d2c97f3248b', '[\"user\"]', '2023-12-26 04:57:37', '2023-12-24 12:30:21', '2023-12-26 04:57:37'),
(1418, 'App\\Models\\User', 100, 'hydra-api-token', '106fb2461aea9f5b205dc90b39bce57bb665cd5baf559b8fc03ec3aea8b0cf48', '[\"admin\"]', '2023-12-25 11:34:05', '2023-12-24 12:54:04', '2023-12-25 11:34:05'),
(1419, 'App\\Models\\User', 103, 'hydra-api-token', '121f27666048885d9269208f73937a06e4deb2a4dda4323b8d6819b836f001c6', '[\"user\"]', '2023-12-24 13:29:57', '2023-12-24 12:55:23', '2023-12-24 13:29:57'),
(1420, 'App\\Models\\User', 103, 'hydra-api-token', 'edb03c806297015f20fadc9e3e91ab4bbbd01203d03b0333189582140311d225', '[\"user\"]', '2023-12-26 14:35:51', '2023-12-24 13:30:44', '2023-12-26 14:35:51'),
(1421, 'App\\Models\\User', 102, 'hydra-api-token', '9e5fadfa5b0577589af94eba1ca9f775790adeb9dc018cea33978467fa85d564', '[\"user\"]', '2023-12-24 16:33:06', '2023-12-24 16:18:38', '2023-12-24 16:33:06'),
(1422, 'App\\Models\\User', 102, 'hydra-api-token', '3598403895a66ec07f52f5105d63dba3e60a48453fba241088a09363af15cf55', '[\"user\"]', '2024-01-23 17:31:55', '2023-12-24 16:53:13', '2024-01-23 17:31:55'),
(1423, 'App\\Models\\User', 102, 'hydra-api-token', '346f50fba24928c5eb9de4ff3dec4278c518db6598509be4f28275f48f402320', '[\"user\"]', '2023-12-24 17:07:51', '2023-12-24 17:04:04', '2023-12-24 17:07:51'),
(1424, 'App\\Models\\User', 102, 'hydra-api-token', 'c45a8147858ed482126f9481b7e693f322b3f7e03875181183b74d0b6b844538', '[\"user\"]', '2023-12-25 05:49:25', '2023-12-24 17:05:16', '2023-12-25 05:49:25'),
(1425, 'App\\Models\\User', 102, 'hydra-api-token', '6556c13c95c59ba1d4bc582d062b211cde04d77d6f7f0845a29f79aa80491db3', '[\"user\"]', '2023-12-24 17:25:52', '2023-12-24 17:25:50', '2023-12-24 17:25:52'),
(1426, 'App\\Models\\User', 102, 'hydra-api-token', '41352f7126f0fc7f8bb1e0b5a12a638fa5871f07ce046a3a29b73fbe8f138139', '[\"user\"]', '2023-12-25 04:49:22', '2023-12-25 04:47:09', '2023-12-25 04:49:22'),
(1427, 'App\\Models\\User', 102, 'hydra-api-token', '2fb9d53db8826cf7b6b148125ad77839110bca648f7f68da4240e10f0fbc4f1b', '[\"user\"]', '2023-12-25 09:40:13', '2023-12-25 04:50:11', '2023-12-25 09:40:13'),
(1428, 'App\\Models\\User', 103, 'hydra-api-token', '28608e694f5e1bc8b2ce46d1b07b67eff2f341a9502a43847878d6e1c8313f66', '[\"user\"]', '2023-12-31 09:22:10', '2023-12-25 11:34:26', '2023-12-31 09:22:10'),
(1429, 'App\\Models\\User', 102, 'hydra-api-token', 'ea8d0c6a1df30acce4a90a9bce4807e383f3b40665be6da7d59d2435d01d4dce', '[\"user\"]', '2023-12-30 09:59:03', '2023-12-26 05:07:45', '2023-12-30 09:59:03'),
(1430, 'App\\Models\\User', 102, 'hydra-api-token', '0a0ff5e196d8b58f22be826c4ee52289bdd4acf119196fd4c049f2bb8a85ea9f', '[\"user\"]', '2024-01-02 05:08:24', '2023-12-26 06:37:27', '2024-01-02 05:08:24'),
(1431, 'App\\Models\\User', 109, 'hydra-api-token', 'bedd4d6241b00b528bd55251bce47c1d3155bd16aa21971d276db77ae2c729ed', '[\"user\"]', '2023-12-26 11:56:20', '2023-12-26 11:56:18', '2023-12-26 11:56:20'),
(1432, 'App\\Models\\User', 102, 'hydra-api-token', 'c175647336f654af4d1ea62205a8ed7821128caf8fdf0ca0c3e41b80f7dae5a8', '[\"user\"]', '2023-12-28 08:30:55', '2023-12-28 08:23:21', '2023-12-28 08:30:55'),
(1433, 'App\\Models\\User', 102, 'hydra-api-token', '3b74bc5a8055fca4e8ef1c14fa46f293c2e8cf313c897150f2bfd736afb4d00c', '[\"user\"]', '2023-12-28 08:25:08', '2023-12-28 08:24:41', '2023-12-28 08:25:08'),
(1434, 'App\\Models\\User', 102, 'hydra-api-token', 'b7781c930bafbcb97a73a40c9e0f12ef26a3fd2d753d544db9a5ee3d6e229753', '[\"user\"]', '2023-12-28 08:25:54', '2023-12-28 08:25:50', '2023-12-28 08:25:54'),
(1435, 'App\\Models\\User', 102, 'hydra-api-token', 'f7bbb71b365674eb72e355254cfefe6e5949963fa5c883971fd8709d5e8c7771', '[\"user\"]', '2023-12-28 08:27:06', '2023-12-28 08:27:02', '2023-12-28 08:27:06'),
(1436, 'App\\Models\\User', 102, 'hydra-api-token', '86f0783e2a02efe1e2757433f7ed951daec161ae9318f0fc5e2b36a08af8d89f', '[\"user\"]', '2023-12-28 08:31:31', '2023-12-28 08:31:15', '2023-12-28 08:31:31'),
(1437, 'App\\Models\\User', 102, 'hydra-api-token', '9873bffab86d9f420dffa6e4fffa4e5efc0752dc64b44fdc156f12441cf7363c', '[\"user\"]', '2023-12-28 08:33:36', '2023-12-28 08:33:10', '2023-12-28 08:33:36'),
(1438, 'App\\Models\\User', 102, 'hydra-api-token', '592f7c1fb5b33a33bceaeb705457bc4382b5f1a0b89b81bdf711ab9f0076794b', '[\"user\"]', '2024-01-06 04:21:23', '2023-12-28 08:39:16', '2024-01-06 04:21:23'),
(1440, 'App\\Models\\User', 102, 'hydra-api-token', '66bd392aff7bc1b238eb0d038d1e484c8923966a3a48700d3234d4a12f8c0ebe', '[\"user\"]', '2023-12-28 10:30:04', '2023-12-28 10:08:55', '2023-12-28 10:30:04'),
(1441, 'App\\Models\\User', 102, 'hydra-api-token', 'a6613d800a6098c7627b871402568d2ab404221ade08fbecaf4b598faf42bd60', '[\"user\"]', NULL, '2023-12-28 10:30:16', '2023-12-28 10:30:16'),
(1442, 'App\\Models\\User', 102, 'hydra-api-token', '4fb30052dc59a297091069ff0dc274d3ff231affec6824dc044753a44e5995a3', '[\"user\"]', NULL, '2023-12-28 11:06:32', '2023-12-28 11:06:32'),
(1443, 'App\\Models\\User', 102, 'hydra-api-token', 'f0af356b74f5a8dfed98494d123479157aa7c4186cded2853528ea9a76cc7478', '[\"user\"]', NULL, '2023-12-28 11:21:08', '2023-12-28 11:21:08'),
(1444, 'App\\Models\\User', 102, 'hydra-api-token', '16039fcd0adfb2642f1190025408b31a6fa5de0b279d41bb844f89afb405ebda', '[\"user\"]', NULL, '2023-12-28 11:24:09', '2023-12-28 11:24:09'),
(1445, 'App\\Models\\User', 102, 'hydra-api-token', '1cdbd58f44c2134bbca0324d0396eed89f092ca02b5cff1feda7517f5bb5d1bb', '[\"user\"]', NULL, '2023-12-28 11:27:13', '2023-12-28 11:27:13'),
(1446, 'App\\Models\\User', 102, 'hydra-api-token', '0f115b36b9c76169e0f117b9bd5a8339d94b9be3af195b9b643b11313b0c8c8b', '[\"user\"]', NULL, '2023-12-28 11:27:28', '2023-12-28 11:27:28'),
(1447, 'App\\Models\\User', 102, 'hydra-api-token', '0f3947a25b087df5ebf7d8543e3569f2306a00ce9e4ae2561e81b0e2152d8322', '[\"user\"]', NULL, '2023-12-28 11:27:29', '2023-12-28 11:27:29'),
(1448, 'App\\Models\\User', 102, 'hydra-api-token', '72c45da378fbdba0507fdea12a81c79249cdecbbace3151d3c6e6e04e87445d6', '[\"user\"]', NULL, '2023-12-28 11:27:30', '2023-12-28 11:27:30'),
(1449, 'App\\Models\\User', 102, 'hydra-api-token', 'aec02ecb2aacd6bbfc1a2911a17159afd90004dda78a89957c34c2a61eb8b4a7', '[\"user\"]', NULL, '2023-12-28 11:28:08', '2023-12-28 11:28:08'),
(1450, 'App\\Models\\User', 100, 'hydra-api-token', 'ccbda7268d5c78b80941d12236a4c1626571ac746fee8b8319b536a13f95d48d', '[\"admin\"]', NULL, '2023-12-28 11:28:39', '2023-12-28 11:28:39'),
(1451, 'App\\Models\\User', 102, 'hydra-api-token', 'd549b172f23c68460c66dde36265b2bcd235a91aef333c8aed9f49808e1e6fb3', '[\"user\"]', NULL, '2023-12-28 11:28:54', '2023-12-28 11:28:54'),
(1452, 'App\\Models\\User', 102, 'hydra-api-token', 'ae412caf605a54fef828ef462bea76a51d3b3ac3266fada0f4b6534995d6a232', '[\"user\"]', NULL, '2023-12-28 11:30:16', '2023-12-28 11:30:16'),
(1453, 'App\\Models\\User', 102, 'hydra-api-token', 'bd10cc703b1d914fdb51d5b1e3f36f73b97a3ed016eb2a9d2c137934a0daace8', '[\"user\"]', NULL, '2023-12-28 11:30:21', '2023-12-28 11:30:21'),
(1454, 'App\\Models\\User', 102, 'hydra-api-token', '62eb9e143ffd142e12f6663cab0ba491a09ca460df9e81f47b4a2c91b9213f99', '[\"user\"]', NULL, '2023-12-28 11:43:44', '2023-12-28 11:43:44'),
(1455, 'App\\Models\\User', 102, 'hydra-api-token', 'fe14daf2fcaa29ee6a52d0865f41e96b5b4199f51646f01028f2c89c05e25b22', '[\"user\"]', NULL, '2023-12-28 11:46:29', '2023-12-28 11:46:29'),
(1456, 'App\\Models\\User', 102, 'hydra-api-token', '98022a78e1931289f95127a525a4f36ff062da7b360dc40d8b37ea398a3e746b', '[\"user\"]', NULL, '2023-12-28 11:49:31', '2023-12-28 11:49:31'),
(1457, 'App\\Models\\User', 102, 'hydra-api-token', '35da48be5928b1626a0f0150de0b00334e261339e872483bae2190c5b40fd752', '[\"user\"]', NULL, '2023-12-28 11:49:41', '2023-12-28 11:49:41'),
(1458, 'App\\Models\\User', 102, 'hydra-api-token', '7670756783aa4fa041351f9c82574cb4ef13fb90e3dcf3d29ed77b31f468b721', '[\"user\"]', NULL, '2023-12-28 11:49:42', '2023-12-28 11:49:42'),
(1459, 'App\\Models\\User', 102, 'hydra-api-token', '0537b176561c3985cfed5e4e7033bb2ef1b3e2494b3805b6a272b06620a44a44', '[\"user\"]', NULL, '2023-12-28 11:49:43', '2023-12-28 11:49:43'),
(1460, 'App\\Models\\User', 102, 'hydra-api-token', '2bb4784adcd36a932e195d92e4a7d36cb02bdbec7093cb480becfe66603ca863', '[\"user\"]', NULL, '2023-12-28 11:50:08', '2023-12-28 11:50:08'),
(1461, 'App\\Models\\User', 102, 'hydra-api-token', '2c05fbaacf8850dd8d098a91e122c51f1408f0803069d33a0312056d771537a8', '[\"user\"]', NULL, '2023-12-28 11:51:33', '2023-12-28 11:51:33'),
(1462, 'App\\Models\\User', 102, 'hydra-api-token', '2c83be07965298c3e1b2d77d5f48834bbee8a14c23e724c93d8dd13b5f420dec', '[\"user\"]', NULL, '2023-12-28 11:57:39', '2023-12-28 11:57:39'),
(1463, 'App\\Models\\User', 102, 'hydra-api-token', '5e47cbf736acda0bbef09c5985413fa7ea6bd059c958963dbc750f70d0087553', '[\"user\"]', NULL, '2023-12-28 12:03:35', '2023-12-28 12:03:35'),
(1464, 'App\\Models\\User', 102, 'hydra-api-token', 'b152e562b0722814f85ed0e8d6d45317c63d970007b38f3b9fb224bffd92a4d4', '[\"user\"]', NULL, '2023-12-28 12:05:37', '2023-12-28 12:05:37'),
(1465, 'App\\Models\\User', 102, 'hydra-api-token', 'eaaee1b44e5df8fa48a98ad8ce518c7ddde0c4711a69204204a015a60f996f7b', '[\"user\"]', NULL, '2023-12-28 12:07:37', '2023-12-28 12:07:37'),
(1466, 'App\\Models\\User', 102, 'hydra-api-token', '4ff34470ab0e105a891c03a1edb209c2a1bf8562ab03bd308c950a9cf1c599bf', '[\"user\"]', NULL, '2023-12-28 12:20:06', '2023-12-28 12:20:06'),
(1467, 'App\\Models\\User', 102, 'hydra-api-token', 'a847a2f85a14b720955f73b1e8f11e672327d73bc9633beadfb94cb9c6885e1d', '[\"user\"]', '2023-12-28 12:31:18', '2023-12-28 12:28:36', '2023-12-28 12:31:18'),
(1468, 'App\\Models\\User', 102, 'hydra-api-token', 'e95317d8537a6dc1b8d189c9d2fa5a3d1f7faf0cc55ab7ad3711cf862c2c3000', '[\"user\"]', NULL, '2023-12-28 12:28:56', '2023-12-28 12:28:56'),
(1469, 'App\\Models\\User', 102, 'hydra-api-token', 'cec2679431d54363187a68ee47d2bbcd00c45a86cbb343b635d681b2f8048011', '[\"user\"]', NULL, '2023-12-28 12:28:58', '2023-12-28 12:28:58'),
(1470, 'App\\Models\\User', 102, 'hydra-api-token', '3d4c9572dcc147234c20f0cf2d364787a0b0b44cfc7fa6cc52f8bbb722952641', '[\"user\"]', NULL, '2023-12-28 12:28:59', '2023-12-28 12:28:59'),
(1471, 'App\\Models\\User', 102, 'hydra-api-token', '92ab1716188d33c86057d777880b70c73673bb852b3b057241221006a4f88dd4', '[\"user\"]', NULL, '2023-12-28 12:29:00', '2023-12-28 12:29:00'),
(1472, 'App\\Models\\User', 102, 'hydra-api-token', 'dc69a3e30989543bbe3dbe9600dde317b4945020218fefe13ed9b79bbaa6d66f', '[\"user\"]', NULL, '2023-12-28 12:29:00', '2023-12-28 12:29:00'),
(1473, 'App\\Models\\User', 102, 'hydra-api-token', 'beb60389f302329291f05591e08315b0dd6568fcb1961a32c17f8ed0af80d7e9', '[\"user\"]', NULL, '2023-12-28 12:29:02', '2023-12-28 12:29:02'),
(1474, 'App\\Models\\User', 102, 'hydra-api-token', '7b3ce1bc560ee1145ec3f725f541d4b4169d230102ddf0af63cc48739aeed117', '[\"user\"]', NULL, '2023-12-28 12:30:28', '2023-12-28 12:30:28'),
(1475, 'App\\Models\\User', 102, 'hydra-api-token', 'b072b65989a7932f8649569779ae1f0725d4d26c3998d4e32f16b12094719a8e', '[\"user\"]', NULL, '2023-12-28 12:30:36', '2023-12-28 12:30:36'),
(1476, 'App\\Models\\User', 102, 'hydra-api-token', '49b5bc42595065c8c1345acbdde03b10b5adac6b41b03a471fea383a20eb4f9f', '[\"user\"]', NULL, '2023-12-28 12:30:37', '2023-12-28 12:30:37'),
(1477, 'App\\Models\\User', 102, 'hydra-api-token', '36deb36e90a99ea290fe7002067db675e5ce92ad170d14edc2fc4e17be807223', '[\"user\"]', NULL, '2023-12-28 12:30:38', '2023-12-28 12:30:38'),
(1478, 'App\\Models\\User', 102, 'hydra-api-token', '12720c88f1f144bd2cd23d2bcb411df935610048064f6fd8b0e91180506c94e5', '[\"user\"]', '2023-12-28 12:30:59', '2023-12-28 12:30:56', '2023-12-28 12:30:59'),
(1479, 'App\\Models\\User', 102, 'hydra-api-token', '5b4e5fe0fce683360d2effbbe80b0736dc8c856140b569ec3a1b89d347585f6f', '[\"user\"]', '2023-12-28 12:31:21', '2023-12-28 12:31:08', '2023-12-28 12:31:21'),
(1480, 'App\\Models\\User', 102, 'hydra-api-token', 'b8734bff51858267d921a78dd9b061379df7f56ccf209d6df7aa0cbc1bd2ac16', '[\"user\"]', '2023-12-28 12:31:34', '2023-12-28 12:31:32', '2023-12-28 12:31:34'),
(1481, 'App\\Models\\User', 102, 'hydra-api-token', '30e6a77493b46c25ddbfafe2ba2fca94768bc3f9a043a647147945c6f2e4cbdc', '[\"user\"]', '2023-12-28 12:32:21', '2023-12-28 12:31:43', '2023-12-28 12:32:21'),
(1482, 'App\\Models\\User', 102, 'hydra-api-token', 'ed5448553ef42d6da0b064381fc0360918ea574705fc17f18a6b6357d237c935', '[\"user\"]', '2023-12-28 12:32:50', '2023-12-28 12:32:30', '2023-12-28 12:32:50'),
(1483, 'App\\Models\\User', 102, 'hydra-api-token', 'af8a4032f10617b78d2d1c4d80f311d2559e14cad42b03bf0b9daf96354b66f9', '[\"user\"]', '2023-12-28 12:34:14', '2023-12-28 12:32:56', '2023-12-28 12:34:14'),
(1484, 'App\\Models\\User', 102, 'hydra-api-token', 'dceb7fa024d1adb39cc59b96bed3700a18d50870ad121c602da703d0d7bab655', '[\"user\"]', '2023-12-28 12:34:24', '2023-12-28 12:34:23', '2023-12-28 12:34:24'),
(1485, 'App\\Models\\User', 102, 'hydra-api-token', 'f4491393a6143d1226cbd71bad5d6b303560b081288648ee8debc7e534645ef6', '[\"user\"]', '2023-12-28 12:35:44', '2023-12-28 12:34:48', '2023-12-28 12:35:44'),
(1486, 'App\\Models\\User', 105, 'hydra-api-token', '496aa5113564062ee7a69fa728fed0bbe3e51f4a2bbf85ba657972011521b6bf', '[\"user\"]', '2023-12-31 09:39:06', '2023-12-29 09:22:33', '2023-12-31 09:39:06'),
(1487, 'App\\Models\\User', 102, 'hydra-api-token', 'fbce38432ce2d4d52cb032eedb6c686a3da8b5a3c1f4bfe9f0fc23f70d5cfa5e', '[\"user\"]', '2024-01-02 07:18:28', '2023-12-30 04:14:31', '2024-01-02 07:18:28'),
(1488, 'App\\Models\\User', 102, 'hydra-api-token', '5df13bf04dba4afeff45a6989e28e04d552d06c613df6dd572a28ec8eb999b55', '[\"user\"]', '2024-02-01 10:09:54', '2023-12-30 04:29:00', '2024-02-01 10:09:54'),
(1489, 'App\\Models\\User', 102, 'hydra-api-token', '5311ce70204ab8e519775e8bda00e5bca349f91c7a975f3cc154f5c81902e2c3', '[\"user\"]', '2024-01-06 09:06:37', '2023-12-30 04:32:11', '2024-01-06 09:06:37'),
(1490, 'App\\Models\\User', 102, 'hydra-api-token', '1e9b2252b7cda55835eac32d58e6bf8b2ce816c700930bfa0219e391ad0f32f1', '[\"user\"]', '2024-01-06 09:08:26', '2023-12-30 06:31:57', '2024-01-06 09:08:26'),
(1491, 'App\\Models\\User', 102, 'hydra-api-token', '6c499e1bb690c04888f741b1c3d86db505f9c68a44f9d939dc608445462c1694', '[\"user\"]', '2024-01-08 04:44:40', '2023-12-30 09:03:47', '2024-01-08 04:44:40'),
(1492, 'App\\Models\\User', 102, 'hydra-api-token', 'd0de1b2834f21186676a4b1c7a8758bb8e5b526dd1b716744fec2a28219b0ac9', '[\"user\"]', '2023-12-30 11:14:16', '2023-12-30 09:56:30', '2023-12-30 11:14:16'),
(1493, 'App\\Models\\User', 102, 'hydra-api-token', 'c4ffd7bb0958fa06edfa4c3e1ec0620ecf3467d942b394b95da55a0298b27fe7', '[\"user\"]', '2023-12-30 09:59:38', '2023-12-30 09:59:34', '2023-12-30 09:59:38'),
(1494, 'App\\Models\\User', 102, 'hydra-api-token', 'a050f1d3a4a3c683442642a1c5d159f222683c23d5a09cb53482c940ad2a1f2a', '[\"user\"]', '2024-01-04 11:04:01', '2023-12-30 10:00:54', '2024-01-04 11:04:01'),
(1495, 'App\\Models\\User', 103, 'hydra-api-token', '83bac342ee839d23dcc8ade3733d3f10db018890afc901845bfb07becb0268bf', '[\"user\"]', '2023-12-30 18:57:30', '2023-12-30 18:14:39', '2023-12-30 18:57:30'),
(1496, 'App\\Models\\User', 103, 'hydra-api-token', '2ff76241d21c8395ce0b6efa568f45c8fbf2619e174072733e4a9194a080d600', '[\"user\"]', '2024-01-11 07:12:29', '2023-12-30 18:27:14', '2024-01-11 07:12:29'),
(1497, 'App\\Models\\User', 105, 'hydra-api-token', 'e67aaef40742ee154610c28dcec699d70cc0fd737861d2979ff202fb9b0f8ce3', '[\"user\"]', '2023-12-31 04:35:05', '2023-12-31 04:35:04', '2023-12-31 04:35:05'),
(1498, 'App\\Models\\User', 105, 'hydra-api-token', '35956eadc40e5236f79beb89af390ff214f91bb2b29589ee5365d518da7c12d5', '[\"user\"]', '2023-12-31 05:03:21', '2023-12-31 05:03:19', '2023-12-31 05:03:21'),
(1499, 'App\\Models\\User', 102, 'hydra-api-token', 'e1879a09a814f365805a2fbace35aa09074579e6bef83a1cfd79b0acb6fe9c02', '[\"user\"]', '2024-01-06 10:02:04', '2023-12-31 05:31:03', '2024-01-06 10:02:04'),
(1500, 'App\\Models\\User', 95, 'hydra-api-token', 'ab89a795f02d4d948b2433d9c71ee34822a6d4a7d893d646457632198c65db4c', '[\"user\"]', '2023-12-31 07:03:18', '2023-12-31 07:03:17', '2023-12-31 07:03:18'),
(1501, 'App\\Models\\User', 103, 'hydra-api-token', '37a828e0f87b9df2e9cbff1fb8c7ce229462cd21f48e41b021dbe8b9381b2cfe', '[\"user\"]', '2024-01-06 10:08:35', '2023-12-31 07:05:50', '2024-01-06 10:08:35'),
(1502, 'App\\Models\\User', 100, 'hydra-api-token', '60ffcd959113536a3d008bae7ae48ca0d827a28d8b356d38fe072b2420a051c8', '[\"admin\"]', '2023-12-31 10:26:58', '2023-12-31 08:58:53', '2023-12-31 10:26:58'),
(1503, 'App\\Models\\User', 100, 'hydra-api-token', '95ab20756f443d5d9901476c8f3c24990d29f9cb2627e31e0b2e118af3dd8bfc', '[\"admin\"]', '2023-12-31 11:55:26', '2023-12-31 09:22:57', '2023-12-31 11:55:26'),
(1504, 'App\\Models\\User', 105, 'hydra-api-token', 'eae4c4b29fce2d7d2b4dfc08298b04c7ae209b5aa61d9a22db5da7f0bc0948fd', '[\"user\"]', '2024-01-17 10:04:24', '2023-12-31 09:44:30', '2024-01-17 10:04:24'),
(1505, 'App\\Models\\User', 103, 'hydra-api-token', 'cde0cfcb068e5b332f45919c21189125b0c28273b6a67abc3b60e6d08fed8a7e', '[\"user\"]', '2023-12-31 10:22:34', '2023-12-31 10:07:15', '2023-12-31 10:22:34'),
(1506, 'App\\Models\\User', 103, 'hydra-api-token', 'b5d66127b60bf156ff8e0925fc59f8c5e8d9aebb2c4c562aff1969d15f09c8ac', '[\"user\"]', '2024-01-10 09:54:30', '2023-12-31 10:27:32', '2024-01-10 09:54:30'),
(1507, 'App\\Models\\User', 102, 'hydra-api-token', '044fc51f25ac511cfc4794565f3a8f48dd02f678c0163b330c977d5db3f73d92', '[\"user\"]', '2023-12-31 12:26:08', '2023-12-31 10:43:25', '2023-12-31 12:26:08'),
(1508, 'App\\Models\\User', 103, 'hydra-api-token', '4737791a988aafb7d85a56531aa82f61f66dfc2e0652d7f6acfc8472dee679d5', '[\"user\"]', '2024-01-04 12:46:33', '2023-12-31 11:55:52', '2024-01-04 12:46:33'),
(1509, 'App\\Models\\User', 102, 'hydra-api-token', 'bce3f2cc62a59119a74b6e6d88203198d8fecd64ba81e66de8d38b38ec010d36', '[\"user\"]', '2024-01-04 05:49:39', '2024-01-01 04:54:59', '2024-01-04 05:49:39'),
(1510, 'App\\Models\\User', 102, 'hydra-api-token', '1adf7939d146bc8489a2762d400ed68b74056b86d968daf4d5bbe51ba4387f37', '[\"user\"]', '2024-01-01 05:57:42', '2024-01-01 05:57:33', '2024-01-01 05:57:42'),
(1511, 'App\\Models\\User', 102, 'hydra-api-token', 'ac83116af110067ff567216e52017f91f28d444fcd7d4c3b78fd72ec6883821c', '[\"user\"]', '2024-01-01 05:57:58', '2024-01-01 05:57:56', '2024-01-01 05:57:58'),
(1512, 'App\\Models\\User', 102, 'hydra-api-token', '74c6b6b2786f12620287ee837d8b0184d6718a4b4a13b2a93e861dec657cbd9d', '[\"user\"]', '2024-01-01 06:03:53', '2024-01-01 05:58:19', '2024-01-01 06:03:53'),
(1513, 'App\\Models\\User', 103, 'hydra-api-token', 'fbc1717888eb309a97727382208bf7f3095ae3b82cb6841b60757ef0893e41d8', '[\"user\"]', '2024-01-03 07:37:32', '2024-01-01 06:38:44', '2024-01-03 07:37:32'),
(1514, 'App\\Models\\User', 102, 'hydra-api-token', '4fccd28ce0abccc98b8fa1aa3e7a7eca69a9e7e360d624cea992d973dde9dcd0', '[\"user\"]', '2024-01-01 09:17:27', '2024-01-01 06:41:12', '2024-01-01 09:17:27'),
(1515, 'App\\Models\\User', 102, 'hydra-api-token', '66fd205c8e7cd965ab97bbaa39b1e2be0d6346ea74a78170c0df729c50177b41', '[\"user\"]', '2024-01-01 09:52:43', '2024-01-01 06:45:55', '2024-01-01 09:52:43'),
(1516, 'App\\Models\\User', 102, 'hydra-api-token', '41d39ffa7e99fdef42216789b9262fa8fb5a90b93f47b0507ce26a9872793c57', '[\"user\"]', '2024-01-01 07:17:32', '2024-01-01 07:15:04', '2024-01-01 07:17:32'),
(1517, 'App\\Models\\User', 102, 'hydra-api-token', '87f87f29d69e4943fd71a91be9016ff2d680f5085346c52a995194df31861641', '[\"user\"]', '2024-01-01 10:11:46', '2024-01-01 10:05:36', '2024-01-01 10:11:46'),
(1518, 'App\\Models\\User', 102, 'hydra-api-token', '7b962785bf7711e8d2e50447788eec63512863d212067944e255567bc4b5917b', '[\"user\"]', '2024-01-01 12:17:15', '2024-01-01 10:11:35', '2024-01-01 12:17:15'),
(1519, 'App\\Models\\User', 102, 'hydra-api-token', '5f7192284cbd05207cb1f23cc11244b1f98eaeb4ffa5d5bb62d619ff77aa4fff', '[\"user\"]', '2024-01-01 10:40:04', '2024-01-01 10:40:03', '2024-01-01 10:40:04'),
(1520, 'App\\Models\\User', 102, 'hydra-api-token', '31b090fb8ac3bb4fa1f690170d110a5358079d3b0c56308e0a310df02672b20c', '[\"user\"]', '2024-01-01 10:40:29', '2024-01-01 10:40:28', '2024-01-01 10:40:29'),
(1521, 'App\\Models\\User', 102, 'hydra-api-token', '3d5ceb94dbc98af3838e39af66192ef753a4f4b2d470221b83f7d8dbd23f2cde', '[\"user\"]', '2024-01-01 10:41:04', '2024-01-01 10:41:03', '2024-01-01 10:41:04'),
(1522, 'App\\Models\\User', 102, 'hydra-api-token', '40feb1f3f6c22af1e7fb40b26f93a9deff16c9e9f7887e631b41d33e263a40a3', '[\"user\"]', '2024-01-01 10:41:39', '2024-01-01 10:41:38', '2024-01-01 10:41:39'),
(1523, 'App\\Models\\User', 102, 'hydra-api-token', '0252f84ef83e41437e02612c713dd2d791965d31679b6abb9372a390427a993a', '[\"user\"]', '2024-01-01 10:55:15', '2024-01-01 10:53:23', '2024-01-01 10:55:15'),
(1524, 'App\\Models\\User', 102, 'hydra-api-token', '11f1142f02621be39d37620956d851a0bed60534c83b36de88eb599a5a969247', '[\"user\"]', '2024-01-02 07:12:00', '2024-01-01 10:54:28', '2024-01-02 07:12:00'),
(1525, 'App\\Models\\User', 102, 'hydra-api-token', '8c59b58e92d2364597bdf36e2d8e75a97faeca88f1bd40c21a84b4c732b7aa60', '[\"user\"]', '2024-01-01 11:27:32', '2024-01-01 11:13:58', '2024-01-01 11:27:32'),
(1526, 'App\\Models\\User', 102, 'hydra-api-token', '7f240a996b3878d44409076c546aa150bd8303544700b57af83c8a3ca26b84ea', '[\"user\"]', '2024-01-02 05:42:03', '2024-01-02 05:15:03', '2024-01-02 05:42:03'),
(1527, 'App\\Models\\User', 102, 'hydra-api-token', '5a9045017c4fc5b87b2617722ca14526f27cf97739fd8f012b70dc9a2fd8c36d', '[\"user\"]', '2024-01-02 06:08:45', '2024-01-02 05:45:42', '2024-01-02 06:08:45'),
(1528, 'App\\Models\\User', 102, 'hydra-api-token', '3a3598b4d97dba2c9686e1e8dd238d85a60b4f930a48255407e3dd41ba3f60a8', '[\"user\"]', '2024-01-02 06:00:06', '2024-01-02 05:58:07', '2024-01-02 06:00:06'),
(1529, 'App\\Models\\User', 102, 'hydra-api-token', 'a1cdef916483f9694e934da18ffdf1a928e8673014a021be6754f042e9f50c26', '[\"user\"]', NULL, '2024-01-02 05:58:17', '2024-01-02 05:58:17'),
(1530, 'App\\Models\\User', 102, 'hydra-api-token', 'ec43205fde91d8981df42212f7b02d037a6919178cb15453a1c24165163546dc', '[\"user\"]', '2024-01-03 04:15:26', '2024-01-02 06:10:38', '2024-01-03 04:15:26'),
(1531, 'App\\Models\\User', 102, 'hydra-api-token', '288ea8a9b3d251a7531ef84bef9d2d80250fa808491a3dc67c5c838280be798e', '[\"user\"]', '2024-01-02 06:47:29', '2024-01-02 06:47:27', '2024-01-02 06:47:29'),
(1532, 'App\\Models\\User', 102, 'hydra-api-token', 'b0c14372627c03859bc469d09782917efe81c964eb06054acfb6bd5ca596e553', '[\"user\"]', '2024-01-04 11:05:02', '2024-01-02 06:47:47', '2024-01-04 11:05:02'),
(1533, 'App\\Models\\User', 102, 'hydra-api-token', '864481961181453df35da993f7c6bb27acb4a416ad86b6cce58218260341d238', '[\"user\"]', '2024-01-02 07:17:47', '2024-01-02 07:17:45', '2024-01-02 07:17:47'),
(1534, 'App\\Models\\User', 102, 'hydra-api-token', 'fcd180aa8a3f439611b970a7882074d179d389b7557434da0e761a5f1d81f1d6', '[\"user\"]', '2024-01-17 10:57:52', '2024-01-02 07:18:46', '2024-01-17 10:57:52'),
(1535, 'App\\Models\\User', 102, 'hydra-api-token', '0d0fd2250c2f20f735d37ef091f91b37f83c984649aca873dce84f07b90d4cbf', '[\"user\"]', '2024-01-03 12:38:45', '2024-01-02 11:06:43', '2024-01-03 12:38:45'),
(1536, 'App\\Models\\User', 102, 'hydra-api-token', 'f052db151a87f5a543d9926db4e74cfcfad85abc2163df0757d01590546deea9', '[\"user\"]', '2024-01-02 11:18:00', '2024-01-02 11:13:46', '2024-01-02 11:18:00'),
(1537, 'App\\Models\\User', 102, 'hydra-api-token', 'cad728f5835159263052d232dccc19cebbcca82f4835132690bd73e411527c23', '[\"user\"]', '2024-01-03 08:42:31', '2024-01-03 06:35:44', '2024-01-03 08:42:31'),
(1539, 'App\\Models\\User', 102, 'hydra-api-token', 'ebca329f1fc744bd28611fcbd8a58f5e2de74c8723a12a85fc863ef4d718997c', '[\"user\"]', '2024-01-03 12:18:22', '2024-01-03 09:31:38', '2024-01-03 12:18:22'),
(1540, 'App\\Models\\User', 105, 'hydra-api-token', '0f62113ab802b788908a9cd4b0497383f44f6c554d50cc719ba03c5546d4606a', '[\"user\"]', '2024-01-13 10:02:50', '2024-01-03 09:47:42', '2024-01-13 10:02:50'),
(1541, 'App\\Models\\User', 102, 'hydra-api-token', '9c0c2c1b551e2cbe112ceef1bce7fde354e57a7912686da97ebd3465c6f3a724', '[\"user\"]', '2024-01-03 12:45:58', '2024-01-03 12:41:59', '2024-01-03 12:45:58'),
(1542, 'App\\Models\\User', 103, 'hydra-api-token', '067a67ee02253aacd77bb6814aa7141bd427c7a1306c54d2c64e0b40902ae0b0', '[\"user\"]', '2024-01-04 07:11:02', '2024-01-03 13:44:38', '2024-01-04 07:11:02'),
(1543, 'App\\Models\\User', 102, 'hydra-api-token', '2d3620af6c2baeada5846ac8ab70ad353579f26937aa081f03d9b2f76be25b10', '[\"user\"]', '2024-01-13 12:49:22', '2024-01-04 05:57:10', '2024-01-13 12:49:22'),
(1544, 'App\\Models\\User', 103, 'hydra-api-token', 'f0a834a0e29f589118a3e8455ea8d37ad249afbc69d1f2f30109d2183a808269', '[\"user\"]', '2024-01-10 09:57:53', '2024-01-04 07:12:14', '2024-01-10 09:57:53'),
(1545, 'App\\Models\\User', 103, 'hydra-api-token', 'cd603266d929013725d4a3bc55690a4c37e2a2338262928e2cb06e81828e4492', '[\"user\"]', '2024-01-18 06:29:01', '2024-01-04 09:12:40', '2024-01-18 06:29:01'),
(1546, 'App\\Models\\User', 102, 'hydra-api-token', 'd5586fef41204d13b98f6c6605af208201c3f6410237fc19f12ac88634dcc58f', '[\"user\"]', '2024-01-06 09:23:00', '2024-01-04 09:33:59', '2024-01-06 09:23:00'),
(1547, 'App\\Models\\User', 102, 'hydra-api-token', '46fe6bdf882b5417b5bb02342219e5604b9481444d5ace281775791b7bae6064', '[\"user\"]', '2024-01-08 05:32:57', '2024-01-04 09:35:15', '2024-01-08 05:32:57'),
(1548, 'App\\Models\\User', 102, 'hydra-api-token', '21508db52c34fbb48a24ba3a4d338c10c62310dfc0bfb45480ff8d727b2cfc3b', '[\"user\"]', '2024-01-09 10:55:06', '2024-01-04 10:04:19', '2024-01-09 10:55:06'),
(1555, 'App\\Models\\User', 102, 'hydra-api-token', 'b848d062a082272c1eb72fd21c43b5fc3e7b0330fb8aa1c54e01c079d14cc2a1', '[\"user\"]', '2024-01-04 12:22:11', '2024-01-04 11:34:25', '2024-01-04 12:22:11'),
(1559, 'App\\Models\\User', 100, 'hydra-api-token', '28d2eab92749d30ea1a784249b1026beeae8a6f4d03491e2453318834f92cc57', '[\"admin\"]', '2024-01-04 12:19:46', '2024-01-04 12:08:04', '2024-01-04 12:19:46'),
(1560, 'App\\Models\\User', 100, 'hydra-api-token', '956e1373a6351664e5a3472c74ab9480cf9d9b8e6ec5e11f371270405d29e069', '[\"admin\"]', '2024-01-04 12:47:56', '2024-01-04 12:13:45', '2024-01-04 12:47:56'),
(1561, 'App\\Models\\User', 116, 'hydra-api-token', '703e30f697feb114253c740efae4b0ec4f36df872b98d75c1112ac61db44c127', '[\"user\"]', '2024-01-04 12:24:00', '2024-01-04 12:23:57', '2024-01-04 12:24:00'),
(1562, 'App\\Models\\User', 117, 'hydra-api-token', 'a5e18f61342d37866ade25c8499e3d9a294b79c1a745b104e558e9240cdfb827', '[\"user\"]', '2024-01-04 12:36:40', '2024-01-04 12:24:18', '2024-01-04 12:36:40'),
(1563, 'App\\Models\\User', 116, 'hydra-api-token', '4825fdea695c348eb166d4a2daa6535f4383df0ba8d390d86773408acfc15626', '[\"user\"]', '2024-01-04 12:38:15', '2024-01-04 12:36:47', '2024-01-04 12:38:15'),
(1564, 'App\\Models\\User', 117, 'hydra-api-token', '7e175f05f955088a03d9e177d90e21fbd252f205679949e72b910514e34d1ac6', '[\"user\"]', '2024-01-04 12:51:25', '2024-01-04 12:38:31', '2024-01-04 12:51:25'),
(1565, 'App\\Models\\User', 116, 'hydra-api-token', '550e13443b98df30f104c859cb8567cbe45e1b1e1792a8cab0c2668c74577988', '[\"user\"]', '2024-01-04 12:47:54', '2024-01-04 12:47:24', '2024-01-04 12:47:54'),
(1566, 'App\\Models\\User', 117, 'hydra-api-token', '0e3da78ce4b9d5fccc7a6072f4e395f2cf5e54bf94a80e5e47c8d119cd0bfe60', '[\"user\"]', '2024-01-06 07:44:10', '2024-01-04 12:48:22', '2024-01-06 07:44:10'),
(1567, 'App\\Models\\User', 116, 'hydra-api-token', '7ffbb85e7abf90f46a13cf06dc6af99f187df9c53b4b7dae5f44929d0c6d1a6f', '[\"user\"]', '2024-01-04 12:48:52', '2024-01-04 12:48:48', '2024-01-04 12:48:52'),
(1568, 'App\\Models\\User', 100, 'hydra-api-token', 'f6735034758f5bf2c0757e5410fbf953d38a86a3ab871a892467b868c91acf73', '[\"admin\"]', '2024-01-06 06:31:18', '2024-01-04 12:50:11', '2024-01-06 06:31:18'),
(1569, 'App\\Models\\User', 116, 'hydra-api-token', '1f52355db9bf31b57143a0e4ed91d5381028df816f1b475f3ea48bcefb3aa5fe', '[\"user\"]', '2024-01-04 12:51:32', '2024-01-04 12:51:31', '2024-01-04 12:51:32'),
(1570, 'App\\Models\\User', 117, 'hydra-api-token', 'c6e022349f35f0ed215dc039d50e7c3078623c299aa0d3c11196ba1c958f2699', '[\"user\"]', '2024-01-29 11:38:55', '2024-01-04 12:51:41', '2024-01-29 11:38:55'),
(1571, 'App\\Models\\User', 116, 'hydra-api-token', '992dc5c745dd66febcc6000953603d678c356302bea24e1e65ad1edb08697de0', '[\"user\"]', '2024-01-05 12:52:47', '2024-01-05 12:41:54', '2024-01-05 12:52:47'),
(1572, 'App\\Models\\User', 105, 'hydra-api-token', 'c6effefaf76f387c0c8b42cc8b7bde8c674406c2cce7ee4acdaa993d86f84213', '[\"user\"]', '2024-01-05 13:36:05', '2024-01-05 12:54:18', '2024-01-05 13:36:05'),
(1573, 'App\\Models\\User', 102, 'hydra-api-token', '8a068b57bfbbf6a1a1ff68a1cb74ce23bcf889b4d0a05bafe0109a0fdbfa26bb', '[\"user\"]', '2024-01-05 16:13:39', '2024-01-05 16:07:50', '2024-01-05 16:13:39'),
(1574, 'App\\Models\\User', 102, 'hydra-api-token', '1082368f516895fceda1627e7a96cae47fd304e6d3ad964d0315a794e7adc317', '[\"user\"]', '2024-01-13 05:42:47', '2024-01-06 04:21:37', '2024-01-13 05:42:47'),
(1575, 'App\\Models\\User', 102, 'hydra-api-token', 'e2127f3237f3873341d683fcf279aa8d3c179b3a917e9e6d8b3d0dd86bcb8307', '[\"user\"]', '2024-01-09 13:03:36', '2024-01-06 05:09:54', '2024-01-09 13:03:36'),
(1576, 'App\\Models\\User', 102, 'hydra-api-token', '62679bd974a18d1e88be4bbf887ba4d7f89ce3d3209b6d83b4230727be7c6188', '[\"user\"]', '2024-01-09 04:18:42', '2024-01-06 06:32:15', '2024-01-09 04:18:42'),
(1577, 'App\\Models\\User', 102, 'hydra-api-token', '2976aff04bca89438df2fd0cef1449e801636d2e4631531d185defce115a297b', '[\"user\"]', '2024-01-06 09:36:29', '2024-01-06 09:36:13', '2024-01-06 09:36:29'),
(1578, 'App\\Models\\User', 105, 'hydra-api-token', 'f73615f8ffb69a3d3f6014d37911b9eb24dfffd961efb45ea0817d7344e68676', '[\"user\"]', '2024-01-06 10:01:09', '2024-01-06 10:01:08', '2024-01-06 10:01:09'),
(1579, 'App\\Models\\User', 105, 'hydra-api-token', 'bb78504c2d72a56237b3cdd7d1e618429168e97b9f4030e5d8f14ee5b7dfad84', '[\"user\"]', '2024-01-06 10:11:48', '2024-01-06 10:01:55', '2024-01-06 10:11:48'),
(1580, 'App\\Models\\User', 105, 'hydra-api-token', '02c6a777465d1894fef3c18cbe8ba23ef5f7caf05739cfb9ac25073740e0b66f', '[\"user\"]', '2024-01-14 08:09:42', '2024-01-06 10:02:26', '2024-01-14 08:09:42'),
(1581, 'App\\Models\\User', 105, 'hydra-api-token', '6bbdd33f7aca7bccb023cb5014e797060de787d120c3c1ccdd650f30e39c15e2', '[\"user\"]', '2024-01-06 10:02:57', '2024-01-06 10:02:56', '2024-01-06 10:02:57'),
(1582, 'App\\Models\\User', 105, 'hydra-api-token', '2403f0c224bf3cf80a21f3dddb4ff837206a9db1e9e2242b6d138ba273107523', '[\"user\"]', '2024-01-17 08:44:05', '2024-01-06 10:05:56', '2024-01-17 08:44:05'),
(1583, 'App\\Models\\User', 105, 'hydra-api-token', 'a513ac87d234780d9b3567a153a39ec0a9140a38de8e7d5136ee1b8859f2dfb5', '[\"user\"]', '2024-01-06 10:06:06', '2024-01-06 10:06:04', '2024-01-06 10:06:06'),
(1584, 'App\\Models\\User', 105, 'hydra-api-token', '4c9091f6df36de5356f86cd7e0d5454346deb4f6771d355b9353f6513266aeda', '[\"user\"]', '2024-01-06 10:10:09', '2024-01-06 10:09:04', '2024-01-06 10:10:09'),
(1585, 'App\\Models\\User', 105, 'hydra-api-token', '41316c94b6e8f33c00f3f05e90b170fb14314284c2af04b9e41d8fee19878791', '[\"user\"]', '2024-01-06 10:11:01', '2024-01-06 10:09:44', '2024-01-06 10:11:01'),
(1586, 'App\\Models\\User', 105, 'hydra-api-token', '79790b4e348a3957f625d764ca7bc55290a8eb9b7997d70cb4693ed8c4628b22', '[\"user\"]', '2024-01-15 05:25:35', '2024-01-06 10:09:44', '2024-01-15 05:25:35'),
(1587, 'App\\Models\\User', 102, 'hydra-api-token', '07582f0ecc743b0eca5ae3b3468eea243e1bdf92273a52e2795076c12565e880', '[\"user\"]', '2024-01-10 08:49:11', '2024-01-06 10:12:54', '2024-01-10 08:49:11'),
(1588, 'App\\Models\\User', 102, 'hydra-api-token', '16617014b90a12fa8be04d1e011e55e2973724e74ae0ec7bedec10eef4dcfdfa', '[\"user\"]', '2024-01-08 05:53:48', '2024-01-06 10:14:01', '2024-01-08 05:53:48'),
(1589, 'App\\Models\\User', 102, 'hydra-api-token', '007ecaef75a435b3cadbc64cb19dd79e056551a9e81e6082dec07dd87d10d85e', '[\"user\"]', '2024-01-06 12:07:39', '2024-01-06 11:56:13', '2024-01-06 12:07:39');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1590, 'App\\Models\\User', 102, 'hydra-api-token', 'f5f8df8b4fad2fb987e2201963cc721f3fc258b8fa14142837d36bcb07520478', '[\"user\"]', '2024-01-20 12:31:42', '2024-01-06 12:00:40', '2024-01-20 12:31:42'),
(1591, 'App\\Models\\User', 102, 'hydra-api-token', '9247caca76838ed9bf114402174e7d3774c598963bb0c693b50b0eaca42cb339', '[\"user\"]', '2024-01-07 11:58:22', '2024-01-07 11:57:56', '2024-01-07 11:58:22'),
(1592, 'App\\Models\\User', 102, 'hydra-api-token', '5c71339a8ad3ed45fec0cdce4373ba2f720d4f1a31cf88ef4db67745234879d5', '[\"user\"]', '2024-01-08 09:02:45', '2024-01-08 05:54:51', '2024-01-08 09:02:45'),
(1593, 'App\\Models\\User', 102, 'hydra-api-token', '2cd7d13c3820bd75910f421f9cde9ec85056e6462902f46bb29177f6b2ecbf16', '[\"user\"]', '2024-01-08 06:54:37', '2024-01-08 06:54:21', '2024-01-08 06:54:37'),
(1594, 'App\\Models\\User', 102, 'hydra-api-token', '4447878266815698e1a0b5f83b14235dc0b9156fac18320ce37ed7b6f134de68', '[\"user\"]', '2024-01-09 11:30:04', '2024-01-08 09:03:57', '2024-01-09 11:30:04'),
(1595, 'App\\Models\\User', 102, 'hydra-api-token', '41002d02d740eac524be6e3ecbcea5a6903da3ba2595a93ee759d50bfce17359', '[\"user\"]', '2024-01-08 09:26:17', '2024-01-08 09:26:00', '2024-01-08 09:26:17'),
(1596, 'App\\Models\\User', 102, 'hydra-api-token', '9bb324c5dc729d8f6866faeec0070763d7ce7cbba84031fe9a1f248bbf9bcaf2', '[\"user\"]', '2024-01-08 12:03:03', '2024-01-08 09:56:46', '2024-01-08 12:03:03'),
(1597, 'App\\Models\\User', 102, 'hydra-api-token', '79b18a008200e592dea2c191dc7ff6771ae2f3d8664577eb55d48a66691cdbd6', '[\"user\"]', '2024-01-10 10:04:42', '2024-01-09 04:20:02', '2024-01-10 10:04:42'),
(1598, 'App\\Models\\User', 102, 'hydra-api-token', '9a01f1f0c240bf55a5d5c747a7d17aa30ce5deb26ae4dd2ac5ad530f46eb61a3', '[\"user\"]', '2024-01-09 11:08:33', '2024-01-09 05:23:03', '2024-01-09 11:08:33'),
(1599, 'App\\Models\\User', 102, 'hydra-api-token', '8636d66cc196ac6d86d6b3a714abb855c3a31ec5f35013a2aad72616f1561f70', '[\"user\"]', '2024-01-15 05:24:23', '2024-01-09 10:57:02', '2024-01-15 05:24:23'),
(1600, 'App\\Models\\User', 102, 'hydra-api-token', '65101aeed63f005b3edafc3f2b0b1699e8847920250df526906aa61739ef2b4f', '[\"user\"]', '2024-01-09 11:27:06', '2024-01-09 11:27:02', '2024-01-09 11:27:06'),
(1601, 'App\\Models\\User', 102, 'hydra-api-token', 'a66a2b21485c504652a9e5afdbe06905d62963c3d9e6100603b7cc02ab482622', '[\"user\"]', NULL, '2024-01-09 11:31:49', '2024-01-09 11:31:49'),
(1602, 'App\\Models\\User', 102, 'hydra-api-token', '5552d52faafd159d5562dd8947426a417c9b5fd2fa2ee8dfe15638c999cd36f6', '[\"user\"]', NULL, '2024-01-09 11:31:56', '2024-01-09 11:31:56'),
(1603, 'App\\Models\\User', 102, 'hydra-api-token', 'db229a575b927e0803cb5e04f891f3580f16d6d0c9367ec3f9a4a8089bc51ef1', '[\"user\"]', '2024-01-10 04:00:14', '2024-01-09 11:33:14', '2024-01-10 04:00:14'),
(1604, 'App\\Models\\User', 103, 'hydra-api-token', '70c6444ec1a611ea308fca6782ad976db4c9772127104d47a53e30895c6c24d7', '[\"user\"]', '2024-02-04 10:53:19', '2024-01-09 12:37:39', '2024-02-04 10:53:19'),
(1605, 'App\\Models\\User', 102, 'hydra-api-token', 'fc39d506103391bfa9bda47f475f8f88b68eb9efec0b707f77f4ef92cfe4ba68', '[\"user\"]', '2024-01-10 08:54:55', '2024-01-10 04:00:58', '2024-01-10 08:54:55'),
(1606, 'App\\Models\\User', 102, 'hydra-api-token', '32f93c73c24f371a5d35399499874bd30175008677a6a3b0744336c52fb52dc4', '[\"user\"]', '2024-01-13 06:05:25', '2024-01-10 06:58:46', '2024-01-13 06:05:25'),
(1607, 'App\\Models\\User', 102, 'hydra-api-token', '1fe8242610b7e3e1f52dabb93a3101a792df7e4fd3f479b06d10a53c073009e0', '[\"user\"]', '2024-01-10 08:48:43', '2024-01-10 08:48:34', '2024-01-10 08:48:43'),
(1608, 'App\\Models\\User', 102, 'hydra-api-token', '9234a46e5a35d06243f78f15a6dceb0e643dadee3e7d718afcfe283ba1a56884', '[\"user\"]', '2024-01-10 08:57:19', '2024-01-10 08:49:38', '2024-01-10 08:57:19'),
(1609, 'App\\Models\\User', 105, 'hydra-api-token', '0cd6bfe84c08f7d35b862f4bc3188336e0e97eef6fc392885eeaab1dbd21f8ac', '[\"user\"]', '2024-01-10 11:03:02', '2024-01-10 08:50:33', '2024-01-10 11:03:02'),
(1610, 'App\\Models\\User', 105, 'hydra-api-token', '85ccb35d722e545f0d006ce2291dfd231bc0e03a4fa089e5ae3897b7c55bd961', '[\"user\"]', '2024-01-10 09:15:33', '2024-01-10 08:56:49', '2024-01-10 09:15:33'),
(1611, 'App\\Models\\User', 102, 'hydra-api-token', '9eb97027500f678c958f276298cb31ce72ab47c058135acfdfe37057983d7f44', '[\"user\"]', '2024-01-11 07:17:19', '2024-01-10 09:16:34', '2024-01-11 07:17:19'),
(1612, 'App\\Models\\User', 100, 'hydra-api-token', 'd8d281c958bd7b333022fbc64f1ed66a410e3e5d3b1e273895a7046aaefa0fec', '[\"admin\"]', '2024-01-11 07:31:50', '2024-01-10 09:55:10', '2024-01-11 07:31:50'),
(1613, 'App\\Models\\User', 102, 'hydra-api-token', 'f4ed1d8ea1cbfe1dac4419113c3a167b854fa7626cd13e640b4516035d431ce4', '[\"user\"]', '2024-01-10 11:05:45', '2024-01-10 10:48:07', '2024-01-10 11:05:45'),
(1614, 'App\\Models\\User', 102, 'hydra-api-token', '8d93f363b4843f0043a2362690edc9b699913a1517c6fdb2f531c76568890bf9', '[\"user\"]', '2024-01-11 07:16:44', '2024-01-10 11:04:12', '2024-01-11 07:16:44'),
(1615, 'App\\Models\\User', 100, 'hydra-api-token', '814579124d6c76e2a35cfe894fcb66a3f8898b6a6c64a14e5736e89fa757a228', '[\"admin\"]', '2024-01-11 04:46:14', '2024-01-10 11:12:35', '2024-01-11 04:46:14'),
(1616, 'App\\Models\\User', 102, 'hydra-api-token', 'ceda74f3f3d3d3454ddb8d1c2d7112a28ec8f3c5597047009c5ef19d1b151690', '[\"user\"]', '2024-01-10 11:36:21', '2024-01-10 11:36:17', '2024-01-10 11:36:21'),
(1617, 'App\\Models\\User', 102, 'hydra-api-token', 'c3fb412e0990736c730eb749249dd756b696d3db407776ee5623a6418f1dc81e', '[\"user\"]', '2024-01-14 11:35:20', '2024-01-10 12:17:15', '2024-01-14 11:35:20'),
(1618, 'App\\Models\\User', 102, 'hydra-api-token', 'd4cbf7264ac290bd28d574c5004646d6545217d59c4d184a6bf895d857cd450d', '[\"user\"]', '2024-01-13 05:04:08', '2024-01-11 04:46:38', '2024-01-13 05:04:08'),
(1619, 'App\\Models\\User', 102, 'hydra-api-token', 'f55ca94af8d62bec768d28b2e3e937c9c1047b6c64fb1c6b13e70bdac47b76f6', '[\"user\"]', '2024-01-31 05:58:06', '2024-01-11 04:55:20', '2024-01-31 05:58:06'),
(1620, 'App\\Models\\User', 102, 'hydra-api-token', 'bc6015d8eeb38d6d5ded4f53364544a5656b177046daf90b539d79e1e2ad64d6', '[\"user\"]', '2024-01-11 05:44:31', '2024-01-11 05:44:19', '2024-01-11 05:44:31'),
(1621, 'App\\Models\\User', 102, 'hydra-api-token', 'b1c74d153df666973fd7fb0b7912416d9ba745492c58dd84bbafb1bfaf19b96a', '[\"user\"]', '2024-01-11 05:47:09', '2024-01-11 05:45:30', '2024-01-11 05:47:09'),
(1622, 'App\\Models\\User', 102, 'hydra-api-token', 'f0d6edce26e986499517d4e018289dc3b29d574846b28ddcfcc8a9d3859bd360', '[\"user\"]', '2024-01-11 08:57:11', '2024-01-11 06:53:46', '2024-01-11 08:57:11'),
(1623, 'App\\Models\\User', 103, 'hydra-api-token', '044276041394b9804670c996b2d2c04ef6400fa06fb9f31056aa1f718c0b92fc', '[\"user\"]', '2024-01-17 08:48:44', '2024-01-11 07:12:56', '2024-01-17 08:48:44'),
(1624, 'App\\Models\\User', 103, 'hydra-api-token', '777cfb26857c7c8a11b995503b6b920ed1f099a285809b2f2cc9d7ffae971201', '[\"user\"]', '2024-01-11 07:17:02', '2024-01-11 07:16:54', '2024-01-11 07:17:02'),
(1625, 'App\\Models\\User', 103, 'hydra-api-token', '51c9e4a13b01054bf12cbe77e5573bec5cf2f62b0a9cec8cbefd1e8c5930a51d', '[\"user\"]', '2024-01-11 08:31:48', '2024-01-11 07:18:49', '2024-01-11 08:31:48'),
(1626, 'App\\Models\\User', 103, 'hydra-api-token', '9c24e8b9b623b614c3ccee6aa31e9186f3db8d93860b40c15046d6d4ff571999', '[\"user\"]', '2024-01-15 05:32:23', '2024-01-11 07:20:53', '2024-01-15 05:32:23'),
(1627, 'App\\Models\\User', 103, 'hydra-api-token', '853054bdd6fc791c1c1010e2a28019677feca07498d6d3a47513e06d2496b039', '[\"user\"]', '2024-01-11 09:48:26', '2024-01-11 07:32:44', '2024-01-11 09:48:26'),
(1628, 'App\\Models\\User', 103, 'hydra-api-token', '4dee868617e98ef36dab869400dbd10870eb37fd630f097a14abc4d506528888', '[\"user\"]', '2024-01-16 11:45:13', '2024-01-11 07:39:44', '2024-01-16 11:45:13'),
(1629, 'App\\Models\\User', 102, 'hydra-api-token', '25ddbe7cdcc1d71d9509a6a6f02aab7414db4e7da66872bb384f1e3b9f3ec139', '[\"user\"]', '2024-01-11 09:10:44', '2024-01-11 08:32:22', '2024-01-11 09:10:44'),
(1630, 'App\\Models\\User', 102, 'hydra-api-token', '83bdfa778b098c2a478e5c11421b193ccf6d2ec43eb96049f020b84e97e1e419', '[\"user\"]', '2024-01-13 09:38:38', '2024-01-11 09:35:58', '2024-01-13 09:38:38'),
(1631, 'App\\Models\\User', 100, 'hydra-api-token', '1a1503fc97c926b89cf2c0e2d4a5f1bd08e45fd51a60c2e9a91d92226e27edef', '[\"admin\"]', '2024-01-13 07:32:37', '2024-01-11 09:48:44', '2024-01-13 07:32:37'),
(1632, 'App\\Models\\User', 102, 'hydra-api-token', '4f199e7d115d0c7214becb95b3f505e708ba057b62dd7c59dc0c7866c6a812ff', '[\"user\"]', '2024-01-11 12:28:52', '2024-01-11 12:28:37', '2024-01-11 12:28:52'),
(1633, 'App\\Models\\User', 102, 'hydra-api-token', '9a89d54ea325fb631aaafbcbae14b9fd177e1a797bc3b35b9e569b8eeeaf5503', '[\"user\"]', '2024-01-11 17:02:05', '2024-01-11 14:12:16', '2024-01-11 17:02:05'),
(1634, 'App\\Models\\User', 102, 'hydra-api-token', '861875ebe91536943f193f2c412942f8bdac6a2c45eeb42c156fef7628488d60', '[\"user\"]', '2024-01-13 05:18:43', '2024-01-13 05:10:10', '2024-01-13 05:18:43'),
(1635, 'App\\Models\\User', 100, 'hydra-api-token', 'fa43a0adce3d3ef1ab93ebea3eb0c29d64678978f7241ad775ddd22ad7956b39', '[\"admin\"]', '2024-01-13 05:43:40', '2024-01-13 05:19:58', '2024-01-13 05:43:40'),
(1636, 'App\\Models\\User', 102, 'hydra-api-token', '0eb8c5e4d984a8197360d4972dfaec0a6b99c9ba708e9d43434dbe869289997f', '[\"user\"]', '2024-01-13 07:56:45', '2024-01-13 05:27:57', '2024-01-13 07:56:45'),
(1637, 'App\\Models\\User', 102, 'hydra-api-token', '096c350b21abd5007d9f8977c3884630ee1d28864146bd7b48273df36847f284', '[\"user\"]', '2024-01-13 05:44:53', '2024-01-13 05:35:35', '2024-01-13 05:44:53'),
(1638, 'App\\Models\\User', 102, 'hydra-api-token', '903ae8b30515f42cef44a5193fde029e714b0ee4450bb118b932df93351bca1c', '[\"user\"]', '2024-01-13 05:44:53', '2024-01-13 05:42:55', '2024-01-13 05:44:53'),
(1639, 'App\\Models\\User', 102, 'hydra-api-token', 'f60c60009c2c832c69c438624c97ec4aa329537689f83bee87894b809aca6b48', '[\"user\"]', '2024-01-13 06:07:23', '2024-01-13 05:44:00', '2024-01-13 06:07:23'),
(1640, 'App\\Models\\User', 102, 'hydra-api-token', '30d017fb84dc4bea1443ceb42d06388b78e19fc54698c0b71dc915cc7f4cb010', '[\"user\"]', '2024-01-14 10:52:40', '2024-01-13 05:46:45', '2024-01-14 10:52:40'),
(1641, 'App\\Models\\User', 102, 'hydra-api-token', 'c84af8c7c01feea78bb2012506089bf9d90d8897c434cccfebfdcb0f62b313e6', '[\"user\"]', '2024-01-13 09:14:39', '2024-01-13 05:46:50', '2024-01-13 09:14:39'),
(1642, 'App\\Models\\User', 102, 'hydra-api-token', '9ec7f90c46f52d8e6dd9ac9a77da7e71a3d65b34c16d7e13395496325c8bef69', '[\"user\"]', '2024-01-13 08:51:43', '2024-01-13 06:18:32', '2024-01-13 08:51:43'),
(1643, 'App\\Models\\User', 102, 'hydra-api-token', 'c57a0f31c41727b4940bbcf58e15f65827e43360f516b3db0c0f35c89ba27c23', '[\"user\"]', '2024-01-17 09:24:20', '2024-01-13 06:25:41', '2024-01-17 09:24:20'),
(1644, 'App\\Models\\User', 102, 'hydra-api-token', '15b5f18933679fd3655f763f27f644bbc4666ebae8b353dd02c7fd9a5a401ee4', '[\"user\"]', '2024-01-13 09:14:33', '2024-01-13 06:32:20', '2024-01-13 09:14:33'),
(1645, 'App\\Models\\User', 103, 'hydra-api-token', '91b25b517284346625b3504d9ac7517f7e7e3229efa77631314b16478837123b', '[\"user\"]', '2024-01-15 06:35:50', '2024-01-13 07:33:06', '2024-01-15 06:35:50'),
(1646, 'App\\Models\\User', 102, 'hydra-api-token', 'fb2b8643a13335190ea92a52fb9167b6153d9af53fa1a40895c7999e135d7140', '[\"user\"]', '2024-01-13 07:57:52', '2024-01-13 07:57:12', '2024-01-13 07:57:52'),
(1647, 'App\\Models\\User', 102, 'hydra-api-token', '23a022ff09b03ca1ff88834553731484bea14b2733551ead27e21706e074e21c', '[\"user\"]', '2024-01-13 08:02:27', '2024-01-13 08:02:06', '2024-01-13 08:02:27'),
(1648, 'App\\Models\\User', 102, 'hydra-api-token', '94622cfd08c3e03069b44a6de8bfbf850a0b2106d30edb414d29a27ad9718189', '[\"user\"]', '2024-01-13 09:09:18', '2024-01-13 08:52:29', '2024-01-13 09:09:18'),
(1649, 'App\\Models\\User', 102, 'hydra-api-token', 'e765a35b6afff80694360a30a4c682ff7686366976812d3e382aea5ea9d84c63', '[\"user\"]', '2024-01-13 09:14:55', '2024-01-13 09:09:35', '2024-01-13 09:14:55'),
(1650, 'App\\Models\\User', 102, 'hydra-api-token', 'c3ec60c4ace4e56dc2d7f42071e7f5eafa0cab49666a76518561b159077139d0', '[\"user\"]', '2024-01-15 04:40:58', '2024-01-13 09:29:13', '2024-01-15 04:40:58'),
(1651, 'App\\Models\\User', 102, 'hydra-api-token', 'e485bb5cc35c26c7bb296a67f187250edb52ed5a14a15ec2e17863074fef72a7', '[\"user\"]', NULL, '2024-01-13 09:29:55', '2024-01-13 09:29:55'),
(1652, 'App\\Models\\User', 102, 'hydra-api-token', 'dd740c5157d68d2de6cde98f8a0aa1330fa19ab00e364e2b3f5b537ee41e421e', '[\"user\"]', '2024-01-13 12:05:17', '2024-01-13 09:32:17', '2024-01-13 12:05:17'),
(1653, 'App\\Models\\User', 102, 'hydra-api-token', 'c9ae02c62531a769693790969f50c224e0d835b62a471c50469d0d240ea5610e', '[\"user\"]', NULL, '2024-01-13 09:38:35', '2024-01-13 09:38:35'),
(1654, 'App\\Models\\User', 102, 'hydra-api-token', 'f4fccf6272a78cd50b5f0c9bb0176921952a019384aceb079ddda2feb2090d10', '[\"user\"]', '2024-01-13 12:38:13', '2024-01-13 09:38:58', '2024-01-13 12:38:13'),
(1655, 'App\\Models\\User', 102, 'hydra-api-token', '4693a87adaa973b996158144651781b56aefce351f8bc6cfa1b83c312266f6c4', '[\"user\"]', '2024-01-15 09:43:30', '2024-01-13 09:42:05', '2024-01-15 09:43:30'),
(1656, 'App\\Models\\User', 105, 'hydra-api-token', '53cd4cfe0a4344bce0cd58add38c11f6ae8a9bc3a18765becbe640fc05820d14', '[\"user\"]', '2024-01-17 08:23:57', '2024-01-13 10:02:59', '2024-01-17 08:23:57'),
(1657, 'App\\Models\\User', 102, 'hydra-api-token', 'ab8a27896fced6aa5dccc1505306ef72a8c96789df9f920743f78c1a4859436d', '[\"user\"]', '2024-01-14 12:54:11', '2024-01-13 12:39:50', '2024-01-14 12:54:11'),
(1658, 'App\\Models\\User', 102, 'hydra-api-token', '23287ef44f660057b8d57c0b36aaf375f1fadde2b9ec2e5da0ba0b919ac03e9a', '[\"user\"]', '2024-01-13 13:54:50', '2024-01-13 12:50:27', '2024-01-13 13:54:50'),
(1659, 'App\\Models\\User', 102, 'hydra-api-token', '26276fd744f0c3124b491a48b10b2cea5c3575b06b5ed814436ac48ec98896e6', '[\"user\"]', '2024-02-01 09:15:56', '2024-01-13 12:50:37', '2024-02-01 09:15:56'),
(1660, 'App\\Models\\User', 102, 'hydra-api-token', '740b3ac763aacece30cb3e17df84bec00d87875b5e7ead7d3e28f4598a93a088', '[\"user\"]', '2024-01-14 04:55:36', '2024-01-13 12:53:25', '2024-01-14 04:55:36'),
(1661, 'App\\Models\\User', 102, 'hydra-api-token', '535d79c742e124d6d58b58d395fd8f02317e210f1efd19727b367f8fb708c8de', '[\"user\"]', '2024-01-15 12:39:57', '2024-01-13 13:58:29', '2024-01-15 12:39:57'),
(1662, 'App\\Models\\User', 102, 'hydra-api-token', '54de404fdeb5e7897331a0c8d18e07ef2fa9b2751a9e20ff7302ec729db2db37', '[\"user\"]', '2024-01-22 05:39:12', '2024-01-14 04:56:13', '2024-01-22 05:39:12'),
(1663, 'App\\Models\\User', 95, 'hydra-api-token', '1d6bd27c416972b166f2317b864750b801d451a8eeb189fdf319cf9660345c6d', '[\"user\"]', '2024-01-14 08:10:15', '2024-01-14 08:09:59', '2024-01-14 08:10:15'),
(1664, 'App\\Models\\User', 81, 'hydra-api-token', '6d0c3be7d44db85a0e4646548810e8be885bfc91a04b46b77894636e16540dfa', '[\"user\"]', '2024-01-14 08:11:00', '2024-01-14 08:10:52', '2024-01-14 08:11:00'),
(1665, 'App\\Models\\User', 103, 'hydra-api-token', '7dcd4cbd5f68b2c971d6ca27b7b89fbf4d3ecf7d00630bf11fd93d212779f987', '[\"user\"]', '2024-01-14 10:31:37', '2024-01-14 08:11:13', '2024-01-14 10:31:37'),
(1666, 'App\\Models\\User', 102, 'hydra-api-token', '1e2d8f7f24446a2b63f62111281b232eba88308bce1917e7ac76638a2c04acd3', '[\"user\"]', '2024-01-14 11:35:49', '2024-01-14 09:53:26', '2024-01-14 11:35:49'),
(1667, 'App\\Models\\User', 102, 'hydra-api-token', '4fcae7ef50995680ac083eec4792dbce56aeb041b66ec2f445aa190150d746d5', '[\"user\"]', '2024-01-15 05:50:52', '2024-01-14 11:37:54', '2024-01-15 05:50:52'),
(1668, 'App\\Models\\User', 102, 'hydra-api-token', '23c725211677d0aae11671ed3d9032159b0ffe51cb6e815186e675db1fe1e08f', '[\"user\"]', '2024-01-14 11:55:48', '2024-01-14 11:55:28', '2024-01-14 11:55:48'),
(1669, 'App\\Models\\User', 100, 'hydra-api-token', '1e716245cf5f5a24fa8e96a9f277a47aa6daea27221e2c9f157945a9aa8b846c', '[\"admin\"]', '2024-01-16 13:59:09', '2024-01-14 13:12:29', '2024-01-16 13:59:09'),
(1670, 'App\\Models\\User', 105, 'hydra-api-token', '5673a38a0f79e59a47813155699841b549a1aef395ba567f496efaf121e78b0d', '[\"user\"]', '2024-01-17 06:17:48', '2024-01-15 00:37:52', '2024-01-17 06:17:48'),
(1671, 'App\\Models\\User', 102, 'hydra-api-token', '3d13ea9485483a231d6559ca41777fb642b8a01b8f2e9f925cb65864f9651cac', '[\"user\"]', '2024-01-15 04:45:03', '2024-01-15 04:13:48', '2024-01-15 04:45:03'),
(1672, 'App\\Models\\User', 102, 'hydra-api-token', 'c9ffa96d2d30370f90609240bb58e025386879b91a1c6bc54c9e59a2264466cd', '[\"user\"]', '2024-01-15 05:14:01', '2024-01-15 05:12:34', '2024-01-15 05:14:01'),
(1673, 'App\\Models\\User', 102, 'hydra-api-token', 'edd8bfd3478964c1fb8fb595353174f5aade498addd9a010b098a4ee3fc4e64f', '[\"user\"]', '2024-01-15 05:16:18', '2024-01-15 05:12:45', '2024-01-15 05:16:18'),
(1674, 'App\\Models\\User', 102, 'hydra-api-token', 'f95f3569d97ef215880c49ad996b0c9812a3c1120a612aad1a3b438af570fc5a', '[\"user\"]', '2024-01-15 05:16:22', '2024-01-15 05:15:20', '2024-01-15 05:16:22'),
(1675, 'App\\Models\\User', 102, 'hydra-api-token', 'c4fa88eae5e2eb851fcad490287f4831bc3357e8f92c67e9563ba5e637a7ae21', '[\"user\"]', '2024-01-15 05:32:34', '2024-01-15 05:16:50', '2024-01-15 05:32:34'),
(1676, 'App\\Models\\User', 102, 'hydra-api-token', '9d971e6d226af9fe9e841e0ef1310b037d6efde895d16f67e952a783b19e9de0', '[\"user\"]', '2024-01-15 05:33:17', '2024-01-15 05:17:01', '2024-01-15 05:33:17'),
(1677, 'App\\Models\\User', 102, 'hydra-api-token', '37cab039f2ca4647376c63ba254efca3612e21ef23407189b9916c419b2f35b7', '[\"user\"]', '2024-01-15 11:10:04', '2024-01-15 05:17:29', '2024-01-15 11:10:04'),
(1678, 'App\\Models\\User', 102, 'hydra-api-token', '60923802a1b43d948adbd0c22cfc20a61ed817d7052c3138d140dd7943fdf70b', '[\"user\"]', '2024-01-15 05:25:52', '2024-01-15 05:18:08', '2024-01-15 05:25:52'),
(1679, 'App\\Models\\User', 102, 'hydra-api-token', '1b9207e153382639aa6f2d5bedcbefa52fb1485c0a7574707cbfdc7ca4274d50', '[\"user\"]', '2024-01-15 06:20:57', '2024-01-15 05:28:36', '2024-01-15 06:20:57'),
(1680, 'App\\Models\\User', 102, 'hydra-api-token', 'd3a17110fb5b60b2e71faac9ec5b872e61dc639b6da8ec631db7af22cd9a08dd', '[\"user\"]', '2024-01-16 08:48:21', '2024-01-15 05:32:38', '2024-01-16 08:48:21'),
(1681, 'App\\Models\\User', 105, 'hydra-api-token', '4ef1e5a10d6c7787d23b94303a1794cb2927df326fd0c3e2e8f6950d6cf60a93', '[\"user\"]', '2024-01-18 12:10:32', '2024-01-15 05:32:53', '2024-01-18 12:10:32'),
(1682, 'App\\Models\\User', 102, 'hydra-api-token', '14b987a5839b1dc366f17bddce07ad91d601288cc780a84f0591593406a573ae', '[\"user\"]', '2024-01-15 11:10:16', '2024-01-15 05:33:31', '2024-01-15 11:10:16'),
(1683, 'App\\Models\\User', 100, 'hydra-api-token', '88539e687d86d0e00124d68f4ca83f47a01bf23fe97bac82dfcba48a5a8e9b03', '[\"admin\"]', '2024-01-15 07:50:26', '2024-01-15 06:36:07', '2024-01-15 07:50:26'),
(1685, 'App\\Models\\User', 100, 'hydra-api-token', '37672e89390f67f7af33f2760405ce45da92559edefdb52ce50d1612481d828d', '[\"admin\"]', '2024-01-15 08:57:09', '2024-01-15 08:42:12', '2024-01-15 08:57:09'),
(1686, 'App\\Models\\User', 103, 'hydra-api-token', '6eec682e3582a7a754f6fa54dc053df71baf9837d96ee0146ec7585590f93d73', '[\"user\"]', '2024-01-15 08:51:04', '2024-01-15 08:50:42', '2024-01-15 08:51:04'),
(1687, 'App\\Models\\User', 100, 'hydra-api-token', '7c0b05392054a38d395f9f6f3f08c6bfc79ae2517205a7947d1c0d7cbc7084b7', '[\"admin\"]', '2024-01-16 06:59:43', '2024-01-15 08:51:55', '2024-01-16 06:59:43'),
(1688, 'App\\Models\\User', 100, 'hydra-api-token', 'a09dd30aaf0bec238d85692ae4ba65cacf44e783bd082066b95cf3cdc3468c48', '[\"admin\"]', '2024-01-15 09:00:51', '2024-01-15 08:57:21', '2024-01-15 09:00:51'),
(1689, 'App\\Models\\User', 118, 'hydra-api-token', '8fca535f2408aa7a290b87513c3232ffbaf16c9a0d864c29c41d00fa9e24957d', '[\"user\"]', '2024-01-15 09:01:53', '2024-01-15 09:01:15', '2024-01-15 09:01:53'),
(1690, 'App\\Models\\User', 102, 'hydra-api-token', '10d084d23636dc05150d11fd3436310ecb7f77799f84d82d2fd7a3bb48403bd9', '[\"user\"]', '2024-01-15 09:34:43', '2024-01-15 09:20:26', '2024-01-15 09:34:43'),
(1691, 'App\\Models\\User', 118, 'hydra-api-token', '87c0a2d1ed04e2be8c33c58b45595465376093aa4a87989f48a9d0e9dff1745b', '[\"user\"]', '2024-01-15 10:23:50', '2024-01-15 09:28:44', '2024-01-15 10:23:50'),
(1692, 'App\\Models\\User', 118, 'hydra-api-token', 'a0800bee9afc4f5fbc79fd10e2312435d7712012154f5657bc46ff5899f5b0f7', '[\"user\"]', '2024-01-16 07:13:31', '2024-01-15 11:03:08', '2024-01-16 07:13:31'),
(1693, 'App\\Models\\User', 102, 'hydra-api-token', '826066c4754909faabe06a0df2f69a87394a22e1886912dff35e261aae63bb12', '[\"user\"]', '2024-01-15 11:06:32', '2024-01-15 11:05:57', '2024-01-15 11:06:32'),
(1694, 'App\\Models\\User', 102, 'hydra-api-token', 'fabe7690cd728e5bb9bf5794b5fdca75e4e9150b4b0b33d2f460a3686ce184ec', '[\"user\"]', '2024-01-15 11:35:42', '2024-01-15 11:10:48', '2024-01-15 11:35:42'),
(1695, 'App\\Models\\User', 102, 'hydra-api-token', '26791b7379a80d567d8b3ed59645898ef205b55665743914b0963ded5c1a5a62', '[\"user\"]', '2024-01-15 11:20:36', '2024-01-15 11:10:49', '2024-01-15 11:20:36'),
(1696, 'App\\Models\\User', 102, 'hydra-api-token', 'c12fca2bc7c3748292d4fca2ba8d5c6bd9502b84744c778ab64a1430d1c2b1e7', '[\"user\"]', '2024-01-16 10:39:10', '2024-01-15 11:36:30', '2024-01-16 10:39:10'),
(1697, 'App\\Models\\User', 102, 'hydra-api-token', '501dfa04cc09666eca4655fd9cfc2d2154c1e5f802a606e6b01d6094023a367c', '[\"user\"]', '2024-01-15 11:59:41', '2024-01-15 11:58:30', '2024-01-15 11:59:41'),
(1698, 'App\\Models\\User', 102, 'hydra-api-token', '5cc86c863bc05139eb96f06112a1bd16e5ced714f95857edfda8379c6fd7a264', '[\"user\"]', '2024-01-15 12:17:14', '2024-01-15 12:00:00', '2024-01-15 12:17:14'),
(1699, 'App\\Models\\User', 102, 'hydra-api-token', 'd9428ebe55476cc67c0128d8e3d390ed7d2d15e3ffd8fbf84d6498ea83373cba', '[\"user\"]', '2024-01-15 12:00:38', '2024-01-15 12:00:18', '2024-01-15 12:00:38'),
(1700, 'App\\Models\\User', 102, 'hydra-api-token', '451b97aed824da1a91ace53653a7390e792708ae44ba8118f7a8416370900265', '[\"user\"]', '2024-01-15 12:35:00', '2024-01-15 12:00:55', '2024-01-15 12:35:00'),
(1701, 'App\\Models\\User', 102, 'hydra-api-token', '3dbd4b21f2b8e9ec9df2a1e4741193ee49f7fffcf970bc048a1c2b42afdc2200', '[\"user\"]', '2024-01-24 04:48:53', '2024-01-15 12:01:13', '2024-01-24 04:48:53'),
(1702, 'App\\Models\\User', 1, 'hydra-api-token', 'b14c9ccaa3ba1e77ec529b9126e647a340858d1ffa73f837bc30dc51199ba7d7', '[\"admin\"]', NULL, '2024-01-15 12:42:39', '2024-01-15 12:42:39'),
(1703, 'App\\Models\\User', 102, 'hydra-api-token', 'd8d46b39c40d0a1036df98a4779e35735f46a3abe906616a43b089bccc06a817', '[\"user\"]', '2024-01-15 13:52:37', '2024-01-15 12:44:58', '2024-01-15 13:52:37'),
(1704, 'App\\Models\\User', 100, 'hydra-api-token', '62ed4f6566c5352eeb78ce45edf601f2460a986b063e06ab3147255ebc0b0c40', '[\"admin\"]', '2024-01-16 07:39:16', '2024-01-16 07:11:07', '2024-01-16 07:39:16'),
(1705, 'App\\Models\\User', 100, 'hydra-api-token', '3f1f341e9e20d65f49b3486d424ac9c13a3bc2a10921ce64f47c488dddaca29f', '[\"admin\"]', '2024-01-16 07:22:45', '2024-01-16 07:13:39', '2024-01-16 07:22:45'),
(1706, 'App\\Models\\User', 119, 'hydra-api-token', '84ec3f4011bf8fff8a125331802afbd302c98bb19cfee98a6c0a58be05168236', '[\"user\"]', '2024-01-16 07:27:32', '2024-01-16 07:23:22', '2024-01-16 07:27:32'),
(1707, 'App\\Models\\User', 100, 'hydra-api-token', '32e02a541840b356db4929231b883416cab719314f5d6a639416800f831b1ffe', '[\"admin\"]', '2024-01-16 07:37:18', '2024-01-16 07:33:08', '2024-01-16 07:37:18'),
(1708, 'App\\Models\\User', 120, 'hydra-api-token', 'b661c39d28a7d6cda26ba5cd9b11c51a8bbeccc2105386f861972c61f87c97e3', '[\"user\"]', '2024-01-16 07:37:41', '2024-01-16 07:37:40', '2024-01-16 07:37:41'),
(1709, 'App\\Models\\User', 100, 'hydra-api-token', '4b8d58d3f3787cab0936012cb5dfe89a5b9afcef8fd0679787070fc14506ccb1', '[\"admin\"]', '2024-01-16 07:42:29', '2024-01-16 07:38:04', '2024-01-16 07:42:29'),
(1710, 'App\\Models\\User', 121, 'hydra-api-token', 'f98d188d59c1faed82a7d894ef4feb48163b2261c746ef4f73fd9ba3f7c9b437', '[\"user\"]', '2024-01-16 07:42:52', '2024-01-16 07:42:51', '2024-01-16 07:42:52'),
(1711, 'App\\Models\\User', 100, 'hydra-api-token', 'eee48db833eb57d0ff101b168927c2c4e391755be68460bb5e4d8f0fccef3937', '[\"admin\"]', NULL, '2024-01-16 08:02:56', '2024-01-16 08:02:56'),
(1712, 'App\\Models\\User', 100, 'hydra-api-token', 'b298e98089ea2bc4911f141ad1800fe9eb27f72031f16a0317247a48c611c0d7', '[\"admin\"]', '2024-01-16 08:02:57', '2024-01-16 08:02:56', '2024-01-16 08:02:57'),
(1713, 'App\\Models\\User', 105, 'hydra-api-token', 'd91f5dbd391166083b0ab2e13a20925f5e5213ecbd0ed7d29d31f9214738b7bf', '[\"user\"]', '2024-01-16 08:49:51', '2024-01-16 08:43:33', '2024-01-16 08:49:51'),
(1714, 'App\\Models\\User', 105, 'hydra-api-token', '6e7198e9d300a4c38b26ebad49246be7b91c8eb97b088aec63d5bb79bdf37728', '[\"user\"]', '2024-01-18 09:04:25', '2024-01-16 08:48:51', '2024-01-18 09:04:25'),
(1715, 'App\\Models\\User', 105, 'hydra-api-token', 'fa81f9f07ff6263e29a9197a3aa3f58c411fc3e5bd629f135baa65375e10536f', '[\"user\"]', '2024-01-16 10:09:36', '2024-01-16 08:52:52', '2024-01-16 10:09:36'),
(1716, 'App\\Models\\User', 100, 'hydra-api-token', '1ad3a571431b74fa49a841e9da80e17e36f6ec16191d2ea540983d8b91d2cef3', '[\"admin\"]', '2024-01-17 08:42:21', '2024-01-16 09:30:23', '2024-01-17 08:42:21'),
(1717, 'App\\Models\\User', 105, 'hydra-api-token', 'f3bc33f7e86067ea19d5371aba668e51068291ceba035c251b6111c88849f2e9', '[\"user\"]', '2024-01-16 09:40:16', '2024-01-16 09:32:28', '2024-01-16 09:40:16'),
(1718, 'App\\Models\\User', 105, 'hydra-api-token', '83c0cd8a52c76cac5b6cf3ee802a6239ce6a06aaae85ae5f3b5e123126c526a6', '[\"user\"]', '2024-01-16 09:52:43', '2024-01-16 09:52:42', '2024-01-16 09:52:43'),
(1719, 'App\\Models\\User', 105, 'hydra-api-token', '1efb8d0a7b53aecd667f560e00d4514e6c6c2f274b400e3a192b4e0da2d0ab43', '[\"user\"]', '2024-01-17 05:29:36', '2024-01-16 10:11:17', '2024-01-17 05:29:36'),
(1720, 'App\\Models\\User', 102, 'hydra-api-token', '10fb6c6d2dbf885e14f4c898b0bb729d6c7ad455577ca07dd1d3fb081abd132b', '[\"user\"]', '2024-01-16 10:42:03', '2024-01-16 10:40:56', '2024-01-16 10:42:03'),
(1721, 'App\\Models\\User', 100, 'hydra-api-token', '694277aa9e21445bb330619b789069dba77e87e4029c7930f327dfd385e0d7e1', '[\"admin\"]', NULL, '2024-01-16 13:19:18', '2024-01-16 13:19:18'),
(1722, 'App\\Models\\User', 103, 'hydra-api-token', '56b644bc734c4136a5d4d487b0bc295c30bf98308823622917b19494066549fe', '[\"user\"]', '2024-01-23 16:06:36', '2024-01-16 13:27:37', '2024-01-23 16:06:36'),
(1723, 'App\\Models\\User', 118, 'hydra-api-token', 'e9f4396a82d3cbc66cd4129bd052f5b85315b6f1b90a2b6cbc88bca427d4cfbe', '[\"user\"]', '2024-01-25 07:20:22', '2024-01-16 15:07:08', '2024-01-25 07:20:22'),
(1724, 'App\\Models\\User', 119, 'hydra-api-token', 'f82105f22f8433422a163fb051239e82c9a7278e2a2c8c939c4a3ba587437d32', '[\"user\"]', '2024-01-17 06:06:01', '2024-01-17 06:01:34', '2024-01-17 06:06:01'),
(1725, 'App\\Models\\User', 119, 'hydra-api-token', '74f2386c24d7b05282f20e3e737c78c6193c7f7fc0504ef00784eb9230a88440', '[\"user\"]', '2024-01-17 06:10:25', '2024-01-17 06:06:34', '2024-01-17 06:10:25'),
(1726, 'App\\Models\\User', 119, 'hydra-api-token', 'ef20bed8f4e804e7731afee11eabd17f56d329993b193a98b984d2d7785f7d38', '[\"user\"]', '2024-01-17 06:20:27', '2024-01-17 06:18:26', '2024-01-17 06:20:27'),
(1727, 'App\\Models\\User', 105, 'hydra-api-token', '6fb76b575e5e68c0275198196458befca681d435a8b2827cb2ec3d2793f2b8b5', '[\"user\"]', '2024-01-18 01:36:37', '2024-01-17 06:20:38', '2024-01-18 01:36:37'),
(1728, 'App\\Models\\User', 103, 'hydra-api-token', 'a80fc84699302c682085f7f0493afba834c92f6c7df2c1e6dd507add0062b48b', '[\"user\"]', '2024-01-17 08:52:13', '2024-01-17 08:42:36', '2024-01-17 08:52:13'),
(1729, 'App\\Models\\User', 103, 'hydra-api-token', '711ffd11a976b426e2372d9b7361abf73c906c814307831b96fdc4bfa218ca7d', '[\"user\"]', '2024-01-23 10:49:23', '2024-01-17 08:49:19', '2024-01-23 10:49:23'),
(1730, 'App\\Models\\User', 121, 'hydra-api-token', '544f6dc9cf03c90c10e3d23c12a37226806973c57eae835ac95275a8d5ab324d', '[\"user\"]', '2024-01-17 09:20:56', '2024-01-17 09:19:35', '2024-01-17 09:20:56'),
(1731, 'App\\Models\\User', 121, 'hydra-api-token', '4c713890b75beda82b0e075778e9626dae6a1e2abf2a966b62c669637403cb12', '[\"user\"]', '2024-01-17 09:48:24', '2024-01-17 09:21:30', '2024-01-17 09:48:24'),
(1732, 'App\\Models\\User', 121, 'hydra-api-token', 'cf46a0cb7e75412bed7574e710ad0dc7c98c452ec3dbd157f925b1edc5bfec7e', '[\"user\"]', '2024-01-17 09:31:38', '2024-01-17 09:30:20', '2024-01-17 09:31:38'),
(1733, 'App\\Models\\User', 119, 'hydra-api-token', '38b677ddc3ee291dbb6f744d73437e1bd3d9e47b52817815d94aef2fc442cefe', '[\"user\"]', '2024-01-17 09:33:45', '2024-01-17 09:33:08', '2024-01-17 09:33:45'),
(1734, 'App\\Models\\User', 117, 'hydra-api-token', 'b837c6380d0f8f6ee766bbea791211270e732503c715c0b9f1df7ce0d7bd8995', '[\"user\"]', '2024-01-17 09:38:20', '2024-01-17 09:35:05', '2024-01-17 09:38:20'),
(1735, 'App\\Models\\User', 117, 'hydra-api-token', 'b451a9ac54bdb2fb8dae70651064fd7856a7292f931a1446c3916aa1081be252', '[\"user\"]', '2024-01-17 09:38:50', '2024-01-17 09:38:29', '2024-01-17 09:38:50'),
(1736, 'App\\Models\\User', 116, 'hydra-api-token', 'e70392f6516f5b9ba9c17424aa3c0688fd469f99dcfd33a8df17feb52c393a19', '[\"user\"]', '2024-01-17 09:41:47', '2024-01-17 09:39:41', '2024-01-17 09:41:47'),
(1737, 'App\\Models\\User', 121, 'hydra-api-token', 'ee364e08067868cb112df07f77eec24fbab1d4dd85143346680705a25abc7919', '[\"user\"]', '2024-01-17 09:45:27', '2024-01-17 09:42:05', '2024-01-17 09:45:27'),
(1738, 'App\\Models\\User', 105, 'hydra-api-token', 'ca7759784c573244b0941ce9aab6e6efd599ebe85164628a1745be71213a3bd2', '[\"user\"]', '2024-01-17 09:45:42', '2024-01-17 09:45:37', '2024-01-17 09:45:42'),
(1739, 'App\\Models\\User', 121, 'hydra-api-token', '30ca9e055944f5c453823956550be96c893ee44fcd6e879363645261b729f773', '[\"user\"]', '2024-01-17 10:01:13', '2024-01-17 09:50:02', '2024-01-17 10:01:13'),
(1740, 'App\\Models\\User', 121, 'hydra-api-token', 'de90b77f8f377bc2bb201377f53c58150d1a40ca8955ae0396f7072a1c756d32', '[\"user\"]', '2024-01-17 11:13:31', '2024-01-17 09:53:51', '2024-01-17 11:13:31'),
(1741, 'App\\Models\\User', 103, 'hydra-api-token', 'fe2a4a6f22f60d08bd79d82ec8bb5e266c9f9143b383a4edb7b832bdab78f51b', '[\"user\"]', '2024-01-21 12:47:30', '2024-01-17 09:56:11', '2024-01-21 12:47:30'),
(1742, 'App\\Models\\User', 117, 'hydra-api-token', '2f4184b9b0932d6850113922c601d6ca8ad202016bdc2171141ab2eea94e741c', '[\"user\"]', '2024-01-17 10:01:35', '2024-01-17 10:01:27', '2024-01-17 10:01:35'),
(1743, 'App\\Models\\User', 105, 'hydra-api-token', 'b3097657fabe670e537eb29aa69b514e8dcd9e17d07b233205ac7ff5909001e4', '[\"user\"]', '2024-01-31 09:49:27', '2024-01-17 10:01:53', '2024-01-31 09:49:27'),
(1744, 'App\\Models\\User', 117, 'hydra-api-token', '292f5f8cbec38bdad44d7dc3cc3ec95d76490286f38b38418fcc84cfcaba34ad', '[\"user\"]', '2024-01-17 10:04:32', '2024-01-17 10:04:30', '2024-01-17 10:04:32'),
(1745, 'App\\Models\\User', 121, 'hydra-api-token', '92447749e6e788ea47856cfb0d92f00ab9d25223051b467015d603ad36517317', '[\"user\"]', '2024-01-17 10:07:37', '2024-01-17 10:05:22', '2024-01-17 10:07:37'),
(1746, 'App\\Models\\User', 102, 'hydra-api-token', 'bc891c7109c0359c4981c6b7b4729a872b86a25cba9b6de03d5aa970ebf53440', '[\"user\"]', '2024-01-24 12:56:24', '2024-01-17 10:07:55', '2024-01-24 12:56:24'),
(1747, 'App\\Models\\User', 117, 'hydra-api-token', 'd9aa28165ebacefd52f439f8a7ddc91aa9d6e26571ff770eef9bffd1e50a2775', '[\"user\"]', '2024-01-17 10:10:29', '2024-01-17 10:09:15', '2024-01-17 10:10:29'),
(1748, 'App\\Models\\User', 116, 'hydra-api-token', '246164c836783f898cc3e699ff8b131bc17c5d7353e6d55b185a327d7eef5f42', '[\"user\"]', '2024-01-17 10:12:46', '2024-01-17 10:11:05', '2024-01-17 10:12:46'),
(1749, 'App\\Models\\User', 120, 'hydra-api-token', 'bbef733ac9fdaca8486b87642a9d8e1d95f58eb4f17b885e74f0b2c312e469c8', '[\"user\"]', '2024-01-17 10:16:44', '2024-01-17 10:14:13', '2024-01-17 10:16:44'),
(1750, 'App\\Models\\User', 105, 'hydra-api-token', '0b8874eb4dd4714c2db1907f9735e60d93f2111033fb3715da3697f0628e450f', '[\"user\"]', '2024-01-31 11:27:29', '2024-01-17 10:18:51', '2024-01-31 11:27:29'),
(1751, 'App\\Models\\User', 102, 'hydra-api-token', '68b90ea0fe145fcda6b1c5a5fd2ee0f4192dfa4ea495855eeb31d8f093f9ff83', '[\"user\"]', '2024-01-17 10:51:35', '2024-01-17 10:49:26', '2024-01-17 10:51:35'),
(1753, 'App\\Models\\User', 102, 'hydra-api-token', '7df220739e2cbf573f9fa0b713a6ba6e42076ca8d39abe881ceea8c50e887ab7', '[\"user\"]', '2024-01-17 12:55:18', '2024-01-17 12:55:14', '2024-01-17 12:55:18'),
(1754, 'App\\Models\\User', 102, 'hydra-api-token', '5b457c5a3f109eef8398122221020d4d20c6fcc1ca624b08e33d3b17be830b84', '[\"user\"]', '2024-01-21 05:59:27', '2024-01-17 12:55:33', '2024-01-21 05:59:27'),
(1755, 'App\\Models\\User', 105, 'hydra-api-token', '37c1c2e94a066708c97be05789b3cc0c8da8e40ce72b2ac2ad24f5ee204b69b8', '[\"user\"]', '2024-02-03 13:35:51', '2024-01-17 17:39:47', '2024-02-03 13:35:51'),
(1756, 'App\\Models\\User', 119, 'hydra-api-token', 'b42eeea528406d91dfb812d7bd046f0e223994cd861b34a4f4e1d47285ebe1b4', '[\"user\"]', '2024-01-18 01:39:32', '2024-01-18 01:36:58', '2024-01-18 01:39:32'),
(1757, 'App\\Models\\User', 105, 'hydra-api-token', 'e1e0e288af6bd3be6938ae0977c257b4d56d8edd1379f2744db8bc50b7afbd35', '[\"user\"]', '2024-02-01 22:35:06', '2024-01-18 01:39:55', '2024-02-01 22:35:06'),
(1758, 'App\\Models\\User', 103, 'hydra-api-token', '8466c5bc961757c9bfa7da6ae15ecc6fda759e337382f69bb70110eff124eb22', '[\"user\"]', '2024-01-21 13:07:32', '2024-01-18 06:48:52', '2024-01-21 13:07:32'),
(1759, 'App\\Models\\User', 102, 'hydra-api-token', '96ce30b9f5ad3d4b825a7c3d71468d6182ed9a1aee2b6f0b1ebf3018b34efe04', '[\"user\"]', '2024-01-18 13:00:47', '2024-01-18 06:54:56', '2024-01-18 13:00:47'),
(1760, 'App\\Models\\User', 102, 'hydra-api-token', '279b42eaa1c354853edfd9f5b66e87c7009507fae5708012c4e6e76980bd3dbb', '[\"user\"]', '2024-01-18 08:10:40', '2024-01-18 08:09:34', '2024-01-18 08:10:40'),
(1761, 'App\\Models\\User', 103, 'hydra-api-token', 'b4c576955d9ac8d2d5d5c149f587ca7c0bbf7b15d7d467505b12bba6ec47e1a3', '[\"user\"]', '2024-01-18 09:04:36', '2024-01-18 09:04:33', '2024-01-18 09:04:36'),
(1762, 'App\\Models\\User', 105, 'hydra-api-token', '910a5346251d4948a2c5f235730e42cadfb80b47743ec4bbcbcb2e9d0e22d8e9', '[\"user\"]', '2024-01-20 04:52:43', '2024-01-18 12:02:13', '2024-01-20 04:52:43'),
(1763, 'App\\Models\\User', 102, 'hydra-api-token', 'd18deb81282641912e03c8d9fae50a46896ecc48b592503c5e34a514d901f6c8', '[\"user\"]', '2024-01-24 12:27:33', '2024-01-18 12:10:48', '2024-01-24 12:27:33'),
(1764, 'App\\Models\\User', 102, 'hydra-api-token', '2eff307c74148b193813d2b7126536936a9c8c5b48627fdafcbc533f0bcef617', '[\"user\"]', '2024-01-20 12:11:40', '2024-01-20 04:46:19', '2024-01-20 12:11:40'),
(1765, 'App\\Models\\User', 102, 'hydra-api-token', 'd1a6b7f11650c031412fefab27c74c2f06374bee02f6cd1a9f45fd18edb41393', '[\"user\"]', '2024-01-23 05:04:31', '2024-01-20 04:53:20', '2024-01-23 05:04:31'),
(1766, 'App\\Models\\User', 102, 'hydra-api-token', '697c7d8bbdadbfbaf7f96c5ccea8cea94e6d1fed0c0f3b8bf8d41b31c4aa287f', '[\"user\"]', '2024-01-20 05:05:23', '2024-01-20 05:05:03', '2024-01-20 05:05:23'),
(1767, 'App\\Models\\User', 100, 'hydra-api-token', 'd8998fd794db103f0baca643bd48dca0c4b32dc3498ab7e39ccdedd10d26e253', '[\"admin\"]', '2024-01-20 07:08:18', '2024-01-20 06:03:01', '2024-01-20 07:08:18'),
(1768, 'App\\Models\\User', 103, 'hydra-api-token', '57258a3b8b8c1f2015b1c224b4a8b74c684e7dabbaa8241467b392cd921c9d3a', '[\"user\"]', '2024-01-23 11:37:37', '2024-01-20 07:08:38', '2024-01-23 11:37:37'),
(1769, 'App\\Models\\User', 102, 'hydra-api-token', '42dfd9473e6154a982d4426fe874f49917dfe99a856a148557f9739490abbd6d', '[\"user\"]', '2024-01-23 03:55:10', '2024-01-20 12:21:45', '2024-01-23 03:55:10'),
(1770, 'App\\Models\\User', 105, 'hydra-api-token', 'b0738cdee9be696715edcabbbdddeacbb55027f0dedb77041e63e98ce5b86a03', '[\"user\"]', '2024-01-20 12:33:15', '2024-01-20 12:32:47', '2024-01-20 12:33:15'),
(1771, 'App\\Models\\User', 105, 'hydra-api-token', '75950ee03ee0be1573759bdbd0d486622a9a833c2c98a1860e0dbd09aa8e2f37', '[\"user\"]', '2024-01-21 05:20:50', '2024-01-21 05:20:48', '2024-01-21 05:20:50'),
(1772, 'App\\Models\\User', 102, 'hydra-api-token', 'eaa18ee2a42b901d3ec7c1727d7e642b872f614f467bd4ad4c6254ed714bc8b5', '[\"user\"]', NULL, '2024-01-21 05:25:20', '2024-01-21 05:25:20'),
(1773, 'App\\Models\\User', 102, 'hydra-api-token', 'ef6646380fffe763b288cc78b1048f38155de13306bda437849f983a14c5b79e', '[\"user\"]', '2024-01-21 05:42:14', '2024-01-21 05:26:22', '2024-01-21 05:42:14'),
(1774, 'App\\Models\\User', 105, 'hydra-api-token', '1835ad07da8803ea02db41577506dfabfd59b8fbff3c4dc9ebd1aca945d09e2a', '[\"user\"]', '2024-01-23 12:25:55', '2024-01-21 05:35:53', '2024-01-23 12:25:55'),
(1775, 'App\\Models\\User', 102, 'hydra-api-token', 'd6e643a6cb78f2c0dd60ed4d171a3cf4f99d5aeeee265ce9fb5c6c09030b6cc8', '[\"user\"]', '2024-01-21 12:02:27', '2024-01-21 05:59:48', '2024-01-21 12:02:27'),
(1776, 'App\\Models\\User', 105, 'hydra-api-token', '6e31b4f7c5e04dbd9795b99d307c0f2f70088a4c3f15dd4eab54afd45f4820f5', '[\"user\"]', '2024-01-21 10:20:10', '2024-01-21 10:16:59', '2024-01-21 10:20:10'),
(1777, 'App\\Models\\User', 102, 'hydra-api-token', '3e29c527c14d33407df55bf1802f98897e06c673d25b93ce424d952a1302c477', '[\"user\"]', '2024-01-21 12:04:00', '2024-01-21 12:03:19', '2024-01-21 12:04:00'),
(1778, 'App\\Models\\User', 102, 'hydra-api-token', 'ef3edf7eb4e2c5424deb86051a87fff3c5140ec4ceddd1fce6b4e9ca0d1214ae', '[\"user\"]', '2024-01-21 12:37:05', '2024-01-21 12:04:24', '2024-01-21 12:37:05'),
(1779, 'App\\Models\\User', 102, 'hydra-api-token', '8523a9d532b9af924d37cec2620cee074712007dfdfee4894a2cb2d49e060571', '[\"user\"]', '2024-01-22 06:40:55', '2024-01-21 12:37:35', '2024-01-22 06:40:55'),
(1780, 'App\\Models\\User', 103, 'hydra-api-token', '7370f2dc11b1e5ca00b86aa72608e124eed4523449473cb2e9c7a68a8514542d', '[\"user\"]', '2024-01-21 12:49:50', '2024-01-21 12:48:15', '2024-01-21 12:49:50'),
(1782, 'App\\Models\\User', 122, 'hydra-api-token', '00c364b339eacd224f561e03cca3dfe5e40fdc3e6f1cd24194d2dada202e306d', '[\"user\"]', '2024-01-23 13:48:22', '2024-01-22 05:39:22', '2024-01-23 13:48:22'),
(1783, 'App\\Models\\User', 103, 'hydra-api-token', 'c48aa0e28267c9b9272fb53705b1257740fd124afc75b8c1d305f3977f9c3e83', '[\"user\"]', '2024-01-22 07:56:59', '2024-01-22 06:19:13', '2024-01-22 07:56:59'),
(1784, 'App\\Models\\User', 102, 'hydra-api-token', '37611fb4098e0fc350cdf0d5f42452a738d5050942e6e2ed19e575d8b9d84040', '[\"user\"]', '2024-01-22 10:03:25', '2024-01-22 06:41:40', '2024-01-22 10:03:25'),
(1785, 'App\\Models\\User', 102, 'hydra-api-token', 'f6c910035b1a1fcf1bb2e5563cb20c1457e45b4109c842ab2f129e037308e8cd', '[\"user\"]', '2024-01-22 07:01:40', '2024-01-22 06:59:19', '2024-01-22 07:01:40'),
(1786, 'App\\Models\\User', 100, 'hydra-api-token', '31e4a042f6fe310772b5d08c15f29b59835c6371ec26adcaada68dd3404aa64e', '[\"admin\"]', '2024-01-22 08:04:29', '2024-01-22 08:03:08', '2024-01-22 08:04:29'),
(1787, 'App\\Models\\User', 103, 'hydra-api-token', '5963a7fb0877af5fab98d583967c45de5b6f7e6da1fac7536de57b53cec073cb', '[\"user\"]', '2024-01-24 06:21:27', '2024-01-22 08:04:53', '2024-01-24 06:21:27'),
(1788, 'App\\Models\\User', 102, 'hydra-api-token', '49aefe0163ca96b7803d8a0a514d1a4ae9ff9e28efda87a262f3750afe174e70', '[\"user\"]', '2024-01-22 10:19:03', '2024-01-22 08:59:21', '2024-01-22 10:19:03'),
(1789, 'App\\Models\\User', 102, 'hydra-api-token', '3d15678477cb28505e6112a5b8bca1e43357e8ca6e363063ce177bc6625a5393', '[\"user\"]', NULL, '2024-01-22 09:03:48', '2024-01-22 09:03:48'),
(1790, 'App\\Models\\User', 102, 'hydra-api-token', '77ce4a9615912cd8d4f3f8072f1623958ef702ec7af285a80ef2c7a3fdd6d86b', '[\"user\"]', NULL, '2024-01-22 09:03:52', '2024-01-22 09:03:52'),
(1791, 'App\\Models\\User', 102, 'hydra-api-token', '5c5106d1ee95d9418b07a2a374e4c7ecf758736d293f4cbddb6316bcc99ce68a', '[\"user\"]', '2024-01-22 11:01:14', '2024-01-22 10:04:15', '2024-01-22 11:01:14'),
(1792, 'App\\Models\\User', 102, 'hydra-api-token', '06da97ce62a20896065aa973f67230cc50fa35181fc1fa95bc8daf831ca789e1', '[\"user\"]', '2024-01-23 08:48:03', '2024-01-22 11:01:38', '2024-01-23 08:48:03'),
(1793, 'App\\Models\\User', 102, 'hydra-api-token', '59565585aed3b6376fcaff84c72630860cc6dff71912706403c29cb9055e96b1', '[\"user\"]', '2024-01-23 03:55:45', '2024-01-23 03:55:43', '2024-01-23 03:55:45'),
(1794, 'App\\Models\\User', 102, 'hydra-api-token', 'de5c6f22ed2df67ac43df6e3968db08f8c48d5dd05b69893b50f378d4174ba18', '[\"user\"]', '2024-01-23 03:56:39', '2024-01-23 03:56:37', '2024-01-23 03:56:39'),
(1795, 'App\\Models\\User', 102, 'hydra-api-token', 'bb38fac56273137018f81ae4e050fdde22900ad72ea5c2a40c9920e725e64f18', '[\"user\"]', '2024-01-23 04:51:08', '2024-01-23 03:57:25', '2024-01-23 04:51:08'),
(1796, 'App\\Models\\User', 102, 'hydra-api-token', '8a7a4d7e7536e07e72c1ddda3528868c76ddc7e52d5f4cc642f5c7353f44b8b1', '[\"user\"]', '2024-01-23 04:05:36', '2024-01-23 04:01:09', '2024-01-23 04:05:36'),
(1797, 'App\\Models\\User', 1, 'hydra-api-token', 'eabcab8b0d4eecebdad53e4b3e0f94eff60f50914a9dd4f4dc652a1d008f90c1', '[\"admin\"]', '2024-01-23 04:47:12', '2024-01-23 04:24:47', '2024-01-23 04:47:12'),
(1799, 'App\\Models\\User', 102, 'hydra-api-token', 'a1796e300e5b0020cd725bc45844e6af360d0d08292f18d2867dfcc7eb8e9ef8', '[\"user\"]', '2024-01-23 07:25:57', '2024-01-23 04:59:54', '2024-01-23 07:25:57'),
(1800, 'App\\Models\\User', 105, 'hydra-api-token', '4dec6440295d9f5f55f1cc58fd3e88ac5838073e75d17db85a5cad9bede0de6e', '[\"user\"]', '2024-01-23 10:50:33', '2024-01-23 05:55:59', '2024-01-23 10:50:33'),
(1801, 'App\\Models\\User', 102, 'hydra-api-token', '4433c74a4738dde143896cea56ce18040db045a252a77c4067a9e5215e37942b', '[\"user\"]', '2024-01-23 06:48:22', '2024-01-23 06:46:13', '2024-01-23 06:48:22'),
(1802, 'App\\Models\\User', 102, 'hydra-api-token', '4329b3e3ba04067334751038ae83f9064fcd1fda040e80c72ef3d996bd22d62c', '[\"user\"]', '2024-01-23 09:17:10', '2024-01-23 06:56:16', '2024-01-23 09:17:10'),
(1803, 'App\\Models\\User', 102, 'hydra-api-token', '15f2b190bdc146d87972a4c9e9c1b9595969394cceffa3168a5d1ded37109d20', '[\"user\"]', '2024-01-23 09:03:28', '2024-01-23 07:38:17', '2024-01-23 09:03:28'),
(1804, 'App\\Models\\User', 102, 'hydra-api-token', '68cee993932cce6e55f222732d86f8085d235d42ebe76a44d81f5b63f8b5fdfb', '[\"user\"]', '2024-01-23 09:32:20', '2024-01-23 08:49:01', '2024-01-23 09:32:20'),
(1805, 'App\\Models\\User', 102, 'hydra-api-token', '616b7fa0cee5c2d6db07de42dffb2d5b6641a13c3910f2648870a332e66fa511', '[\"user\"]', '2024-01-24 10:20:11', '2024-01-23 08:50:03', '2024-01-24 10:20:11'),
(1806, 'App\\Models\\User', 102, 'hydra-api-token', 'e2bac785533d0311bc7cacade95a58e45456cbe196acec37b8f3d7729cabc5a5', '[\"user\"]', '2024-01-27 11:08:42', '2024-01-23 08:52:29', '2024-01-27 11:08:42'),
(1807, 'App\\Models\\User', 105, 'hydra-api-token', '9e5ffefda48545f0448b25396f24cae16512cdacadb03495f2f03cb511545549', '[\"user\"]', '2024-01-23 11:04:02', '2024-01-23 09:02:08', '2024-01-23 11:04:02'),
(1808, 'App\\Models\\User', 102, 'hydra-api-token', 'd382650f781514e2afc7d7418a39b3bd6e6874f8c66ba8e4cc07c353746aaf8d', '[\"user\"]', '2024-01-23 09:05:27', '2024-01-23 09:03:40', '2024-01-23 09:05:27'),
(1809, 'App\\Models\\User', 102, 'hydra-api-token', 'f357003a4f6460486013271ea49d70799fa2b06049f2893d2bd041e9bcea60ec', '[\"user\"]', '2024-01-24 04:09:23', '2024-01-23 09:04:29', '2024-01-24 04:09:23'),
(1810, 'App\\Models\\User', 105, 'hydra-api-token', 'd4fed613114958a4a7c9898783ed1c6ef34a6b48e642a250e3a54a4a0109be5f', '[\"user\"]', '2024-01-23 09:52:55', '2024-01-23 09:48:08', '2024-01-23 09:52:55'),
(1811, 'App\\Models\\User', 105, 'hydra-api-token', '2eab7e3fb36db0e5fbfd2eb7f08e3a3e5be027011a6f243d8d7634d557cb8369', '[\"user\"]', '2024-01-23 10:50:44', '2024-01-23 10:50:40', '2024-01-23 10:50:44'),
(1812, 'App\\Models\\User', 103, 'hydra-api-token', 'af63adc5db75a5885b6d46d4c502f4efce37035f5be0efa80a6df8485f309514', '[\"user\"]', '2024-01-23 11:38:25', '2024-01-23 10:51:04', '2024-01-23 11:38:25'),
(1813, 'App\\Models\\User', 105, 'hydra-api-token', 'dd15b921ea0c8595eb6e6564872873d8b1612eba40efd9abae497fe1aff807f7', '[\"user\"]', '2024-01-24 09:54:33', '2024-01-23 11:37:52', '2024-01-24 09:54:33'),
(1814, 'App\\Models\\User', 102, 'hydra-api-token', '1283a4486cc2d6fe0f42d84202dd06d7c4d4384183cd2481b373103d9b477aa8', '[\"user\"]', '2024-01-24 04:09:41', '2024-01-23 11:39:00', '2024-01-24 04:09:41'),
(1815, 'App\\Models\\User', 102, 'hydra-api-token', '24b6fcc64fc9290dde873692398e78faace64980b7249ecf8aea63ef5ff26aa3', '[\"user\"]', '2024-01-23 13:53:44', '2024-01-23 13:48:32', '2024-01-23 13:53:44'),
(1816, 'App\\Models\\User', 103, 'hydra-api-token', 'f828612d8163004ceb531ffc1f9e5aea50ce054feee985360b4f84e78e6e84ed', '[\"user\"]', '2024-01-24 09:43:30', '2024-01-23 16:09:35', '2024-01-24 09:43:30'),
(1817, 'App\\Models\\User', 103, 'hydra-api-token', '4e8c995cbd0ac711461dbffedbf93159cf4a3b5173d45d0c488cb17e919a21c9', '[\"user\"]', '2024-01-23 19:40:18', '2024-01-23 19:38:42', '2024-01-23 19:40:18'),
(1818, 'App\\Models\\User', 103, 'hydra-api-token', 'cf6f80089970624bb84cdd4f2098a00216181240428a404d0a460f1384b47862', '[\"user\"]', '2024-01-24 08:57:23', '2024-01-23 19:41:03', '2024-01-24 08:57:23'),
(1819, 'App\\Models\\User', 103, 'hydra-api-token', 'bf518873db2fbebcd5fbc3f52897f1ca05fbf3f561f95f9a94de4b9d7176b239', '[\"user\"]', '2024-01-24 04:26:29', '2024-01-24 04:11:27', '2024-01-24 04:26:29'),
(1820, 'App\\Models\\User', 103, 'hydra-api-token', '6bb1785e1b828f862c72cee88f1a6ba65a917fd48767f5e29792e351ba470db5', '[\"user\"]', '2024-01-24 04:20:13', '2024-01-24 04:11:34', '2024-01-24 04:20:13'),
(1821, 'App\\Models\\User', 103, 'hydra-api-token', '11f49f9a56d6074eef2c042ca4a11c52a795e230c51c9ef46de2f2ced3657277', '[\"user\"]', '2024-01-24 04:24:20', '2024-01-24 04:24:18', '2024-01-24 04:24:20'),
(1822, 'App\\Models\\User', 103, 'hydra-api-token', '4d794abe206735dd71eba8e25a05adf803529a0485d5af4ee9af9b521ddbf29b', '[\"user\"]', '2024-01-24 04:27:10', '2024-01-24 04:27:09', '2024-01-24 04:27:10'),
(1823, 'App\\Models\\User', 102, 'hydra-api-token', 'c69e06d3e4606a584b7d8f5993a1b16dfc7f419f076488617cecc3b8accc3ada', '[\"user\"]', '2024-01-24 06:04:17', '2024-01-24 04:29:40', '2024-01-24 06:04:17'),
(1824, 'App\\Models\\User', 102, 'hydra-api-token', '719f9ee9fcaa77096dff342a6b60b5a5ceee17afb2b56ad90311b4d4a55ef1b9', '[\"user\"]', '2024-01-24 07:26:50', '2024-01-24 04:29:54', '2024-01-24 07:26:50'),
(1825, 'App\\Models\\User', 102, 'hydra-api-token', '3b73a9524ec56ad98bdda3c3ce2299468cb077bb4f9a32fa9f24403a0cd93ba3', '[\"user\"]', '2024-01-24 06:58:19', '2024-01-24 04:49:33', '2024-01-24 06:58:19'),
(1826, 'App\\Models\\User', 102, 'hydra-api-token', '4cb271dcee5d3b941eb2cda11cce5dc047cbd017a55c37f250047349325d3579', '[\"user\"]', '2024-01-24 06:06:43', '2024-01-24 06:06:42', '2024-01-24 06:06:43'),
(1827, 'App\\Models\\User', 103, 'hydra-api-token', '2635e472890ed1b3e143dc7b953f38bdc3741e41e318d7600420eb0dc801dcba', '[\"user\"]', '2024-01-25 06:28:48', '2024-01-24 06:21:32', '2024-01-25 06:28:48'),
(1828, 'App\\Models\\User', 102, 'hydra-api-token', '8710c848acf4f3dc52985f1d6e9eb83c6c552a3f040578eb3a7adb1447ef132b', '[\"user\"]', '2024-01-24 06:45:25', '2024-01-24 06:45:24', '2024-01-24 06:45:25'),
(1829, 'App\\Models\\User', 102, 'hydra-api-token', '5c4418e5fd79762393d9142bb9f8c32d25934a8a31fd7852852574f076542eed', '[\"user\"]', '2024-01-24 07:00:07', '2024-01-24 06:47:22', '2024-01-24 07:00:07'),
(1830, 'App\\Models\\User', 102, 'hydra-api-token', '3475b89d353c1d2cc6efa22a062d1c57dbdfffab25b3cd7339bb2135eeb3ec39', '[\"user\"]', '2024-01-24 10:21:11', '2024-01-24 06:58:34', '2024-01-24 10:21:11'),
(1831, 'App\\Models\\User', 102, 'hydra-api-token', 'b97443faf9dec3baa6d2e56ca48a132434ce4c8e0dc75843b845200bd98f6cb0', '[\"user\"]', '2024-01-24 08:44:54', '2024-01-24 07:03:33', '2024-01-24 08:44:54'),
(1832, 'App\\Models\\User', 103, 'hydra-api-token', 'e06ca2fad458f47de05ff546ad7591fb671317f9631c834f8057b0938a57d2bf', '[\"user\"]', '2024-01-25 04:52:34', '2024-01-24 07:26:58', '2024-01-25 04:52:34'),
(1833, 'App\\Models\\User', 103, 'hydra-api-token', '76a3ba269933bf9ac5677dea7987b25011984e4f9f69f78bc90d8c23cf8e3bac', '[\"user\"]', '2024-01-24 14:39:20', '2024-01-24 07:49:58', '2024-01-24 14:39:20'),
(1834, 'App\\Models\\User', 103, 'hydra-api-token', '083712c10b6a161d92e0c0d6bd63d70f39d670f513f5a7ffbc7a8d9d579c92f6', '[\"user\"]', '2024-01-24 09:40:10', '2024-01-24 08:59:10', '2024-01-24 09:40:10'),
(1835, 'App\\Models\\User', 102, 'hydra-api-token', '8aedebf702075e03e790f9b2e20b0e64369bab142631756b9b3d8ec2fc41666a', '[\"user\"]', '2024-01-24 09:16:24', '2024-01-24 09:11:43', '2024-01-24 09:16:24'),
(1836, 'App\\Models\\User', 102, 'hydra-api-token', '405adc02fea14d93061f6874bd114b36f226ae661a45dc80493134fda95fe663', '[\"user\"]', '2024-01-24 11:15:07', '2024-01-24 09:18:31', '2024-01-24 11:15:07'),
(1837, 'App\\Models\\User', 103, 'hydra-api-token', '5a32ec4e4c98338c4b2d4708782aa50dd508e68ea8194232e3126b6acfce4d25', '[\"user\"]', '2024-01-24 11:20:07', '2024-01-24 09:42:30', '2024-01-24 11:20:07'),
(1838, 'App\\Models\\User', 103, 'hydra-api-token', '0c6849f8fcf5a7575818831b20a19aedc0175885ee51361b24e0cfd8008bb9ed', '[\"user\"]', '2024-01-24 10:08:29', '2024-01-24 09:54:50', '2024-01-24 10:08:29'),
(1839, 'App\\Models\\User', 102, 'hydra-api-token', '4ef185ee5421d842c811a12596fec49b7b6fa684ac55966009e3ee7df9554e53', '[\"user\"]', '2024-01-24 10:07:24', '2024-01-24 10:06:39', '2024-01-24 10:07:24'),
(1840, 'App\\Models\\User', 94, 'hydra-api-token', '43c748880f39341d2659305c690e78185007c911fe1b50ce6929c5c5e54eb5f9', '[\"user\"]', '2024-01-24 10:11:35', '2024-01-24 10:09:27', '2024-01-24 10:11:35');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1841, 'App\\Models\\User', 94, 'hydra-api-token', '1123b39102208e149baa1aadbb9fb129dc01dac7fe0f5bf019196da9a6afc88e', '[\"user\"]', NULL, '2024-01-24 10:11:23', '2024-01-24 10:11:23'),
(1842, 'App\\Models\\User', 100, 'hydra-api-token', '758a5d1365be7dca05734002af144b9039ee596ac5f6f34733eea54a27316b55', '[\"admin\"]', '2024-01-24 10:12:00', '2024-01-24 10:11:49', '2024-01-24 10:12:00'),
(1843, 'App\\Models\\User', 100, 'hydra-api-token', '6d864e6777162d853ff2dad60811750ece1bde7267fa39e215b956c3279f26a4', '[\"admin\"]', NULL, '2024-01-24 10:12:42', '2024-01-24 10:12:42'),
(1844, 'App\\Models\\User', 85, 'hydra-api-token', '75bfc9956bc958a424fc135bd616b60c3b05c6633554b6eaa601df80189d37cd', '[\"user\"]', '2024-01-24 10:13:18', '2024-01-24 10:13:07', '2024-01-24 10:13:18'),
(1845, 'App\\Models\\User', 85, 'hydra-api-token', '973d49a6c628a9db3d6cf87e4091e5079486616bc604d19c3adc7e79a1da526c', '[\"user\"]', NULL, '2024-01-24 10:14:26', '2024-01-24 10:14:26'),
(1846, 'App\\Models\\User', 105, 'hydra-api-token', 'd828f08cf9c583acd1f844916e6755e21e86219587a22c2bd1e0edbe754141fe', '[\"user\"]', '2024-01-24 10:16:36', '2024-01-24 10:16:35', '2024-01-24 10:16:36'),
(1847, 'App\\Models\\User', 105, 'hydra-api-token', '5d392e75b72a21af4bedfa9ded4f5cffdfde35a1e199b78efeaa1a7ffd35a12d', '[\"user\"]', '2024-01-25 10:50:02', '2024-01-24 10:16:44', '2024-01-25 10:50:02'),
(1848, 'App\\Models\\User', 102, 'hydra-api-token', '6f9e3d4102702aed721552a2daea2ef43cb468a1888a234b47d6a7dae82b7cb5', '[\"user\"]', '2024-01-25 07:27:33', '2024-01-24 10:20:44', '2024-01-25 07:27:33'),
(1849, 'App\\Models\\User', 102, 'hydra-api-token', 'a883cfc66e2bd54044b5f7764d06abe3857686fc20c362ed0bbf9de8187f7ee0', '[\"user\"]', '2024-01-31 09:04:50', '2024-01-24 10:21:18', '2024-01-31 09:04:50'),
(1850, 'App\\Models\\User', 102, 'hydra-api-token', 'c8ac5d8252458a08c466cad4da62b4f65a98d4a4ebfd93ccdd3a779b9647cab2', '[\"user\"]', '2024-01-27 05:41:17', '2024-01-24 11:12:33', '2024-01-27 05:41:17'),
(1851, 'App\\Models\\User', 102, 'hydra-api-token', 'bc79333115b7880a53b6e57afe8a02461215fa28ec7771fdbc872f04144e7a9a', '[\"user\"]', '2024-01-24 14:51:14', '2024-01-24 11:42:22', '2024-01-24 14:51:14'),
(1855, 'App\\Models\\User', 102, 'hydra-api-token', 'bfd56221fba063ced06c8e5102243b9120ddb3f4e549e38a5d92a7edb9c0a4ab', '[\"user\"]', '2024-01-26 04:31:09', '2024-01-24 13:17:27', '2024-01-26 04:31:09'),
(1856, 'App\\Models\\User', 102, 'hydra-api-token', 'eebc759ec9e78b996d1660980fb700a013d8962d5a90cba98ef3ff99f16d0e60', '[\"user\"]', '2024-01-25 04:02:06', '2024-01-24 16:46:57', '2024-01-25 04:02:06'),
(1857, 'App\\Models\\User', 102, 'hydra-api-token', '62210c80e4f4e2da554c8583204d72c5ae548dbf9d93dab98ddd1a125a082aef', '[\"user\"]', '2024-01-25 04:54:11', '2024-01-25 04:05:31', '2024-01-25 04:54:11'),
(1860, 'App\\Models\\User', 102, 'hydra-api-token', '32e29f40656ab29c13cfac3f1993c81704c670a0f31efae19931f1df95eb6c31', '[\"user\"]', '2024-01-25 08:43:07', '2024-01-25 04:53:05', '2024-01-25 08:43:07'),
(1861, 'App\\Models\\User', 102, 'hydra-api-token', '739fa42ee0a0368758758c3bde365cb4c6fbab2466101da5a147755af66299d6', '[\"user\"]', '2024-01-27 09:05:44', '2024-01-25 05:11:08', '2024-01-27 09:05:44'),
(1862, 'App\\Models\\User', 102, 'hydra-api-token', '898bde474347b8ccafe5b6bf6c6acc5fed5e801b2020b80b8e98351ff35e2a3b', '[\"user\"]', '2024-01-25 11:42:29', '2024-01-25 05:37:21', '2024-01-25 11:42:29'),
(1864, 'App\\Models\\User', 100, 'hydra-api-token', '9c91db662918e378bffd58a9cdee34c6f48a63e94762b63f84631ff71b740712', '[\"admin\"]', '2024-01-25 08:16:38', '2024-01-25 06:30:47', '2024-01-25 08:16:38'),
(1865, 'App\\Models\\User', 103, 'hydra-api-token', 'aa002e5f12f3bc21d2cfcae6485b4fa839232a1285ba35048e99543027a6cc0a', '[\"user\"]', '2024-01-25 10:43:13', '2024-01-25 07:37:24', '2024-01-25 10:43:13'),
(1866, 'App\\Models\\User', 103, 'hydra-api-token', 'a53179b5432570fe3025beca9afda0b856b8f8509643789fc8de2750b40d4404', '[\"user\"]', '2024-01-25 09:45:35', '2024-01-25 08:16:57', '2024-01-25 09:45:35'),
(1867, 'App\\Models\\User', 1, 'hydra-api-token', 'b158583376a7273110b3b02fe57e0b3299c81e2410a5e380e209f19aa8e02156', '[\"admin\"]', '2024-01-25 08:26:03', '2024-01-25 08:24:59', '2024-01-25 08:26:03'),
(1868, 'App\\Models\\User', 102, 'hydra-api-token', 'c9d973decdb8ae722c7667fa7fc02cefc3ec051a341929f3a19c39624b6ff94d', '[\"user\"]', '2024-01-25 10:52:14', '2024-01-25 08:42:55', '2024-01-25 10:52:14'),
(1870, 'App\\Models\\User', 1, 'hydra-api-token', '20f7498abdaf90b97ec8d3c10244b2e5f90f52f164399617bcedd6c7676a4c28', '[\"admin\"]', '2024-01-25 08:47:11', '2024-01-25 08:44:56', '2024-01-25 08:47:11'),
(1872, 'App\\Models\\User', 102, 'hydra-api-token', '054d67a9735eedb08204d4fc78dcf849211e7754eb459c71069ac54a5d5cc0d9', '[\"user\"]', '2024-01-25 09:28:06', '2024-01-25 09:18:15', '2024-01-25 09:28:06'),
(1873, 'App\\Models\\User', 102, 'hydra-api-token', '704fabee4c20bfb35b507c3b81f5b4e9511c86b68c993306634679796865c5ef', '[\"user\"]', '2024-01-25 09:29:59', '2024-01-25 09:26:59', '2024-01-25 09:29:59'),
(1874, 'App\\Models\\User', 102, 'hydra-api-token', 'e3df7a93322bc5bd8bad76024f3a54f1dce420ae2155731d0ee6f797ca58d6f8', '[\"user\"]', '2024-01-25 10:54:50', '2024-01-25 09:28:11', '2024-01-25 10:54:50'),
(1876, 'App\\Models\\User', 102, 'hydra-api-token', '7c1ba7c7f1d31c2dca74cf975949b33e70f7e7730763a751da45828c85df3c14', '[\"user\"]', '2024-02-05 04:34:38', '2024-01-25 09:30:17', '2024-02-05 04:34:38'),
(1879, 'App\\Models\\User', 100, 'hydra-api-token', '0ced915dd617b2c52524d2041cd80e686c40cedab613f2193253d40a26703b6f', '[\"admin\"]', '2024-01-25 10:01:14', '2024-01-25 09:45:46', '2024-01-25 10:01:14'),
(1880, 'App\\Models\\User', 123, 'hydra-api-token', '3b37dfd3b6921407e3da5351baf9a98e0b6f1c4e6e01ba0237ad3c0a2764b4dc', '[\"user\"]', '2024-01-25 10:04:08', '2024-01-25 10:01:42', '2024-01-25 10:04:08'),
(1881, 'App\\Models\\User', 123, 'hydra-api-token', 'd1e973093e004922c033c227229f9bd63de70deeb5de72977033bdae5a462a2f', '[\"user\"]', '2024-01-26 16:17:40', '2024-01-25 10:04:40', '2024-01-26 16:17:40'),
(1882, 'App\\Models\\User', 100, 'hydra-api-token', '00e1bd17d92c63d57b9eb66caa0ec5f91e674898647c30ca49c66e461033c228', '[\"admin\"]', '2024-01-25 10:15:13', '2024-01-25 10:07:54', '2024-01-25 10:15:13'),
(1883, 'App\\Models\\User', 125, 'hydra-api-token', 'd66372ff83bc62324df65d89c145eb20fb0551c0b4fb268faa3a978e6a00c551', '[\"user\"]', '2024-01-25 10:16:23', '2024-01-25 10:16:21', '2024-01-25 10:16:23'),
(1884, 'App\\Models\\User', 123, 'hydra-api-token', 'fc14b9666a0b1122693eaf463474f464dbd08513d1c58901434ad799d487de7e', '[\"user\"]', '2024-01-25 10:19:18', '2024-01-25 10:17:05', '2024-01-25 10:19:18'),
(1885, 'App\\Models\\User', 123, 'hydra-api-token', '609fe01535f6d92e697f63ff27a1daca2e17982dab3217f3d3822ecc730d2e72', '[\"user\"]', '2024-01-25 10:21:33', '2024-01-25 10:21:28', '2024-01-25 10:21:33'),
(1886, 'App\\Models\\User', 103, 'hydra-api-token', 'c90a7f5f7f64a4a2412c23493f63ace67f55bfe85f746656f36d4492e935ce39', '[\"user\"]', '2024-01-25 10:23:05', '2024-01-25 10:21:43', '2024-01-25 10:23:05'),
(1887, 'App\\Models\\User', 125, 'hydra-api-token', 'dd13d401e1f6b0111eb234bb30f92c55cf2aee31dfbee7bb8b6e152fc81e73ad', '[\"user\"]', '2024-02-04 08:30:12', '2024-01-25 10:43:40', '2024-02-04 08:30:12'),
(1888, 'App\\Models\\User', 125, 'hydra-api-token', 'ff1325554475bdaba426eb9423ffa91a13ac31a7df43ec4b71da1ae22282a500', '[\"user\"]', '2024-01-29 08:02:21', '2024-01-25 10:50:27', '2024-01-29 08:02:21'),
(1889, 'App\\Models\\User', 102, 'hydra-api-token', 'e389564c03cc3bd30410d9b207b15ad85e624979ee571eff741078155cd35134', '[\"user\"]', '2024-01-27 05:56:12', '2024-01-25 10:53:12', '2024-01-27 05:56:12'),
(1890, 'App\\Models\\User', 102, 'hydra-api-token', 'c5ebf8041a9c5e99ec59889c9bedb204c056f536898f1013097c8d742832d675', '[\"user\"]', '2024-01-25 10:55:14', '2024-01-25 10:54:27', '2024-01-25 10:55:14'),
(1891, 'App\\Models\\User', 102, 'hydra-api-token', '298a8e608cdc2a91fe4bdf3b6936c3d56a7c59075c7f26f7cd15619766b52c90', '[\"user\"]', '2024-01-25 10:57:19', '2024-01-25 10:54:54', '2024-01-25 10:57:19'),
(1894, 'App\\Models\\User', 123, 'hydra-api-token', '71ba7a7d80bbe19d212428ecb9829343fa9b541a03d9a4f5817ba385b4fdd56a', '[\"user\"]', '2024-01-25 10:56:26', '2024-01-25 10:56:24', '2024-01-25 10:56:26'),
(1895, 'App\\Models\\User', 123, 'hydra-api-token', 'b1710eca37a9ade4f58d22233d9f0552a59aa7b92c84cc400586403dd9ed1184', '[\"user\"]', '2024-01-25 10:57:58', '2024-01-25 10:57:57', '2024-01-25 10:57:58'),
(1896, 'App\\Models\\User', 102, 'hydra-api-token', 'aabce2735770a6062018a186b54720c510e727df4e972b73639ae7c23f872a00', '[\"user\"]', '2024-01-27 05:36:35', '2024-01-25 10:58:16', '2024-01-27 05:36:35'),
(1901, 'App\\Models\\User', 102, 'hydra-api-token', 'ffba4075a214f1c3034e87c0f41a0219d06058fe326466d3b965f2609557d780', '[\"user\"]', '2024-01-26 03:58:51', '2024-01-26 03:58:07', '2024-01-26 03:58:51'),
(1902, 'App\\Models\\User', 123, 'hydra-api-token', '3de1ef591d194b4abf3db05a38c3dfdbff7571185c0e7ccdd9873694a7a64010', '[\"user\"]', '2024-01-26 09:37:42', '2024-01-26 09:32:33', '2024-01-26 09:37:42'),
(1903, 'App\\Models\\User', 85, 'hydra-api-token', '3d04128cbf8480921274784bc6322eb7dfcec1f5488d1c69197184635a4ed62c', '[\"user\"]', '2024-01-26 12:20:20', '2024-01-26 12:12:50', '2024-01-26 12:20:20'),
(1904, 'App\\Models\\User', 102, 'hydra-api-token', '08465862c3f44ce835f8010b3fa66471f5f59c5243b4c0b7316bc936657c5bb3', '[\"user\"]', '2024-01-27 07:35:30', '2024-01-26 12:39:10', '2024-01-27 07:35:30'),
(1905, 'App\\Models\\User', 123, 'hydra-api-token', 'bda50c6854ff7716fb7f51262dbb27f08210b5d4a39d826b6f269ca05dd4af41', '[\"user\"]', '2024-01-27 06:58:08', '2024-01-26 16:17:59', '2024-01-27 06:58:08'),
(1906, 'App\\Models\\User', 123, 'hydra-api-token', '5c86f5cba7064f1fe2ade0ea1abcc0e71df562e2fbd4ba00fcfe1ae15a371f33', '[\"user\"]', '2024-01-26 21:30:12', '2024-01-26 21:25:04', '2024-01-26 21:30:12'),
(1907, 'App\\Models\\User', 102, 'hydra-api-token', 'c9c28611973f65733f33ba3946ab29c8a711e2851354e756873b82c47612648f', '[\"user\"]', '2024-01-27 04:49:55', '2024-01-27 04:48:23', '2024-01-27 04:49:55'),
(1908, 'App\\Models\\User', 103, 'hydra-api-token', '92f5d5f1983146136623da3ead2b3a48f0dee592cf9f035e228c92a2422a6864', '[\"user\"]', NULL, '2024-01-27 05:37:13', '2024-01-27 05:37:13'),
(1909, 'App\\Models\\User', 102, 'hydra-api-token', 'c34d7202d9f6aa50ca480f66212f7f29396c026223837fecaf8326ffe4134700', '[\"user\"]', '2024-01-27 10:15:31', '2024-01-27 05:37:36', '2024-01-27 10:15:31'),
(1910, 'App\\Models\\User', 102, 'hydra-api-token', '2e59be8e502e98a4ffe6aa88ce165c405a765dcfb282d298c7957776fb6fe69f', '[\"user\"]', '2024-01-27 06:41:27', '2024-01-27 05:43:06', '2024-01-27 06:41:27'),
(1911, 'App\\Models\\User', 102, 'hydra-api-token', '7ee99d3bfbaf6ff5c92b7f073cd33bf143b391c143f413980eb91f43e61fd8b1', '[\"user\"]', '2024-01-27 11:21:17', '2024-01-27 05:56:30', '2024-01-27 11:21:17'),
(1912, 'App\\Models\\User', 123, 'hydra-api-token', '811ff73cf0beb7216ebc16955baf0ec5332553ce7f6163afceade65c8e177df3', '[\"user\"]', '2024-02-04 10:40:38', '2024-01-27 07:00:23', '2024-02-04 10:40:38'),
(1913, 'App\\Models\\User', 102, 'hydra-api-token', '62a49f4a711303f210be46115ee203dcbbb073cf5f6e08bf681ca869c1a08694', '[\"user\"]', '2024-01-27 07:14:06', '2024-01-27 07:05:11', '2024-01-27 07:14:06'),
(1914, 'App\\Models\\User', 123, 'hydra-api-token', 'cbf5a74ea48173f73044bd22bc5736bcbbdb112fabb5e2ea5d54a70457732fae', '[\"user\"]', '2024-01-27 07:50:48', '2024-01-27 07:35:59', '2024-01-27 07:50:48'),
(1915, 'App\\Models\\User', 123, 'hydra-api-token', '8eba8f4ecc1dc420594b519d1cf0bfce91f18c304c5494d6543c7db9238b89bf', '[\"user\"]', '2024-01-28 09:57:32', '2024-01-27 08:07:49', '2024-01-28 09:57:32'),
(1916, 'App\\Models\\User', 125, 'hydra-api-token', '2181cb9915f3787c9ed29bc566f11155e98be2ec215bbaba54f4753cde399252', '[\"user\"]', '2024-01-27 15:24:26', '2024-01-27 08:41:42', '2024-01-27 15:24:26'),
(1917, 'App\\Models\\User', 102, 'hydra-api-token', 'a9d30e56944b3ef22fcf66427c5f1464c099598c100da5513873a0bc074d44ea', '[\"user\"]', '2024-01-27 12:48:42', '2024-01-27 08:55:19', '2024-01-27 12:48:42'),
(1918, 'App\\Models\\User', 102, 'hydra-api-token', '32a0c43e3c90c80967d3c54bf7fa935a31c03fff4aa7e5593f1573ceaa7c6c14', '[\"user\"]', '2024-01-28 04:46:41', '2024-01-27 09:06:13', '2024-01-28 04:46:41'),
(1920, 'App\\Models\\User', 102, 'hydra-api-token', '5ad86b4d558c3ad25fdbbc01aee22082a07199cb8f42180c1b890e57e1a07094', '[\"user\"]', '2024-01-27 09:21:28', '2024-01-27 09:21:01', '2024-01-27 09:21:28'),
(1921, 'App\\Models\\User', 102, 'hydra-api-token', '90a5af93fd9beeb62a9470d284c8398a5aeb06d19a48ba303e46e4fc4d32512c', '[\"user\"]', '2024-01-27 09:27:08', '2024-01-27 09:26:59', '2024-01-27 09:27:08'),
(1922, 'App\\Models\\User', 102, 'hydra-api-token', 'a521ccad554022e7f7f069fb4fdfb565d93a49c7176a3ea9ef66c7fb74b66677', '[\"user\"]', '2024-01-28 09:34:57', '2024-01-27 09:28:02', '2024-01-28 09:34:57'),
(1923, 'App\\Models\\User', 102, 'hydra-api-token', 'cad36f950cd388daf13a524f4be61ceb43f2a473b3544ae53a35a061dd4b5110', '[\"user\"]', '2024-01-27 11:07:44', '2024-01-27 10:15:36', '2024-01-27 11:07:44'),
(1924, 'App\\Models\\User', 103, 'hydra-api-token', '369ecb0cb01a6d0457caf4ee1aed4acf2fa0e9445b7c1302160ec73e0672c33b', '[\"user\"]', NULL, '2024-01-27 10:15:51', '2024-01-27 10:15:51'),
(1925, 'App\\Models\\User', 102, 'hydra-api-token', '71ae503b05afd528b60577977a9827d0a3ff41c549d099b95134024aebea0e6c', '[\"user\"]', '2024-01-27 11:03:53', '2024-01-27 11:03:43', '2024-01-27 11:03:53'),
(1926, 'App\\Models\\User', 122, 'hydra-api-token', 'f9362f95cefe266037362df4b5bf9d74a68a25dcbee9780cc0a4bcfdffbfbb64', '[\"user\"]', '2024-01-27 11:04:04', '2024-01-27 11:04:02', '2024-01-27 11:04:04'),
(1927, 'App\\Models\\User', 102, 'hydra-api-token', 'd7bf9c2b6b8af45ed2b322001e1a9007ae125a43374916e8558d34e3e4c7a02d', '[\"user\"]', '2024-01-27 11:04:19', '2024-01-27 11:04:18', '2024-01-27 11:04:19'),
(1928, 'App\\Models\\User', 102, 'hydra-api-token', '9f07d1bffb9a20b99a719306f1e724796c8848c3a28a28a92e4bfd1694dd1b5a', '[\"user\"]', '2024-01-27 11:04:42', '2024-01-27 11:04:41', '2024-01-27 11:04:42'),
(1929, 'App\\Models\\User', 102, 'hydra-api-token', '3c0c72831f64a2309c4d73b7e752cfb0821062e9180b9bb55b44e38be4a13164', '[\"user\"]', '2024-01-27 11:05:12', '2024-01-27 11:05:10', '2024-01-27 11:05:12'),
(1930, 'App\\Models\\User', 102, 'hydra-api-token', '8746482c13bd529a29c7a7b3b4ff68911ab1871674bc1804c81ff82053264419', '[\"user\"]', '2024-01-27 11:07:43', '2024-01-27 11:05:20', '2024-01-27 11:07:43'),
(1931, 'App\\Models\\User', 102, 'hydra-api-token', 'adda5130372364c09b4c1b2157cfbc52434bf5372da0ffa6ca2a17dba4ce9ea0', '[\"user\"]', '2024-01-27 11:08:27', '2024-01-27 11:07:49', '2024-01-27 11:08:27'),
(1932, 'App\\Models\\User', 103, 'hydra-api-token', '5974664f71e0bf972c848df15e0e3d4cfcc4ec88a0e781e53e5dd9fd77e3135a', '[\"user\"]', NULL, '2024-01-27 11:07:57', '2024-01-27 11:07:57'),
(1933, 'App\\Models\\User', 105, 'hydra-api-token', '849a4f4a5ccd49dc02ea82782ee50fabcc2a866da9e1034c8b8f4fdf9d57228f', '[\"user\"]', '2024-01-27 11:08:45', '2024-01-27 11:08:37', '2024-01-27 11:08:45'),
(1934, 'App\\Models\\User', 102, 'hydra-api-token', '66ea84f1832df6fe9fb8d571d2868f46f1e803cf66053739060df6f5e55a8fb2', '[\"user\"]', '2024-01-27 11:09:37', '2024-01-27 11:08:54', '2024-01-27 11:09:37'),
(1935, 'App\\Models\\User', 102, 'hydra-api-token', 'e654790c1a1ecf3f241f0b5bd645ef204da5f3ad15582fcdc9572183b88780b2', '[\"user\"]', '2024-01-27 11:11:48', '2024-01-27 11:08:59', '2024-01-27 11:11:48'),
(1936, 'App\\Models\\User', 105, 'hydra-api-token', '60f3e02c5ef0bbb0873bf268c7649d2ddbf5a87b99eb1518fdd4f0cf464eda0a', '[\"user\"]', '2024-01-27 11:09:58', '2024-01-27 11:09:48', '2024-01-27 11:09:58'),
(1937, 'App\\Models\\User', 102, 'hydra-api-token', '2e5a3b1b8e66b18a067f44d1e45dcc0bc95727aae9282c3631f3c17c4cffc30d', '[\"user\"]', '2024-01-27 11:10:28', '2024-01-27 11:10:10', '2024-01-27 11:10:28'),
(1938, 'App\\Models\\User', 102, 'hydra-api-token', '7db267c66ac5d5b4c98c7604cad4cb12e32b081acd2015959f3271a996eb76eb', '[\"user\"]', '2024-01-27 11:12:01', '2024-01-27 11:11:59', '2024-01-27 11:12:01'),
(1939, 'App\\Models\\User', 105, 'hydra-api-token', 'f6df84a866a45ca827b55d7fd764ef4f123985adea247abe9901f7ef893286c0', '[\"user\"]', '2024-01-27 11:13:18', '2024-01-27 11:13:16', '2024-01-27 11:13:18'),
(1940, 'App\\Models\\User', 105, 'hydra-api-token', '064bc0711876cd6b132c4fa745e0e2a937a44ef8cbe49244e61be96a79d122f1', '[\"user\"]', '2024-01-27 11:13:40', '2024-01-27 11:13:31', '2024-01-27 11:13:40'),
(1941, 'App\\Models\\User', 105, 'hydra-api-token', 'c6478d10061721748ce4c0cb3d8fab6980a2b88a7ae3336ffcfbf57b6a7be1bc', '[\"user\"]', '2024-01-27 11:15:50', '2024-01-27 11:14:00', '2024-01-27 11:15:50'),
(1942, 'App\\Models\\User', 102, 'hydra-api-token', 'f706a4f9bb1ab69a74a26da2101a1b1d1abfc7ef0246615a3bf984157092eaad', '[\"user\"]', '2024-02-05 04:27:21', '2024-01-27 11:14:06', '2024-02-05 04:27:21'),
(1943, 'App\\Models\\User', 102, 'hydra-api-token', 'eea9a1c4e04f3364fc332d95bf30e3358c8a1a097140514a182a976594626ed9', '[\"user\"]', '2024-01-29 06:31:12', '2024-01-27 11:22:56', '2024-01-29 06:31:12'),
(1944, 'App\\Models\\User', 102, 'hydra-api-token', 'af33adec7ec62d85e811f411a2f0bf620459942627ba356594332d423f035a63', '[\"user\"]', '2024-01-27 11:28:58', '2024-01-27 11:25:46', '2024-01-27 11:28:58'),
(1945, 'App\\Models\\User', 102, 'hydra-api-token', 'd68057980294f32a51c1de31c908db03a04924f0e1072b01336d02879b85c08c', '[\"user\"]', '2024-01-28 04:25:09', '2024-01-28 04:23:41', '2024-01-28 04:25:09'),
(1946, 'App\\Models\\User', 102, 'hydra-api-token', '9fd2e6b8cd59f59c1abe2a721e8aab67876020dc04ca0018fd5879a560a5284e', '[\"user\"]', '2024-01-28 06:59:00', '2024-01-28 06:36:10', '2024-01-28 06:59:00'),
(1948, 'App\\Models\\User', 102, 'hydra-api-token', '40f6743bf2c5190e33c6b32ea7d7efb068ff66df8ca9f3d8a229d14bcdc3368b', '[\"user\"]', '2024-01-28 11:10:26', '2024-01-28 09:45:14', '2024-01-28 11:10:26'),
(1949, 'App\\Models\\User', 100, 'hydra-api-token', 'fb94597b25c44f08e0a1e3227458bc7d81de6346c16949c8a06da48f993297fa', '[\"admin\"]', '2024-01-28 09:59:07', '2024-01-28 09:58:24', '2024-01-28 09:59:07'),
(1950, 'App\\Models\\User', 110, 'hydra-api-token', '62cc1c69d0000f3260400ad118264100f52c4bf90bf09e843cd6bb89aaa3e76d', '[\"user\"]', '2024-01-29 08:20:56', '2024-01-28 09:59:24', '2024-01-29 08:20:56'),
(1951, 'App\\Models\\User', 102, 'hydra-api-token', '0f549f187402fa90bc874fa035d33eff4493f94a31c50db1b3403374231fc136', '[\"user\"]', '2024-01-29 09:00:22', '2024-01-28 10:28:58', '2024-01-29 09:00:22'),
(1952, 'App\\Models\\User', 102, 'hydra-api-token', '587fb7fd74eb8d19171ba2e90f77b77d47693a202795fa792e9b5f03443730d7', '[\"user\"]', '2024-01-29 09:19:14', '2024-01-28 11:17:06', '2024-01-29 09:19:14'),
(1954, 'App\\Models\\User', 102, 'hydra-api-token', 'ae1eba9e4de76ebc523879839a0dfeeb46342a76b6aa84ed0b26126a3206c314', '[\"user\"]', '2024-01-29 05:59:15', '2024-01-29 04:32:40', '2024-01-29 05:59:15'),
(1955, 'App\\Models\\User', 102, 'hydra-api-token', '5174c87cc89877738a66e4faa96ff0af8136898852e9e5ff43f22b818181f8f8', '[\"user\"]', '2024-01-29 05:28:21', '2024-01-29 05:09:00', '2024-01-29 05:28:21'),
(1956, 'App\\Models\\User', 102, 'hydra-api-token', '4cb34b513a8ca7481edeee1d817e67cf57f89ef9c3249bfdaa4ecdf5af1df060', '[\"user\"]', '2024-02-04 06:28:47', '2024-01-29 05:23:19', '2024-02-04 06:28:47'),
(1957, 'App\\Models\\User', 102, 'hydra-api-token', 'f9232c63323c82014ad6e8a525fa0f50e86705f0b87e42b52c2dca932463d9c5', '[\"user\"]', '2024-01-29 09:57:08', '2024-01-29 06:07:06', '2024-01-29 09:57:08'),
(1959, 'App\\Models\\User', 102, 'hydra-api-token', '42a460fade8e65ca02213c7382080896426fbdd2cb6dedfcb5218dbd4fd768d5', '[\"user\"]', '2024-01-29 08:02:58', '2024-01-29 06:31:30', '2024-01-29 08:02:58'),
(1960, 'App\\Models\\User', 102, 'hydra-api-token', '9139fe95f1fdc8cd44f56ed1f89d78505373df827cccf16bce6058aa44961d4d', '[\"user\"]', '2024-01-29 09:10:48', '2024-01-29 06:42:43', '2024-01-29 09:10:48'),
(1965, 'App\\Models\\User', 95, 'hydra-api-token', 'f72a57703e3df82be46b88406686d9387ee2b5f238387da810c81d8bd897e123', '[\"user\"]', '2024-01-29 08:03:18', '2024-01-29 08:02:35', '2024-01-29 08:03:18'),
(1966, 'App\\Models\\User', 127, 'hydra-api-token', 'f305710fba2b52da1ccae30ebfe9abef52f66d71a33180359eb6d85cffcbdd14', '[\"admin\"]', '2024-01-29 08:06:43', '2024-01-29 08:03:08', '2024-01-29 08:06:43'),
(1967, 'App\\Models\\User', 81, 'hydra-api-token', '661da225610b0792b799d3b79102b47246e96b67f0aaaec4feca24974a6d41d7', '[\"user\"]', '2024-01-29 08:03:49', '2024-01-29 08:03:30', '2024-01-29 08:03:49'),
(1968, 'App\\Models\\User', 100, 'hydra-api-token', 'fa38a43fba5f84e2e85f649d22889f7debfa93ba5e1c7c3c9ecf0e0540213f21', '[\"admin\"]', '2024-01-29 11:03:44', '2024-01-29 08:04:30', '2024-01-29 11:03:44'),
(1969, 'App\\Models\\User', 128, 'hydra-api-token', '95c16be858b386bb4f4f5706e78245ed4eb9728330f3a5ad10ef48a3760ae836', '[\"user\"]', '2024-01-29 08:09:21', '2024-01-29 08:07:17', '2024-01-29 08:09:21'),
(1972, 'App\\Models\\User', 128, 'hydra-api-token', 'ac310048aaffd33112169c943c9405731ccac3487369647261564fa860be0371', '[\"user\"]', '2024-01-29 08:10:33', '2024-01-29 08:10:32', '2024-01-29 08:10:33'),
(1973, 'App\\Models\\User', 127, 'hydra-api-token', '11fca1c6112bb77edef3791e4be18c06f749cab289aabff7776c567f1c46beca', '[\"admin\"]', '2024-01-29 08:10:51', '2024-01-29 08:10:50', '2024-01-29 08:10:51'),
(1974, 'App\\Models\\User', 128, 'hydra-api-token', '3e70439af2e79b9dfd499dce7a39a387d5e31496d113a22a99c4f5b71aea9e17', '[\"user\"]', '2024-01-29 08:13:29', '2024-01-29 08:13:28', '2024-01-29 08:13:29'),
(1976, 'App\\Models\\User', 127, 'hydra-api-token', '22cc1520f8073cfd64fd2fae166ee06fb13f2e2727aee84030102d5be2d55f86', '[\"admin\"]', '2024-01-29 08:23:51', '2024-01-29 08:21:31', '2024-01-29 08:23:51'),
(1977, 'App\\Models\\User', 128, 'hydra-api-token', 'd8eb13a97243db3af26d5848b4bbfc5ea42236004fe9727da8af6a84ade75638', '[\"user\"]', '2024-01-29 08:24:48', '2024-01-29 08:24:47', '2024-01-29 08:24:48'),
(1978, 'App\\Models\\User', 127, 'hydra-api-token', '8d238b1e2717978906d2aa6a60ccb9a57366154f46ed45428d577348dbc5d61b', '[\"admin\"]', '2024-01-29 08:29:04', '2024-01-29 08:25:50', '2024-01-29 08:29:04'),
(1979, 'App\\Models\\User', 128, 'hydra-api-token', '84630f43385a8fed61943bc7e826e7ae7bd0a103c0b3357bd503bd5272900826', '[\"user\"]', '2024-01-29 08:30:30', '2024-01-29 08:30:09', '2024-01-29 08:30:30'),
(1980, 'App\\Models\\User', 127, 'hydra-api-token', '6548d2a8dcf073573211b2d8d1d0c4a9eb741e4707da4ec81dd96504bd231397', '[\"admin\"]', '2024-01-29 08:49:34', '2024-01-29 08:31:01', '2024-01-29 08:49:34'),
(1982, 'App\\Models\\User', 100, 'hydra-api-token', '73501b4b654ba59309a98a57219c9299d5f090a8a58bf75277534b9ac953dc59', '[\"admin\"]', '2024-01-29 08:55:15', '2024-01-29 08:49:43', '2024-01-29 08:55:15'),
(1983, 'App\\Models\\User', 129, 'hydra-api-token', '3e8ded99e45ea28c3ac29a24e974f89eb7c4f80e924d02f0b43977c6ed8e1eae', '[\"user\"]', '2024-01-29 08:55:41', '2024-01-29 08:55:40', '2024-01-29 08:55:41'),
(1984, 'App\\Models\\User', 128, 'hydra-api-token', '69d20b0f04c771ebdeb77b08600f510e3bc07a40710f69bf6b078890e7898fd9', '[\"user\"]', '2024-01-29 09:59:27', '2024-01-29 09:01:10', '2024-01-29 09:59:27'),
(1985, 'App\\Models\\User', 128, 'hydra-api-token', 'e1219f5cdd42133363ea2c7cea0459af2e483a4c42360027210418b529df5a93', '[\"user\"]', '2024-01-29 09:09:50', '2024-01-29 09:09:46', '2024-01-29 09:09:50'),
(1986, 'App\\Models\\User', 128, 'hydra-api-token', '6a67049f4e29b8220dcaaa27958562bae7bc9c60e444fb86c3900a4255c5628a', '[\"user\"]', NULL, '2024-01-29 09:11:14', '2024-01-29 09:11:14'),
(1987, 'App\\Models\\User', 128, 'hydra-api-token', '5088dcfe2fea93cd7f9d069075cafc49ff48e10a24d7625ecdf18a9f17d95378', '[\"user\"]', NULL, '2024-01-29 09:11:18', '2024-01-29 09:11:18'),
(1988, 'App\\Models\\User', 128, 'hydra-api-token', 'c9f1a08559b3f2330b2a8cd7259cc310bead8581bb30e7e8530f46b5cdbc4434', '[\"user\"]', NULL, '2024-01-29 09:11:22', '2024-01-29 09:11:22'),
(1989, 'App\\Models\\User', 128, 'hydra-api-token', '1b55fe809f8e7cf0209f414415a31b98d44008805191c7d046c6f194512b4365', '[\"user\"]', NULL, '2024-01-29 09:11:49', '2024-01-29 09:11:49'),
(1991, 'App\\Models\\User', 102, 'hydra-api-token', 'e41bdd7dd8c301136802d893bf533950598963f6ae2d81531234fa3ba8f11e0c', '[\"user\"]', '2024-01-29 09:19:18', '2024-01-29 09:19:16', '2024-01-29 09:19:18'),
(1992, 'App\\Models\\User', 128, 'hydra-api-token', '5eb555a122f6238aaa7b7199a4844cb05daee7e016a495ad15d836bbd0fc9310', '[\"user\"]', NULL, '2024-01-29 09:20:01', '2024-01-29 09:20:01'),
(1993, 'App\\Models\\User', 128, 'hydra-api-token', '92d052e797ede4c0e9b6eea56736f213f04d98a77ab933bea31efd877c574ecb', '[\"user\"]', NULL, '2024-01-29 09:20:39', '2024-01-29 09:20:39'),
(1994, 'App\\Models\\User', 128, 'hydra-api-token', 'ed5cb770d3e0470d2f7eeb0454d11874cb8a52ab0332d1c2609b3c83575e3bed', '[\"user\"]', '2024-01-29 10:06:30', '2024-01-29 09:21:02', '2024-01-29 10:06:30'),
(1995, 'App\\Models\\User', 1, 'hydra-api-token', 'f7fd224c38f9ce1be4a0417c9fdb700dbcba4a91e8a7d750f9cda2e6682287ae', '[\"admin\"]', '2024-01-29 09:24:04', '2024-01-29 09:21:39', '2024-01-29 09:24:04'),
(1996, 'App\\Models\\User', 128, 'hydra-api-token', 'f186f4838a8bc9119e13e9d4eeae36eeae14dd0ac61c8c821cd58671e4a30d5b', '[\"user\"]', '2024-01-29 10:07:17', '2024-01-29 09:22:50', '2024-01-29 10:07:17'),
(1997, 'App\\Models\\User', 102, 'hydra-api-token', '425593a4f4b600345b89cd1943960ee10ee1e40ad07a6228b41be3f883322a1a', '[\"user\"]', '2024-01-29 11:08:55', '2024-01-29 09:49:03', '2024-01-29 11:08:55'),
(1998, 'App\\Models\\User', 129, 'hydra-api-token', '8ef139b4b4089a8222aaa4ec2f13e3b65cae014f02f2415ed05362d43b43ce08', '[\"user\"]', '2024-01-29 09:57:26', '2024-01-29 09:57:25', '2024-01-29 09:57:26'),
(1999, 'App\\Models\\User', 129, 'hydra-api-token', 'd372c064c5534e6d3baf9ea75919e639c72f166e037fd2c9868528e869792f2e', '[\"user\"]', '2024-01-29 09:58:33', '2024-01-29 09:58:29', '2024-01-29 09:58:33'),
(2000, 'App\\Models\\User', 128, 'hydra-api-token', 'a981e0dfecf137e2dc87f1ef98e0b1edad63625331b8614fa5e805220e9bddce', '[\"user\"]', '2024-01-29 09:59:48', '2024-01-29 09:59:35', '2024-01-29 09:59:48'),
(2001, 'App\\Models\\User', 129, 'hydra-api-token', '3d202813d0c4808156392f128cbc4b15d8dde7f4c3f72cc8ede0e86b89dd584a', '[\"user\"]', '2024-01-30 06:04:21', '2024-01-29 10:00:36', '2024-01-30 06:04:21'),
(2002, 'App\\Models\\User', 128, 'hydra-api-token', 'cf63ce0da17203a3e425dc1b290797a2a5fcd86c73470759cbb520d91fd9780f', '[\"user\"]', '2024-01-29 12:07:04', '2024-01-29 10:01:23', '2024-01-29 12:07:04'),
(2003, 'App\\Models\\User', 103, 'hydra-api-token', '941aacf9ddcf5841bfb118c6bf1f1976dcac0781d2e4f7031be49ef925fae71d', '[\"user\"]', '2024-02-04 08:06:56', '2024-01-29 10:07:21', '2024-02-04 08:06:56'),
(2004, 'App\\Models\\User', 102, 'hydra-api-token', '2ee0975492a311d3745d40d28c6e6b660be6c4c4e0ffc5daf01e2f194a44aa8e', '[\"user\"]', '2024-01-29 10:08:02', '2024-01-29 10:07:33', '2024-01-29 10:08:02'),
(2005, 'App\\Models\\User', 102, 'hydra-api-token', '1fbdae348e628b6685b96e7dc849d71ee458c3a624aefd1eac8f599643adf9fa', '[\"user\"]', '2024-01-29 10:11:24', '2024-01-29 10:11:23', '2024-01-29 10:11:24'),
(2006, 'App\\Models\\User', 127, 'hydra-api-token', 'fb9a1cbf996b70369ae0449333dbb37e6e73041fb24020d6a37da11ad2535cb5', '[\"admin\"]', '2024-01-29 10:27:42', '2024-01-29 10:27:36', '2024-01-29 10:27:42'),
(2007, 'App\\Models\\User', 103, 'hydra-api-token', 'f22047d54f5e7a42764d61cec20a3e305db9adca37d881098e99e21d555d0b82', '[\"user\"]', '2024-01-29 11:20:58', '2024-01-29 11:03:54', '2024-01-29 11:20:58'),
(2008, 'App\\Models\\User', 100, 'hydra-api-token', '6a115ed3fb8e4880083a1084b864097a2ff43ad8519a42576a07a9cf98001c93', '[\"admin\"]', '2024-01-29 11:10:03', '2024-01-29 11:09:11', '2024-01-29 11:10:03'),
(2009, 'App\\Models\\User', 102, 'hydra-api-token', 'fd9b951688bab52f6142a4f799a01e80d9fd38bf78f5f47ade386451e1723aeb', '[\"user\"]', '2024-01-29 11:44:44', '2024-01-29 11:10:19', '2024-01-29 11:44:44'),
(2010, 'App\\Models\\User', 125, 'hydra-api-token', 'bfd65b0a4c28bf68ca8cc8d48464bb5b0ac09d3f95a4c10a864cbaa1c0d8bf9a', '[\"user\"]', '2024-01-31 09:46:52', '2024-01-29 11:22:01', '2024-01-31 09:46:52'),
(2011, 'App\\Models\\User', 102, 'hydra-api-token', 'd816e33ef6f7b5d35e27af67286f53d46e5064b4647a82219475f734627c129e', '[\"user\"]', '2024-01-30 10:56:52', '2024-01-29 12:07:23', '2024-01-30 10:56:52'),
(2012, 'App\\Models\\User', 100, 'hydra-api-token', '5dad00a3bd35380041eb8f70cd2f70a4874a13056ec758bfe971e8fcb5233ba9', '[\"admin\"]', '2024-01-31 04:30:06', '2024-01-29 12:09:22', '2024-01-31 04:30:06'),
(2013, 'App\\Models\\User', 123, 'hydra-api-token', '4d1265cdb1ebd1d980001ca923d3d1c657398ab812abbbac59103909d2eb01b3', '[\"user\"]', '2024-01-30 07:24:10', '2024-01-30 06:05:28', '2024-01-30 07:24:10'),
(2014, 'App\\Models\\User', 102, 'hydra-api-token', 'c3af7f6a8d2ae1c8d118cae307d7f0be721749b506a8465c03e5620fd89ca819', '[\"user\"]', '2024-01-30 09:04:43', '2024-01-30 06:53:53', '2024-01-30 09:04:43'),
(2018, 'App\\Models\\User', 127, 'hydra-api-token', 'a78f9f5764af501a948b8c9367daaed00b9b78f73a4d8dcfd09ddaa00f6a4486', '[\"admin\"]', '2024-01-30 07:24:33', '2024-01-30 07:24:32', '2024-01-30 07:24:33'),
(2019, 'App\\Models\\User', 127, 'hydra-api-token', '9356ca7991069cf9c404d52c22f9a099157c57724fbd41a00905ee7de8a1a0a1', '[\"admin\"]', '2024-01-30 07:26:19', '2024-01-30 07:25:24', '2024-01-30 07:26:19'),
(2022, 'App\\Models\\User', 100, 'hydra-api-token', 'a16817d8d29f6660035779c8f0b6cd0503e4dcaa0d2706ee284d8f4d0b547167', '[\"admin\"]', '2024-01-30 07:29:07', '2024-01-30 07:28:19', '2024-01-30 07:29:07'),
(2023, 'App\\Models\\User', 123, 'hydra-api-token', 'b51176cfcfc52bcd488233d1c32bc6f689706c3164739cc0e945454d646e34c7', '[\"user\"]', '2024-01-30 08:27:32', '2024-01-30 07:57:54', '2024-01-30 08:27:32'),
(2024, 'App\\Models\\User', 103, 'hydra-api-token', '7f614c316f318e6c43798651bb5cae954e3bd7fa94f820b76f8e32480cc5a612', '[\"user\"]', '2024-01-30 08:13:11', '2024-01-30 08:11:15', '2024-01-30 08:13:11'),
(2025, 'App\\Models\\User', 129, 'hydra-api-token', '38bf5250365796a4e2c4fc951e927733b0521bed6194a99db242807ba0a3c400', '[\"user\"]', '2024-01-30 08:29:25', '2024-01-30 08:28:13', '2024-01-30 08:29:25'),
(2026, 'App\\Models\\User', 100, 'hydra-api-token', '4881892c39e3792973daa7c30ffe282acc9bb06e99d19121a2d71065adcdba90', '[\"admin\"]', '2024-01-30 08:30:28', '2024-01-30 08:29:37', '2024-01-30 08:30:28'),
(2027, 'App\\Models\\User', 127, 'hydra-api-token', '708c59ae747ea0c16fe4e09cbb106b5099dbae1134b0ffb7fb79cf8d36226070', '[\"admin\"]', '2024-01-30 08:30:58', '2024-01-30 08:30:44', '2024-01-30 08:30:58'),
(2028, 'App\\Models\\User', 127, 'hydra-api-token', '5a2d5c345086ff2dd185c2dd268fa93d9acf9d060b9a68e9ff9677bdc255b6db', '[\"admin\"]', '2024-01-30 08:32:35', '2024-01-30 08:32:34', '2024-01-30 08:32:35'),
(2029, 'App\\Models\\User', 129, 'hydra-api-token', '798dea1167d9324808513f10d8924994f3bfa08358c01d8447969ee5afc3316b', '[\"user\"]', '2024-01-30 08:36:07', '2024-01-30 08:32:44', '2024-01-30 08:36:07'),
(2030, 'App\\Models\\User', 129, 'hydra-api-token', 'e5ad9a517b3506c9c02f9f962474f403c177367c236016dc1adb2a6af3457d42', '[\"user\"]', '2024-01-30 08:36:24', '2024-01-30 08:36:14', '2024-01-30 08:36:24'),
(2031, 'App\\Models\\User', 100, 'hydra-api-token', 'a589e0546f351aa8262455581ccf1903b7dc3e8e7c1cf348d6af1a909374bc27', '[\"admin\"]', '2024-01-30 08:38:04', '2024-01-30 08:37:41', '2024-01-30 08:38:04'),
(2032, 'App\\Models\\User', 129, 'hydra-api-token', 'df8e0d3ec8054f12978d1290789bfdb0ce424ac6e60336d87845b0ee743d28ba', '[\"user\"]', '2024-01-30 08:42:01', '2024-01-30 08:38:19', '2024-01-30 08:42:01'),
(2033, 'App\\Models\\User', 123, 'hydra-api-token', 'd2e0791ba9556ee05bc2534c8e72a59c505f0d02a059f73f8fcc534f2e210351', '[\"user\"]', '2024-01-30 08:42:12', '2024-01-30 08:42:11', '2024-01-30 08:42:12'),
(2034, 'App\\Models\\User', 100, 'hydra-api-token', '770c6d51beb5739e80175a5d7fe9ef15d11637ba3684d99bdbb95d16aefe187d', '[\"admin\"]', '2024-01-30 08:43:23', '2024-01-30 08:42:32', '2024-01-30 08:43:23'),
(2035, 'App\\Models\\User', 129, 'hydra-api-token', 'e91771868091eff48495317e4c62a617162afc50b9676e769276580ba4e8953d', '[\"user\"]', '2024-01-30 08:53:32', '2024-01-30 08:43:39', '2024-01-30 08:53:32'),
(2036, 'App\\Models\\User', 102, 'hydra-api-token', 'f15c0b7a226e62960dff00e304ed36fc93dcc3f640647ad33cebb94e8cc7a7ea', '[\"user\"]', '2024-02-05 04:29:27', '2024-01-30 08:49:46', '2024-02-05 04:29:27'),
(2037, 'App\\Models\\User', 129, 'hydra-api-token', 'b79cb400fa53e31fea10d32e4bb226d2e3567ca08fedc4b994414d17c5c7e980', '[\"user\"]', '2024-01-30 09:34:01', '2024-01-30 09:33:51', '2024-01-30 09:34:01'),
(2038, 'App\\Models\\User', 129, 'hydra-api-token', '990121476f89d598e5df473e3fcc8a45f90a79267b5b8339592f7431a370c9f8', '[\"user\"]', '2024-01-30 09:35:45', '2024-01-30 09:35:43', '2024-01-30 09:35:45'),
(2039, 'App\\Models\\User', 129, 'hydra-api-token', '28eb702fcb37a08521e5c3b0d6e5a79310d560a4c1d74b4c96f8261d25ad1e3e', '[\"user\"]', '2024-01-30 10:37:28', '2024-01-30 09:38:02', '2024-01-30 10:37:28'),
(2040, 'App\\Models\\User', 129, 'hydra-api-token', '24f1d287d18c39260aff285108f00dc5d96d96c9388c747ab2d25386d385bf68', '[\"user\"]', '2024-02-03 20:42:01', '2024-01-30 09:38:16', '2024-02-03 20:42:01'),
(2041, 'App\\Models\\User', 102, 'hydra-api-token', '363d52ea65c1eb8929eca8a80ea29df7b2f0f12d9554cf2d84039a836ab5d04e', '[\"user\"]', '2024-01-30 11:03:47', '2024-01-30 09:40:47', '2024-01-30 11:03:47'),
(2042, 'App\\Models\\User', 102, 'hydra-api-token', 'ebaccba617bf2a1a5affca538354b638aa0872078969e310e3bc8a6087ae0360', '[\"user\"]', '2024-01-30 11:00:26', '2024-01-30 10:17:03', '2024-01-30 11:00:26'),
(2043, 'App\\Models\\User', 102, 'hydra-api-token', '310f6bd0368a89ba59e5de0a0827a008240077d603d22ceeb2e195854d6e1826', '[\"user\"]', '2024-01-30 10:57:00', '2024-01-30 10:48:03', '2024-01-30 10:57:00'),
(2044, 'App\\Models\\User', 102, 'hydra-api-token', 'e25f1aeb6fa3aae89e99659836bfc6d0beca1e6081047140f4a3f4c4fd92387b', '[\"user\"]', '2024-01-30 10:57:27', '2024-01-30 10:56:57', '2024-01-30 10:57:27'),
(2045, 'App\\Models\\User', 102, 'hydra-api-token', '17d78519322428a3af339a47a9798477b45c161796e40fd3664889579118ab5f', '[\"user\"]', '2024-01-30 12:44:29', '2024-01-30 10:58:33', '2024-01-30 12:44:29'),
(2046, 'App\\Models\\User', 105, 'hydra-api-token', '19321e6c0c6d60c17e3d4ba5b4e3299347c7f9f4fd10550ae43197cbfcfdb83a', '[\"user\"]', '2024-01-30 11:07:01', '2024-01-30 11:06:53', '2024-01-30 11:07:01'),
(2047, 'App\\Models\\User', 128, 'hydra-api-token', '16855dc928b3f941d58b810a5c2a2a1602439c1df278ad23d38112338b9efeea', '[\"user\"]', '2024-01-30 11:07:24', '2024-01-30 11:07:17', '2024-01-30 11:07:24'),
(2048, 'App\\Models\\User', 103, 'hydra-api-token', 'c3556516c47b2f2909f6861b58a54b4dfd04d72c94bad2839e6e8eb5d56ae771', '[\"user\"]', '2024-02-01 09:14:08', '2024-01-30 11:07:32', '2024-02-01 09:14:08'),
(2049, 'App\\Models\\User', 102, 'hydra-api-token', '17a5385b3a53eec4ef9231aa518a6bf456c402324fcb15ac32556a11b52a8262', '[\"user\"]', NULL, '2024-01-30 11:13:51', '2024-01-30 11:13:51'),
(2050, 'App\\Models\\User', 102, 'hydra-api-token', '3668be2af8a1306e35bc6ebf8e1ffa2e22468dd9bc087b1125a188e0bc1b0bea', '[\"user\"]', NULL, '2024-01-30 11:14:02', '2024-01-30 11:14:02'),
(2051, 'App\\Models\\User', 102, 'hydra-api-token', '108877271392acb86b568a34d787c7e158e9406a769e794f91d4031454b2b30a', '[\"user\"]', '2024-01-30 12:57:47', '2024-01-30 12:57:30', '2024-01-30 12:57:47'),
(2052, 'App\\Models\\User', 102, 'hydra-api-token', '9296c98f77e2bf89ba91b7e5974e5041aac35bfcf174b8a746166630e0b86f76', '[\"user\"]', '2024-02-01 06:00:19', '2024-01-31 04:30:26', '2024-02-01 06:00:19'),
(2053, 'App\\Models\\User', 100, 'hydra-api-token', '7bba7df852bc0c7bed40a09b0149c8330ba7504600f1e101c03b8847dfb158a2', '[\"admin\"]', '2024-01-31 05:02:29', '2024-01-31 05:00:33', '2024-01-31 05:02:29'),
(2054, 'App\\Models\\User', 100, 'hydra-api-token', 'bd79a2997522499c3780ea63303e325ada639540cb773a9416bfcad566f7cd34', '[\"admin\"]', '2024-01-31 05:57:51', '2024-01-31 05:51:40', '2024-01-31 05:57:51'),
(2055, 'App\\Models\\User', 100, 'hydra-api-token', '59b6a4d8376c4904608a3d786f5dc784fd7cdccf38e0d06f3ad645d553728b11', '[\"admin\"]', '2024-01-31 06:07:51', '2024-01-31 05:58:38', '2024-01-31 06:07:51'),
(2056, 'App\\Models\\User', 130, 'hydra-api-token', '9a3cdfbbf9c1a2a23a41f2332dbe2aeb7a308e30bb7be786c061eebeb8bbe347', '[\"user\"]', '2024-01-31 06:08:52', '2024-01-31 06:08:30', '2024-01-31 06:08:52'),
(2057, 'App\\Models\\User', 131, 'hydra-api-token', '31611946bb726b31a98f6094e38264500f9d1854659071edf02e118b13ca610f', '[\"user\"]', '2024-02-03 05:31:04', '2024-01-31 06:09:41', '2024-02-03 05:31:04'),
(2058, 'App\\Models\\User', 130, 'hydra-api-token', '02f34ccfd3ac929587cc0bf3ab9352015cdde2c528114c2a560398d3ea08fec8', '[\"user\"]', '2024-01-31 06:40:02', '2024-01-31 06:38:42', '2024-01-31 06:40:02'),
(2059, 'App\\Models\\User', 131, 'hydra-api-token', '064d9373ab4392dd33e0f1ebb0b5a47fc7142e379e17d39e15c7beb8dca2136b', '[\"user\"]', '2024-01-31 06:40:29', '2024-01-31 06:40:27', '2024-01-31 06:40:29'),
(2060, 'App\\Models\\User', 130, 'hydra-api-token', '1501f01753fdf0bc4d6c7a02e51a5d177e08fb4b354821dfa6ca471400fb0509', '[\"user\"]', '2024-01-31 06:42:07', '2024-01-31 06:41:21', '2024-01-31 06:42:07'),
(2061, 'App\\Models\\User', 123, 'hydra-api-token', '8d688724c4f86e73dbb5c824be8fd22abe62381193bfc374db256cd09581c056', '[\"user\"]', '2024-01-31 07:29:10', '2024-01-31 06:42:21', '2024-01-31 07:29:10'),
(2062, 'App\\Models\\User', 105, 'hydra-api-token', 'd2fd6aba584de26d4454ea63b4de8e3b3ac2bc53857f0309140d0b729db8db63', '[\"user\"]', '2024-01-31 10:04:54', '2024-01-31 09:59:59', '2024-01-31 10:04:54'),
(2063, 'App\\Models\\User', 95, 'hydra-api-token', '14864e316c083c691fcc586fa7307ba6fd67bcacfae0aabaac4d821604959114', '[\"user\"]', '2024-01-31 10:02:30', '2024-01-31 10:02:24', '2024-01-31 10:02:30'),
(2064, 'App\\Models\\User', 100, 'hydra-api-token', '3450ba3fc152ea4e8914197033c96770cf64589b6e0838d01a2c9ed7566df281', '[\"admin\"]', '2024-01-31 10:13:11', '2024-01-31 10:02:44', '2024-01-31 10:13:11'),
(2065, 'App\\Models\\User', 131, 'hydra-api-token', 'bcfb44fcdd480864b060cfdd49fb865f5c22b3356d46bcf4636d74a99d118e8d', '[\"user\"]', '2024-01-31 10:25:40', '2024-01-31 10:06:20', '2024-01-31 10:25:40'),
(2066, 'App\\Models\\User', 129, 'hydra-api-token', 'aa08943bacaa01a72431331ecf32608df3f64e4f7b490999ca504b0cb7f5e789', '[\"user\"]', '2024-01-31 10:38:51', '2024-01-31 10:14:52', '2024-01-31 10:38:51'),
(2067, 'App\\Models\\User', 105, 'hydra-api-token', '226a25eabb486e50063e3fc9608610a99b635999e996c109ccc5122a01708ef0', '[\"user\"]', '2024-01-31 10:41:55', '2024-01-31 10:21:55', '2024-01-31 10:41:55'),
(2068, 'App\\Models\\User', 100, 'hydra-api-token', 'fa21f96691f0374b397da74212d69daa984ff415c403b84df775c5183bb08381', '[\"admin\"]', '2024-01-31 10:25:15', '2024-01-31 10:24:35', '2024-01-31 10:25:15'),
(2069, 'App\\Models\\User', 129, 'hydra-api-token', '2d9de934c613943c1ad9f20faac09bf7af91273136b8be4e997cc6b4603b1c0e', '[\"user\"]', '2024-01-31 10:25:35', '2024-01-31 10:25:34', '2024-01-31 10:25:35'),
(2070, 'App\\Models\\User', 131, 'hydra-api-token', '1022858b2eca23fd61b056eda8cdfa1aab3b9f7981f5e0bc7abe0e905f5cb205', '[\"user\"]', '2024-01-31 10:44:42', '2024-01-31 10:27:41', '2024-01-31 10:44:42'),
(2071, 'App\\Models\\User', 129, 'hydra-api-token', '8a45a2f34aab1ef5b49b2ac1832c26f755b198943c09b9ef7965afbef1a71ff3', '[\"user\"]', '2024-02-01 09:41:10', '2024-01-31 10:39:26', '2024-02-01 09:41:10'),
(2072, 'App\\Models\\User', 130, 'hydra-api-token', '9e432241f1910af2fd8da3b1f4ee39538ed1dbf370b1dc04a9ccb51fe21e7d46', '[\"user\"]', '2024-01-31 10:56:27', '2024-01-31 10:48:13', '2024-01-31 10:56:27'),
(2073, 'App\\Models\\User', 105, 'hydra-api-token', 'bb19dd014741f9b04c5cf1842c202f4eb350c7d12632eff8e58202ec94060ee5', '[\"user\"]', '2024-01-31 11:15:18', '2024-01-31 11:13:02', '2024-01-31 11:15:18'),
(2074, 'App\\Models\\User', 131, 'hydra-api-token', '80967d45eb02c6e3713d0fe4b237ef5f19532c738ef611d6f90fc9709e9854d7', '[\"user\"]', '2024-01-31 11:15:34', '2024-01-31 11:15:27', '2024-01-31 11:15:34'),
(2075, 'App\\Models\\User', 131, 'hydra-api-token', '6c4af1448cec1620db1410bb1d53d0bfa2ee741a1ae7eb32cf5687f68686094c', '[\"user\"]', '2024-01-31 11:21:20', '2024-01-31 11:21:19', '2024-01-31 11:21:20'),
(2076, 'App\\Models\\User', 131, 'hydra-api-token', '3337c35c07d23ffc667fd3e0d2216c9e696ce3344880f54fc0b0ad81d0244dbc', '[\"user\"]', '2024-01-31 11:23:33', '2024-01-31 11:23:05', '2024-01-31 11:23:33'),
(2078, 'App\\Models\\User', 100, 'hydra-api-token', '1175bd94fe73dbe6e75d7882b3f7d8b90d93dcc143a6a4ec7c461e31636e0fa4', '[\"admin\"]', '2024-01-31 11:40:23', '2024-01-31 11:36:18', '2024-01-31 11:40:23'),
(2079, 'App\\Models\\User', 132, 'hydra-api-token', '92eea5c1ced182ac73d9d608e397308e76a691248f3e2068c295cd396355f4e3', '[\"user\"]', '2024-01-31 11:40:46', '2024-01-31 11:40:45', '2024-01-31 11:40:46'),
(2080, 'App\\Models\\User', 123, 'hydra-api-token', '9a8b2c0d152bbdb49ea175c75450baf552a8c12e152e00419319a9ba7c301728', '[\"user\"]', '2024-01-31 11:51:45', '2024-01-31 11:51:39', '2024-01-31 11:51:45'),
(2081, 'App\\Models\\User', 100, 'hydra-api-token', 'a506474a8ad407f6af91b6c21992c13ce244eb5461005d1843d6bde36ee68a7f', '[\"admin\"]', '2024-01-31 11:52:24', '2024-01-31 11:52:21', '2024-01-31 11:52:24'),
(2082, 'App\\Models\\User', 102, 'hydra-api-token', 'b0487a132388048b6ccfa6a91fb2da283c792269bf545b641ff868b78f426c5f', '[\"user\"]', '2024-01-31 12:55:23', '2024-01-31 12:27:42', '2024-01-31 12:55:23'),
(2083, 'App\\Models\\User', 123, 'hydra-api-token', '66d2a9185236882705c443840a7728a26058a6a81128419d795cb1450fe80db1', '[\"user\"]', '2024-02-01 09:37:16', '2024-01-31 14:58:23', '2024-02-01 09:37:16'),
(2084, 'App\\Models\\User', 102, 'hydra-api-token', '9c9eda02fe8ba939089b4dd591a236b06e24e9cb03029d39ad3e8f571aef32b1', '[\"user\"]', '2024-02-01 10:14:45', '2024-02-01 05:56:32', '2024-02-01 10:14:45'),
(2085, 'App\\Models\\User', 102, 'hydra-api-token', '318bbdf7229656c468bc49bc5137a9b724da91106cdbe8541e42b1ed03c2402b', '[\"user\"]', '2024-02-01 06:05:11', '2024-02-01 06:04:39', '2024-02-01 06:05:11'),
(2086, 'App\\Models\\User', 102, 'hydra-api-token', '39a9cb26f4ba69192a7b487dc2fd0b3d0ae8a1baef3ef5dbb8ef96bbedfecd5a', '[\"user\"]', '2024-02-01 07:09:38', '2024-02-01 07:09:37', '2024-02-01 07:09:38'),
(2087, 'App\\Models\\User', 105, 'hydra-api-token', '20b144799cb48d3c65f94f0a98860dabd99fa06cd4dbbd9914bd1ff4861b8fba', '[\"user\"]', '2024-02-04 09:45:02', '2024-02-01 07:55:26', '2024-02-04 09:45:02'),
(2088, 'App\\Models\\User', 102, 'hydra-api-token', 'ff8a490902180190259ff27c687d3b893c87f500caa86929de0f83e41f630bec', '[\"user\"]', '2024-02-01 08:54:30', '2024-02-01 08:53:13', '2024-02-01 08:54:30'),
(2089, 'App\\Models\\User', 102, 'hydra-api-token', 'c087ef4409fd281a1465cd08be7147e22ea1f3e19a0bc0ed6260e1cfb467e149', '[\"user\"]', '2024-02-05 04:33:08', '2024-02-01 09:14:18', '2024-02-05 04:33:08'),
(2090, 'App\\Models\\User', 100, 'hydra-api-token', '79fd3c335acc4e437b640363b16cce019f9fc9b0d99285c4454b6f7728ede619', '[\"admin\"]', '2024-02-01 10:06:22', '2024-02-01 09:37:33', '2024-02-01 10:06:22'),
(2091, 'App\\Models\\User', 125, 'hydra-api-token', 'c6b753e1f8b1e6c4336f103bd94d3353849b88159c40ecdde63cbcbb6b1936f4', '[\"user\"]', '2024-02-03 07:32:37', '2024-02-01 09:42:14', '2024-02-03 07:32:37'),
(2092, 'App\\Models\\User', 123, 'hydra-api-token', '6c277a04a83a19703913a6e26ec11d3cb180b9de381e9b3f18be89bba2e84ef0', '[\"user\"]', '2024-02-01 10:14:31', '2024-02-01 10:06:42', '2024-02-01 10:14:31'),
(2093, 'App\\Models\\User', 102, 'hydra-api-token', 'b4a1ae37e1c43a563073ac9d146bb72787aaeaefc1925873cf3dcc147e0c7b70', '[\"user\"]', '2024-02-01 10:13:05', '2024-02-01 10:12:57', '2024-02-01 10:13:05'),
(2094, 'App\\Models\\User', 102, 'hydra-api-token', '13db4e65bfe44c909372d60cdce429f8f0c00325bf896e0e57969d7f6460f62c', '[\"user\"]', '2024-02-01 10:51:52', '2024-02-01 10:50:06', '2024-02-01 10:51:52'),
(2095, 'App\\Models\\User', 102, 'hydra-api-token', '73558402564e11ca5618dd3ab347dcbad308c322222df2039a4de31d1051cabf', '[\"user\"]', '2024-02-01 10:52:25', '2024-02-01 10:50:26', '2024-02-01 10:52:25'),
(2096, 'App\\Models\\User', 102, 'hydra-api-token', 'd518e3772394849d960d415786fddc70280d4f2662c3babbf319f6a8a1ed3409', '[\"user\"]', '2024-02-03 05:33:01', '2024-02-01 10:50:33', '2024-02-03 05:33:01'),
(2097, 'App\\Models\\User', 102, 'hydra-api-token', '4c3e3fdb0faa7bd9ab545a36d00243faf0153d0d0a6d7bc3afb6d2421a46fc18', '[\"user\"]', '2024-02-01 11:02:11', '2024-02-01 11:00:54', '2024-02-01 11:02:11'),
(2098, 'App\\Models\\User', 131, 'hydra-api-token', 'f687cfc048dff6c2eaba6fe0d1e12d9b0d9ce2dd1450e600fa0515ffa1b6ae2b', '[\"user\"]', '2024-02-01 22:37:56', '2024-02-01 22:35:20', '2024-02-01 22:37:56'),
(2099, 'App\\Models\\User', 131, 'hydra-api-token', 'cc2330fd754cb36d492b1b1d72db4089b6c97c8c9a5f33b4b6d3e54f97282e11', '[\"user\"]', '2024-02-01 23:09:53', '2024-02-01 23:09:06', '2024-02-01 23:09:53'),
(2100, 'App\\Models\\User', 130, 'hydra-api-token', '42b00b9c52b07b8ff7b64642906c3969fb9ceaa2a98e6e122bc9970be773ccac', '[\"user\"]', '2024-02-01 23:12:22', '2024-02-01 23:11:34', '2024-02-01 23:12:22'),
(2101, 'App\\Models\\User', 105, 'hydra-api-token', 'fefcea9ad3fa4dd740b33acf78a5af635ad500916bf69b02e5672c03004b8cbf', '[\"user\"]', '2024-02-05 03:21:50', '2024-02-01 23:12:33', '2024-02-05 03:21:50'),
(2102, 'App\\Models\\User', 105, 'hydra-api-token', 'bb3f8d32137e2bce9d5472f6a441d5cbdbd57d6de754c5b6fe94051220481c01', '[\"user\"]', '2024-02-02 12:12:22', '2024-02-02 12:01:13', '2024-02-02 12:12:22'),
(2103, 'App\\Models\\User', 105, 'hydra-api-token', '0d4c29798b6ca024810a0139952f785168a2e4c82ce70d9f150cf137c5359d12', '[\"user\"]', '2024-02-03 03:09:13', '2024-02-03 03:08:52', '2024-02-03 03:09:13'),
(2104, 'App\\Models\\User', 102, 'hydra-api-token', 'da4c9440eef13a564e67216b5681174873a1686bcd2b05a6f22a4dfc4e2c680d', '[\"user\"]', '2024-02-03 05:34:47', '2024-02-03 05:33:22', '2024-02-03 05:34:47'),
(2105, 'App\\Models\\User', 100, 'hydra-api-token', '908278f027240b949c6be333132d65137a2fff7a7780ca3dbfe419ea509dcf72', '[\"admin\"]', '2024-02-03 05:36:25', '2024-02-03 05:36:10', '2024-02-03 05:36:25'),
(2106, 'App\\Models\\User', 102, 'hydra-api-token', '5e922a7a161907c5a20fd0dbd75b47e75ff42e0192c428aea0dcf378a7ae7de6', '[\"user\"]', '2024-02-03 06:56:31', '2024-02-03 06:17:25', '2024-02-03 06:56:31'),
(2107, 'App\\Models\\User', 102, 'hydra-api-token', '8d5e2f8d8c09fb863554c443a47d966636e3440f90f16aadb06d114186d625aa', '[\"user\"]', '2024-02-03 06:41:26', '2024-02-03 06:22:44', '2024-02-03 06:41:26'),
(2108, 'App\\Models\\User', 100, 'hydra-api-token', '2f1985e171effa744cfc649e12579eba5ca9a16a839163a867a91af24cd44746', '[\"admin\"]', '2024-02-03 06:54:38', '2024-02-03 06:52:43', '2024-02-03 06:54:38'),
(2109, 'App\\Models\\User', 123, 'hydra-api-token', '6487890ba99de7cfc1fb511d58904b253ebd83f0e129dab976ca4f1e4a737291', '[\"user\"]', '2024-02-03 12:32:34', '2024-02-03 06:52:54', '2024-02-03 12:32:34'),
(2110, 'App\\Models\\User', 102, 'hydra-api-token', '511c09aa8780e59c26e0f18a3150cf84faff6b244677702591d62c23ea4ad3da', '[\"user\"]', '2024-02-03 09:20:58', '2024-02-03 06:54:48', '2024-02-03 09:20:58'),
(2111, 'App\\Models\\User', 129, 'hydra-api-token', 'f15d46f942ecb0721b756f09c159bd33ec67f59cab92b4f6c19e23e7b6b3f294', '[\"user\"]', '2024-02-03 07:36:16', '2024-02-03 07:33:26', '2024-02-03 07:36:16'),
(2112, 'App\\Models\\User', 125, 'hydra-api-token', '4cb503a684b3e759367f32b726021fca1c94e947d12454691680acd9b3ea6166', '[\"user\"]', '2024-02-03 07:37:29', '2024-02-03 07:37:27', '2024-02-03 07:37:29'),
(2113, 'App\\Models\\User', 100, 'hydra-api-token', '212203310e655a2f82833d4b67025887ac67e444a861a6f9bcf8ec2356b44fa5', '[\"admin\"]', '2024-02-03 08:05:58', '2024-02-03 07:37:56', '2024-02-03 08:05:58'),
(2114, 'App\\Models\\User', 125, 'hydra-api-token', 'ffa02394c0f0ecea61c55ebadc0278584a597bd51cb1a19ec63e9d23b906184a', '[\"user\"]', '2024-02-04 10:31:09', '2024-02-03 08:06:53', '2024-02-04 10:31:09'),
(2115, 'App\\Models\\User', 102, 'hydra-api-token', '3c002f0658b7c6a8613a91937b2a81565ed91915113295cd84303a4a209948b5', '[\"user\"]', '2024-02-03 09:08:21', '2024-02-03 09:08:20', '2024-02-03 09:08:21'),
(2116, 'App\\Models\\User', 100, 'hydra-api-token', '9203510a7a72a55280d83870810f94438a9baa1c371ef34ef7fa6be4d4c4019c', '[\"admin\"]', '2024-02-03 09:55:51', '2024-02-03 09:09:50', '2024-02-03 09:55:51'),
(2117, 'App\\Models\\User', 105, 'hydra-api-token', '6f26c5a3189f5ed45063191125886c6d585d886fb91cdcb322bd4946f570493f', '[\"user\"]', '2024-02-03 09:45:38', '2024-02-03 09:45:12', '2024-02-03 09:45:38'),
(2118, 'App\\Models\\User', 100, 'hydra-api-token', '901876cbf2a6cb27bea718d3c894b8af926dfdb95530455ee7870965bdc3bc85', '[\"admin\"]', '2024-02-03 09:57:54', '2024-02-03 09:56:20', '2024-02-03 09:57:54'),
(2119, 'App\\Models\\User', 100, 'hydra-api-token', 'a11c5f917b9c4aa6169ed8d61702bc4f81f6bbe7ee61c896f5f0d93a34565464', '[\"admin\"]', '2024-02-04 09:37:53', '2024-02-03 10:05:27', '2024-02-04 09:37:53'),
(2120, 'App\\Models\\User', 102, 'hydra-api-token', '43bfb581fba9f7d9dcedf7b279b002408f144dbd437ddaf89a5683c743a2363c', '[\"user\"]', '2024-02-03 11:23:43', '2024-02-03 10:14:15', '2024-02-03 11:23:43'),
(2121, 'App\\Models\\User', 129, 'hydra-api-token', '61ce755d7d94df1a9afd1f7e7dbc67d5ad541d2aea25fb3e79b572a60872f43c', '[\"user\"]', '2024-02-03 12:37:47', '2024-02-03 12:32:57', '2024-02-03 12:37:47'),
(2122, 'App\\Models\\User', 129, 'hydra-api-token', '5163ab0ac1e1e16402904b729f991c661d43d02ffbd1ce0c49691e1acd1db177', '[\"user\"]', '2024-02-04 06:49:54', '2024-02-04 06:49:52', '2024-02-04 06:49:54'),
(2123, 'App\\Models\\User', 123, 'hydra-api-token', '524453010fd41a6ad9ec4eabe8da5aa942da277e9956403dff34006eff31d287', '[\"user\"]', '2024-02-04 07:18:49', '2024-02-04 07:15:51', '2024-02-04 07:18:49');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(2124, 'App\\Models\\User', 123, 'hydra-api-token', 'd5451ade2cc83c569261b2cbe0e995edbe4e3117a0931289fce7077c6c8382cc', '[\"user\"]', '2024-02-04 09:54:01', '2024-02-04 08:14:58', '2024-02-04 09:54:01'),
(2125, 'App\\Models\\User', 102, 'hydra-api-token', 'aca3f140da77331e847fcf0540baee12c303b7bf495c12ad4cfe993c16dc030a', '[\"user\"]', '2024-02-04 09:15:47', '2024-02-04 09:02:57', '2024-02-04 09:15:47'),
(2126, 'App\\Models\\User', 102, 'hydra-api-token', 'c010dcf9bfc5687c8c44982fbb9c37031f2a404e23e9835e204acf9dcdcac33f', '[\"user\"]', '2024-02-05 04:13:13', '2024-02-04 09:38:09', '2024-02-05 04:13:13'),
(2127, 'App\\Models\\User', 130, 'hydra-api-token', 'de98dde697602a575e7bcf829ddfdba1d1f5e46f518a76fb5a3ff656dc6f98b0', '[\"user\"]', '2024-02-04 09:47:12', '2024-02-04 09:45:17', '2024-02-04 09:47:12'),
(2128, 'App\\Models\\User', 131, 'hydra-api-token', 'c357c9449bf740c0fe245e6a2f3b0c17d0309eb9423b10c696ed0d3d1caf20e9', '[\"user\"]', '2024-02-04 09:48:42', '2024-02-04 09:47:25', '2024-02-04 09:48:42'),
(2129, 'App\\Models\\User', 105, 'hydra-api-token', '27b64fff5a108da5dce1d5254d1f1cff1a1516c277528397eae3f0cf146c9ef5', '[\"user\"]', '2024-02-04 09:55:39', '2024-02-04 09:48:59', '2024-02-04 09:55:39'),
(2130, 'App\\Models\\User', 123, 'hydra-api-token', '71adfbba5cd3d662260f069fd47e59a7131753b2c33d0dd959e82383fae81f73', '[\"user\"]', '2024-02-04 10:01:44', '2024-02-04 09:56:08', '2024-02-04 10:01:44'),
(2131, 'App\\Models\\User', 102, 'hydra-api-token', '3f420b4f60c28e782609d5689158c5bac0a9bf93d2af6f13fe7ceba159d4a873', '[\"user\"]', '2024-02-04 11:19:25', '2024-02-04 09:56:09', '2024-02-04 11:19:25'),
(2132, 'App\\Models\\User', 123, 'hydra-api-token', '437d168324f5e1e1ab149ef84ce3fe437ae49c6e09ebb826a3f6521097ec46e1', '[\"user\"]', '2024-02-04 11:05:10', '2024-02-04 10:01:56', '2024-02-04 11:05:10'),
(2133, 'App\\Models\\User', 95, 'hydra-api-token', '5650663ad0193083b0c7e52b93f2ef4fd3fe7c0fba842cd25d5877b74fda0d9c', '[\"user\"]', '2024-02-04 10:40:58', '2024-02-04 10:31:38', '2024-02-04 10:40:58'),
(2134, 'App\\Models\\User', 132, 'hydra-api-token', 'b3822138cca2f53d2a6884e531b01bec1e41a27793115839ba825353cfdce87d', '[\"user\"]', '2024-02-04 10:45:07', '2024-02-04 10:33:05', '2024-02-04 10:45:07'),
(2135, 'App\\Models\\User', 105, 'hydra-api-token', '820b78171b3591f9785d29028f4d4243c5a5c91016f305701d6d7d733938369f', '[\"user\"]', '2024-02-04 10:49:05', '2024-02-04 10:40:53', '2024-02-04 10:49:05'),
(2136, 'App\\Models\\User', 125, 'hydra-api-token', '8277652e9c0ce40d6613e32bd08cb14a21bfee8d771ac8f45c378966955b7185', '[\"user\"]', '2024-02-04 13:22:34', '2024-02-04 10:41:33', '2024-02-04 13:22:34'),
(2137, 'App\\Models\\User', 132, 'hydra-api-token', '88c4e1dfe49a3e03fc423988dcccc67b269dc950c9ecec0d7e8fb4597dfe3f24', '[\"user\"]', '2024-02-04 10:55:56', '2024-02-04 10:49:20', '2024-02-04 10:55:56'),
(2138, 'App\\Models\\User', 105, 'hydra-api-token', '8d27c11f065049ff33b3e520c3e11a5f52deb9185e5c155561be3aa392387c28', '[\"user\"]', '2024-02-04 10:55:04', '2024-02-04 10:53:58', '2024-02-04 10:55:04'),
(2139, 'App\\Models\\User', 107, 'hydra-api-token', '014b9f7daf289e30e1ea0b7cce41e5f6048add46b4b78406ee9a3bc3dcc1394f', '[\"user\"]', '2024-02-04 11:12:03', '2024-02-04 10:54:52', '2024-02-04 11:12:03'),
(2140, 'App\\Models\\User', 132, 'hydra-api-token', '5b168877b86b1ab58f43d911788333b5a18418657dd964288a9b464786afda96', '[\"user\"]', '2024-02-04 10:56:54', '2024-02-04 10:56:18', '2024-02-04 10:56:54'),
(2141, 'App\\Models\\User', 105, 'hydra-api-token', '3235b26cdc32ada3e14b3b4a6fdf75172a2e132e2c2cf2ad84a28f36ccf4bf01', '[\"user\"]', '2024-02-04 11:03:20', '2024-02-04 10:57:09', '2024-02-04 11:03:20'),
(2142, 'App\\Models\\User', 116, 'hydra-api-token', 'd442c1c933da3aff0eb3d9be089e641c2cc75fab22a40e3cc1dd233584a7848f', '[\"user\"]', '2024-02-04 11:07:51', '2024-02-04 11:03:31', '2024-02-04 11:07:51'),
(2143, 'App\\Models\\User', 132, 'hydra-api-token', '06cb35709c201cc0cb390b3a80e893f73f08acba1a6dd089fdfcaafd1bbe99b2', '[\"user\"]', '2024-02-04 11:09:57', '2024-02-04 11:06:45', '2024-02-04 11:09:57'),
(2144, 'App\\Models\\User', 132, 'hydra-api-token', '6688748df97dc2e7b69adf604a41990a7e0d8c5bd51b9a7aa5084194b6fb1879', '[\"user\"]', '2024-02-04 11:08:21', '2024-02-04 11:08:03', '2024-02-04 11:08:21'),
(2145, 'App\\Models\\User', 100, 'hydra-api-token', 'e38f83db3fddacb4da3321acaf2e0ca992c57a57c943d75f4d3801f26131cdda', '[\"admin\"]', '2024-02-04 11:10:52', '2024-02-04 11:10:04', '2024-02-04 11:10:52'),
(2146, 'App\\Models\\User', 132, 'hydra-api-token', '987e48a5640c28d62bc2e12aa60e1315f086ce4057ee4dfb062497a04204e10f', '[\"user\"]', '2024-02-04 11:13:18', '2024-02-04 11:13:09', '2024-02-04 11:13:18'),
(2147, 'App\\Models\\User', 132, 'hydra-api-token', 'd914ccea0060c9d479e45ab7a879e688b267c39da41318450a1866a0f09e26b2', '[\"user\"]', '2024-02-04 11:14:41', '2024-02-04 11:14:14', '2024-02-04 11:14:41'),
(2148, 'App\\Models\\User', 100, 'hydra-api-token', 'd82cb45522aeeaf1fb7216faa59aefd7ba4af7704d3ad41c0ebcf32ddac274ed', '[\"admin\"]', '2024-02-04 11:18:21', '2024-02-04 11:14:57', '2024-02-04 11:18:21'),
(2150, 'App\\Models\\User', 132, 'hydra-api-token', 'bc79fb425dea123c6970338671599789e67700f12a1935fa64de8ef4417e0b12', '[\"user\"]', '2024-02-04 11:20:25', '2024-02-04 11:20:15', '2024-02-04 11:20:25'),
(2151, 'App\\Models\\User', 131, 'hydra-api-token', '157193bea5afe1d35ca622a75dbe7c8676752e72bf48710ab961c80f8ae00894', '[\"user\"]', '2024-02-04 11:20:56', '2024-02-04 11:20:48', '2024-02-04 11:20:56'),
(2152, 'App\\Models\\User', 102, 'hydra-api-token', '99830352405092f1e615494f4fca5cf69512764a14b0fb4eca6828600651a57f', '[\"user\"]', '2024-02-04 11:21:17', '2024-02-04 11:20:49', '2024-02-04 11:21:17'),
(2153, 'App\\Models\\User', 102, 'hydra-api-token', '8d8adacb0beb7dcb0266d5616907dc16dfe4e0af861fd376af276b38cf19da70', '[\"user\"]', '2024-02-04 11:24:01', '2024-02-04 11:21:33', '2024-02-04 11:24:01'),
(2154, 'App\\Models\\User', 130, 'hydra-api-token', 'bbf0e1e348eadd6164911e92686b6ff91ec4eb5f48a3693960123238544611b9', '[\"user\"]', '2024-02-04 11:28:06', '2024-02-04 11:22:37', '2024-02-04 11:28:06'),
(2155, 'App\\Models\\User', 132, 'hydra-api-token', '74e85f8e443a3d351de056d41b69d554e060af1c92ce9b113058952b6480c6c3', '[\"user\"]', '2024-02-04 11:46:36', '2024-02-04 11:24:52', '2024-02-04 11:46:36'),
(2156, 'App\\Models\\User', 100, 'hydra-api-token', 'a441997fd60aed8600430dabe0f256acdeac4a17fc8bae1646acd05af566bff2', '[\"admin\"]', '2024-02-04 11:29:03', '2024-02-04 11:28:12', '2024-02-04 11:29:03'),
(2157, 'App\\Models\\User', 132, 'hydra-api-token', '0c54a8af2c69d4b7e4791778bc7c91c6821af870326bb0f2d22a25417f249842', '[\"user\"]', '2024-02-04 11:29:32', '2024-02-04 11:29:23', '2024-02-04 11:29:32'),
(2158, 'App\\Models\\User', 100, 'hydra-api-token', '1e007d202c257c45aae9d62a25f8bf21d54798bf8268386a48d0c2fb72dda6f0', '[\"admin\"]', '2024-02-04 11:31:46', '2024-02-04 11:29:45', '2024-02-04 11:31:46'),
(2159, 'App\\Models\\User', 132, 'hydra-api-token', 'd0b7d8606aed1162298e91bd5d22c8fc971a0d6e1ae6426e637a54f4532fddb8', '[\"user\"]', '2024-02-04 11:32:44', '2024-02-04 11:32:14', '2024-02-04 11:32:44'),
(2160, 'App\\Models\\User', 132, 'hydra-api-token', 'b97729d589ae7db25dd4f44daced4b2181aa258dd2c792149ee1f65064227614', '[\"user\"]', '2024-02-04 11:32:49', '2024-02-04 11:32:48', '2024-02-04 11:32:49'),
(2161, 'App\\Models\\User', 100, 'hydra-api-token', 'e01c04a25808004242a90c138ce735def8b3a509eb1331d1d9d30cb9dad7e308', '[\"admin\"]', '2024-02-04 11:34:44', '2024-02-04 11:32:59', '2024-02-04 11:34:44'),
(2162, 'App\\Models\\User', 102, 'hydra-api-token', 'a19d168458aebcfd58abf30fb5f61d34751cb3f3c9f240c985a6de15f6cc3dd3', '[\"user\"]', '2024-02-04 11:48:33', '2024-02-04 11:47:41', '2024-02-04 11:48:33'),
(2163, 'App\\Models\\User', 132, 'hydra-api-token', '6f03f36c20c54402a172854861c6a6ba9574172164457b7be7434c0819e6a84f', '[\"user\"]', '2024-02-04 11:49:01', '2024-02-04 11:48:57', '2024-02-04 11:49:01'),
(2164, 'App\\Models\\User', 132, 'hydra-api-token', '34e8cd92cd24fe96bae77bb4a711a3eefca61cf8d4105f6ff59bd52303145908', '[\"user\"]', '2024-02-04 11:50:12', '2024-02-04 11:49:46', '2024-02-04 11:50:12'),
(2165, 'App\\Models\\User', 100, 'hydra-api-token', 'e99d91e2e80544dab8b5454559fa11e03cb40648093206b98b6d0f3cbb54a116', '[\"admin\"]', '2024-02-04 11:51:05', '2024-02-04 11:50:27', '2024-02-04 11:51:05'),
(2166, 'App\\Models\\User', 132, 'hydra-api-token', 'ffa5156ab8255add41bb6fbf3310ff7ad7807aed0ffddbcf2c17f2d4d27bad0c', '[\"user\"]', '2024-02-04 11:53:46', '2024-02-04 11:51:31', '2024-02-04 11:53:46'),
(2167, 'App\\Models\\User', 102, 'hydra-api-token', '1c592d9e3c034d6d3fe2fcd3d27aa00dcbd2d5bf689917ed16414878fdd1851b', '[\"user\"]', '2024-02-04 12:19:44', '2024-02-04 12:09:45', '2024-02-04 12:19:44'),
(2168, 'App\\Models\\User', 132, 'hydra-api-token', '84f3004567b05dfbc19ce52023f681234005be8c5d16a771b9e1db0994013393', '[\"user\"]', '2024-02-04 12:27:54', '2024-02-04 12:27:04', '2024-02-04 12:27:54'),
(2169, 'App\\Models\\User', 100, 'hydra-api-token', '817b0e6f30da651cae3f71d23ce8f5693805bdaa1f8710e49cbbcdcfe52ef7e9', '[\"admin\"]', '2024-02-04 12:40:34', '2024-02-04 12:39:16', '2024-02-04 12:40:34'),
(2170, 'App\\Models\\User', 123, 'hydra-api-token', '3904b5200cac8a20fc15f0ebb92848f36e9d85c43b4889b9978ca1e74f193eae', '[\"user\"]', '2024-02-04 12:41:19', '2024-02-04 12:40:54', '2024-02-04 12:41:19'),
(2171, 'App\\Models\\User', 102, 'hydra-api-token', 'b69e74366671a4f4d2060233ea030fb6277fa675e34b22130a0bcc034a65c109', '[\"user\"]', '2024-02-04 22:57:34', '2024-02-04 22:57:23', '2024-02-04 22:57:34'),
(2175, 'App\\Models\\User', 1, 'hydra-api-token', 'fcc6f415bf327ca3777dce6ae0dcdf7ad4141896cedfaf89621f59d8efcbfac7', '[\"admin\"]', '2024-02-04 23:23:17', '2024-02-04 23:21:06', '2024-02-04 23:23:17'),
(2179, 'App\\Models\\User', 1, 'hydra-api-token', 'ff85d06219324bf60ee7e1f3d8cc389e325662ec55308502f9035e21bba83267', '[\"admin\"]', '2024-02-12 03:20:50', '2024-02-12 01:30:13', '2024-02-12 03:20:50'),
(2180, 'App\\Models\\User', 1, 'hydra-api-token', '4533ffd77a3ed7256454078d4977123693c661324ec8cbab9583ac8c6d0022b2', '[\"admin\"]', NULL, '2024-02-12 03:20:53', '2024-02-12 03:20:53'),
(2182, 'App\\Models\\User', 1, 'hydra-api-token', 'a2601eca9c1d27821ca80bcc68f704e4182687c01636f09f53558c7f4bee1ba2', '[\"admin\"]', NULL, '2024-02-12 03:20:54', '2024-02-12 03:20:54'),
(2185, 'App\\Models\\User', 1, 'hydra-api-token', '641aa07a81e3587f42a0af008082c230b60b463a075c18c2abd7fd798376254f', '[\"admin\"]', '2024-02-25 01:08:40', '2024-02-25 01:08:35', '2024-02-25 01:08:40'),
(2186, 'App\\Models\\User', 102, 'hydra-api-token', '52afcc0a14e22048edffcb489c22693479dc93449ded15d5ae4d4dad48a5a466', '[\"user\"]', '2024-03-20 09:49:49', '2024-03-20 04:52:24', '2024-03-20 09:49:49'),
(2188, 'App\\Models\\User', 102, 'hydra-api-token', '53330e012dd2f83e7031ed01760aebb46d9c0cdb5c95023c7413ed1e17c879a4', '[\"user\"]', '2024-04-05 05:04:25', '2024-03-21 03:52:56', '2024-04-05 05:04:25'),
(2189, 'App\\Models\\User', 102, 'hydra-api-token', '3dbbb212a732aa6eb7e5d21c53e7dd16c05c09fa72ad55cdf3fd1796ae0a25d2', '[\"user\"]', '2024-04-22 09:14:45', '2024-03-23 07:28:48', '2024-04-22 09:14:45'),
(2190, 'App\\Models\\User', 102, 'hydra-api-token', '194ede22ec3448e16721fddec602193ca7620d5e8ea6376c638e660f994a0d73', '[\"user\"]', '2024-04-06 08:28:40', '2024-04-01 03:45:53', '2024-04-06 08:28:40'),
(2191, 'App\\Models\\User', 102, 'hydra-api-token', 'a6c4d16329cf35fc07b3bcc23923ce2fe4ebbb68c71ffa8615fb33e29ae1636a', '[\"user\"]', NULL, '2024-04-16 07:33:03', '2024-04-16 07:33:03'),
(2192, 'App\\Models\\User', 102, 'hydra-api-token', 'c7f07bf1d14c4c5782ef316f9090c27e38b661e3411e28da25b85b4954d35eca', '[\"user\"]', NULL, '2024-04-16 07:33:13', '2024-04-16 07:33:13'),
(2193, 'App\\Models\\User', 102, 'hydra-api-token', '836f3b88fd079e71a6b9b3a8dc8d03d9136117512a7659c11a858d0b5b2973c3', '[\"user\"]', '2024-04-18 11:25:11', '2024-04-17 05:10:11', '2024-04-18 11:25:11'),
(2194, 'App\\Models\\User', 102, 'hydra-api-token', 'f82fd40351b7ecc2343ab78f231e135f55b0bbdb0b091b8f3a5e64264955968e', '[\"user\"]', NULL, '2024-04-17 11:44:07', '2024-04-17 11:44:07'),
(2195, 'App\\Models\\User', 102, 'hydra-api-token', 'c88c1d9893c1ae4f5cdb1990e9807c48bfbc67aec6cf4ced6de7eecec492a556', '[\"user\"]', NULL, '2024-04-17 11:44:20', '2024-04-17 11:44:20'),
(2196, 'App\\Models\\User', 141, 'hydra-api-token', '6950d36d3f72fbb28510e696feab33cf39b218ffc73663a51bf2d3545faf117a', '[]', NULL, '2024-04-17 11:46:55', '2024-04-17 11:46:55'),
(2197, 'App\\Models\\User', 102, 'hydra-api-token', '109af34370accf2fbf0ddadb9cf41b6f3b9cbfc166644edb7c7e41d3a5d09ac0', '[\"user\"]', '2024-04-17 12:24:59', '2024-04-17 11:47:38', '2024-04-17 12:24:59'),
(2198, 'App\\Models\\User', 141, 'hydra-api-token', 'c6c383dfed7de0c9be25fc1be82ae851ca3c51a64b51444c49cd206b09d13933', '[]', NULL, '2024-04-17 11:48:24', '2024-04-17 11:48:24'),
(2199, 'App\\Models\\User', 141, 'hydra-api-token', '6c5056b524eb7543193629429b6f0ec9402ec1a4f4883247d157c1178b0350b2', '[]', NULL, '2024-04-17 12:02:55', '2024-04-17 12:02:55'),
(2200, 'App\\Models\\User', 141, 'hydra-api-token', '15000c80b7096529704a0f26ea6f0ec75c60600361cdf17d0a1627c334212d22', '[]', NULL, '2024-04-17 12:02:56', '2024-04-17 12:02:56'),
(2201, 'App\\Models\\User', 141, 'hydra-api-token', '4a425bf968db6d15e2e8a0286fd9a0d5a82301395b6d0029b0ffbdd75e23546b', '[]', NULL, '2024-04-17 12:02:57', '2024-04-17 12:02:57'),
(2202, 'App\\Models\\User', 141, 'hydra-api-token', '104e25425d0b8a6fbd1ade202e8d3cd59c860cbe048da1a12e980f39e989eea6', '[]', NULL, '2024-04-17 12:03:15', '2024-04-17 12:03:15'),
(2203, 'App\\Models\\User', 141, 'hydra-api-token', '172f0b210e6dc0a6c247a80aa1f9dfd5cfabefdfcfff5d5e31076ff7cb9d16be', '[]', NULL, '2024-04-17 12:03:17', '2024-04-17 12:03:17'),
(2204, 'App\\Models\\User', 102, 'hydra-api-token', 'f54e0695aceee701a1d4ef3fc5b3a6b7a124bd4d9a71b7a17ba88035b3149f4f', '[\"user\"]', '2024-04-22 11:33:34', '2024-04-18 04:17:02', '2024-04-22 11:33:34'),
(2205, 'App\\Models\\User', 102, 'hydra-api-token', '2a349fa78a928b68b1d9822a409589e502b4c2656d070e79d6f013595d52fd9f', '[\"user\"]', '2024-04-23 05:27:32', '2024-04-22 06:42:20', '2024-04-23 05:27:32'),
(2209, 'App\\Models\\User', 1, 'hydra-api-token', '3be68fbffa1eb23618c47eedf1a66e245995690e81879689ed487cb54add44dc', '[\"admin\"]', '2024-04-22 10:58:52', '2024-04-22 10:08:37', '2024-04-22 10:58:52'),
(2210, 'App\\Models\\User', 102, 'hydra-api-token', 'e4110c2173682d794f0d3e1e1f0210d25afa992d2d9002b9ae5de8fc95d0a048', '[\"user\"]', '2024-04-23 09:38:23', '2024-04-23 09:38:11', '2024-04-23 09:38:23'),
(2211, 'App\\Models\\User', 102, 'hydra-api-token', 'c35806698e75bda4d812fa45975f8084383b5b8990810187facee5ca0ae3517a', '[\"user\"]', '2024-04-23 09:38:54', '2024-04-23 09:38:46', '2024-04-23 09:38:54'),
(2212, 'App\\Models\\User', 102, 'hydra-api-token', '1eef855052796613f8ec600846a83f76afe3b1b742cef3f6f87a5aba28b9a05b', '[\"user\"]', '2024-04-23 09:46:16', '2024-04-23 09:45:01', '2024-04-23 09:46:16'),
(2213, 'App\\Models\\User', 102, 'hydra-api-token', 'b4478a6549490f01d635a93217271edde460b655587f939f783d67bed075f458', '[\"user\"]', '2024-04-23 11:59:56', '2024-04-23 09:54:08', '2024-04-23 11:59:56'),
(2214, 'App\\Models\\User', 102, 'hydra-api-token', 'd019b0df11fcba56975e5173351c4dccd8f9b9d1ec5ef4267592534f8b53ec8f', '[\"user\"]', '2024-04-24 05:02:04', '2024-04-24 04:58:14', '2024-04-24 05:02:04'),
(2215, 'App\\Models\\User', 100, 'hydra-api-token', 'dc2546497a0c5de975f7cb8534e7cb6c6552a5ce6b7d414a856f857c62272568', '[\"admin\"]', '2024-04-24 05:30:14', '2024-04-24 05:03:04', '2024-04-24 05:30:14'),
(2216, 'App\\Models\\User', 100, 'hydra-api-token', '4cc7a8e17058a269f354516c694919afa69564a4595249f506ad138d09d17f90', '[\"admin\"]', '2024-04-24 05:30:56', '2024-04-24 05:30:48', '2024-04-24 05:30:56'),
(2218, 'App\\Models\\User', 149, 'hydra-api-token', '1341c238012dd061f868c5cc8ae79e99a32228630b84622d4aed12294426b126', '[\"admin\"]', '2024-04-27 10:15:51', '2024-04-27 07:16:06', '2024-04-27 10:15:51'),
(2219, 'App\\Models\\User', 149, 'hydra-api-token', '83ebc12fba325e9944a261bfce05b54d866a32ff834292591a808fdf638b81bf', '[\"admin\"]', '2024-04-27 08:24:27', '2024-04-27 07:16:23', '2024-04-27 08:24:27'),
(2220, 'App\\Models\\User', 150, 'hydra-api-token', '92c09f38abcc899c9a9a03e7600c22cb7a35db1c6246fb31a2bd160ec8d9fd8b', '[\"user\"]', '2024-04-28 04:07:07', '2024-04-27 08:24:00', '2024-04-28 04:07:07');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `actual_price` int NOT NULL,
  `sell_price` int NOT NULL,
  `coupon_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `subscription_details_id` bigint DEFAULT NULL,
  `payment_attempt_id` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `organization_id`, `user_id`, `subscription_plan_id`, `user_limit`, `actual_price`, `sell_price`, `coupon_id`, `payment_id`, `subscription_details_id`, `payment_attempt_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(2, 87, 133, 2, 5, 5000, 0, NULL, NULL, 37, NULL, NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(3, 88, 134, 4, 9, 1000, 0, NULL, NULL, 38, NULL, NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(4, 90, 135, 7, 3, 10000, 0, NULL, NULL, 39, NULL, NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(5, 91, 136, 7, 3, 10000, 0, NULL, NULL, 40, NULL, NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(6, 92, 137, 7, 3, 10000, 0, NULL, NULL, 41, NULL, NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(7, 93, 138, 6, 10, 20000, 0, NULL, NULL, 42, NULL, NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(8, 94, 139, 3, 10, 0, 0, NULL, NULL, 43, NULL, NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(9, 95, 148, 4, 9, 1000, 0, NULL, NULL, 44, NULL, NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(10, 96, 149, 2, 5, 5000, 0, NULL, NULL, 45, NULL, NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_attempts`
--

CREATE TABLE `purchase_attempts` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `actual_price` int NOT NULL,
  `sell_price` int NOT NULL,
  `coupon_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '2' COMMENT '0:failed, 1:success, 2: pending',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_sms`
--

CREATE TABLE `purchase_sms` (
  `id` bigint UNSIGNED NOT NULL,
  `package_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `organization_id` int DEFAULT NULL,
  `package_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_sms_count` int DEFAULT NULL,
  `available_sms_count` int DEFAULT NULL,
  `used_sms_count` int DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `transaction_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refunds`
--

CREATE TABLE `refunds` (
  `id` bigint UNSIGNED NOT NULL,
  `cancel_request_id` bigint NOT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double(8,2) NOT NULL,
  `account_details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_reference` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL COMMENT '0:rejected, 1:initiate, 2:in progress, 3:done',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refund_references`
--

CREATE TABLE `refund_references` (
  `id` bigint UNSIGNED NOT NULL,
  `APIConnect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'INVALID_REQUEST / FAILED / INVALID_REQUEST/DONE',
  `bank_tran_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tran_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refund_ref_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'success, failed, processing',
  `errorReason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancel_request_id` bigint NOT NULL,
  `created_by` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(2, 'User', 'user', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(3, 'Customer', 'customer', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(4, 'Editor', 'editor', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(5, 'All', '*', '2023-06-22 11:34:59', '2023-06-22 11:34:59'),
(6, 'Super Admin', 'super-admin', '2023-06-22 11:34:59', '2023-06-22 11:34:59');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int DEFAULT NULL,
  `is_2fa` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_api_key` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_push_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_sms_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_email_notification` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_sso` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `is_social_login` tinyint NOT NULL DEFAULT '0',
  `is_direct_purchase` tinyint NOT NULL DEFAULT '0' COMMENT '0: disable 1:enable',
  `contact_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75',
  `contact_mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'BDT',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `organization_id`, `is_2fa`, `is_api_key`, `is_notification`, `is_push_notification`, `is_sms_notification`, `is_email_notification`, `is_sso`, `is_social_login`, `is_direct_purchase`, `contact_number`, `logo`, `contact_mail`, `currency`, `created_at`, `updated_at`) VALUES
(1, NULL, 0, 0, 0, 0, 0, 0, 0, 1, 0, '01705547563', 'http://localhost:8000/images/59cfbca6-846c-471d-9723-5a6f0e6a330f.png', 'example1@example.com', 'BDT', '2023-06-27 09:06:38', '2024-02-12 03:20:38'),
(2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, '9876543210', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'example2@example.com', 'USD', '2023-06-27 09:06:38', '2023-06-27 09:06:38'),
(3, 3, 1, 0, 1, 1, 0, 1, 0, 0, 1, '9876543210', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'example3@example.com', 'EUR', '2023-06-27 09:06:38', '2023-06-27 09:06:38'),
(4, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, '1234567890', 'http://saas-backend.test/images/1c14a2ab-21a3-40c4-854f-f338c2b5325b.webp', 'example1@example.com', 'BDT', '2023-06-27 09:06:38', '2023-07-06 12:07:32'),
(7, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaa@gmail.com', 'BDT', '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'cccc@gmail.com', 'BDT', '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(9, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaaadadacsc@gmail.com', 'BDT', '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(10, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, '017328439243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaaacsc@gmail.com', 'BDT', '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(11, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaaacc@gmail.com', 'BDT', '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(12, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaacc@gmail.com', 'BDT', '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'xxx@gmail.com', 'BDT', '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zzz@gmail.com', 'BDT', '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zxc@gmail.com', 'BDT', '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'ccc@gmail.com', 'BDT', '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'vvssv@gmail.com', 'BDT', '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(18, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'mm@gmail.com', 'BDT', '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(19, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(20, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(21, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(22, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajolchaki@gmail.com', 'BDT', '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(23, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01111111199', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'sandy@gmail.com', 'BDT', '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(24, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'prosanta.k.c@gmail.com', 'BDT', '2023-07-22 12:14:06', '2023-07-22 12:14:06'),
(25, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-05 03:02:15', '2023-08-05 03:02:15'),
(26, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-05 09:41:28', '2023-08-05 09:41:28'),
(27, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-05 03:44:11', '2023-08-05 03:44:11'),
(28, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2023-08-14 09:20:03', '2023-08-14 09:20:03'),
(29, 74, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885166', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'mhp@gmail.com', 'BDT', '2023-10-19 11:14:31', '2023-10-19 11:14:31'),
(30, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885100', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'doctor@gmail.com', 'BDT', '2023-11-02 09:13:35', '2023-11-02 09:13:35'),
(31, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01792796661', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'ztlabcd@gmail.com', 'BDT', '2023-11-05 06:42:22', '2023-11-05 06:42:22'),
(32, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885166', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'ztltest@gmail.com', 'BDT', '2023-11-11 03:38:00', '2023-11-11 03:38:00'),
(33, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885112', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'adminztl123@gmail.com', 'BDT', '2023-11-11 06:43:44', '2023-11-11 06:43:44'),
(34, 79, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885166', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'mhp@demo.com', 'BDT', '2023-11-11 10:08:15', '2023-11-11 10:08:15'),
(35, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01533533198', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'ztl_demo@gmail.com', 'BDT', '2023-12-20 10:26:08', '2023-12-20 10:26:08'),
(36, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01833086035', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zabir@gmail.com', 'BDT', '2023-12-23 04:21:50', '2023-12-23 04:21:50'),
(37, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01856519555', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dr.kamal.uddin.ahmed007@gmail.com', 'BDT', '2024-01-04 11:31:11', '2024-01-04 11:31:11'),
(38, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01786378313', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'husnae.ahmed007@gmail.com', 'BDT', '2024-01-04 12:04:05', '2024-01-04 12:04:05'),
(39, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, '+8801714131050', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'jabed@macrohealthplus.org', 'BDT', '2024-01-25 09:46:45', '2024-01-25 09:46:45'),
(40, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01711139201', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'drakik49mbbsrmc@gmail.com', 'BDT', '2024-01-29 06:29:41', '2024-01-29 06:29:41'),
(41, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01711139201', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'mdakikhossain74@gmail.com', 'BDT', '2024-01-29 07:41:36', '2024-01-29 07:41:36'),
(42, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541560', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'admin@demo.com', 'BDT', '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(43, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541569', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'artest@gmail.com', 'BDT', '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(44, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705541561', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'dev.arafat.zaimahtech@gmail.com', 'BDT', '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(45, 91, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705139111', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'admintyht@gmail.com', 'BDT', '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(46, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01714131050', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'zaimahtech@gmail.com', 'BDT', '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(47, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705139111', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'rakibul.zaimahtech@gmail.com', 'BDT', '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(48, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01554885177', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'ztl@gmail.com', 'BDT', '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(49, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01705500003', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'arafat99@gmail.com', 'BDT', '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(50, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01745454511', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'abc@gmail.com', 'BDT', '2024-04-27 13:15:21', '2024-04-27 13:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `sms_allowed_countries`
--

CREATE TABLE `sms_allowed_countries` (
  `id` bigint UNSIGNED NOT NULL,
  `gateway_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dial_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sms_credentials`
--

CREATE TABLE `sms_credentials` (
  `id` bigint UNSIGNED NOT NULL,
  `gateway_id` int DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sms_gateway_details`
--

CREATE TABLE `sms_gateway_details` (
  `id` bigint UNSIGNED NOT NULL,
  `sms_gateway_id` bigint UNSIGNED NOT NULL,
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sms_logs`
--

CREATE TABLE `sms_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_body` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','processing','done','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `storage_sizes`
--

CREATE TABLE `storage_sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL COMMENT 'size in mb',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `storage_sizes`
--

INSERT INTO `storage_sizes` (`id`, `name`, `size`, `created_at`, `updated_at`) VALUES
(1, '1 GB', 1028, '2023-06-22 11:40:52', '2023-06-22 11:40:52'),
(2, '5 GB', 5140, '2023-06-22 11:41:12', '2023-06-22 11:43:17'),
(3, '5 GB', 5156, '2023-06-22 11:41:31', '2023-06-22 11:41:31'),
(4, '5 GB', 5140, '2023-06-22 13:49:02', '2023-06-22 13:49:02');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_cancel_requests`
--

CREATE TABLE `subscription_cancel_requests` (
  `id` bigint UNSIGNED NOT NULL,
  `purchase_id` int NOT NULL,
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_amount` int NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '2' COMMENT '0:reject, 1:success, 2: pending',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_details`
--

CREATE TABLE `subscription_details` (
  `id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive 1:active',
  `start_date` date DEFAULT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `end_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_details`
--

INSERT INTO `subscription_details` (`id`, `organization_id`, `user_id`, `subscription_plan_id`, `status`, `start_date`, `user_limit`, `end_date`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 1, 1, '2023-06-22', 10, '2023-08-19', NULL, '2023-06-22 12:11:43', '2023-06-22 12:11:43'),
(2, 3, 7, 1, 1, '2023-07-07', 10, '2023-08-07', NULL, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(3, 4, 8, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(4, 6, 9, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(5, 7, 10, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(6, 8, 11, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(7, 11, 12, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(8, 13, 13, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(9, 14, 14, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(10, 15, 15, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(11, 16, 16, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(12, 17, 17, 1, 1, '2023-07-08', 10, '2023-08-07', NULL, '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(13, 20, 18, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(14, 21, 19, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(15, 22, 20, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(16, 23, 21, 1, 1, '2023-07-11', 10, '2023-08-10', NULL, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(17, 25, 22, 1, 1, '2023-07-11', 10, '2023-08-02', NULL, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(18, 26, 23, 1, 1, '2023-07-13', 10, '2023-08-12', NULL, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(19, 30, 38, 1, 1, '2023-07-22', 10, '2023-08-21', NULL, '2023-07-22 12:14:06', '2023-07-22 12:14:06'),
(20, 44, 52, 1, 1, '2023-08-05', 10, '2023-09-04', NULL, '2023-08-05 03:02:15', '2023-08-05 03:02:15'),
(21, 66, 73, 1, 1, '2023-08-05', 10, '2023-09-04', NULL, '2023-08-05 09:41:28', '2023-08-05 09:41:28'),
(22, 68, 74, 1, 1, '2023-08-05', 10, '2023-09-04', NULL, '2023-08-05 03:44:11', '2023-08-05 03:44:11'),
(23, 73, 79, 1, 1, '2023-08-14', 10, '2023-09-13', NULL, '2023-08-14 09:20:03', '2023-08-14 09:20:03'),
(24, 74, 80, 1, 1, '2023-10-19', 10, '2023-11-18', NULL, '2023-10-19 11:14:31', '2023-10-19 11:14:31'),
(25, 75, 84, 1, 1, '2023-11-02', 100, '2023-12-02', NULL, '2023-11-02 09:13:35', '2023-11-02 09:13:35'),
(26, 76, 92, 1, 1, '2023-11-05', 10, '2023-12-05', NULL, '2023-11-05 06:42:22', '2023-11-05 06:42:22'),
(27, 77, 96, 1, 1, '2023-11-11', 10, '2023-12-11', NULL, '2023-11-11 03:38:00', '2023-11-11 03:38:00'),
(28, 78, 98, 1, 1, '2023-11-11', 10, '2023-12-11', NULL, '2023-11-11 06:43:44', '2023-11-11 06:43:44'),
(29, 79, 100, 1, 1, '2023-11-11', 1000, '2025-12-11', NULL, '2023-11-11 10:08:15', '2023-11-11 10:08:15'),
(30, 80, 111, 1, 1, '2023-12-20', 10, '2024-01-19', NULL, '2023-12-20 10:26:08', '2023-12-20 10:26:08'),
(31, 81, 113, 1, 1, '2023-12-23', 10, '2024-01-22', NULL, '2023-12-23 04:21:50', '2023-12-23 04:21:50'),
(32, 82, 114, 1, 1, '2024-01-04', 10, '2024-02-03', NULL, '2024-01-04 11:31:11', '2024-01-04 11:31:11'),
(33, 83, 115, 1, 1, '2024-01-04', 10, '2024-02-03', NULL, '2024-01-04 12:04:05', '2024-01-04 12:04:05'),
(34, 84, 124, 1, 1, '2024-01-25', 10, '2024-02-24', NULL, '2024-01-25 09:46:45', '2024-01-25 09:46:45'),
(35, 85, 126, 1, 1, '2024-01-29', 10, '2024-02-28', NULL, '2024-01-29 06:29:41', '2024-01-29 06:29:41'),
(36, 86, 127, 1, 1, '2024-01-29', 10, '2024-02-28', NULL, '2024-01-29 07:41:36', '2024-01-29 07:41:36'),
(37, 87, 133, 2, 1, '2024-02-05', 5, '2024-03-06', NULL, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(38, 88, 134, 4, 1, '2024-02-12', 9, '2024-03-13', NULL, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(39, 90, 135, 7, 1, '2024-02-12', 3, '2024-03-13', NULL, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(40, 91, 136, 7, 1, '2024-02-13', 3, '2024-03-14', NULL, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(41, 92, 137, 7, 1, '2024-02-13', 3, '2024-03-14', NULL, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(42, 93, 138, 6, 1, '2024-02-13', 10, '2024-03-14', NULL, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(43, 94, 139, 3, 1, '2024-02-13', 10, '2024-03-14', NULL, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(44, 95, 148, 4, 1, '2024-04-22', 9, '2024-05-22', NULL, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(45, 96, 149, 2, 1, '2024-04-27', 5, '2024-05-27', NULL, '2024-04-27 13:15:21', '2024-04-27 13:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_detail_records`
--

CREATE TABLE `subscription_detail_records` (
  `id` bigint UNSIGNED NOT NULL,
  `subscription_details_id` bigint UNSIGNED NOT NULL,
  `organization_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0:inactive 1:active',
  `start_date` date DEFAULT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `end_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `validity_id` int NOT NULL,
  `user_limit` int NOT NULL DEFAULT '1',
  `storage_limit_id` int NOT NULL,
  `price` int NOT NULL,
  `details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive 1:active 2:deleted',
  `type` tinyint NOT NULL DEFAULT '1' COMMENT ' 1:regular 2:special',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `validity_id`, `user_limit`, `storage_limit_id`, `price`, `details`, `status`, `type`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'GreatClinic-Premium', 2, 100, 4, 0, 'Patient Registration\nBilling Management\nUnlimited Users\nUnlimited Invoice\nQR Code System\nUnlimited User/Collectors\nUnlimited Franchise\nQR Coded Lab Report\nAdvanced Integrated Report- MIS\nWeb and Mobile App Access\n4 Ways Real-time Communication (SMS, Email, WhatsApp & Notification)\nSMS Notification *\nMachine Integrations\nData Exports', 1, 2, NULL, '2023-06-22 13:51:25', '2024-01-25 11:30:06'),
(2, 'GreatClinic-Standard', 1, 5, 3, 5000, 'Patient Registration\nBilling Management\nUnlimited Users\nLimited Invoice\nQR Code System\n5 User/Collectors\n5 Franchise\nAdvanced Integrated Report- MIS\nWeb and Mobile App Access\n4 Ways Real-time Communication (SMS, Email, WhatsApp & Notification)', 1, 1, NULL, '2023-07-03 10:32:41', '2024-01-25 11:29:31'),
(3, 'GreatDoc-Premium', 2, 10, 2, 0, 'Everything in Specialist, please contact us.', 1, 2, NULL, '2023-07-03 10:32:55', '2024-01-27 04:57:05'),
(4, 'GreatDoc-Standard', 2, 9, 1, 1000, 'Online Booking\nPatient Records\nConsultation from templates\nReferral letters & Prescriptions\n4 Ways Real-time Communication (SMS, Email, WhatsApp & Notification)\nReminders, Greetings, Offers\nWeb and Mobile App Access\nTele-consulting\nCriteria-based Bulk SMS sending*\nAppointment notification by SMS*', 1, 1, NULL, '2023-07-03 10:33:00', '2024-01-27 04:56:20'),
(5, 'GreatPharma-Premium', 1, 100, 2, 0, 'Everything in Specialist, please contact us.', 0, 2, NULL, '2023-07-03 10:33:09', '2024-01-25 11:06:45'),
(6, 'GreatPharma-Standard', 1, 10, 3, 20000, 'AA', 0, 1, NULL, '2023-07-03 10:33:20', '2024-01-25 11:05:44'),
(7, 'GreatPharma-General', 1, 3, 3, 10000, 'AA', 0, 1, NULL, '2023-07-04 08:45:51', '2024-01-25 11:04:57');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plan_features`
--

CREATE TABLE `subscription_plan_features` (
  `id` bigint UNSIGNED NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `feature_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_plan_features`
--

INSERT INTO `subscription_plan_features` (`id`, `subscription_plan_id`, `feature_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(5, 5, 1, NULL, NULL, NULL),
(8, 7, 1, NULL, NULL, NULL),
(9, 6, 5, NULL, NULL, NULL),
(10, 4, 5, NULL, NULL, NULL),
(12, 1, 5, NULL, NULL, NULL),
(13, 4, 2, NULL, NULL, NULL),
(14, 4, 1, NULL, NULL, NULL),
(15, 4, 4, NULL, NULL, NULL),
(16, 4, 3, NULL, NULL, NULL),
(17, 4, 6, NULL, NULL, NULL),
(18, 4, 7, NULL, NULL, NULL),
(19, 4, 9, NULL, NULL, NULL),
(20, 4, 10, NULL, NULL, NULL),
(21, 4, 11, NULL, NULL, NULL),
(22, 3, 12, NULL, NULL, NULL),
(23, 2, 13, NULL, NULL, NULL),
(24, 2, 14, NULL, NULL, NULL),
(25, 2, 15, NULL, NULL, NULL),
(26, 2, 16, NULL, NULL, NULL),
(27, 2, 17, NULL, NULL, NULL),
(28, 2, 18, NULL, NULL, NULL),
(29, 2, 19, NULL, NULL, NULL),
(30, 2, 25, NULL, NULL, NULL),
(31, 2, 6, NULL, NULL, NULL),
(32, 1, 13, NULL, NULL, NULL),
(33, 1, 14, NULL, NULL, NULL),
(34, 1, 15, NULL, NULL, NULL),
(35, 1, 21, NULL, NULL, NULL),
(36, 1, 17, NULL, NULL, NULL),
(37, 1, 22, NULL, NULL, NULL),
(38, 1, 23, NULL, NULL, NULL),
(39, 1, 24, NULL, NULL, NULL),
(40, 1, 25, NULL, NULL, NULL),
(41, 1, 6, NULL, NULL, NULL),
(42, 1, 26, NULL, NULL, NULL),
(43, 1, 27, NULL, NULL, NULL),
(44, 1, 28, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_requests`
--

CREATE TABLE `subscription_requests` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_plan_id` int NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0:not seen, 1:seen 2:accept 3:rejected ',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_requests`
--

INSERT INTO `subscription_requests` (`id`, `name`, `email`, `subscription_plan_id`, `mobile`, `country`, `message`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'sdfsdfdsf', 'chaki@gmail.com', 1, '123456', 'string', 'required|string', 2, NULL, '2023-06-22 12:11:23', '2023-06-22 12:11:43'),
(2, 'aaacc', 'aaacc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-06 13:48:59', '2023-07-08 09:38:25'),
(3, 'aaacaasasadadc', 'aaaacc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:09', '2023-07-08 09:27:16'),
(4, 'aaacaasasadadc', 'aaaacsc@gmail.com', 1, '017328439243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:19', '2023-07-08 09:22:59'),
(5, 'aaacaasasadadc', 'aaaadadacsc@gmail.com', 1, '017328439243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:27', '2023-07-08 09:20:49'),
(6, 'aaacaasasadadc', 'cccc@gmail.com', 1, '017328439243', 'string', 'required|string', 3, NULL, '2023-07-06 13:49:33', '2023-07-08 09:20:04'),
(7, 'aaacaasasadadc', 'aaa@gmail.com', 1, '017328439243', 'string', 'required|string', 2, NULL, '2023-07-06 13:49:47', '2023-07-07 03:07:09'),
(8, 'xxx', 'xxx@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:39:54', '2023-07-08 09:40:15'),
(9, 'xxx', 'zzz@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:39:58', '2023-07-08 03:41:12'),
(10, 'xxx', 'zxc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:40:04', '2023-07-08 03:42:01'),
(11, 'xxx', 'ccc@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 03:45:42', '2023-07-08 09:45:51'),
(12, 'xxx', 'vvssv@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-08 04:31:17', '2023-07-08 04:31:53'),
(13, 'sdfsdfdsf', 'mm@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-11 12:09:55', '2023-07-11 18:10:24'),
(14, 'kajol', 'sdf@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-11 13:13:36', '2023-07-11 19:15:09'),
(15, 'kajol', 'kajolchaki@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-11 13:16:34', '2023-07-11 13:16:42'),
(16, 'zzz', 'sandy@gmail.com', 6, '01111111199', 'Bangladesh', 'asdfsdaf', 2, NULL, '2023-07-13 09:43:55', '2023-07-13 15:45:43'),
(17, 'sdfsdfdsf', 'prosanta.k.c@gmail.com', 1, '01732849243', 'string', 'required|string', 2, NULL, '2023-07-22 12:12:37', '2023-07-22 12:14:06'),
(18, 'Arafat', 'dev.arafat.zaimahtech@gmail.com', 7, '01705541561', 'Bangladesh', 'sdgf', 2, NULL, '2023-08-05 02:21:52', '2024-02-12 01:32:56'),
(19, 'Mhp', 'mhp@gmail.com', 4, '01554885166', 'Bangladesh', 'test', 2, NULL, '2023-10-19 05:12:29', '2023-10-19 11:14:31'),
(20, 'Doctor', 'doctor@gmail.com', 3, '01554885100', 'Bangladesh', 'test', 2, NULL, '2023-11-02 03:11:58', '2023-11-02 09:13:35'),
(21, 'Ztl', 'ztl@gmail.com', 3, '01554885177', 'Bangladesh', 'test', 2, NULL, '2023-11-05 06:19:17', '2024-02-12 23:16:56'),
(22, 'Zaimahtech', 'ztlabcd@gmail.com', 4, '01792796661', 'Bangladesh', 'test', 2, NULL, '2023-11-05 06:41:28', '2023-11-05 06:42:22'),
(23, 'Ztl', 'ztltest@gmail.com', 4, '01554885166', 'Bangladesh', 'test', 2, NULL, '2023-11-11 03:27:55', '2023-11-11 03:38:00'),
(24, 'Sandy', 'adminztl123@gmail.com', 5, '01554885112', 'Bangladesh', 'test', 2, NULL, '2023-11-11 06:42:17', '2023-11-11 06:43:44'),
(25, 'MHP', 'mhp@demo.com', 4, '01554885166', 'Bangladesh', 'test', 2, NULL, '2023-11-11 10:05:58', '2023-11-11 10:08:15'),
(26, 'zabir raihan', 'zabir@gmail.com', 3, '01833086035', 'Bangladesh', 'hello', 2, NULL, '2023-12-20 05:41:25', '2023-12-23 04:21:50'),
(27, 'ztl_demo', 'ztl_demo@gmail.com', 3, '01533533198', 'Bangladesh', 'test', 2, NULL, '2023-12-20 10:24:25', '2023-12-20 10:26:08'),
(28, 'Dr. Kamal Uddin Ahmed', 'dr.kamal.uddin.ahmed007@gmail.com', 7, '01856519555', 'Bangladesh', 'need a Free Trail', 2, NULL, '2024-01-04 11:29:31', '2024-01-04 11:31:11'),
(29, 'Husnae Ahmed', 'husnae.ahmed007@gmail.com', 1, '01786378313', 'Bangladesh', 'test', 2, NULL, '2024-01-04 12:02:43', '2024-01-04 12:04:05'),
(30, 'Rakibul Islam', 'rakibul.zaimahtech@gmail.com', 6, '01705139111', 'Bangladesh', 'AAA', 2, NULL, '2024-01-17 11:13:02', '2024-02-12 23:12:42'),
(31, 'Jabed Akhter', 'zaimahtech@gmail.com', 7, '01714131050', 'Bangladesh', 'test', 2, NULL, '2024-01-25 08:42:35', '2024-02-12 23:04:29'),
(32, 'macrohealthplus', 'jabed@macrohealthplus.org', 7, '+8801714131050', 'Bangladesh', 'test', 2, NULL, '2024-01-25 09:29:25', '2024-01-25 09:46:45'),
(33, 'Rakibul Islam', 'admintyht@gmail.com', 7, '01705139111', 'Bangladesh', 'SS', 2, NULL, '2024-01-25 10:23:50', '2024-02-12 22:58:37'),
(34, 'Dr. Md.Akik Hossain', 'drakik49mbbsrmc@gmail.com', 4, '01711139201', 'Bangladesh', 'I need this plan.', 2, NULL, '2024-01-29 06:29:08', '2024-01-29 06:29:41'),
(35, 'Md. Akik Hossain', 'mdakikhossain74@gmail.com', 4, '01711139201', 'Bangladesh', 'Good Luck', 2, NULL, '2024-01-29 07:40:52', '2024-01-29 07:41:36'),
(36, 'Napadol', 'admin@demo.com', 2, '01705541560', 'Bangladesh', 'I need this system to test', 2, NULL, '2024-02-04 23:20:49', '2024-02-04 23:23:07'),
(37, 'Napadol', 'artest@gmail.com', 4, '01705541569', 'Bangladesh', 'rgtdf', 2, NULL, '2024-02-12 00:55:40', '2024-02-12 00:56:38'),
(38, 'Arafat Hossain', 'arafat99@gmail.com', 4, '01705500003', 'Bangladesh', 'Hi dear neve fear , I am here', 2, NULL, '2024-04-22 10:08:14', '2024-04-22 10:10:20'),
(39, 'Abc Company', 'abc@gmail.com', 2, '01745454511', 'Bangladesh', 'test', 2, NULL, '2024-04-27 07:13:35', '2024-04-27 13:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `s_m_s_gateways`
--

CREATE TABLE `s_m_s_gateways` (
  `id` bigint UNSIGNED NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expire_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `buy_sms_count` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `s_m_s_histories`
--

CREATE TABLE `s_m_s_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Two_factor_secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organization_id` int DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  `branch_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` tinyint NOT NULL COMMENT '0:super admin, 2: super user, 3: local admin, 4: local user, 5:others',
  `is_tem_password` tinyint NOT NULL DEFAULT '0' COMMENT '0:no, 2: yes',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0:inactive, 1 active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `email_verified_at`, `password`, `Two_factor_secret`, `two_factor_recovery_codes`, `photo`, `organization_id`, `branch_id`, `branch_name`, `user_type`, `is_tem_password`, `deleted_at`, `remember_token`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '017111111doo1', NULL, '$2y$10$LqAynshzZTEqpbJQ4jMKduWHtvOwAYvjPZHV7qEj3YDslmVWhqby.', NULL, NULL, '', NULL, NULL, NULL, 0, 0, NULL, NULL, 1, '2023-06-22 11:34:59', '2024-01-23 04:27:01'),
(2, 'user2', 'user32@email.com', '01733243244', NULL, '$2y$10$xjp4k2ojMHdFwMqnysU7beFgGBMOpA3ReOt1a7Sz3980Tql6v1Csm', NULL, NULL, 'http://saas-backend.test/images/0bd5198f-3fd1-47a9-9c58-da3385030b85.jpeg', 0, NULL, NULL, 3, 0, NULL, NULL, 0, '2023-06-22 12:01:03', '2023-07-06 12:22:08'),
(3, 'user2', 'user@email.com', '0173243243', NULL, '$2y$10$La3ckURfST0LaI.Yc5RvJ.nTWeqJ1KI/Wd3GHaFTxxU96OqSee4Ue', NULL, NULL, '1f8affce-2e7b-49cc-99ae-b1a1f8d16757.png', 1, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-06-22 12:06:24', '2023-06-22 12:06:24'),
(4, 'prosanta chaki', 'chaki@gmail.com', '0171111111', NULL, '$2y$10$MXdAHQwGr.lBEuPNGdAqdesta.VrWQiwyEXurmsZ39un3aBlhrn2G', NULL, NULL, '8e3817f7-53ce-4ef5-b2f8-a29431598250.png', 1, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-06-22 12:11:43', '2023-06-22 13:26:36'),
(5, 'user2', 'user2@gmail.com', '0173243244', NULL, '$2y$10$0oyQ3nFfih8wnmvxRM./P.eaxQ9w0.FuG2H84G69OjoZfxuEsmTpS', NULL, NULL, '16af9284-3d93-47d9-a955-6111ad4b11db.png', 1, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-06-22 12:20:36', '2023-07-05 12:49:30'),
(6, 'name', 'contact@gmail.com', NULL, NULL, '$2y$10$A3L9TUoxEXkqLVfTaFGGi./Y42/0ZKfjBK09iIPGKSCiu7tOx8Yl2', NULL, NULL, NULL, NULL, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-06-22 12:36:33', '2023-07-05 12:49:30'),
(7, 'aaacaasasadadc', 'aaa@gmail.com', '017328439243', NULL, '$2y$10$.FpIu/u6fk2D4MLwh1ekseELo0mEgs0IK.Zx7xsXGxDhEt5rLQFkm', NULL, NULL, NULL, 3, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(8, 'aaacaasasadadc', 'cccc@gmail.com', '017328439243', NULL, '$2y$10$Kg6o2XQUdysg65bQAjXckOtHG6/7dixHBCBjRomXaOiZFkOfYM.r6', NULL, NULL, NULL, 4, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(9, 'aaacaasasadadc', 'aaaadadacsc@gmail.com', '017328439243', NULL, '$2y$10$.byA5CCzHdutXM1IJloQJ.2pb9pkW/Z6wwaId0z0lVN5HvZ4ChSwK', NULL, NULL, NULL, 6, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(10, 'aaacaasasadadc', 'aaaacsc@gmail.com', '017328439243', NULL, '$2y$10$6X/XMOgE4qhQxQdbPxtzW.S.BcSynpYvVeX7uA9ERhwnqnye2dode', NULL, NULL, NULL, 7, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(11, 'aaacaasasadadc', 'aaaacc@gmail.com', '01732849243', NULL, '$2y$10$gbn31.TtCqeSZdbnTaBwzOWujRcIs.MRD0kX5G5//GQvyTS.q22ke', NULL, NULL, NULL, 8, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(12, 'aaacc', 'aaacc@gmail.com', '01732849243', NULL, '$2y$10$atrrJyPZQviJXCI/cx5yBul6.0O7zzMzwigJUdWfXxB3rnNW9e.sy', NULL, NULL, NULL, 11, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 'xxx', 'xxx@gmail.com', '01732849243', NULL, '$2y$10$L0NMKwRndJ5OlUwQ7RrJ4.aqTPvUgUlXxYOIUdT3dNaeWTaido2Fy', NULL, NULL, NULL, 13, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 'xxx', 'zzz@gmail.com', '01732849243', NULL, '$2y$10$emayIntlCuNaDbz4WbeIq.Y.6x.XdGjKbts7u3c04QcIkUE8pHSJi', NULL, NULL, NULL, 14, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 'xxx', 'zxc@gmail.com', '01732849243', NULL, '$2y$10$8DJ8lAxNC1HKTyN.dHk8w..LRtd20scFam0.LF4uvfd1LoJJL7fQG', NULL, NULL, NULL, 15, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 'xxx', 'ccc@gmail.com', '01732849243', NULL, '$2y$10$gR7sJGBqtM.8XDhyF9rNAesXG.P3hb12vdrnATtx7/4V9FiPukiM.', NULL, NULL, NULL, 16, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 'xxx', 'vvssv@gmail.com', '01732849243', NULL, '$2y$10$p/Mc3YTXLahGlp2M28IIjeM4PWwLmTYmSlDoJqEB/NgvpRa6UzcAO', NULL, NULL, NULL, 17, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(18, 'sdfsdfdsf', 'mm@gmail.com', '01732849243', NULL, '$2y$10$Wqx99vbSrH4eBGnusGzCvekXAlPzyTfK8r4i5Otw9X6ufIiHPsfFm', NULL, NULL, NULL, 20, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(19, 'kajol', 'kajsadfolchaki@gmail.com', '01732849243', NULL, '$2y$10$k0UTxmjkuWwG9gsUxgo5k.FA1s.Rs.hrAClAd8aeLHLrHuZqKY/Qa', NULL, NULL, NULL, 21, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(20, 'kajol', 'kajosdflchaki@gmail.com', '01732849243', NULL, '$2y$10$oryOb1Kc2TUS6TlZrPN1G.lNpCU31pKXmi/3KELPwS8UG1DKMOTvW', NULL, NULL, NULL, 22, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(21, 'kajol', 'kajodddlchaki@gmail.com', '01732849243', NULL, '$2y$10$J.PlYQ0QDez6o5M4GZXvW.Voexy1A5zgqen4NYpMqYfStIXZv07t2', NULL, NULL, NULL, 23, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(22, 'kajol', 'kajolchaki@gmail.com', '01732849243', NULL, '$2y$10$SXGCFSw3dVqIOebXUTN/KuBCiVb8pkbcxjDzpEQALZV7h6Y4aLbku', NULL, NULL, NULL, 25, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(23, 'zzz', 'sandy@gmail.com', '01111111199', NULL, '$2y$10$O96bBoxi9q7ESmaeVXzTwOshMrliM8Ef94oDCsyd4BA3m3a2X9GWq', NULL, NULL, NULL, 26, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(35, 'user2', 'asdwas@email.com', '0173243224', NULL, '$2y$10$HYpdxeVGavlqu2kBSwy//uhsSRJpq8YclmyfDJXYRoXQYJ.jOx7Bi', NULL, NULL, 'http://saas-backend.test/public/images/72887441-c7a7-4b78-bd17-1e890b2f0aaa.jpeg', 1, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-07-21 10:14:14', '2023-07-21 10:14:14'),
(38, 'sdfsdfdsf', 'prosanta.k.c@gmail.com', '01732849243', NULL, '$2y$10$u37QeE3.n3pwrNyGvpRqL.LqBs.mCUM.N66mTpV8eQRO2LRaak1JK', NULL, NULL, NULL, 30, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-07-22 12:14:05', '2023-07-22 12:14:05'),
(80, 'Mhp', 'mhp@gmail.com', '01554885166', NULL, '$2y$10$vYbRAWmBT6Yq3RLOy3rEXOTKOIk/w/XRj.Q4O2cb7o1uccxyNqvGa', NULL, NULL, NULL, 74, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-10-19 11:14:23', '2023-10-19 05:15:42'),
(81, 'Mhp Doctor', 'doctor1@gmail.com', '01554885133', NULL, '$2y$10$j2/oPFgb6v4a/0eG8ZNK4OTLYIAkORZZbCvY9WBnNY/dzo1W8P1A2', NULL, NULL, NULL, 74, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-10-19 05:17:11', '2023-10-19 05:17:11'),
(82, 'Doctor 2', 'doctor2@gmail.com', '01554885188', NULL, '$2y$10$M1n3ikkm79RswmUTIa8QrOEFraz06yiPK8Ww98MPE1zRxfFs2apOO', NULL, NULL, NULL, 74, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-10-21 05:55:24', '2023-10-21 05:55:24'),
(83, 'Effie A.B Stover', 'patient@gmail.com', '01712345335', NULL, '$2y$10$wWW96CxGtnXseOxMWjjKmuUWgXZtfK9C3nmTqGRcYlNKKIeAVTlxe', NULL, NULL, NULL, 74, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-10-25 09:56:45', '2023-10-25 09:56:45'),
(84, 'Doctor', 'doctor@gmail.com', '01554885100', NULL, '$2y$10$vkklq5W20QM2OB7Lc.sjuObhovkhCKiVo8rYe/VsgNo6b4JiKXVC6', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-02 09:13:35', '2023-11-02 03:14:53'),
(85, 'Aminur Rahman', 'aminur.rahman@macrohealthplus.org', '01554885101', NULL, '$2y$10$ZMcNw..452ztmx.g/AJxpuek3AROzAAGDrFSG5rCB8.MQtNSMMZTS', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-02 09:28:27', '2023-11-02 09:28:27'),
(86, 'Dr. KI Shikder', 'doctorkishikder@gmail.com', '01554885102', NULL, '$2y$10$9tfBEHv7OwSh1FPJ18zt3eBqc6JHBlSBn/Pua651EqFiTWVUkRnJe', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-02 09:54:16', '2023-11-02 09:54:16'),
(87, 'Dr. Shahriar Hasan', 'dr.shahriairhasan@gmail.com', '01554885103', NULL, '$2y$10$7044vUURMvthfC2l7ENMju9dTIAkJzimJ8PI4s1eXpVrk8THlfS92', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-02 09:55:42', '2023-11-02 09:55:42'),
(88, 'Dr. Mofazzal', 'tafsirh88@gmail.com', '01554885104', NULL, '$2y$10$LglPDzCujiUiz1mIfNi/H.rpNzzu7CQZLlmgianBIMFIUJokee1fy', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-02 09:56:38', '2023-11-02 09:56:38'),
(89, 'Dr. Faisal Chowdhury', 'faisalchwdhr@gmail.com', '01554885105', NULL, '$2y$10$XMgL9ICBB2cpX0AuS8Aw2.emgYPvJYUCigVBg50jJXDWsORT5XeAi', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-02 09:59:22', '2023-11-02 09:59:22'),
(90, 'Nurse1', 'nurse1@gmail.com', '01554885132', NULL, '$2y$10$KZ4wWHZELlwJFTp.iE0ef.B9LafIPRA6sslCRXf58elRYlCUPCHX2', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-04 06:08:18', '2023-11-04 06:08:18'),
(91, 'Dr. Tausif Hossain', 'tausifimc@gmail.com', '01554885108', NULL, '$2y$10$zRHznV4UpBZPv9voBdYYtO4Y/FD6e5GVSNj67uDoNkut3oz3cva8K', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-04 10:40:15', '2023-11-04 10:40:15'),
(92, 'Zaimahtech', 'ztlabcd@gmail.com', '01792796661', NULL, '$2y$10$w9xddq8BXTP7igWp.OVOue7TA9Lh8BsJXjSncC9TOXgRl2QYx76qe', NULL, NULL, NULL, 76, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-05 06:42:22', '2023-11-05 06:43:59'),
(93, 'Farah Diba', 'fdrahmaddn88@gmail.com', '01705541567', NULL, '$2y$10$RL2MFIvrxJCywRYN75vX2.Zyn9lrPafCRPLgkoTgH065p.3iIuJOa', NULL, NULL, NULL, 0, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-08 05:24:37', '2023-11-08 05:36:46'),
(94, 'Farah Diba', 'fdrahman88@gmail.com', '01705541568', NULL, '$2y$10$J4KzUIrteWmcks.LYFWujede6e/ecJ9r9zio6nn8uEHmOGG1/uPFG', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-08 05:37:48', '2023-11-08 05:37:48'),
(95, 'Demo User', 'demo@gmail.com', '01705541061', NULL, '$2y$10$5.oP5PgUfNg/nAgbSGi.E.VC7vvbFgkSw6B/oCSYaXGLP3Rc2JY9m', NULL, NULL, NULL, 75, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-09 11:14:41', '2023-11-09 11:14:41'),
(96, 'Ztl', 'ztltest@gmail.com', '01554885166', NULL, '$2y$10$encc4C1.4zol5N7s0nK8lOEO617KM9jqwSzctS4hmCPIROMrvLhrm', NULL, NULL, NULL, 77, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-11 03:37:59', '2023-11-11 03:57:32'),
(97, 'Ztl Doctor', 'ztldoctor@gmail.com', '01554885223', NULL, '$2y$10$C3rLkjGli68Hwh9gQL1c0Oft6spOtrQGZAocfERWEzl38Ul1qt6DS', NULL, NULL, NULL, 77, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-11 03:43:27', '2023-11-11 03:43:27'),
(98, 'Sandy', 'adminztl123@gmail.com', '01554885112', NULL, '$2y$10$7/staHnobTYqpAp5egbKoeOGYyteoTxetikLyjrji3fkn4./NWb9m', NULL, NULL, NULL, 78, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-11 06:43:44', '2023-11-11 06:44:57'),
(99, 'Sandy', 'ztladmin2@gmail.com', '01554885144', NULL, '$2y$10$pU0YxTR4ER39a5WCcFnl.OuEv4MGc1KLpjq7qSVQ6hTkIU/0dtT2O', NULL, NULL, NULL, 78, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-11 06:48:20', '2023-11-11 06:48:20'),
(100, 'MHP', 'mhp@demo.com', '01554885166', NULL, '$2y$10$MaREouujMNByr/igMYfrRe0tXCOLQpVhoRCB.RQH1g84Bqi8FSZM2', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-11 10:08:15', '2023-11-11 10:11:00'),
(101, 'Doctor 1', 'mhpdoctor1@gmail.com', '01730374286', NULL, '$2y$10$MEMzRzjBOvSsprKBE09kmO/u2lxvPgV6n90Xj0Y1nZSappHtp8K0a', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-11 10:13:18', '2023-11-11 10:13:18'),
(102, 'Mhp Doctor 2', 'mhpdoctor2@demo.com', '01554885178', NULL, '$2y$10$Vb0Gb2kGMiKc/eVrNAPWKeuVL4qey/q8d4zCIeR94Kgm7MA5Zvv1K', NULL, NULL, NULL, 79, 3, 'Lalbagh Branch', 3, 0, NULL, NULL, 1, '2023-11-11 10:18:31', '2023-11-11 10:18:31'),
(103, 'Arefin Ahmed', 'arefin.ahmed2121@gmail.com', '01725435536', NULL, '$2y$10$I/DNsOk8HgUBOoTX3aVb1etqHSGgMQxGklHui1SetstOboFSjJaVa', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-11 12:04:44', '2023-11-11 12:04:44'),
(104, 'Dr.Erfan Ahmed', 'erfan1709@live.com', '01912217451', NULL, '$2y$10$Qp0JgwUgwzxxDSyvGUiH5OrLziArpQZW037ISXkva47v0LIG39cjS', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-14 12:50:41', '2023-11-14 12:50:41'),
(105, 'Dr Aminur Rahman', 'aminur.rahman2@macrohealthplus.org', '01817184032', NULL, '$2y$10$47m2ChNvzxpW4RnFc/.n9.PeGzW0Xao.dCSV/Eujds/.WzDclnx/i', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-15 07:33:51', '2023-11-15 07:33:51'),
(106, 'Shipu Islam', 'shipu.mhp@gmail.com', '01954365583', NULL, '$2y$10$7WcqalYXL0LKFd.cV9HIZ.6fHaWfUBPfU.RiMOXhTJxAfi1HwAqIm', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-15 10:00:44', '2023-11-15 10:00:44'),
(107, 'Dr. Tanjir Ahmed', 'tanjirssmc@gmail.com', '01762717636', NULL, '$2y$10$HX0t0Vfrf7Vq7M.TlbXJkuvkuHO1AHMs3l8FnjRPkk./Fq4eicunm', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-25 06:53:02', '2023-11-25 06:53:02'),
(108, 'Silma Akter', 'silma@gmail.com', '01533533198', NULL, '$2y$10$WOLdVqTgzyPhzhD39Ob5xujArzWGd5RVWGMcwTMJ7bBL7Hp2FxCqC', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-11-30 09:36:41', '2023-11-30 09:36:41'),
(109, 'MD Emran Hossain', 'emran.macrohealthplus@gamil.com', '01739974006', NULL, '$2y$10$L/j1L4RgZyThEXtKbSpfu.r4NA16z0AAm7OFhpZNY564RfSnCPDjS', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 0, '2023-11-30 18:40:30', '2024-01-25 06:42:15'),
(110, 'MD. SHARIFUL ISLAM', 'ishariful951@gmail.com', '01718506838', NULL, '$2y$10$GeSD9DTMwxG44QvxptBte.oX1lF9ntz8yxqY4P4FS1ta5K0g1n0Bi', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-12-10 06:43:05', '2023-12-10 06:43:05'),
(111, 'ztl_demo', 'ztl_demo@gmail.com', '01533533198', NULL, '$2y$10$5OsnGCwVqei0kZ7xjph00.MtheeIImMz53hYfxD8/xk3KlJvOfCgW', NULL, NULL, NULL, 80, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-12-20 10:26:08', '2023-12-20 10:26:08'),
(112, 'Jabed Akhter', 'jabedakhter2@gmail.com', '01714131050', NULL, '$2y$10$e43CzwUK.G4pFVp2K9D7SO/kjnzbnNhg0WTlZ8frU8.RZh4fdrDG.', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2023-12-20 10:32:41', '2023-12-20 10:32:41'),
(113, 'zabir raihan', 'zabir@gmail.com', '01833086035', NULL, '$2y$10$NkuPH82xc5msh32cawVMn.6oVHPH6WPKkpWx6KQqpwKTqD13cWiOS', NULL, NULL, NULL, 81, NULL, NULL, 3, 1, NULL, NULL, 1, '2023-12-23 04:21:50', '2023-12-23 04:21:50'),
(114, 'Dr. Kamal Uddin Ahmed', 'dr.kamal.uddin.ahmed007@gmail.com', '01856519555', NULL, '$2y$10$ZffR8Gvm/hdR7Rqplu5rQ.Yf0/ypPTYBLx2yJSFUugJmmITqu6ETm', NULL, NULL, NULL, 82, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-01-04 11:31:11', '2024-01-04 11:31:11'),
(115, 'Husnae Ahmed', 'husnae.ahmed007@gmail.com', '01786378313', NULL, '$2y$10$3ULhwWAQ9bjDt2JjIaacfeK2nZWO34oVBvXfAVs3S4o41srXzkZYW', NULL, NULL, NULL, 83, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-01-04 12:04:04', '2024-01-04 12:04:04'),
(116, 'Dr Kamal Uddin Ahmed', 'kamal.uddin.ahmed.008@gmail.com', '01705139111', NULL, '$2y$10$5D6F/sbz1wTFvrTM6JXgfOWuMCz7UrZ3cmXoR1TiNEv8k9ZisIswi', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-04 12:11:30', '2024-01-04 12:11:30'),
(117, 'Dr. Husnae Ahmed', 'husnae.ahmed.008@gmail.com', '01701026708', NULL, '$2y$10$szcze5p1lHqfq0Y5VAj3BucyhKxXUHWpxRKMl/k/jZSKZWfW892nO', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-04 12:19:43', '2024-01-04 12:19:43'),
(118, 'Emran Hossain', 'soleeb.official@gmail.com', '01926268865', NULL, '$2y$10$UIYstmXk6OHU.4flbEYQLeb0fffEgf2hvPF7JTdJCamdlOuqcicEC', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-15 08:41:55', '2024-01-15 08:47:47'),
(119, 'Dr S  M  Badruddoja', 'drshiplu@gmail.com', '01681688541', NULL, '$2y$10$VFmbKrWrgPNOsBtk6EYSE.1EaaGPWsX5lO3.A0fSPE71hcSKlbj7i', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-16 07:12:35', '2024-01-16 07:12:35'),
(120, 'Mohammad Sabbir Rahman', 'msabbir@gmail.com', '01983183891', NULL, '$2y$10$WrPtRn5L7B3gTxpdJwZx.uZJofQBcMOyYg8AYVp.rigGK631RLRdG', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-16 07:32:36', '2024-01-16 07:32:36'),
(121, 'Mohsina Nazneen Bhuiyan', 'aminur@optusnet.com.au', '01915895433', NULL, '$2y$10$doeBfAPinhMyyvXNPDojlezlbPwQUjr.DDacrFWwE16wsmEP9eKsS', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-16 07:39:11', '2024-01-16 07:39:11'),
(122, 'Maria Islam', 'maria@gmail.com', '01714131051', NULL, '$2y$10$GLvTyVoyuhU9D9EiKXM8R.x5loK4Gs7AFp9pnJk8XVyAvjp40un5K', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-22 05:37:45', '2024-01-22 05:37:45'),
(123, 'Hernandez Imran', 'imran.h420@gmail.com', '01712414100', NULL, '$2y$10$HIHkQr59Bx0lypX.JheH1.YSn.CeXNwiSdJqIBP1j7hNB89cd1Fh6', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-25 06:43:27', '2024-01-25 06:43:27'),
(124, 'macrohealthplus', 'jabed@macrohealthplus.org', '+8801714131050', NULL, '$2y$10$SHU4y10zvE.RMlOvKUxpfuK7J5pmdOIiYVXS0yLF3fIIQHCTjXj0G', NULL, NULL, NULL, 84, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-01-25 09:46:45', '2024-01-25 09:46:45'),
(125, 'Mizanur Rahman', 'rahman.mizan@gmail.com', '01784650280', NULL, '$2y$10$RMmLjlnX2LRfIWo/7JVVcO9qzlkxOEaSQDhxnpGooZlclr8R7k4F6', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-25 10:07:17', '2024-01-25 10:07:17'),
(127, 'Md. Akik Hossain', 'mdakikhossain74@gmail.com', '01711139201', NULL, '$2y$10$A/mDptR7fAhoJR.wWkwKnuL2iX1u9xJBzH.N0r8GUfs5BpFSi3Zb6', NULL, NULL, NULL, 86, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-01-29 07:41:36', '2024-01-29 07:41:36'),
(128, 'Dr. Md.Akik Hossain', 'drakik49mbbsrmc@gmail.com', '01818685986', NULL, '$2y$10$e7hUNc21ZvugHUpNDn8qcO72ToY15LPZJR0/ZdW/HDPQwogMgLbNu', NULL, NULL, NULL, 86, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-29 08:02:47', '2024-01-29 08:02:47'),
(129, 'Md Akik Hossain', 'mdakikhossain75@gmail.com', '01717920981', NULL, '$2y$10$51v00gaP4UYT4Zn7lbJSoOKVZYfmj.slw2R.1Q/veAgyJJNjwtRca', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-29 08:49:14', '2024-01-29 08:49:14'),
(130, 'Prof Craig Mclaclan', 'reperfusion@hotmail.com', '01855777766', NULL, '$2y$10$lQNPRkf2btqDmeDtDp4ZQu8pqoKZoicZbnnZK.kYPlmBOfMfTCqTW', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-31 05:56:36', '2024-01-31 05:56:36'),
(131, 'Dr Mominul Hassan', 'contact@sydneypaincentre.com', '01730374280', NULL, '$2y$10$FlvksesfKmmn4kH/aMZbp.XYwrj.BXDg/5gxMuG8Bw3kJ0/1ExD4a', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-31 05:57:47', '2024-01-31 05:57:47'),
(132, 'Prof Markus Hofer', 'marks.hofer@sydney.edu.au', '01681688542', NULL, '$2y$10$1sRDAAtrKw5yfBkF8zc8pu9S7TP9tLU4qt8ZKX3nqP/Z1Mcp5iW92', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-01-31 11:36:01', '2024-01-31 11:36:01'),
(133, 'Napadol', 'admin@demo.com', '01705541560', NULL, '$2y$10$su5gaxjOGW0233mXMJIcU.q8renR2Qls/ooiLAujfgQQFLql27FPy', NULL, NULL, NULL, 87, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-02-04 23:23:04', '2024-02-04 23:23:04'),
(134, 'Napadol', 'artest@gmail.com', '01705541569', NULL, '$2y$10$4/cKidPa5rubfeVAMMI7cOhronXWbo8phxtxlCiABOH9EwU8KODzq', NULL, NULL, NULL, 88, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(135, 'Arafat', 'dev.arafat.zaimahtech@gmail.com', '01705541561', NULL, '$2y$10$Lw8ESDYVszFwkAYxQvZnAeXHZ/TwWY5ufzUTtMRoHCYNRdpMBqay.', NULL, NULL, 'http://localhost:8000/images/684946e9-b2d2-49a7-830d-99e1ba923fce.png', 90, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-02-12 01:32:56', '2024-02-12 03:19:58'),
(136, 'Rakibul Islam', 'admintyht@gmail.com', '01705139111', NULL, '$2y$10$Pg4B/e3IvJDy/YRtlFtXFei7ptKe6OBG5ykAxeyblbuoNDOYilR46', NULL, NULL, NULL, 91, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(137, 'Jabed Akhter', 'zaimahtech@gmail.com', '01714131050', NULL, '$2y$10$eomf5.DE3PClnHrIOFcxyO/5eqc713KQ80gY1j/mYqFbd4/IKMgN.', NULL, NULL, NULL, 92, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(138, 'Rakibul Islam', 'rakibul.zaimahtech@gmail.com', '01705139111', NULL, '$2y$10$n9k0xjBR79.P.EZH2eqxOemREdgDSYi2y/.565nAr5yIkYIOFTE/m', NULL, NULL, NULL, 93, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(139, 'Ztl', 'ztl@gmail.com', '01554885177', NULL, '$2y$10$IfVSfE5IOop.T1BNbPAV..nHqLI8Y9sky6Xs58fpkSSfTzSEojPZG', NULL, NULL, NULL, 94, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-02-12 23:16:55', '2024-02-12 23:16:55'),
(140, 'Test Branch User', 'admin@demo.com1', '01705541500', NULL, '$2y$10$NXf.9/AEyjbPJpRgdzVhRej3QREeZWCsY4k87RmaNcYiYO0Sd66la', NULL, NULL, NULL, 79, NULL, NULL, 3, 0, NULL, NULL, 1, '2024-03-24 05:49:59', '2024-03-24 05:49:59'),
(141, 'Aminur Rahman', 'aminur@macrohealthplus.org', '01327146665', NULL, '$2y$10$nDMsJdIMViLC2iXIkrncKefYZ6OEk48FooG62kglZykikwvESJnCy', NULL, NULL, NULL, 79, NULL, NULL, 0, 0, NULL, NULL, 1, NULL, NULL),
(142, 'Mr Forhad', 'forhad@gmail.com', '01705541222', NULL, '$2y$10$0Gs6JyTlB4AdyOOSwDXZDu.tMdPy5gFXphiJo8/INxbSedhZhHhhW', NULL, NULL, NULL, 79, 3, 'Lalbagh Branch', 3, 0, NULL, NULL, 1, '2024-04-22 07:02:01', '2024-04-22 07:02:01'),
(143, 'Mr Viser', 'viser@gmail.com', '01700541563', NULL, '$2y$10$.nY25zMTmEBpiE/prK10M.2gJ4zN1THdoUFZVRohvw8AmgUCdFI.2', NULL, NULL, NULL, 79, 2, 'Branch 2', 3, 0, NULL, NULL, 1, '2024-04-22 09:25:23', '2024-04-22 09:25:23'),
(146, 'Napadol', 'admin000@demo.com', '01705555645', NULL, '$2y$10$.hfagKgpPLzZOk7U9pagT.f1qrsuYeDzOPljIVT5v.DmSmGjx4Bsq', NULL, NULL, NULL, 79, 3, 'Lalbagh Branch', 3, 0, NULL, NULL, 1, '2024-04-22 09:58:01', '2024-04-22 09:58:01'),
(147, 'User test', 'usertest@gmail.com', '01705541520', NULL, '$2y$10$dDpx8.q0ePseVWGP6dofRevD79l/DyTzLloYLOLgq8ppsq6e7xoLa', NULL, NULL, NULL, 79, 1, 'Test Branc 1', 3, 0, NULL, NULL, 1, '2024-04-22 10:01:22', '2024-04-22 10:01:22'),
(148, 'Arafat Hossain', 'arafat99@gmail.com', '01705500003', NULL, '$2y$10$aCvNt2qiM1W1funCEh6DL.BRuk7.YfhW.EbeyAA.UIDXq7ClETYc.', NULL, NULL, NULL, 95, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(149, 'Abc Company', 'abc@gmail.com', '01745454511', NULL, '$2y$10$LY2NnYLxT4QalNy3QkYiyOYrQ/aO4c7K326/cEajeLqvHukxKLnkS', NULL, NULL, NULL, 96, NULL, NULL, 3, 1, NULL, NULL, 1, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(150, 'Mr Doc 1 Abc Comp', 'doc1@abc.com', '01745454549', NULL, '$2y$10$nw/GuDJRrYCRUuhJ6D3dyO7L9F.XMhxyvB7hde0IcFfiHJ0EMOChK', NULL, NULL, NULL, 96, 4, 'Banni Branch', 3, 0, NULL, NULL, 1, '2024-04-27 07:29:19', '2024-04-27 07:29:19'),
(151, 'Mr Test 2', 'doc2@abc.com', '01745454548', NULL, '$2y$10$Raafp9Xj..p5l3kxLEVMQOZhLLpQHyuXHd/FclAYU5OmuBw38ikJ2', NULL, NULL, NULL, 96, 5, 'Gulshan Branch', 3, 0, NULL, NULL, 1, '2024-04-27 08:18:02', '2024-04-27 08:18:02');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 2, NULL, NULL),
(3, 3, 2, NULL, NULL),
(4, 4, 1, '2023-06-22 12:11:43', '2023-06-22 12:11:43'),
(5, 5, 1, NULL, NULL),
(6, 6, 2, NULL, NULL),
(7, 7, 1, '2023-07-07 03:07:09', '2023-07-07 03:07:09'),
(8, 8, 1, '2023-07-08 03:17:08', '2023-07-08 03:17:08'),
(9, 9, 1, '2023-07-08 09:20:49', '2023-07-08 09:20:49'),
(10, 10, 1, '2023-07-08 09:22:59', '2023-07-08 09:22:59'),
(11, 11, 1, '2023-07-08 09:27:16', '2023-07-08 09:27:16'),
(12, 12, 1, '2023-07-08 09:38:25', '2023-07-08 09:38:25'),
(13, 13, 1, '2023-07-08 09:40:15', '2023-07-08 09:40:15'),
(14, 14, 1, '2023-07-08 03:41:12', '2023-07-08 03:41:12'),
(15, 15, 1, '2023-07-08 03:42:01', '2023-07-08 03:42:01'),
(16, 16, 1, '2023-07-08 09:45:51', '2023-07-08 09:45:51'),
(17, 17, 1, '2023-07-08 04:31:53', '2023-07-08 04:31:53'),
(18, 18, 1, '2023-07-11 18:10:24', '2023-07-11 18:10:24'),
(19, 19, 1, '2023-07-11 19:15:09', '2023-07-11 19:15:09'),
(20, 20, 1, '2023-07-11 13:16:41', '2023-07-11 13:16:41'),
(21, 21, 1, '2023-07-11 13:18:43', '2023-07-11 13:18:43'),
(22, 22, 1, '2023-07-11 13:20:19', '2023-07-11 13:20:19'),
(23, 23, 1, '2023-07-13 15:45:43', '2023-07-13 15:45:43'),
(35, 35, 2, NULL, NULL),
(37, 38, 1, '2023-07-22 12:14:06', '2023-07-22 12:14:06'),
(42, 80, 1, '2023-10-19 11:14:31', '2023-10-19 11:14:31'),
(43, 81, 2, NULL, NULL),
(44, 82, 2, NULL, NULL),
(45, 83, 2, NULL, NULL),
(46, 84, 1, '2023-11-02 09:13:35', '2023-11-02 09:13:35'),
(47, 85, 2, NULL, NULL),
(48, 86, 2, NULL, NULL),
(49, 87, 2, NULL, NULL),
(50, 88, 2, NULL, NULL),
(51, 89, 2, NULL, NULL),
(52, 90, 2, NULL, NULL),
(53, 91, 2, NULL, NULL),
(54, 92, 1, '2023-11-05 06:42:22', '2023-11-05 06:42:22'),
(55, 93, 2, NULL, NULL),
(56, 94, 2, NULL, NULL),
(57, 95, 2, NULL, NULL),
(58, 96, 1, '2023-11-11 03:38:00', '2023-11-11 03:38:00'),
(59, 97, 2, NULL, NULL),
(60, 98, 1, '2023-11-11 06:43:44', '2023-11-11 06:43:44'),
(61, 99, 2, NULL, NULL),
(62, 100, 1, '2023-11-11 10:08:15', '2023-11-11 10:08:15'),
(63, 101, 2, NULL, NULL),
(64, 102, 2, NULL, NULL),
(65, 103, 2, NULL, NULL),
(66, 104, 2, NULL, NULL),
(67, 105, 2, NULL, NULL),
(68, 106, 2, NULL, NULL),
(69, 107, 2, NULL, NULL),
(70, 108, 2, NULL, NULL),
(71, 109, 2, NULL, NULL),
(72, 110, 2, NULL, NULL),
(73, 111, 1, '2023-12-20 10:26:08', '2023-12-20 10:26:08'),
(74, 112, 2, NULL, NULL),
(75, 113, 1, '2023-12-23 04:21:50', '2023-12-23 04:21:50'),
(76, 114, 1, '2024-01-04 11:31:11', '2024-01-04 11:31:11'),
(77, 115, 1, '2024-01-04 12:04:05', '2024-01-04 12:04:05'),
(78, 116, 2, NULL, NULL),
(79, 117, 2, NULL, NULL),
(80, 118, 2, NULL, NULL),
(81, 119, 2, NULL, NULL),
(82, 120, 2, NULL, NULL),
(83, 121, 2, NULL, NULL),
(84, 122, 2, NULL, NULL),
(85, 123, 2, NULL, NULL),
(86, 124, 1, '2024-01-25 09:46:45', '2024-01-25 09:46:45'),
(87, 125, 2, NULL, NULL),
(89, 127, 1, '2024-01-29 07:41:36', '2024-01-29 07:41:36'),
(90, 128, 2, NULL, NULL),
(91, 129, 2, NULL, NULL),
(92, 130, 2, NULL, NULL),
(93, 131, 2, NULL, NULL),
(94, 132, 2, NULL, NULL),
(95, 133, 1, '2024-02-04 23:23:07', '2024-02-04 23:23:07'),
(96, 134, 1, '2024-02-12 00:56:38', '2024-02-12 00:56:38'),
(97, 135, 1, '2024-02-12 01:32:56', '2024-02-12 01:32:56'),
(98, 136, 1, '2024-02-12 22:58:37', '2024-02-12 22:58:37'),
(99, 137, 1, '2024-02-12 23:04:29', '2024-02-12 23:04:29'),
(100, 138, 1, '2024-02-12 23:12:42', '2024-02-12 23:12:42'),
(101, 139, 1, '2024-02-12 23:16:56', '2024-02-12 23:16:56'),
(102, 140, 2, NULL, NULL),
(103, 142, 2, NULL, NULL),
(104, 143, 2, NULL, NULL),
(107, 146, 2, NULL, NULL),
(108, 147, 2, NULL, NULL),
(109, 148, 1, '2024-04-22 10:10:20', '2024-04-22 10:10:20'),
(110, 149, 1, '2024-04-27 13:15:21', '2024-04-27 13:15:21'),
(111, 150, 2, NULL, NULL),
(112, 151, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `validities`
--

CREATE TABLE `validities` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `days` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `validities`
--

INSERT INTO `validities` (`id`, `name`, `days`, `created_at`, `updated_at`) VALUES
(1, 'one month', 30, '2023-06-26 10:02:45', '2023-06-26 10:02:45'),
(2, 'two month', 60, '2023-06-26 10:11:36', '2023-06-26 10:16:34'),
(3, 'one month', 30, '2023-06-26 10:17:30', '2023-06-26 10:17:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject_type`,`subject_id`),
  ADD KEY `causer` (`causer_type`,`causer_id`),
  ADD KEY `activity_log_log_name_index` (`log_name`);

--
-- Indexes for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audits`
--
ALTER TABLE `audits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branches_organization_id_foreign` (`organization_id`);

--
-- Indexes for table `card_infos`
--
ALTER TABLE `card_infos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_subscription_plans`
--
ALTER TABLE `coupon_subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_users`
--
ALTER TABLE `coupon_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dynamic_databases`
--
ALTER TABLE `dynamic_databases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dynamic_databases_name_unique` (`name`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `login_sessions`
--
ALTER TABLE `login_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mhp_sms`
--
ALTER TABLE `mhp_sms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_details`
--
ALTER TABLE `notification_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organizations_email_unique` (`email`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payment_attempts`
--
ALTER TABLE `payment_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_references`
--
ALTER TABLE `payment_references`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pay_as_go_billing_break_downs`
--
ALTER TABLE `pay_as_go_billing_break_downs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pay_as_go_billing_details`
--
ALTER TABLE `pay_as_go_billing_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pay_as_go_billing_summaries`
--
ALTER TABLE `pay_as_go_billing_summaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pay_as_go_settings`
--
ALTER TABLE `pay_as_go_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_attempts`
--
ALTER TABLE `purchase_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_sms`
--
ALTER TABLE `purchase_sms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refunds`
--
ALTER TABLE `refunds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refund_references`
--
ALTER TABLE `refund_references`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roles_slug_index` (`slug`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sms_allowed_countries`
--
ALTER TABLE `sms_allowed_countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sms_credentials`
--
ALTER TABLE `sms_credentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sms_gateway_details`
--
ALTER TABLE `sms_gateway_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sms_gateway_details_sms_gateway_id_foreign` (`sms_gateway_id`);

--
-- Indexes for table `sms_logs`
--
ALTER TABLE `sms_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `storage_sizes`
--
ALTER TABLE `storage_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_cancel_requests`
--
ALTER TABLE `subscription_cancel_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_details`
--
ALTER TABLE `subscription_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_detail_records`
--
ALTER TABLE `subscription_detail_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plan_features`
--
ALTER TABLE `subscription_plan_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_requests`
--
ALTER TABLE `subscription_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `s_m_s_gateways`
--
ALTER TABLE `s_m_s_gateways`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `s_m_s_histories`
--
ALTER TABLE `s_m_s_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_roles_user_id_role_id_unique` (`user_id`,`role_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`);

--
-- Indexes for table `validities`
--
ALTER TABLE `validities`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audits`
--
ALTER TABLE `audits`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `card_infos`
--
ALTER TABLE `card_infos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `coupon_subscription_plans`
--
ALTER TABLE `coupon_subscription_plans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `coupon_users`
--
ALTER TABLE `coupon_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dynamic_databases`
--
ALTER TABLE `dynamic_databases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `login_sessions`
--
ALTER TABLE `login_sessions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mhp_sms`
--
ALTER TABLE `mhp_sms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `notification_details`
--
ALTER TABLE `notification_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `payment_attempts`
--
ALTER TABLE `payment_attempts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_references`
--
ALTER TABLE `payment_references`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pay_as_go_billing_break_downs`
--
ALTER TABLE `pay_as_go_billing_break_downs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `pay_as_go_billing_details`
--
ALTER TABLE `pay_as_go_billing_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pay_as_go_billing_summaries`
--
ALTER TABLE `pay_as_go_billing_summaries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pay_as_go_settings`
--
ALTER TABLE `pay_as_go_settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2221;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `purchase_attempts`
--
ALTER TABLE `purchase_attempts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_sms`
--
ALTER TABLE `purchase_sms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refunds`
--
ALTER TABLE `refunds`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refund_references`
--
ALTER TABLE `refund_references`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `sms_allowed_countries`
--
ALTER TABLE `sms_allowed_countries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sms_credentials`
--
ALTER TABLE `sms_credentials`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sms_gateway_details`
--
ALTER TABLE `sms_gateway_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sms_logs`
--
ALTER TABLE `sms_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `storage_sizes`
--
ALTER TABLE `storage_sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subscription_cancel_requests`
--
ALTER TABLE `subscription_cancel_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_details`
--
ALTER TABLE `subscription_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `subscription_detail_records`
--
ALTER TABLE `subscription_detail_records`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subscription_plan_features`
--
ALTER TABLE `subscription_plan_features`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `subscription_requests`
--
ALTER TABLE `subscription_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `s_m_s_gateways`
--
ALTER TABLE `s_m_s_gateways`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `s_m_s_histories`
--
ALTER TABLE `s_m_s_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `validities`
--
ALTER TABLE `validities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branches`
--
ALTER TABLE `branches`
  ADD CONSTRAINT `branches_organization_id_foreign` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sms_gateway_details`
--
ALTER TABLE `sms_gateway_details`
  ADD CONSTRAINT `sms_gateway_details_sms_gateway_id_foreign` FOREIGN KEY (`sms_gateway_id`) REFERENCES `s_m_s_gateways` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
