/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableItem1734553566886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE items (
                id UUID DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL UNIQUE,
                "imageId" VARCHAR(255),
                PRIMARY KEY (id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
