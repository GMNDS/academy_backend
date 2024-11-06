import { Campus } from "../models/Campus";

export class CampusController {
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
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ message: "ID do campus é obrigatório" });
			}

			const campus = await Campus.getById(id);

			if (!campus) {
				return res.status(404).json({ message: "Campus não encontrado" });
			}

			return res.status(200).json(campus);
		} catch (error) {
			const message_error = `Erro ao obter campus: ${error.message}`;
			console.log(message_error);
			return res.status(500).json({ message: message_error });
		}
	}

	async create(req, res) {
		const body = req.body;
		if (!body.nome) {
			return res.status(400).json({ message: "Nome do campus é obrigatório" });
		}
		const campus = new Campus(body);
		try {
			await campus.create();
			return res.status(200).json(campus);
		} catch (error) {
			const message_error = `Erro ao criar campus: ${error.message}`;
			return res.status(500).json({ message: message_error });
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;
			const { nome } = req.body;

			if (!id) {
				return res.status(400).json({ message: "ID do campus é obrigatório" });
			}

			if (!nome) {
				return res
					.status(400)
					.json({ message: "Nome do campus é obrigatório" });
			}

			const campus = await Campus.getById(id);

			if (!campus) {
				return res.status(404).json({ message: "Campus não encontrado" });
			}
			const nome_antigo = campus.nome;
			campus.nome = nome;

			const updatedCampus = await campus.update();

			return res
				.status(200)
				.json(
					`Campus "${nome_antigo}" atualizado para "${updatedCampus.nome}" com sucesso`,
				);
		} catch (error) {
			const message_error = `Erro ao atualizar campus: ${error.message}`;
			console.log(message_error);
			return res.status(500).json({ message: message_error });
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				return res
					.status(400)
					.json({ message: "É necesário um id para esse endpoint" });
			}

			const campus = await Campus.getById(id);

			if (!campus) {
				return res.status(404).json({ message: "Campus não encontrado" });
			}

			const deletedCampus = campus.delete();
			return res.status(200).json({ deletedCampus });
		} catch (error) {
			const message_error = `Erro ao deletar campus: ${error.message}`;
			console.log(message_error);
			return res.status(500).json({ message: message_error });
		}
	}
}
