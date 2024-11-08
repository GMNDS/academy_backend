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
	pgm.createTable("presenca", {
		id: "id",
		aluno_id: {
			type: "integer",
			notNull: true,
			references: "aluno",
			onDelete: "CASCADE",
		},
		aula_id: {
			type: "integer",
			notNull: true,
			references: "aula",
			onDelete: "CASCADE",
		},
		faltas: { type: "integer", notNull: true },
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("presenca");
};
