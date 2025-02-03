import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";

import config from "./config";
import { DatabaseModule } from "./database/database.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true,
		}),
		DatabaseModule,
	],
	controllers: [AppController],
})
export class AppModule {}
