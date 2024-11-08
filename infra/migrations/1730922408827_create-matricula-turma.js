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
	pgm.createTable("matricula_turma", {
		id: "id",
		matricula_id: {
			type: "integer",
			notNull: true,
			references: "matricula",
			onDelete: "CASCADE",
		},
		turma_id: {
			type: "integer",
			notNull: true,
			references: "turma",
			onDelete: "CASCADE",
		},
		nota_id: {
			type: "integer",
			notNull: true,
			references: "nota",
			onDelete: "CASCADE",
		},
		status_turma: { type: "boolean", notNull: true },
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("matricula_turma");
};
