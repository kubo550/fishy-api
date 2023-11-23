import {FastifyPluginAsync} from "fastify"
import {gptApiClient} from "../../infrastructure/gpt-api-client";

const translate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        const result = gptApiClient.prompt(`
            
        `)

        return result;
    })
}

export default translate;
