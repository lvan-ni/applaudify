/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL;
