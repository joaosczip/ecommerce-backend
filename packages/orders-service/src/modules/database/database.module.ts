import { Module, DynamicModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

export const MAIN_DATABSE_PROVIDER = Symbol("MAIN_DATABASE_PROVIDER");

type DatabaseModuleOptions = {};

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

@Module({})
export class DatabaseModule {
	static forRoot({}: DatabaseModuleOptions): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [ConfigModule],
			providers: [
				{
					provide: MAIN_DATABSE_PROVIDER,
					useFactory: async () => {},
				},
			],
			exports: [MAIN_DATABSE_PROVIDER],
		};
	}
}
