import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { DataSource } from "typeorm";

export const MAIN_DATABSE_PROVIDER = Symbol("MAIN_DATABASE_PROVIDER");

type DatabaseConfig = {
	type: "postgres";
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
	entities: string[];
	migrations: string[];
};

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: MAIN_DATABSE_PROVIDER,
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const databaseConfig = configService.get<DatabaseConfig>("database");

				const dataSource = new DataSource(databaseConfig);

				return dataSource.initialize();
			},
		},
	],
	exports: [MAIN_DATABSE_PROVIDER],
})
export class DatabaseModule {}
