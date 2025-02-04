import { ArrayMinSize, IsArray, IsDecimal, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { OrderCreationAttributes } from "../models/order";
import { OrderItemCreationAttributes } from "../models/order-item";
import { Type } from "class-transformer";

class OrderItemForNewOrderDTO implements Omit<OrderItemCreationAttributes, "order"> {
	@IsNotEmpty()
	@IsString()
	productId: string;

	@IsNotEmpty()
	@IsInt()
	quantity: number;
}

export class PlaceNewOrderDTO implements Omit<OrderCreationAttributes, "items"> {
	@IsNotEmpty()
	@IsDecimal()
	amount: number;

	@IsNotEmpty()
	@IsString()
	customerId: string;

	@IsArray()
	@ArrayMinSize(1, { message: "There must be at least one item in the order" })
	@ValidateNested({ each: true })
	@Type(() => OrderItemForNewOrderDTO)
	items: OrderItemForNewOrderDTO[];
}
