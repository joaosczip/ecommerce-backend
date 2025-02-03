export default () => ({
	database: {
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "root",
		password: "root",
		database: "test",
		entities: [__dirname + "../**/models/*.ts"],
		migrations: [__dirname + "./migrations/*.ts"],
	},
});
