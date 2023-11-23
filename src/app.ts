import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import * as yup from 'yup';
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!

  try {
    checkEnvVars()
  } catch (e) {
    console.error('Missing environment variables. Please check .env file.')

    process.exit(1)
  }

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app, options }

const envSchema = yup.object().shape({
  gptApiUrl: yup.string().required(),
  gptApiKey: yup.string().required(),
});
function checkEnvVars() {
  // todo: implement this
  const envVars = {
    gptApiUrl: process.env.GPT_API_URL,
    gptApiKey: process.env.GPT_API_KEY,
  }
  envSchema.validateSync(envVars, {strict: true})
}
