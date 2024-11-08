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
	pgm.createTable("atividade_aberta", {
		id: "id",
		atividade_id: {
			type: "integer",
			notNull: true,
			references: "atividade",
			onDelete: "CASCADE",
		},
		aluno_id: {
			type: "integer",
			notNull: true,
			references: "aluno",
			onDelete: "CASCADE",
		},
		corpo: { type: "varchar(5000)" },
		arquivo: { type: "bytea" },
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("atividade_aberta");
};
