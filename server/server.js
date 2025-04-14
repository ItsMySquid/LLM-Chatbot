import express from 'express'
import cors from 'cors'
import { AzureChatOpenAI } from "@langchain/openai";

const model = new AzureChatOpenAI({ temperature: 1 });

const app = express()
app.use(cors())

app.get('/', async (req, res) => {
    const result = await tellJoke()
    res.json({ message: result })
})

async function tellJoke() {
    const joke = await model.invoke("Tell me a Javascript joke!")
    return joke.content
}

app.listen(3000, () => console.log(`Server running on http://localhost:3000`))