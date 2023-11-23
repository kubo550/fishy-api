import {FastifyPluginAsync} from "fastify"

const translate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/', async function (request, reply) {
        return { message: 'success'}
    })
}

export default translate;
