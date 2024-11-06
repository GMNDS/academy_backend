import { Database } from "../../infra/database";

export class Campus {
	constructor(campus = {}) {
		this.id = campus.id;
		this.nome = campus.nome;
	}

	static async getAll() {
		const rows = await new Database().query("SELECT * FROM campus");
		return rows?.length ? rows.map((row) => new Campus(row)) : [];
	}

	static async getById(id) {
		const rows = await new Database().query(
			"SELECT * FROM campus WHERE id = $1",
			[id],
		);
		return rows[0] ? new Campus(rows[0]) : null;
	}

	async create() {
		if (!this.nome) {
			const message_error = "Nome do campus não pode ser nulo ou vazio";
			console.error(message_error);
			throw new Error(message_error);
		}
		const newCampus = await new Database().query(
			"INSERT INTO campus (nome) VALUES ($1) RETURNING *",
			[this.nome],
		);
		console.log("Campus criado com sucesso");
		return newCampus[0] ? new Campus(newCampus[0]) : null;
	}
	async update() {
		if (!this.id) {
			console.error("É necessário um id correto para atualizar um usuário");
			return null;
		}
		const updateCampus = await new Database().query(
			"UPDATE campus SET nome = $1 WHERE id = $2 RETURNING *",
			[this.nome, this.id],
		);
		console.log("Campus atualizado com sucesso");
		return updateCampus[0] ? new Campus(updateCampus[0]) : null;
	}

	async delete() {
		if (!this.id) return null;
		const deletedCampus = await new Database().query(
			"DELETE FROM campus WHERE id = $1 RETURNING *",
			[this.id],
		);
		console.log(`Campus deletado: \n ${deletedCampus[0]}`);
		return deletedCampus[0] ? new Campus(deletedCampus[0]) : null;
	}
}
