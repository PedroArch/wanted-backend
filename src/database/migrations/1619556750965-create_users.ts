import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1619556750965 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table ({
      name: 'users',
      columns: [
        { 
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
      },
      { name: "first_name", type: "varchar"},
      { name: "last_name", type: "varchar"},
      { name: "email", type: "varchar"},
      { name: "password", type: "varchar"},
      { name: "city", type: "varchar"},
      { name: "state", type: "varchar"},
      { name: "birthday", type: "date"},
      { name: "avatar", type: "varchar"},
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
