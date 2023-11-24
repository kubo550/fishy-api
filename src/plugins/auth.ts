import fp from 'fastify-plugin'
import {config} from "../config";

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

export default fp<SupportPluginOptions>(async (fastify, opts) => {
 // authorization
    fastify.addHook('onRequest', async (request, reply) => {
        const authHeader = request.headers.authorization;
        if (!authHeader || !isValidAuthHeader(authHeader)) {
            reply.code(401).send({error: 'Unauthorized'})
        }
    });
})

function isValidAuthHeader(authHeader: string) {
    return authHeader === config.get().authToken;
}

