import { Database } from "../../infra/database";

export class Campus {
	constructor(campus = {}) {
		this.id = campus.id;
		this.nome = campus.nome?.trim();
	}

	async create() {
		if (!this.nome) {
			throw new Error("Nome do campus não definido");
		}
		const newCampus = await new Database().query(
			"INSERT INTO campus (nome) VALUES ($1) RETURNING *",
			[this.nome],
		);
		console.log("Campus criado com sucesso");
		return newCampus[0] ? newCampus[0] : null;
	}

	static async getAll() {
		const rows = await new Database().query("SELECT * FROM campus");
		return rows?.length ? rows.map((row) => new Campus(row)) : [];
	}

	static async getById(id) {
		if (!Number.isInteger(id) || id <= 0) {
			throw new Error("ID inválido");
		}

		const rows = await new Database().query(
			"SELECT * FROM campus WHERE id = $1",
			[id],
		);
		return rows[0] ? new Campus(rows[0]) : null;
	}

	static async getByName(name) {
		const rows = await new Database().query(
			"SELECT * FROM campus WHERE nome = $1",
			[name],
		);
		return rows[0] ? new Campus(rows[0]) : null;
	}

	async update() {
		if (!Number.isInteger(this.id) || this.id <= 0) {
			throw new Error("ID inválido");
		}

		if (!this.nome) {
			throw new Error("Nome do campus não definido");
		}

		const updateCampus = await new Database().query(
			"UPDATE campus SET nome = $1 WHERE id = $2 RETURNING *",
			[this.nome, this.id],
		);
		console.log("Campus atualizado com sucesso");
		return updateCampus[0] ? new Campus(updateCampus[0]) : null;
	}

	async delete() {
		if (!Number.isInteger(this.id) || this.id <= 0) {
			throw new Error("ID inválido");
		}
		const deletedCampus = await new Database().query(
			"DELETE FROM campus WHERE id = $1 RETURNING *",
			[this.id],
		);
		console.log(`Campus ${this.nome} deletado`);
		return deletedCampus[0] ? deletedCampus[0] : null;
	}
}
