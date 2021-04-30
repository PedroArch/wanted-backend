import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1619643880518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table ({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'path',
            type: 'varchar'
          },
          {
            name: 'freelancer_id',
            type: 'integer',
          }
        ],
        foreignKeys: [
          {
            name: 'ImageFreelancer',
            columnNames: ['freelancer_id'],
            referencedTableName: 'freelancers',
            referencedColumnNames: ['id'],
            onUpdate:'CASCADE',
            onDelete:'CASCADE'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images');
    }

}
