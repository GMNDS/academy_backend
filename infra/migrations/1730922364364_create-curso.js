/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
	pgm.createTable("curso", {
		id: "id",
		campus_id: {
			type: "integer",
			notNull: true,
			references: "campus",
			onDelete: "CASCADE",
		},
		coordenador_id: {
			type: "integer",
			notNull: true,
			references: "professor",
			onDelete: "CASCADE",
		},
		nome: { type: "varchar(100)", notNull: true },
		descricao: { type: "varchar(5000)", notNull: true },
		categoria: { type: "varchar(100)", notNull: true },
		data_criacao: {
			type: "date",
			notNull: true,
			default: pgm.func("CURRENT_TIMESTAMP"),
		},
		status: { type: "boolean", notNull: true },
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("curso");
};
