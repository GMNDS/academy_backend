import { Client } from "pg";
import dotenv from "dotenv";
dotenv.configDotenv({
	path: ".env.dev",
});

export class Database {
	constructor() {
		this.client = new Client({
			user: process.env.POSTGRES_USER,
			port: process.env.POSTGRES_PORT,
			host: process.env.POSTGRES_HOST,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
		});
		this.connected = false;
	}

	async connect() {
		if (!this.connected) {
			await this.client.connect();
			this.connected = true;
		}
	}

	async disconnect() {
		if (this.connected) {
			await this.client.end();
			this.connected = false;
		}
	}

	async query(query, params = []) {
		try {
			await this.connect();
			const { rows } = await this.client.query(query, params);
			return rows;
		} catch (error) {
			const formattedQuery = query.replace(
				/\$(\d+)/g,
				(_, index) => params[index - 1],
			);
			console.log(params);
			console.error(`Erro ao executar a query ${formattedQuery}`);
			throw error;
		} finally {
			this.disconnect();
		}
	}
}
