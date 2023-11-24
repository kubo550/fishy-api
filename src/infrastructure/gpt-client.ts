import OpenAI from "openai";
import {config} from "../config";

const client = new OpenAI({
    apiKey: config.get().gptApiKey,
});


export class GptClient {

    async prompt(systemPrompt: string, userPrompt: string): Promise<string> {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                {role: "system", content: systemPrompt},
                {role: "user", content: userPrompt},
            ],
            max_tokens: 1024,
            model: config.get().gptApiModel,
        });

        return chatCompletion.choices[0].message.content || '';
    }

}

export const gpt = new GptClient();

