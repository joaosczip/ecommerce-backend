import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";

import { DatabaseModule } from "@modules/database/database.module";
import { OrdersService } from "./services/orders.service";

@Module({
	imports: [DatabaseModule],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
