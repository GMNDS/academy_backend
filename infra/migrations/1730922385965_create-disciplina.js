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
	pgm.createTable("disciplina", {
		id: "id",
		coordenador_id: {
			type: "integer",
			references: "professor",
			onDelete: "SET NULL",
		},
		nome: { type: "varchar(100)", notNull: true },
		codigo: { type: "varchar(10)", notNull: true },
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("disciplina");
};
