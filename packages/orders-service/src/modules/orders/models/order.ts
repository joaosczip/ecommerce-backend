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

export class Order {
	id: string;
	amount: number;
	status: OrderStatus;
	customerId: string;
	createdAt: Date;
	updatedAt: Date;
	items: OrderItem[];
}
