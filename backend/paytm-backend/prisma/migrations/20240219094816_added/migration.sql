/*
  Warnings:

  - Added the required column `amount` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL;
