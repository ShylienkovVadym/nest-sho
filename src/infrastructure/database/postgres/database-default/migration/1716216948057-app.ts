import { MigrationInterface, QueryRunner } from "typeorm";

export class App1716216948057 implements MigrationInterface {
    name = 'App1716216948057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."listing_condition_enum" AS ENUM('new', 'used')`);
        await queryRunner.query(`CREATE TABLE "listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "condition" "public"."listing_condition_enum" NOT NULL, "created" TIMESTAMP(3) NOT NULL, "updated" TIMESTAMP(3) NOT NULL, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "listing"`);
        await queryRunner.query(`DROP TYPE "public"."listing_condition_enum"`);
    }

}
