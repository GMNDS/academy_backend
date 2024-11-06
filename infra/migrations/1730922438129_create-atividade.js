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
  pgm.createTable('atividade', {
    id: 'id',
    turma_id: {
      type: 'integer',
      notNull: true,
      references: 'turma',
      onDelete: 'CASCADE'
    },
    titulo: { type: 'varchar(200)', notNull: true },
    descricao: { type: 'varchar(5000)', notNull: true },
    data_criacao: { type: 'date', notNull: true },
    data_entrega: { type: 'date', notNull: true },
    data_expiracao: { type: 'date', notNull: true },
    pontos: { type: 'float', notNull: true }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('atividade');
};
