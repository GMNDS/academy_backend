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
	pgm.createTable("goe_admin", {
		id: "id",
		nome: { type: "varchar(50)", notNull: true },
		sobrenome: { type: "varchar(100)", notNull: true },
		campus_id: {
			type: "integer",
			notNull: true,
			references: "campus",
			onDelete: "CASCADE",
		},
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("goe_admin");
};
