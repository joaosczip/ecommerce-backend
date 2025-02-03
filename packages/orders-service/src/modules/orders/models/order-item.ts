import { Order } from "./order";

export class OrderItem {
	id: string;
	productId: string;
	quantity: number;
	order: Order;
	createdAt: Date;
	updatedAt: Date;
}
