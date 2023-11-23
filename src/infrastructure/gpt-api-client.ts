import axios, {AxiosInstance} from "axios";

export class GptApiClient {
    private apiClient: AxiosInstance

    constructor(private readonly baseUrl: string, private readonly apiKey: string) {
        this.apiClient = axios.create({
            baseURL: this.baseUrl,
            headers: this.headers
        })

    }

    get headers() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
        }
    }

    private get promptOptions() {
        return {
            max_tokens: 100,
            temperature: 0.1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ['\n', 'Phrases:'],
        }
    }

    async prompt(prompt: string) {
        const response = await this.apiClient.request({
            url: this.baseUrl,
            method: 'POST',
            headers: this.headers,
            data: {
                ...this.promptOptions,
                prompt
            }
        })
        return response.data
    }
}

export const gptApiClient = new GptApiClient(process.env.GPT_API_URL!, process.env.GPT_API_KEY!)