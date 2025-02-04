import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

import { OrdersModule } from "@modules/orders/orders.module";

describe("OrdersController", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [OrdersModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe("Given a valid order containing valid items", () => {
		it("should create it on the database and return 201", async () => {
			const response = await request(app.getHttpServer())
				.post("/orders")
				.send({
					customerId: "123",
					amount: 100,
					items: [
						{
							productId: "SKU-123",
							quantity: 1,
						},
						{
							productId: "SKU-456",
							quantity: 1,
						},
					],
				});

			expect(response.status).toBe(201);
		});
	});
});
