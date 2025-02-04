import { Body, Controller, Inject, Post } from "@nestjs/common";
import { PlaceNewOrderDTO } from "../dtos/place-new-order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
	constructor(
		@Inject(OrdersService)
		private ordersService: OrdersService,
	) {}

	@Post("")
	async placeNewOrder(@Body() { customerId, amount, items }: PlaceNewOrderDTO) {
		return this.ordersService.create({
			customerId,
			amount,
			items,
		});
	}
}
