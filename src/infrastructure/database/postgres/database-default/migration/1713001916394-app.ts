import { MigrationInterface, QueryRunner } from "typeorm";

export class App1713001916394 implements MigrationInterface {
    name = 'App1713001916394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "status" "public"."user_status_enum" NOT NULL, "created" TIMESTAMP(3) NOT NULL, "updated" TIMESTAMP(3) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "brand" character varying NOT NULL, "created" TIMESTAMP(3) NOT NULL, "updated" TIMESTAMP(3) NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
