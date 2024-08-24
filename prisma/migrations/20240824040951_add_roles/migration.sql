-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_USER', 'ADMIN', 'CLIENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT';
