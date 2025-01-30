import { DataSource } from "typeorm";

export const databaseProviders = [
	{
		provide: "MAIN_DATABASE",
		useFactory: async () => {
			const dataSource = new DataSource({
				type: "postgres",
				host: "localhost",
				port: 5432,
				username: "root",
				password: "root",
				database: "test",
				entities: [__dirname + "../**/models/*.ts"],
				synchronize: true,
			});

			return dataSource.initialize();
		},
	},
];
