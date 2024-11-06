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
  pgm.createTable('aula', {
    id: 'id',
    turma_id: {
      type: 'integer',
      notNull: true,
      references: 'turma',
      onDelete: 'CASCADE'
    },
    horario_id: {
      type: 'integer',
      notNull: true,
      references: 'horario',
      onDelete: 'CASCADE'
    },
    sala_id: {
      type: 'integer',
      notNull: true,
      references: 'sala',
      onDelete: 'CASCADE'
    },
    data: { type: 'date', notNull: true },
    descricao: { type: 'text', notNull: true }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('aula');
};
