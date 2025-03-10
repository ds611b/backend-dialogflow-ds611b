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
        as: 'modalidad'
      }
    });
    reply.code(200).send({ proyectos });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Error al obtener proyectos sociales' });
  }
}

/**
 * Controlador para crear un nuevo proyecto social.
 * @param {import('fastify').FastifyRequest} request - La solicitud Fastify.
 * @param {import('fastify').FastifyReply} reply - La respuesta Fastify.
 */
export async function createProyecto(request, reply) {
  try {
    const {
      nombre,
      institucion,
      ubicacion,
      modalidad_id,
      horarios,
      remuneracion_economica,
      descripcion,
      fecha_inicio,
      fecha_fin
    } = request.body;

    // Crear el proyecto en la base de datos.
    const proyecto = await Proyecto.create({
      nombre,
      institucion,
      ubicacion,
      modalidad_id,
      horarios,
      remuneracion_economica: remuneracion_economica || false,
      descripcion,
      fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : null,
      fecha_fin: fecha_fin ? new Date(fecha_fin) : null
    });

    // Devuelve el proyecto creado con código 201.
    reply.code(201).send({ proyecto });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Error al crear el proyecto social' });
  }
}

export default { getProyectos, createProyecto }