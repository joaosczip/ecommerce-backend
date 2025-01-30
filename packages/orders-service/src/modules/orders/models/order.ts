import { createId } from "@paralleldrive/cuid2";
import { Entity, Column, OneToMany, PrimaryColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { OrderItem } from "./order-item";

enum OrderStatus {
	CREATED = "CREATED",
	APPROVED = "APPROVED",
	PAID = "PAID",
	COMPLETED = "COMPLETED",
	OUT_OF_STOCK = "OUT_OF_STOCK",
	PAYMENT_FAILED = "PAYMENT_FAILED",
	CANCELLED = "CANCELLED",
}

@Entity({
	name: "orders",
})
export class Order {
	@PrimaryColumn({ type: "text" })
	id: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	amount: number;

	@Column({
		type: "enum",
		enum: OrderStatus,
	})
	status: OrderStatus;

	@Column({ type: "text" })
	customerId: string;

	@CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
	updatedAt: Date;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
	items: OrderItem[];

	@BeforeInsert()
	async generateUniqId() {
		this.id = createId();
	}
}
