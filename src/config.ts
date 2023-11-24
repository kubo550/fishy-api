import * as yup from "yup";

const envSchema = yup.object().shape({
    authToken: yup.string().required(),
    gptApiKey: yup.string().required(),
    gptApiModel: yup.string().required()
});

class Config {
    #env: yup.InferType<typeof envSchema>;

    constructor() {
        this.#env = {
            authToken: '',
            gptApiKey: '',
            gptApiModel: ''
        }
    }

    get() {
        return this.#env;
    }

    loadEnv() {
        const env = {
            authToken: process.env.AUTH_TOKEN,
            gptApiKey: process.env.GPT_API_KEY,
            gptApiModel: process.env.GPT_API_MODEL
        };
        this.#env = envSchema.validateSync(env, {strict: true});
    }
}

export const config = new Config();
