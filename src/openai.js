import { Configuration, OpenAIApi } from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAI {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
    }

    constructor(apiKey, defaultModel = 'gpt-4o') {
        const configuration = new Configuration({ apiKey })
        this.openai = new OpenAIApi(configuration)
        this.defaultModel = defaultModel
    }

    async chat(messages, model = this.defaultModel) {
        try {
            const response = await this.openai.createChatCompletion({
                model,
                messages,
            })
            return response.data.choices[0].message
        } catch (e) {
            console.log('Error while gpt chat', e.message)
        }
    }

    async transcription(filepath) {
        try {
            const response = await this.openai.createTranscription(
                createReadStream(filepath),
                'whisper-1'
            )
            return response.data.text
        } catch (e) {
            console.log('Error while transcription', e.message)
        }
    }
}

export const openai = new OpenAI(config.get('OPENAI_KEY'))
