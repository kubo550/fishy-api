import {FastifyPluginAsync} from "fastify"
import {gptApiClient} from "../../infrastructure/gpt-api-client";
import {GptApiPrompts} from "../../utils/gpt-api-prompts";
import * as yup from 'yup';



const extractPhrases: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const schema = {
        body: yup.object().shape({
            text: yup.string().required().max(500, 'Text must be less than 500 characters'),
        }),
    };

    fastify.post('/', {schema, validatorCompiler: ({schema}) => {
            return (data) => {
                // @ts-ignore
                return schema.validate(data, {strict: true})
            }
        },
    }, async function (request, reply) {
        try {
            const {text} = request.body as { text: string }


            const prompt = GptApiPrompts.extractPhrasesFromText(text)
            const extractedPhrases = await gptApiClient.prompt(prompt)
            console.log(extractedPhrases)

        } catch (e) {
            return {
                message: 'hello'
            }
        }
    })
}

export default extractPhrases;
