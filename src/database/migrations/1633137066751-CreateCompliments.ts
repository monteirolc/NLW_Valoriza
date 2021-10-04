import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompliments1633137066751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"compliments",
                columns: [
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid",      
                    },
                    {
                        name:"user_receiver",
                        type:"uuid"
                    },
                    {
                        name:"tag_id",
                        type:"uuid"
                    },
                    {
                        name:"message",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKUserSenderCompliements",
                        referencedTableName: "users",
                        referencedColumnNames:["id"],
                        columnNames:["user_sender"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
                    },
                    {
                        name:"FKUserReceiverCompliements",
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        columnNames:["user_receiver"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL" 
                    },
                    {
                        name:"FKTagCompliements",
                        referencedTableName:"tags",
                        referencedColumnNames:["id"],
                        columnNames:["tag_id"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL" 
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}