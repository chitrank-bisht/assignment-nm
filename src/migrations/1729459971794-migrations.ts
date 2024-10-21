import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1629459971794 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE public."users_role_enum" AS ENUM (
                'user',
                'admin'
            );

            CREATE TABLE public.users (
                id SERIAL PRIMARY KEY,
                email VARCHAR NOT NULL UNIQUE,
                name VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                role public."users_role_enum" DEFAULT 'user' NOT NULL,
                createdAt TIMESTAMP DEFAULT now() NOT NULL,
                updatedAt TIMESTAMP DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE public.users;
            DROP TYPE public."users_role_enum";
        `);
    }
}