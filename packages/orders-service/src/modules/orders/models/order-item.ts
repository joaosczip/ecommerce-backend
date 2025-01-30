import { createId } from "@paralleldrive/cuid2";
import {
	Column,
	Entity,
	ManyToOne,
	PrimaryColumn,
	BeforeInsert,
	CreateDateColumn,
	UpdateDateColumn,
	Check,
} from "typeorm";

import { Order } from "./order";

@Entity({
	name: "order_items",
})
@Check(`"quantity" > 0`)
export class OrderItem {
	@PrimaryColumn({ type: "text" })
	id: string;

	@Column({ type: "text" })
	productId: string;

	@Column({ type: "int" })
	quantity: number;

	@ManyToOne(() => Order, (order) => order.items)
	order: Order;

	@CreateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
	updatedAt: Date;

	@BeforeInsert()
	async generateUniqId() {
		this.id = createId();
	}
}
