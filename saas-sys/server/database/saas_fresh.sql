-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 03, 2023 at 03:44 AM
-- Server version: 8.0.23
-- PHP Version: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saas_fresh`
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
  `organization_id` bigint DEFAULT NULL,
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
(21, '2023_05_05_035433_create_notifications_table', 1),
(22, '2023_05_05_035451_create_settings_table', 1),
(23, '2023_05_17_144146_create_dynamic_database_table', 1),
(24, '2023_06_22_155532_create_storage_sizes_table', 1),
(25, '2023_06_22_155651_create_validities_table', 1),
(26, '2023_07_12_151432_create_otps_table', 2),
(27, '2023_08_01_165624_create_card_infos_table', 3),
(28, '2023_08_02_145650_create_subscription_detail_records_table', 3),
(29, '2023_08_19_061737_create_audits_table', 3),
(30, '2023_08_22_163403_create_activity_log_table', 4),
(31, '2023_08_22_163404_add_event_column_to_activity_log_table', 4),
(32, '2023_08_22_163405_add_batch_uuid_column_to_activity_log_table', 4),
(33, '2023_09_17_150346_create_refunds_table', 5),
(34, '2023_10_03_025731_create_payment_references_table', 6),
(35, '2023_10_08_151608_create_refund_references_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `message_status` tinyint NOT NULL DEFAULT '0' COMMENT '0: not send, 1:sent',
  `email_status` tinyint NOT NULL DEFAULT '0' COMMENT '0: not send, 1:sent',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(28, 'App\\Models\\User', 5, 'hydra-api-token', '321e2c0435ca6b82e4170daa53ae38438546bae349963fc1bc14cb9601eb6c69', '[\"admin\"]', '2023-08-11 01:40:50', '2023-08-02 10:20:12', '2023-08-11 01:40:50'),
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
(51, 'App\\Models\\User', 1, 'hydra-api-token', '3ff5312ee2b99ba35617d6372747776637368e50f3bca56fcdc1fbc91824df35', '[\"admin\"]', NULL, '2023-08-05 01:09:52', '2023-08-05 01:09:52'),
(52, 'App\\Models\\User', 1, 'hydra-api-token', 'd9939abe86e4122af5e42d7e0d024dc34cd6d940ba132e891ab71d5ab78edf30', '[\"admin\"]', NULL, '2023-08-05 01:13:23', '2023-08-05 01:13:23'),
(53, 'App\\Models\\User', 1, 'hydra-api-token', '5e2d40e7a455705ba9850b7be9607da181522120a00ffbdaec943b0b4971fc37', '[\"admin\"]', NULL, '2023-08-05 01:17:01', '2023-08-05 01:17:01'),
(54, 'App\\Models\\User', 1, 'hydra-api-token', '35bd5cb2740df4006574af85640522a30d42ed0554262b5a83b14ffd0c4e2855', '[\"admin\"]', NULL, '2023-08-05 01:20:47', '2023-08-05 01:20:47'),
(55, 'App\\Models\\User', 1, 'hydra-api-token', 'e35f7da04241cfda1fe54531a734c1d8ce930dbee973fd5f7cc9348042b9799a', '[\"admin\"]', NULL, '2023-08-05 01:22:29', '2023-08-05 01:22:29'),
(56, 'App\\Models\\User', 1, 'hydra-api-token', '7cb4e76948894e77a331ee32036840033a87cc6642f99612cf0e9cc472266f1a', '[\"admin\"]', NULL, '2023-08-05 01:22:53', '2023-08-05 01:22:53'),
(57, 'App\\Models\\User', 1, 'hydra-api-token', '7eaa328120003a3fb0de68195876801d132f2da46148c5ca70e5b185b66c674c', '[\"admin\"]', NULL, '2023-08-05 01:23:29', '2023-08-05 01:23:29'),
(58, 'App\\Models\\User', 1, 'hydra-api-token', 'd6585118aaba88ea551f3463ea06d001d947a2575b4b41f970baf061ea0db17e', '[\"admin\"]', NULL, '2023-08-05 01:30:43', '2023-08-05 01:30:43'),
(60, 'App\\Models\\User', 5, 'hydra-api-token', '2e21709ea3d279a8683c5c3cc6b0d1e2263be6f48d4ad99e2b6a567d7ac5314f', '[\"admin\"]', NULL, '2023-08-05 01:44:09', '2023-08-05 01:44:09'),
(61, 'App\\Models\\User', 5, 'hydra-api-token', 'de79589cbfa3a95de1b245f1ec649bcbd4e9eeaf721eb76468e9b9db49289c0a', '[\"admin\"]', NULL, '2023-08-05 01:54:13', '2023-08-05 01:54:13'),
(62, 'App\\Models\\User', 5, 'hydra-api-token', 'b0e7613ec534cb008e5a589c3ebffdddfa30e351b00c48cc4cfb72b7c2c2e322', '[\"admin\"]', NULL, '2023-08-05 01:54:30', '2023-08-05 01:54:30'),
(63, 'App\\Models\\User', 5, 'hydra-api-token', '51361d1a342590cec304395c28c5e70c2a5053530cf5a484b915143a566a8fe2', '[\"admin\"]', NULL, '2023-08-05 01:55:21', '2023-08-05 01:55:21'),
(64, 'App\\Models\\User', 5, 'hydra-api-token', '76f38da5fcd8225272c0a6543a89aa9889e2f03be9fa7b08a9aa20e2acab8eda', '[\"admin\"]', NULL, '2023-08-05 01:56:03', '2023-08-05 01:56:03'),
(65, 'App\\Models\\User', 5, 'hydra-api-token', 'a6872998e409065491d45b4fb3944cb1ed8fe206c56fafe926894f365da4148a', '[\"admin\"]', NULL, '2023-08-11 01:23:47', '2023-08-11 01:23:47'),
(67, 'App\\Models\\User', 5, 'hydra-api-token', '6e8a98acfc31cc55385bdfc5f7b9b72251bbbec385ebd5c9a91afe8586b6fdc4', '[\"admin\"]', '2023-08-22 12:10:59', '2023-08-11 06:36:26', '2023-08-22 12:10:59'),
(69, 'App\\Models\\User', 1, 'hydra-api-token', '31dfb35450e45131106391c360a7d774c5a97b9d852650961813490efac647b1', '[\"admin\"]', NULL, '2023-08-12 05:17:56', '2023-08-12 05:17:56'),
(78, 'App\\Models\\User', 5, 'hydra-api-token', '92a96cf93eec0806f62684cee4df19d8a5251ca00c77463dc1700d49319f3b33', '[\"admin\"]', '2023-08-26 09:44:16', '2023-08-22 12:11:13', '2023-08-26 09:44:16'),
(79, 'App\\Models\\User', 1, 'hydra-api-token', '1033b159e3c2942cc76502639501d3cdc1324473d32c60af52ce8d3597cedd85', '[\"admin\"]', '2023-08-28 10:03:41', '2023-08-28 09:18:29', '2023-08-28 10:03:41'),
(80, 'App\\Models\\User', 5, 'hydra-api-token', '289a4d0bc265fcdaa0b5bc77f2eb7555485dce00db0ae2f922f52704018d0717', '[\"admin\"]', '2023-08-28 12:08:18', '2023-08-28 10:04:07', '2023-08-28 12:08:18'),
(81, 'App\\Models\\User', 1, 'hydra-api-token', 'daa084a350c1250ae3f22fa38e07591531f0ff9fc3dcc3a7335d917a50e3e29b', '[\"admin\"]', '2023-08-30 11:47:00', '2023-08-29 11:33:35', '2023-08-30 11:47:00'),
(82, 'App\\Models\\User', 5, 'hydra-api-token', 'b236fa2356c7310d1a1b41c29b66b954b61365307a25be8b4ace061edf159b17', '[\"admin\"]', '2023-11-02 21:30:00', '2023-08-31 10:34:25', '2023-11-02 21:30:00'),
(83, 'App\\Models\\User', 5, 'hydra-api-token', 'b35a593b8685b97ec2dd5812b491ce5e9ed973f9960ab2f9b065853a2431b27f', '[\"admin\"]', '2023-09-17 10:23:01', '2023-09-09 11:59:43', '2023-09-17 10:23:01'),
(84, 'App\\Models\\User', 5, 'hydra-api-token', '8247091a88142446fc824a4220ff85cec730bbb7bc60a5f22b4e28b1eb56f6d0', '[\"admin\"]', NULL, '2023-09-17 10:23:58', '2023-09-17 10:23:58'),
(85, 'App\\Models\\User', 1, 'hydra-api-token', '46007e18dceb79552c8142f4e2154e9aec4fba0d9f79bb821faf05889a2e4237', '[\"admin\"]', '2023-09-17 12:14:50', '2023-09-17 10:24:05', '2023-09-17 12:14:50'),
(86, 'App\\Models\\User', 1, 'hydra-api-token', '46aab2dad59d7a062a9f681da52eca519546822bbe1756f63271cc950fa5509d', '[\"admin\"]', NULL, '2023-09-17 10:24:55', '2023-09-17 10:24:55'),
(87, 'App\\Models\\User', 5, 'hydra-api-token', '100205c840c7e79f7e1d1e51d72baadf0e971d77454b5450f436bde5d5c2fe75', '[\"admin\"]', '2023-10-02 13:21:27', '2023-09-27 10:17:59', '2023-10-02 13:21:27'),
(88, 'App\\Models\\User', 1, 'hydra-api-token', '52fb1e678e60d99b41aa598c78cc37f809e69143702b5925614df32bb5dc48dd', '[\"admin\"]', NULL, '2023-11-02 11:05:21', '2023-11-02 11:05:21'),
(89, 'App\\Models\\User', 1, 'hydra-api-token', '3952c4aed29e082a5ab4a21acca62287d30bcaa1ff84a7a79d323af36c9343fe', '[\"admin\"]', '2023-11-02 21:44:11', '2023-11-02 21:43:24', '2023-11-02 21:44:11');

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
(1, NULL, 0, 1, 0, 0, 0, 0, 0, 0, 0, '1234567890', 'http://saas-backend.test/images/af11fc45-ce9d-4de4-821e-1befb16f8aad.png', 'example1@example.com', 'BDT', '2023-06-27 09:06:38', '2023-08-13 11:09:32'),
(2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, '9876543210', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'example2@example.com', 'USD', '2023-06-27 09:06:38', '2023-06-27 09:06:38'),
(3, 3, 1, 0, 1, 1, 0, 1, 0, 0, 1, '9876543210', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'example3@example.com', 'EUR', '2023-06-27 09:06:38', '2023-06-27 09:06:38'),
(4, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, '1234567890', 'http://saas-backend.test/images/281f8b33-cf12-45ae-a5a4-875846fe5e94.png', 'example1@example.com', 'BDT', '2023-06-27 09:06:38', '2023-08-13 11:29:35'),
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
(25, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, '+88017578082asfdsaf14', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajoldsdfchaki@gmail.com', 'BDT', '2023-08-30 17:26:27', '2023-08-30 17:26:27'),
(26, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, '+88017578082asfdsaf14', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'kajoldsdfchaki@gmail.com', 'BDT', '2023-09-02 00:40:54', '2023-09-02 00:40:54'),
(27, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01757898980', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'chaki3@gmail.com', 'BDT', '2023-11-02 17:08:56', '2023-11-02 17:08:56'),
(28, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, '01732849243', 'http://prosantachaki.online/_next/image?url=%2Fassets%2Flogos%2Flogo.jpeg&w=256&q=75', 'aaaaaq@gmail.com', 'BDT', '2023-11-03 03:28:02', '2023-11-03 03:28:02');

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

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `email_verified_at`, `password`, `Two_factor_secret`, `two_factor_recovery_codes`, `photo`, `organization_id`, `user_type`, `is_tem_password`, `deleted_at`, `remember_token`, `status`, `created_at`, `updated_at`) VALUES
(1, 'prosanta chaki', 'admin@gmail.com', '01711111111', NULL, '$2y$10$LqAynshzZTEqpbJQ4jMKduWHtvOwAYvjPZHV7qEj3YDslmVWhqby.', NULL, NULL, 'http://saas-backend.test/images/a2139375-5bfb-4b01-9869-897f9927df1d.png', NULL, 0, 0, NULL, NULL, 1, '2023-06-22 11:34:59', '2023-08-12 05:35:48');

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
(1, 1, 1, NULL, NULL);

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

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
-- AUTO_INCREMENT for table `card_infos`
--
ALTER TABLE `card_infos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `coupon_subscription_plans`
--
ALTER TABLE `coupon_subscription_plans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `coupon_users`
--
ALTER TABLE `coupon_users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dynamic_databases`
--
ALTER TABLE `dynamic_databases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `payment_attempts`
--
ALTER TABLE `payment_attempts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payment_references`
--
ALTER TABLE `payment_references`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `purchase_attempts`
--
ALTER TABLE `purchase_attempts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refunds`
--
ALTER TABLE `refunds`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `storage_sizes`
--
ALTER TABLE `storage_sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subscription_cancel_requests`
--
ALTER TABLE `subscription_cancel_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscription_details`
--
ALTER TABLE `subscription_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subscription_requests`
--
ALTER TABLE `subscription_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `validities`
--
ALTER TABLE `validities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

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
