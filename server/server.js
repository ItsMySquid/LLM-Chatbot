import express from 'express'
import cors from 'cors'
import { AzureChatOpenAI } from "@langchain/openai";

const model = new AzureChatOpenAI({
    temperature: 0.5,
    verbose: false,
    maxTokens: 40,
});

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    const engineeredPrompt = `Beantwoord de volgende vraag als een Hypixel Skyblock-speler. Houd het antwoord kort en duidelijk: ${prompt}`;

    const stream = await model.stream(engineeredPrompt);

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of stream) {
        res.write(chunk.content); // Stuur elk stukje tekst zodra het beschikbaar is
    }

    res.end();
});


app.listen(3000, () => console.log(`Server running on http://localhost:3000`))