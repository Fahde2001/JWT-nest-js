-- AlterTable
ALTER TABLE `user` ADD COLUMN `provider` ENUM('Email', 'Google') NULL;
