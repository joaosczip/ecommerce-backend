import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class OrderAndOrderItemCreation1738240472583 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "orders",
				columns: [
					{
						name: "id",
						type: "text",
						isPrimary: true,
					},
					{
						name: "amount",
						type: "decimal",
						precision: 10,
						scale: 2,
						isNullable: false,
					},
					{
						name: "status",
						type: "enum",
						enum: [
							"CREATED",
							"APPROVED",
							"PAID",
							"COMPLETED",
							"OUT_OF_STOCK",
							"PAYMENT_FAILED",
							"CANCELLED",
						],
						isNullable: false,
					},
					{
						name: "customerId",
						type: "text",
						isNullable: false,
					},
					{
						name: "createdAt",
						type: "timestamp with time zone",
						default: "CURRENT_TIMESTAMP",
						isNullable: false,
					},
					{
						name: "updatedAt",
						type: "timestamp with time zone",
						default: "CURRENT_TIMESTAMP",
						isNullable: false,
					},
				],
			}),
		);

		await queryRunner.createTable(
			new Table({
				name: "order_items",
				columns: [
					{
						name: "id",
						type: "text",
						isPrimary: true,
					},
					{
						name: "productId",
						type: "text",
						isNullable: false,
					},
					{
						name: "quantity",
						type: "int",
						isNullable: false,
					},
					{
						name: "orderId",
						type: "text",
						isNullable: false,
					},
					{
						name: "createdAt",
						type: "timestamp with time zone",
						default: "CURRENT_TIMESTAMP",
						isNullable: false,
					},
					{
						name: "updatedAt",
						type: "timestamp with time zone",
						default: "CURRENT_TIMESTAMP",
						isNullable: false,
					},
				],
				checks: [
					{
						expression: `"quantity" > 0`,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			"order_items",
			new TableForeignKey({
				columnNames: ["orderId"],
				referencedColumnNames: ["id"],
				referencedTableName: "orders",
				onDelete: "CASCADE",
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("order_items", "order_items_orderId_fkey");

		await queryRunner.dropTable("order_items");
		await queryRunner.dropTable("orders");
	}
}
