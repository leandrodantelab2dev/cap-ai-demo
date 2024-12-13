namespace cap.ai.demo;

using { cuid } from '@sap/cds/common';

entity DocumentChunk : cuid {
    text_chunk: LargeString;
    embedding: Vector(1536);
}

