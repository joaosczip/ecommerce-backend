import { Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "@modules/database/prisma.service";

import { Order, OrderStatus } from "@modules/orders/models/order";
import { OrderItem } from "@modules/orders/models/order-item";
import { PlaceNewOrderDTO } from "@modules/orders/dtos/place-new-order.dto";

@Injectable()
export class OrdersService {
	constructor(
		@Inject(PrismaService)
		private prismaService: PrismaService,
	) {}

	async create({ customerId, amount, items }: PlaceNewOrderDTO): Promise<Order> {
		const record = await this.prismaService.order.create({
			data: {
				customerId,
				amount,
				items: {
					create: items,
				},
				status: OrderStatus.CREATED,
			},
			include: {
				items: true,
			},
		});

		const { items: createdItems, status, ...createdOrderData } = record;

		const order = new Order({
			...createdOrderData,
			status: status as OrderStatus,
		});

		order.items = createdItems.map(
			(item) =>
				new OrderItem({
					...item,
					orderId: order.id,
				}),
		);

		return order;
	}
}
