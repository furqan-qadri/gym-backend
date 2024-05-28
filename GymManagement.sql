-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 28, 2024 at 07:21 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `GymManagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `Announcements`
--

CREATE TABLE `Announcements` (
  `announcement_id` int(11) NOT NULL,
  `announcement_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Announcements`
--

INSERT INTO `Announcements` (`announcement_id`, `announcement_date`, `title`, `content`) VALUES
(1, '2024-05-19 16:00:00', 'New Gym Equipment Arrived', 'We are excited to announce that our gym has received new state-of-the-art equipment to enhance your workout experience. The new equipment includes top-of-the-line treadmills, elliptical machines, weightlifting benches, and more. We believe that these additions will make your workouts more enjoyable and effective. Come and try them out today!'),
(3, '2024-05-24 16:00:00', 'Special Promotion: Refer a Friend', 'Refer a friend to our gym and get one month free membership! Spread the word and enjoy the benefits together. This promotion is our way of thanking our loyal members for their support and for helping us grow our gym community. There is no limit to the number of friends you can refer, so start referring today and enjoy even more savings on your membership. Don\'t miss out on this opportunity!'),
(4, '2024-05-27 15:20:45', 'New Equipment Arriving!', 'We are excited to announce that we will be receiving new gym equipment next week. Stay tuned for more updates and get ready to level up your workouts!'),
(5, '2024-05-27 15:21:32', 'New Equipment furqan and areeba!', 'furqan and areeba are a cute couple!');

-- --------------------------------------------------------

--
-- Table structure for table `Attendance`
--

CREATE TABLE `Attendance` (
  `attendance_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `attendance_date` date DEFAULT NULL,
  `attended` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Attendance`
--

INSERT INTO `Attendance` (`attendance_id`, `member_id`, `attendance_date`, `attended`) VALUES
(37, 7, '2024-05-01', 1),
(38, 8, '2024-05-01', 1),
(40, 7, '2024-05-02', 0),
(41, 8, '2024-05-02', 1),
(43, 7, '2024-05-03', 1),
(44, 8, '2024-05-03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Members`
--

CREATE TABLE `Members` (
  `member_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `IC_Passport` varchar(20) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT 1,
  `phone` varchar(15) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sign_up_date` date DEFAULT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `trainer_id` int(11) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Members`
--

INSERT INTO `Members` (`member_id`, `full_name`, `age`, `sex`, `IC_Passport`, `active_status`, `phone`, `email_id`, `address`, `sign_up_date`, `plan_id`, `trainer_id`, `date_of_birth`) VALUES
(7, 'Furqan areeba areeba', 30, 'Female', '0987654321', 1, '987-654-3210', 'furqanareeba@example.com', '456 Elm St, Town', '2024-05-03', 2, NULL, '1994-03-15'),
(8, 'Bob Johnson', 35, 'Male', '5678901234', 1, '567-890-1234', 'bob@example.com', '789 Oak St, Village', '2024-05-05', 3, 3, '1989-07-20'),
(10, 'Michael Lee', 32, 'Male', '9876543210', 1, '987-654-3210', 'michael@example.com', '654 Maple St, Suburb', '2024-05-09', 2, 5, '1992-09-05'),
(11, 'John Doe', 25, 'Male', '1234567890', 1, '123-456-7890', 'john@example.com', '123 Main St, City', '2024-05-01', 1, 1, '1999-01-01'),
(12, 'Ali bin Ahmad', 28, 'Male', '9012345678', 1, '012-3456789', 'ali@example.com', '123 Jalan Raja, Kuala Lumpur', '2024-05-12', 1, 1, '1996-04-15'),
(13, 'Fatimah binti Ismail', 35, 'Female', '8901234567', 1, '013-4567890', 'fatimah@example.com', '456 Jalan Tun Razak, Johor Bahru', '2024-05-13', 2, NULL, '1989-09-20'),
(14, 'Ahmad bin Abdullah', 30, 'Male', '7890123456', 1, '014-5678901', 'ahmad@example.com', '789 Jalan Sultan, Penang', '2024-05-14', 3, 3, '1994-12-25'),
(15, 'Siti binti Mohd Ali', 25, 'Female', '6789012345', 1, '015-6789012', 'siti@example.com', '321 Jalan Kampung, Melaka', '2024-05-15', 1, 4, '1999-06-30'),
(16, 'Mohd bin Ibrahim', 32, 'Male', '5678901234', 1, '016-7890123', 'mohd@example.com', '654 Jalan Permai, Kota Kinabalu', '2024-05-16', 2, 5, '1992-03-10'),
(17, 'Furqan Ali', 30, 'Male', 'A1234567', 1, '1234567890', 'john.doe@example.com', '123 Main Street, Cityville', '2024-05-28', 1, 1, '1994-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `payment_id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `payment_year` int(11) DEFAULT NULL,
  `payment_month` int(11) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`payment_id`, `member_id`, `payment_year`, `payment_month`, `payment_date`, `amount`) VALUES
