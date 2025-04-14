import express from 'express'
import cors from 'cors'
import { AzureChatOpenAI } from "@langchain/openai";
import { Readable } from "stream";

const model = new AzureChatOpenAI({
    temperature: 0.5,
    verbose: false,
    maxTokens: 40,
});

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// eerste get function
app.get('/', async (req, res) => {
    const result = await tellJoke()
    res.json({ message: result })
})

//eerste pose function
app.post('/', async (req, res) => {
    let prompt = req.body.prompt
    let engineeredPrompt = `Beantwoord de volgende vraag als een Hypixel Skyblock-speler. Houd het antwoord kort en duidelijk: ${prompt}`
    const result = await model.invoke(engineeredPrompt)
    res.json({ message: result.content })
})

//tijdelijke joke function
async function tellJoke() {
    const joke = await model.invoke("Tell me a Javascript joke!")
    return joke.content
}

app.listen(3000, () => console.log(`Server running on http://localhost:3000`))