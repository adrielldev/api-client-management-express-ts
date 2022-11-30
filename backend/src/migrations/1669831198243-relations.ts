import { MigrationInterface, QueryRunner } from "typeorm";

export class relations1669831198243 implements MigrationInterface {
    name = 'relations1669831198243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "telefone" ("id" uuid NOT NULL, "telefone" character varying NOT NULL, "clienteId" uuid, "contatoId" uuid, CONSTRAINT "PK_6b27db34d6da7b23e8680a55fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contato" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9592a5553a9dfaeebe7d0cd0e5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email" ("id" uuid NOT NULL, "email" character varying NOT NULL, "clienteId" uuid, "contatoId" uuid, CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" uuid NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "telefone" ADD CONSTRAINT "FK_e808dcdf3481e353bda0ef2fe8e" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "telefone" ADD CONSTRAINT "FK_2f66b7e6fa34678c115497f8950" FOREIGN KEY ("contatoId") REFERENCES "contato"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_a1c5900409b7215d8aa59c03c8b" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_fd75639746c5765799c5c5546ae" FOREIGN KEY ("contatoId") REFERENCES "contato"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_fd75639746c5765799c5c5546ae"`);
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_a1c5900409b7215d8aa59c03c8b"`);
        await queryRunner.query(`ALTER TABLE "telefone" DROP CONSTRAINT "FK_2f66b7e6fa34678c115497f8950"`);
        await queryRunner.query(`ALTER TABLE "telefone" DROP CONSTRAINT "FK_e808dcdf3481e353bda0ef2fe8e"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "email"`);
        await queryRunner.query(`DROP TABLE "contato"`);
        await queryRunner.query(`DROP TABLE "telefone"`);
    }

}
