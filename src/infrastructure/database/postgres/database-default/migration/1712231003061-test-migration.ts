import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1712231003061 implements MigrationInterface {
    name = 'TestMigration1712231003061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created" TYPE TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated" TYPE TIMESTAMP(3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated" TYPE TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created" TYPE TIMESTAMP(6)`);
    }

}
