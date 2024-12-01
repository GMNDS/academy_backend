import { Campus } from "../models/Campus";

const VALID_FIELDS = {
	nome: true,
};

export class CampusController {
	async create(req, res) {
		try {
			const body = req.body;
			if (!body.nome || typeof body.nome !== "string") {
				return res.status(400).json({
					message: "Nome do campus é obrigatório e deve ser uma string",
				});
			}

			const invalidFields = Object.keys(body).filter(
				(field) => !VALID_FIELDS[field],
			);

			if (invalidFields.length > 0) {
				return res.status(400).json({
					message: `Campos inválidos encontrados`,
					invalidFields: invalidFields,
				});
			}

			const campusExists = await Campus.getByName(body.nome);
			if (campusExists) {
				return res.status(400).json({ message: "O campus já existe" });
			}

			const campus = new Campus(body);
			const createCampus = await campus.create();
			return res.status(201).json({
				message: "O campus foi criado com sucesso",
				campusName: createCampus.nome,
			});
		} catch (error) {
			console.log("Erro interno ao criar campus:", error.message);
			return res
				.status(500)
				.json({ message: "Erro interno ao criar o campus" });
		}
	}

	async getAll(req, res) {
		try {
			const allCampus = await Campus.getAll();
			if (!allCampus) {
				const message_error = "Campus not found";
				console.log(message_error);
				return res.status(404).json({ message: message_error });
			}
			return res.status(200).json(allCampus);
		} catch (error) {
			const message_error = `Erro ao obter campus: ${error.message}`;
			console.log(message_error);
			return res.status(500).json({ message: message_error });
		}
	}

	async getById(req, res) {
		try {
			const id = parseInt(req.params.id);

			if (isNaN(id)) {
				return res
					.status(400)
					.json({ message: "ID inválido, deve ser um número" });
			}

			const campus = await Campus.getById(id);

			if (!campus) {
				return res.status(404).json({ message: "Campus não encontrado" });
			}

			return res.status(200).json(campus);
		} catch (error) {
			const message_error = "Erro interno ao obter campus";
			console.log(`${message_error}: ${error.message}`);
			return res
				.status(500)
				.json({ message: message_error, error: error.message });
		}
	}

	async getByName(req, res) {
		try {
			const { nome } = req.params;

			const campus = await Campus.getByName(nome);

			if (!campus) {
				return res.status(404).json({ message: "Campus não encontrado" });
			}

			return res.status(200).json(campus);
		} catch (error) {
			const message_error = "Erro interno ao obter campus";
			console.log(`${message_error}: ${error.message}`);
			return res
				.status(500)
				.json({ message: message_error, error: error.message });
		}
	}

	async update(req, res) {
		try {
			const id = parseInt(req.params.id);
			const body = req.body;
			const { nome } = body;

			if (isNaN(id)) {
				return res.status(400).json({ message: "ID inválido" });
			}

			const invalidFields = Object.keys(body).filter(
				(field) => !VALID_FIELDS[field],
			);

			if (invalidFields.length > 0) {
				return res.status(400).json({
					message: `Campos inválidos encontrados`,
					invalidFields: invalidFields,
				});
			}

			if (!nome || typeof nome !== "string") {
				return res.status(400).json({
					message: "Nome do campus é obrigatório e deve ser uma string",
				});
			}

			const campusExists = await Campus.getByName(nome);
			if (campusExists) {
				return res
					.status(400)
					.json({ message: "O nome do campus já está em uso" });
			}

			const campus = await Campus.getById(id);

			if (!campus) {
				return res.status(404).json({ message: "Campus não encontrado" });
			}

			const oldName = campus.nome;
			campus.nome = nome;

			const updatedCampus = await campus.update();

			return res.status(200).json({
				message: "Campus atualizado com sucesso",
				oldName: oldName,
				newName: updatedCampus.nome,
			});
		} catch (error) {
			const message_error = "Erro interno ao atualizar campus";
			console.log(message_error, error.message);
			return res
				.status(500)
				.json({ message: message_error, error: error.message });
		}
	}

	async delete(req, res) {
		try {
			const id = parseInt(req.params.id);
			if (isNaN(id)) {
				return res.status(400).json({ message: "ID inválido" });
			}

			const campus = await Campus.getById(id);

			if (!campus) {
				return res.status(404).json({ message: "Campus não encontrado" });
			}

			const deletedCampus = await campus.delete();
			return res.status(200).json({
				message: `O campus "${campus.nome}" foi deletado com sucesso`,
				rows: deletedCampus,
			});
		} catch (error) {
			const message_error = `Erro ao deletar campus: ${error.message}`;
			console.log(message_error);
			return res.status(500).json({ message: message_error });
		}
	}
}
