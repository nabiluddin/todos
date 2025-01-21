-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2025-01-08T09:25:27.109Z

CREATE SCHEMA "todos";

CREATE TABLE "todos"."user" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "username" VARCHAR(100) UNIQUE NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "repeat_type_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "modified_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "todos"."repeat_type" (
  "id" UUID PRIMARY KEY,
  "type" VARCHAR(50) NOT NULL
);

CREATE TABLE "todos"."task" (
  "id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()),
  "created_by" UUID NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" VARCHAR,
  "completed" BOOLEAN DEFAULT false,
  "due_date" DATE,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "modified_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE "todos"."task" ADD CONSTRAINT "FK_Task_User_CreatedBy" FOREIGN KEY ("created_by") REFERENCES "todos"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "todos"."user" ADD CONSTRAINT "FK_User_RepetType_RepetTypeId" FOREIGN KEY ("repeat_type_id") REFERENCES "todos"."repeat_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
