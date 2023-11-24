import {FastifyPluginAsync} from "fastify"
import {GptApiPrompts} from "../../utils/gpt-api-prompts";
import * as yup from 'yup';
import {gpt} from "../../infrastructure/gpt-client";


const schema = {
    body: yup.object().shape({
        text: yup.string().required().max(500, 'Text must be less than 500 characters'),
    }),
};


const extractPhrases: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/', {
        schema, validatorCompiler: ({schema}) => {
            return (data) => {
                // @ts-ignore
                return schema.validate(data, {strict: true, abortEarly: false})
            }
        },
    }, async function (request, reply) {
        try {
            const {text} = request.body as { text: string }

            // const systemPrompt = GptApiPrompts.extractPhrasesFromTextPrompt();
            // const extractedPhrases = await gpt.prompt(systemPrompt, text);

            return {
                phrases: text
            }


        } catch (e) {
            reply.code(500)
            return {
                error: 'Something went wrong, please try again later'
            }
        }
    })
}

export default extractPhrases;
