/*
  Warnings:

  - You are about to drop the column `status` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `repeat_type_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `repeat_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status_id` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "FK_User_RepetType_RepetTypeId";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "status",
ADD COLUMN     "status_id" UUID NOT NULL DEFAULT 'a2c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b';
ALTER TABLE "task" ALTER COLUMN "status_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "repeat_type_id";

-- DropTable
DROP TABLE "repeat_type";

-- CreateTable
CREATE TABLE "task_status" (
    "id" UUID NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("id")
);
INSERT INTO "task_status" (id, status)
VALUES 
    ('a1c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7a', 'Todo'), 
    ('a1c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7b', 'In Progress'), 
    ('a1c4b5c6-d7e8-4f9a-abcd-2d3e4f5c6a7c', 'Done');


-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "FK_Task_Status_Status__StatusId" FOREIGN KEY ("status_id") REFERENCES "task_status"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
