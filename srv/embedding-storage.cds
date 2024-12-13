using { cap.ai.demo as db } from '../db/schema';

service EmbeddingStorageService @(path: '/embeddings') {

  entity DocumentChunk as projection on db.DocumentChunk excluding {
    embedding
  };

  action storeEmbeddings(text : String) returns String;

}
