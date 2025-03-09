import Proyecto from '../models/ProyectoSocial.js';
import CatalogModalidad from '../models/CatalogModalidad.js';

/**
 * Controlador para obtener todos los proyectos sociales, incluyendo su modalidad.
 * @param {import('fastify').FastifyRequest} request - La solicitud Fastify.
 * @param {import('fastify').FastifyReply} reply - La respuesta Fastify.
 */
export async function getProyectos(request, reply) {
  try {
    const proyectos = await Proyecto.findAll({
      include: {
        model: CatalogModalidad,
        as: 'modalidad',
        attributes: ['descripcion']
      }
    });
    reply.send({ proyectos });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Error al obtener proyectos sociales' });
  }
}

export default { getProyectos }