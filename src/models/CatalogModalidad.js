import { DataTypes } from 'sequelize';
import sequelize from './db.js';

/**
 * Modelo que representa la tabla 'catalog_modalidad'.
 * Este modelo almacena las modalidades predefinidas (ej. 'Presencial', 'Virtual').
 */
const CatalogModalidad = sequelize.define('CatalogModalidad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'catalog_modalidad',
  timestamps: false
});

export default CatalogModalidad;
