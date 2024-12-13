const cds = require('@sap/cds');
const { INSERT } = cds.ql;
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

// Helper method to convert embeddings to buffer for insertion
let array2VectorBuffer = (data) => {
  const sizeFloat = 4;
  const sizeDimensions = 4;
  const bufferSize = data.length * sizeFloat + sizeDimensions;

  const buffer = Buffer.allocUnsafe(bufferSize);
  // write size into buffer
  buffer.writeUInt32LE(data.length, 0);
  data.forEach((value, index) => {
    buffer.writeFloatLE(value, index * sizeFloat + sizeDimensions);
  });
  return buffer;
};

module.exports = function () {

  this.on('storeEmbeddings', async (req) => {
    try {
      const capllmplugin = await cds.connect.to("cap-llm-plugin");
      const { DocumentChunk } = this.entities;

      const EMBEDDING_MODEL_NAME = "text-embedding-ada-002";

      let textChunkEntries = [];
      const textToStore = req.data.text;

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1500,
        chunkOverlap: 150,
        addStartIndex: true
      });

      console.log({ textToStore });

      const textChunks = await splitter.splitText(textToStore);
      console.log(`Text split into ${textChunks.length} chunks.`);

      console.log("Leveraging the CAP LLM plugin to generate the vector embeddings for the text chunks.\n");
      // For each text chunk generate the embeddings
      for (const chunk of textChunks) {
        console.log({ chunk });

        const embeddingModelConfig = cds.env.requires["gen-ai-hub"][EMBEDDING_MODEL_NAME];
        const embeddingResult = await capllmplugin.getEmbeddingWithConfig(embeddingModelConfig, chunk);
        let embedding = null;

        // Using Azure OpenAI's text-embedding-ada-002 model.
        if (EMBEDDING_MODEL_NAME === "text-embedding-ada-002"){
          embedding =  embeddingResult?.data[0]?.embedding;
        } else { 
          throw new Error(`Embedding model ${EMBEDDING_MODEL_NAME} not supported!\n`)
        }

        const entry = {
          "text_chunk": chunk,
          "embedding": array2VectorBuffer(embedding)
        };

        textChunkEntries.push(entry);
      }

      console.log("Inserting text chunks with embeddings into SAP HANA Cloud's vector engine!\n");

      // Insert the text chunk with embeddings into db
      const insertStatus = await INSERT.into(DocumentChunk).entries(textChunkEntries);
      if (!insertStatus) {
        throw new Error("Insertion of text chunks into db failed!");
      }

      console.log('RAG content generation completed!');
    } catch (error) {
      // Handle any errors that occur during the execution
      console.log('Error while generating and storing vector embeddings:', error);
      throw error;
    }

    return "Embeddings stored successfully!";
  });

}