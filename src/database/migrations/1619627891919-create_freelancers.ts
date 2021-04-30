import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createFreelancers1619627891919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'freelancers',
            columns: [
              {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
              },
              {
                name: 'about',
                type: 'text',
              },
              {
                name: 'portfolio',
                type: 'varchar'
              },
              {
                name: 'latitude',
                type: 'decimal',
                scale: 10,
                precision: 2
              },
              {
                name: 'longitude',
                type: 'decimal',
                scale: 10,
                precision: 2,
              },
              {
                name: 'mobile',
                type: 'varchar'
              },
              {
                name: 'type',
                type: 'varchar'
              },
              {
                name: 'opening_hours',
                type: 'varchar'
              },
              {
                name: 'open_on_weekends',
                type: 'boolean'
              },
            ],  
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('freelancers')
    }

}
