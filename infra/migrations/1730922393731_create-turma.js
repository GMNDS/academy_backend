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
  pgm.createTable('turma', {
    id: 'id',
    professor_id: {
      type: 'integer',
      notNull: true,
      references: 'professor',
      onDelete: 'CASCADE'
    },
    disciplina_id: {
      type: 'integer',
      notNull: true,
      references: 'disciplina',
      onDelete: 'CASCADE'
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('turma');
};
