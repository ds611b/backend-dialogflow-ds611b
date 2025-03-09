import { DataTypes } from 'sequelize';
import sequelize from './db.js';
import CatalogModalidad from './CatalogModalidad.js';

/**
 * Modelo que representa la tabla 'proyectos_sociales'.
 */
const Proyecto = sequelize.define('ProyectoSocial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  institucion: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  modalidad_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  horarios: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  remuneracion_economica: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'proyectos_sociales',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Definir la asociación: cada proyecto pertenece a una modalidad del catálogo.
Proyecto.belongsTo(CatalogModalidad, {
  foreignKey: 'modalidad_id',
  as: 'modalidad'
});

export default Proyecto;