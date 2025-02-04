import { SetOptional } from "type-fest";
import { OrderItem } from "./order-item";

export enum OrderStatus {
	CREATED = "CREATED",
	APPROVED = "APPROVED",
	PAID = "PAID",
	COMPLETED = "COMPLETED",
	OUT_OF_STOCK = "OUT_OF_STOCK",
	PAYMENT_FAILED = "PAYMENT_FAILED",
	CANCELLED = "CANCELLED",
}

export interface OrderAttributes {
	id: string;
	amount: number;
	status: OrderStatus;
	customerId: string;
	createdAt: Date;
	updatedAt: Date;
	items: OrderItem[];
}

type OrderExcludedKeysForCreation = "id" | "status" | "createdAt" | "updatedAt";

export type OrderCreationAttributes = Omit<OrderAttributes, OrderExcludedKeysForCreation>;

type OrderConstructor = SetOptional<OrderAttributes, OrderExcludedKeysForCreation | "items">;

export class Order implements OrderAttributes {
	id: string;
	amount: number;
	status: OrderStatus;
	customerId: string;
	createdAt: Date;
	updatedAt: Date;
	items: OrderItem[];

	constructor({
		id,
		amount,
		status = OrderStatus.CREATED,
		customerId,
		createdAt,
		updatedAt,
		items = [],
	}: OrderConstructor) {
		this.id = id;
		this.amount = amount;
		this.status = status;
		this.customerId = customerId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.items = items;
	}
}
