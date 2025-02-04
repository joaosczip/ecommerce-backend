import { SetOptional } from "type-fest";

import { Order } from "./order";

interface OrderItemAttributes {
	id: string;
	productId: string;
	quantity: number;
	order?: Order;
	orderId: string;
	createdAt: Date;
	updatedAt: Date;
}

type OrderItemExcludedKeysForCreation = "id" | "createdAt" | "updatedAt";
export type OrderItemCreationAttributes = Omit<OrderItemAttributes, OrderItemExcludedKeysForCreation>;
export type OrderCreationAttributes = Pick<OrderItemAttributes, "productId" | "quantity">;
type OrderItemConstructor = SetOptional<OrderItemAttributes, OrderItemExcludedKeysForCreation>;

export class OrderItem {
	id: string;
	productId: string;
	quantity: number;
	order?: Order;
	orderId: string;
	createdAt: Date;
	updatedAt: Date;

	constructor({ id, productId, quantity, order, orderId, createdAt, updatedAt }: OrderItemConstructor) {
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
		this.order = order;
		this.orderId = orderId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
