import { Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "src/modules/database/prisma.service";

import { Order, OrderStatus } from "../models/order";
import { OrderItem } from "../models/order-item";
import { PlaceNewOrderDTO } from "../dtos/place-new-order.dto";

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
					order,
				}),
		);

		return order;
	}
}
