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
	pgm.createTable(
		"evento",
		{
			id: "id",
			titulo: { type: "varchar(255)", notNull: true },
			descricao: { type: "varchar(1000)" },
			corpo: { type: "text", notNull: true },
			autor: {
				type: "integer",
				notNull: true,
				references: "goe_admin",
				onDelete: "CASCADE",
			},
			data_criacao: { type: "date", notNull: true },
			data_edicao: { type: "date", notNull: true },
		},
		{ comment: "Corpo pode ser um blob html" },
	);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("evento");
};
