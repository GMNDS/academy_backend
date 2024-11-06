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
  pgm.createTable('matricula', {
    id: 'id',
    aluno_id: {
      type: 'integer',
      notNull: true,
      references: 'aluno',
      onDelete: 'CASCADE'
    },
    curso_id: {
      type: 'integer',
      notNull: true,
      references: 'curso',
      onDelete: 'CASCADE'
    },
    data_criacao: { type: 'date', notNull: true },
    status_matricula: { type: 'boolean', notNull: true }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('matricula');
};
