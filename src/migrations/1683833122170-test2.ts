import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21683833122170 implements MigrationInterface {
    name = 'Test21683833122170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rento"."users" DROP COLUMN "refresh_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rento"."users" ADD "refresh_token" text`);
    }

}