(1, 8, 2024, 4, '2024-04-10', '50.00'),
(4, 8, 2024, 5, '2024-05-10', '50.00'),
(6, 10, 2024, 5, '2024-05-10', '45.00'),
(7, 8, 2026, 6, '2024-01-10', '50.00'),
(9, 10, 2024, 6, '2024-01-10', '45.00'),
(10, 8, 2024, 4, '2024-04-10', '50.00'),
(12, 10, 2024, 4, '2024-04-10', '45.00'),
(13, 8, 2024, 5, '2024-05-10', '50.00'),
(15, 10, 2024, 5, '2024-05-10', '45.00'),
(16, 8, 2024, 6, '2024-06-10', '50.00'),
(18, 10, 2024, 6, '2024-06-10', '45.00'),
(19, 7, NULL, 1, '2024-01-10', '50.00');

-- --------------------------------------------------------

--
-- Table structure for table `Plans`
--

CREATE TABLE `Plans` (
  `plan_id` int(11) NOT NULL,
  `plan_name` varchar(100) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Plans`
--

INSERT INTO `Plans` (`plan_id`, `plan_name`, `cost`, `description`) VALUES
(1, 'Monthly Membership', '50.00', 'Access to gym facilities for one month'),
(2, 'Annual Membership', '500.00', 'Access to gym facilities for one year'),
(3, 'Basic Plan', '100.00', 'Access to gym facilities with limited features');

-- --------------------------------------------------------

--
-- Table structure for table `Salaries`
--

CREATE TABLE `Salaries` (
  `salary_id` int(11) NOT NULL,
  `trainer_id` int(11) DEFAULT NULL,
  `salary_year` int(11) DEFAULT NULL,
  `salary_month` int(11) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Salaries`
--

INSERT INTO `Salaries` (`salary_id`, `trainer_id`, `salary_year`, `salary_month`, `payment_date`, `amount`) VALUES
(21, 3, 2024, 4, '2024-04-15', '1600.00'),
(22, 1, 2024, 2, '2024-04-15', '1500.00'),
(24, 3, 2024, 2, '2024-04-15', '1600.00'),
(25, 1, 2024, 1, '2024-04-15', '1500.00');

-- --------------------------------------------------------

--
-- Table structure for table `Trainers`
--

CREATE TABLE `Trainers` (
  `trainer_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `IC_Passport` varchar(20) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT 1,
  `phone` varchar(15) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sign_up_date` date DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Trainers`
--

INSERT INTO `Trainers` (`trainer_id`, `full_name`, `age`, `sex`, `IC_Passport`, `active_status`, `phone`, `email_id`, `address`, `sign_up_date`, `experience`, `salary`) VALUES
(1, 'Trainer 1', 30, 'Male', '1234567890', 1, '123-456-7890', 'trainer1@example.com', '123 Gym St, City', '2024-04-01', 5, NULL),
(3, 'Trainer 3', 28, 'Male', '5678901234', 1, '567-890-1234', 'trainer3@example.com', '789 Workout Ave, Village', '2024-04-03', 3, NULL),
(4, 'Trainer 4', 40, 'Female', '4321098765', 1, '432-109-8765', 'trainer4@example.com', '321 Exercise Rd, Countryside', '2024-04-04', 10, NULL),
(5, 'Trainer 5', 25, 'Male', '9876543210', 1, '987-654-3210', 'trainer5@example.com', '654 Health Lane, Suburb', '2024-04-05', 2, NULL),
(6, 'Areeba Rocks Ibrahim', 30, 'Male', 'A1234567', 1, '60123456789', 'ahmad.ibrahim@example.com', '123 Main Street, Kuala Lumpur', '2024-01-15', 5, '3000.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Announcements`
--
ALTER TABLE `Announcements`
  ADD PRIMARY KEY (`announcement_id`);

--
-- Indexes for table `Attendance`
--
ALTER TABLE `Attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `Members`
--
ALTER TABLE `Members`
  ADD PRIMARY KEY (`member_id`),
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `trainer_id` (`trainer_id`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `Plans`
--
ALTER TABLE `Plans`
  ADD PRIMARY KEY (`plan_id`);

--
-- Indexes for table `Salaries`
--
ALTER TABLE `Salaries`
  ADD PRIMARY KEY (`salary_id`),
  ADD KEY `trainer_id` (`trainer_id`);

--
-- Indexes for table `Trainers`
--
ALTER TABLE `Trainers`
  ADD PRIMARY KEY (`trainer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Announcements`
--
ALTER TABLE `Announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Attendance`
--
ALTER TABLE `Attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `Members`
--
ALTER TABLE `Members`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `Plans`
--
ALTER TABLE `Plans`
  MODIFY `plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Salaries`
--
ALTER TABLE `Salaries`
  MODIFY `salary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Trainers`
--
ALTER TABLE `Trainers`
  MODIFY `trainer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Attendance`
--
ALTER TABLE `Attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`);

--
-- Constraints for table `Members`
--
ALTER TABLE `Members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `Plans` (`plan_id`),
  ADD CONSTRAINT `members_ibfk_2` FOREIGN KEY (`trainer_id`) REFERENCES `Trainers` (`trainer_id`);

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`);

--
-- Constraints for table `Salaries`
--
ALTER TABLE `Salaries`
  ADD CONSTRAINT `salaries_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `Trainers` (`trainer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
