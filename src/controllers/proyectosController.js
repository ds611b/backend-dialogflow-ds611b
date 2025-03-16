import Proyecto from '../models/ProyectoSocial.js';
import CatalogModalidad from '../models/CatalogModalidad.js';
import { createErrorResponse } from '../utils/errorResponse.js';

/**
 * Controlador para obtener todos los proyectos sociales, incluyendo su modalidad.
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
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
    reply.status(500).send(createErrorResponse(
      'Error al obtener los proyectos sociales',
      'ERR_GET_PROYECTOS',
      error
    ));
  }
}

/**
 * Controlador para crear un nuevo proyecto social.
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
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
    reply.code(201).send({ proyecto });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send(createErrorResponse(
      'Error al crear el proyecto social',
      'ERR_CREATE_PROYECTO',
      error
    ));
  }
}

/**
 * Controlador para actualizar un proyecto social existente.
 * @param {import('fastify').FastifyRequest} request - La solicitud Fastify.
 * @param {import('fastify').FastifyReply} reply - La respuesta Fastify.
 */
export async function updateProyecto(request, reply) {
  try {
    const { id } = request.params;
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

    // Buscar el proyecto por su ID.
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      return reply.status(404).send(createErrorResponse(
        'Proyecto no encontrado',
        'ERR_PROYECTO_NO_ENCONTRADO'
      ));
    }

    // Actualizar los campos del proyecto.
    await proyecto.update({
      nombre,
      institucion,
      ubicacion,
      modalidad_id,
      horarios,
      remuneracion_economica,
      descripcion,
      fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : null,
      fecha_fin: fecha_fin ? new Date(fecha_fin) : null
    });

    // Devuelve el proyecto actualizado.
    reply.send({ proyecto });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send(createErrorResponse(
      'Error al actualizar el proyecto social',
      'ERR_UPDATE_PROYECTO',
      error
    ));
  }
}

export async function getProyectoId(request, reply) {
  try {
    const { id } = request.params;
    const proyecto = await Proyecto.findByPk(id, {
      include: {
        model: CatalogModalidad,
        as: 'modalidad'
      }
    });
    if (!proyecto) {
      return reply.status(404).send(createErrorResponse(
        'Proyecto no encontrado',
        'ERR_PROYECTO_NO_ENCONTRADO'
      ));
    }
    reply.send({ proyecto });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send(createErrorResponse(
      `Error al obtener el proyecto social con ID:${request.params.id} `
    ));
  }
}

/**
 * Elimina un proyecto social por su ID.
 * @param {import('fastify').FastifyRequest} request - La solicitud de Fastify.
 * @param {import('fastify').FastifyReply} reply - La respuesta de Fastify.
 */
export async function deleteProyecto(request, reply) {
  const { id } = request.params;

  try {
    const proyecto = await Proyecto.findByPk(id);

    if (!proyecto) {
      return reply.status(404).send({
        success: false,
        error: {
          code: 'ERR_PROYECTO_NO_ENCONTRADO',
          message: 'Proyecto no encontrado',
          details: null
        }
      });
    }

    await proyecto.destroy();

    return reply.status(200).send({
      success: true,
      message: 'Proyecto eliminado exitosamente'
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      error: {
        code: 'ERR_DELETE_PROYECTO',
        message: 'Error al eliminar el proyecto social',
        details: error.message
      }
    });
  }
}

export default { getProyectos, createProyecto, updateProyecto, getProyectoId, deleteProyecto }