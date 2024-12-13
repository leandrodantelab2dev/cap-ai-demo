const cds = require('@sap/cds');

const TABLE_NAME = 'CAP_AI_DEMO_DOCUMENTCHUNK';
const EMBEDDING_COLUMN = 'EMBEDDING';
const CONTENT_COLUMN = 'TEXT_CHUNK';

const SYSTEM_PROMPT =  'Você é um chatbot. Responda à pergunta do usuário com base apenas no contexto.'; 

const CHAT_MODEL_NAME = "gpt-4o";
const EMBEDDING_MODEL_NAME = "text-embedding-ada-002";

module.exports = function () {

    this.on('getChatRagResponse', async (req) => {
        try {
            const { user_query } = req.data;
            const capllmplugin = await cds.connect.to("cap-llm-plugin");

            console.log("***********************************************************************************************\n");
            console.log(`Received the request for RAG retrieval for the user query : ${user_query}\n`);

            const chatModelName = "gpt-4o";
            const embeddingModelName = "text-embedding-ada-002";

            console.log(`Leveraing the following LLMs \n Chat Model:  gpt-4o \n Embedding Model: text-embedding-ada-002\n`);

            const chatModelConfig = cds.env.requires["gen-ai-hub"][chatModelName];
            const embeddingModelConfig = cds.env.requires["gen-ai-hub"][embeddingModelName];

            console.log("Getting the RAG retrival response from the CAP LLM Plugin!");

            console.log({ 
                user_query,
                tableName: TABLE_NAME,
                embeddingColumn: EMBEDDING_COLUMN,
                contentColumn: CONTENT_COLUMN,
                systemPrompt: SYSTEM_PROMPT,
                chatModelName: CHAT_MODEL_NAME,
                embeddingModelName: EMBEDDING_MODEL_NAME,
                chatModelConfig
            });
 
            const chatRagResponse = await capllmplugin.getRagResponseWithConfig(
                user_query,  //user query
                TABLE_NAME,   //table name containing the embeddings
                EMBEDDING_COLUMN, //column in the table containing the vector embeddings
                CONTENT_COLUMN, //  column in the table containing the actual content
                SYSTEM_PROMPT, // system prompt for the task
                embeddingModelConfig, //embedding model config
                chatModelConfig, //chat model config
                undefined, //Optional.conversation memory context to be used.
                5  //Optional. topK similarity search results to be fetched. Defaults to 5
            );

            //parse the response object according to the respective model for your use case. For instance, lets consider the following three models.
            let chatCompletionResponse = null;
            if (chatModelName === "gpt-4o") {
                chatCompletionResponse = {
                    "role": chatRagResponse.completion.choices[0].message.role,
                    "content": chatRagResponse.completion.choices[0].message.content
                }
            } else {
                throw new Error("The model supported in this application is 'gpt-4o'. Please customize this application to use any model supported by CAP LLM Plugin. Please make the customization by referring to the comments.")
            }

            //Optional. handle memory after the RAG LLM call
            const responseTimestamp = new Date().toISOString();

            //build the response payload for the frontend.
            const response = {
                "role": chatCompletionResponse.role,
                "content": chatCompletionResponse.content,
                "messageTime": responseTimestamp,
                "additionalContents": chatRagResponse.additionalContents,
            };

            return response;
        } catch (error) {
            // Handle any errors that occur during the execution
            console.log('Error while generating response for user query:', error);
            throw error;
        }
    });

}