service ChatService @(path: '/chat')  {

    type RagResponse_AdditionalContents {
        score       : String;
        pageContent : String;
    }

    type RagResponse {
        role               : String;
        content            : String;
        messageTime        : String;
        additionalContents : array of RagResponse_AdditionalContents;
    }

    action getChatRagResponse(user_query : String) returns RagResponse;

}
