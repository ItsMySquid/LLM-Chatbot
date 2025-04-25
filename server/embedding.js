import {AzureOpenAIEmbeddings} from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { TextLoader } from "langchain/document_loaders/fs/text";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";

const embeddings = new AzureOpenAIEmbeddings({
    temperature: 0,
    azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME
})

async function createEmbedding() {
    const loader = new TextLoader("./server/Embedding.txt")
    const data = await loader.load()

    const textSplitter = new RecursiveCharacterTextSplitter(
        {chunkSize: 1500, chunkOverlap: 100}
    )
    const splitDocs = await textSplitter.splitDocuments(data)

    const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings)
    await vectorStore.save("guidestore")
    console.log("store is saved!")
}

createEmbedding()