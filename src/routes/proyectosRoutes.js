import { getProyectos } from '../controllers/proyectosController.js';

/**
 * Define las rutas para los proyectos sociales.
 * @param {import('fastify').FastifyInstance} fastify - La instancia de Fastify.
 * @param {Object} options - Opciones de registro.
 */
async function proyectoRoutes(fastify, options) {
  fastify.get('/proyectos', {
    schema: {
      description: 'Obtiene todos los proyectos sociales',
      tags: ['Proyectos Sociales'],
      response: {
        200: {
          description: 'Lista de proyectos sociales',
          type: 'object',
          properties: {
            proyectos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  nombre: { type: 'string' },
                  institucion: { type: 'string' },
                  ubicacion: { type: 'string' },
                  modalidad: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      descripcion: { type: 'string' }
                    }
                  },
                  horarios: { type: 'string' },
                  remuneracion_economica: { type: 'boolean' },
                  descripcion: { type: 'string' },
                  fecha_inicio: { type: 'string', format: 'date' },
                  fecha_fin: { type: 'string', format: 'date' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, getProyectos);
}

export default proyectoRoutes;
