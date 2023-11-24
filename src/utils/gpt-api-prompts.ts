export class GptApiPrompts {

    static extractPhrasesFromTextPrompt() {
        return `Divide this text into segments of a few words each, suitable for use on flashcards for foreign language learning. You can skip obvious words such as \'and\', \'so\', \'the\', etc., if they are at the beginning or end of a phrase. Respond only with a JSON of the type phrases: [{phrase: string}]. Do not add anything beyond the JSON. Now, I am pasting the text: `
    }

    static translatePhrases() {
        return ''
    }
}