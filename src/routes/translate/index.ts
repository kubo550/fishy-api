import {FastifyPluginAsync} from "fastify"
import * as yup from "yup";
import {gpt} from "../../infrastructure/gpt-client";
import {GptApiPrompts} from "../../utils/gpt-api-prompts";

const schema = {
    body: yup.object().shape({
        phrases: yup.array().max(100).of(yup.object().shape({
            id: yup.string(),
            phrase: yup.string().required().max(100, 'Phrase must be less than 100 characters'),
        }))
    }),
};


type Phrase = {
    id: string;
    phrase: string;
}
const translate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/', {
        schema, validatorCompiler: ({schema}) => {
            return (data) => {
                // @ts-ignore
                return schema.validate(data, {strict: true, abortEarly: false})
            }
        }
    }, async function (request, reply) {
        try {
            const {phrases} = request.body as { phrases: Phrase[] }
            const translated = gpt.prompt(GptApiPrompts.translatePhrases(), JSON.stringify(phrases))
            return {
                phrases: translated
            }
        } catch (e) {
            reply.code(500)
            return {
                error: 'Something went wrong, please try again later'
            }
        }

    })
}

export default translate;
