import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";

import { PlaceNewOrderDTO } from "./dtos/place-new-order.dto";
import { OrdersService } from "./services/orders.service";

@Controller("orders")
export class OrdersController {
	constructor(
		@Inject(OrdersService)
		private ordersService: OrdersService,
	) {}

	@Post("")
	@HttpCode(201)
	async placeNewOrder(@Body() placeNewOrder: PlaceNewOrderDTO) {
		return this.ordersService.create(placeNewOrder);
	}
}
