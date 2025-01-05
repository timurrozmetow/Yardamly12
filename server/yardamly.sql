-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 05 2025 г., 23:44
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `yardamly`
--

-- --------------------------------------------------------

--
-- Структура таблицы `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `contact_form`
--

INSERT INTO `contact_form` (`id`, `name`, `phone`, `message`, `created_at`) VALUES
(1, 'test', '+99360000000', 'csdcdcds', '2025-01-05 21:00:51');

-- --------------------------------------------------------

--
-- Структура таблицы `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question_ru` text NOT NULL,
  `question_tm` text NOT NULL,
  `question_tr` text NOT NULL,
  `question_en` text NOT NULL,
  `answer_ru` text NOT NULL,
  `answer_tm` text NOT NULL,
  `answer_tr` text NOT NULL,
  `answer_en` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `faqs`
--

INSERT INTO `faqs` (`id`, `question_ru`, `question_tm`, `question_tr`, `question_en`, `answer_ru`, `answer_tm`, `answer_tr`, `answer_en`, `created_at`) VALUES
(1, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', '2025-01-05 21:34:08');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title_ru` varchar(255) NOT NULL,
  `title_tm` varchar(255) NOT NULL,
  `title_tr` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_ru` text NOT NULL,
  `description_tm` text NOT NULL,
  `description_tr` text NOT NULL,
  `description_en` text NOT NULL,
  `content_ru` text NOT NULL,
  `content_tm` text NOT NULL,
  `content_tr` text NOT NULL,
  `content_en` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `title_ru`, `title_tm`, `title_tr`, `title_en`, `description_ru`, `description_tm`, `description_tr`, `description_en`, `content_ru`, `content_tm`, `content_tr`, `content_en`, `image_url`, `created_at`) VALUES
(2, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', '/uploads/1736103260742-731153568.jpg', '2025-01-05 18:54:20'),
(3, 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', '/uploads/1736114160881-431306533.jpg', '2025-01-05 21:56:00'),
(4, 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', '/uploads/1736114166572-578436068.jpg', '2025-01-05 21:56:06'),
(5, 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', '/uploads/1736114167293-672463100.jpg', '2025-01-05 21:56:07'),
(6, 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', '/uploads/1736114167967-928959708.jpg', '2025-01-05 21:56:07');

-- --------------------------------------------------------

--
-- Структура таблицы `photo_gallery`
--

CREATE TABLE `photo_gallery` (
  `id` int(11) NOT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `title_tm` varchar(255) DEFAULT NULL,
  `title_tr` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `photo_gallery`
--

INSERT INTO `photo_gallery` (`id`, `title_ru`, `title_tm`, `title_tr`, `title_en`, `image_url`, `created_at`) VALUES
(1, 'test', 'test', 'test', 'test', '/uploads/1736104690414-728777617.jpg', '2025-01-05 19:18:10'),
(2, 'test', 'test', 'test', 'test', '/uploads/1736105610732-137614036.jpg', '2025-01-05 19:33:30'),
(20, 'test', 'test', 'test', 'test', '/uploads/1736105621531-828259947.jpg', '2025-01-05 19:33:41'),
(29, 'test', 'test', 'test', 'test', '/uploads/1736107358283-235373678.jpg', '2025-01-05 20:02:38');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `photo_gallery`
--
ALTER TABLE `photo_gallery`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `photo_gallery`
--
ALTER TABLE `photo_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
