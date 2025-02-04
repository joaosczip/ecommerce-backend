import { Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "src/modules/database/prisma.service";

import { Order, OrderCreationAttributes, OrderStatus } from "../models/order";
import { OrderItem } from "../models/order-item";

@Injectable()
export class OrdersService {
	constructor(
		@Inject(PrismaService)
		private prismaService: PrismaService,
	) {}

	async create({ customerId, amount, items }: OrderCreationAttributes): Promise<Order> {
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
					order,
				}),
		);

		return order;
	}
}
