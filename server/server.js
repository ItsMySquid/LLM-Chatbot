import express, {text} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import {AIMessage, HumanMessage} from "@langchain/core/messages";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const model = new AzureChatOpenAI({
    temperature: 0.3,
    verbose: false,
    maxTokens: 200,
});

const embeddings = new AzureOpenAIEmbeddings({
    temperature: 0,
    azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_EMBEDDING_DEPLOYMENT_NAME
});

const vectorStore = await FaissStore.load("guidestore", embeddings)


const API_KEY = process.env.HYPIXEL_API_KEY;

// Ervaringstabellen
const experienceTable = [
    { level: 0, experienceRequired: 0 },
    { level: 1, experienceRequired: 50 },
    { level: 2, experienceRequired: 125 },
    { level: 3, experienceRequired: 200 },
    { level: 4, experienceRequired: 300 },
    { level: 5, experienceRequired: 500 },
    { level: 6, experienceRequired: 750 },
    { level: 7, experienceRequired: 1000 },
    { level: 8, experienceRequired: 1500 },
    { level: 9, experienceRequired: 2000 },
    { level: 10, experienceRequired: 3500 },
    { level: 11, experienceRequired: 5000 },
    { level: 12, experienceRequired: 7500 },
    { level: 13, experienceRequired: 10000 },
    { level: 14, experienceRequired: 15000 },
    { level: 15, experienceRequired: 20000 },
    { level: 16, experienceRequired: 30000 },
    { level: 17, experienceRequired: 50000 },
    { level: 18, experienceRequired: 75000 },
    { level: 19, experienceRequired: 100000 },
    { level: 20, experienceRequired: 200000 },
    { level: 21, experienceRequired: 300000 },
    { level: 22, experienceRequired: 400000 },
    { level: 23, experienceRequired: 500000 },
    { level: 24, experienceRequired: 600000 },
    { level: 25, experienceRequired: 700000 },
    { level: 26, experienceRequired: 800000 },
    { level: 27, experienceRequired: 900000 },
    { level: 28, experienceRequired: 1000000 },
    { level: 29, experienceRequired: 1100000 },
    { level: 30, experienceRequired: 1200000 },
    { level: 31, experienceRequired: 1300000 },
    { level: 32, experienceRequired: 1400000 },
    { level: 33, experienceRequired: 1500000 },
    { level: 34, experienceRequired: 1600000 },
    { level: 35, experienceRequired: 1700000 },
    { level: 36, experienceRequired: 1800000 },
    { level: 37, experienceRequired: 1900000 },
    { level: 38, experienceRequired: 2000000 },
    { level: 39, experienceRequired: 2100000 },
    { level: 40, experienceRequired: 2200000 },
    { level: 41, experienceRequired: 2300000 },
    { level: 42, experienceRequired: 2400000 },
    { level: 43, experienceRequired: 2500000 },
    { level: 44, experienceRequired: 2600000 },
    { level: 45, experienceRequired: 2750000 },
    { level: 46, experienceRequired: 2900000 },
    { level: 47, experienceRequired: 3100000 },
    { level: 48, experienceRequired: 3400000 },
    { level: 49, experienceRequired: 3700000 },
    { level: 50, experienceRequired: 4000000 },
    { level: 51, experienceRequired: 4300000 },
    { level: 52, experienceRequired: 4600000 },
    { level: 53, experienceRequired: 4900000 },
    { level: 54, experienceRequired: 5200000 },
    { level: 55, experienceRequired: 5500000 },
    { level: 56, experienceRequired: 5800000 },
    { level: 57, experienceRequired: 6100000 },
    { level: 58, experienceRequired: 6400000 },
    { level: 59, experienceRequired: 6700000 },
    { level: 60, experienceRequired: 7000000 }
];
const runecraftingExperienceTable = [
    { level: 0, experienceRequired: 0 },
    { level: 1, experienceRequired: 50 },
    { level: 2, experienceRequired: 150 },
    { level: 3, experienceRequired: 275 },
    { level: 4, experienceRequired: 435 },
    { level: 5, experienceRequired: 635 },
    { level: 6, experienceRequired: 885 },
    { level: 7, experienceRequired: 1200 },
    { level: 8, experienceRequired: 1600 },
    { level: 9, experienceRequired: 2100 },
    { level: 10, experienceRequired: 2725 },
    { level: 11, experienceRequired: 3510 },
    { level: 12, experienceRequired: 4510 },
    { level: 13, experienceRequired: 5760 },
    { level: 14, experienceRequired: 7325 },
    { level: 15, experienceRequired: 9325 },
    { level: 16, experienceRequired: 11825 },
    { level: 17, experienceRequired: 14950 },
    { level: 18, experienceRequired: 18950 },
    { level: 19, experienceRequired: 23950 },
    { level: 20, experienceRequired: 30200 },
    { level: 21, experienceRequired: 38050 },
    { level: 22, experienceRequired: 47850 },
    { level: 23, experienceRequired: 60100 },
    { level: 24, experienceRequired: 75400 },
    { level: 25, experienceRequired: 94450 },
];
const socialExperienceTable = [
    { level: 0, experienceRequired: 0 },
    { level: 1, experienceRequired: 50 },
    { level: 2, experienceRequired: 150 },
    { level: 3, experienceRequired: 300 },
    { level: 4, experienceRequired: 550 },
    { level: 5, experienceRequired: 1050 },
    { level: 6, experienceRequired: 1800 },
    { level: 7, experienceRequired: 2800 },
    { level: 8, experienceRequired: 4050 },
    { level: 9, experienceRequired: 5550 },
    { level: 10, experienceRequired: 7550 },
    { level: 11, experienceRequired: 10050 },
    { level: 12, experienceRequired: 13050 },
    { level: 13, experienceRequired: 16800 },
    { level: 14, experienceRequired: 21300 },
    { level: 15, experienceRequired: 27300 },
    { level: 16, experienceRequired: 35300 },
    { level: 17, experienceRequired: 45300 },
    { level: 18, experienceRequired: 57800 },
    { level: 19, experienceRequired: 72800 },
    { level: 20, experienceRequired: 92800 },
    { level: 21, experienceRequired: 117800 },
    { level: 22, experienceRequired: 147800 },
    { level: 23, experienceRequired: 182800 },
    { level: 24, experienceRequired: 222800 },
    { level: 25, experienceRequired: 272800 },
];
const dungeoneeringExperienceTable = [
    { level: 0, experienceRequired: 0 },
    { level: 1, experienceRequired: 50 },
    { level: 2, experienceRequired: 125 },
    { level: 3, experienceRequired: 235 },
    { level: 4, experienceRequired: 395 },
    { level: 5, experienceRequired: 625 },
    { level: 6, experienceRequired: 955 },
    { level: 7, experienceRequired: 1425 },
    { level: 8, experienceRequired: 2095 },
    { level: 9, experienceRequired: 3045 },
    { level: 10, experienceRequired: 4385 },
    { level: 11, experienceRequired: 6275 },
    { level: 12, experienceRequired: 8940 },
    { level: 13, experienceRequired: 12700 },
    { level: 14, experienceRequired: 17960 },
    { level: 15, experienceRequired: 25340 },
    { level: 16, experienceRequired: 35640 },
    { level: 17, experienceRequired: 50040 },
    { level: 18, experienceRequired: 70040 },
    { level: 19, experienceRequired: 97640 },
    { level: 20, experienceRequired: 135640 },
    { level: 21, experienceRequired: 188140 },
    { level: 22, experienceRequired: 259640 },
    { level: 23, experienceRequired: 356640 },
    { level: 24, experienceRequired: 488640 },
    { level: 25, experienceRequired: 668640 },
    { level: 26, experienceRequired: 911640 },
    { level: 27, experienceRequired: 1239640 },
    { level: 28, experienceRequired: 1684640 },
    { level: 29, experienceRequired: 2284640 },
    { level: 30, experienceRequired: 3084640 },
    { level: 31, experienceRequired: 4149640 },
    { level: 32, experienceRequired: 5559640 },
    { level: 33, experienceRequired: 7459640 },
    { level: 34, experienceRequired: 9959640 },
    { level: 35, experienceRequired: 13259640 },
    { level: 36, experienceRequired: 17559640 },
    { level: 37, experienceRequired: 23159640 },
    { level: 38, experienceRequired: 30359640 },
    { level: 39, experienceRequired: 39559640 },
    { level: 40, experienceRequired: 51559640 },
    { level: 41, experienceRequired: 66559640 },
    { level: 42, experienceRequired: 85559640 },
    { level: 43, experienceRequired: 109559640 },
    { level: 44, experienceRequired: 139559640 },
    { level: 45, experienceRequired: 177559640 },
    { level: 46, experienceRequired: 225559640 },
    { level: 47, experienceRequired: 285559640 },
    { level: 48, experienceRequired: 360559640 },
    { level: 49, experienceRequired: 453559640 },
    { level: 50, experienceRequired: 569809640 },
];


// Functie om het niveau te berekenen op basis van de huidige ervaring
function calculateLevel(currentExperience) {
    let level = 0;

    // Vind het hoogste niveau dat de speler kan bereiken op basis van hun ervaring
    for (const { level: currentLevel, experienceRequired } of experienceTable) {
        if (currentExperience >= experienceRequired) {
            level = currentLevel;
        } else {
            break;
        }
    }

    return level;
}

// De async functie om het profiel van een speler op te halen en de skill levels te berekenen
async function getPlayerProfile(username) {
    try {
        const uuidRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const uuidData = await uuidRes.json();
        const uuid = uuidData.id;

        const profileRes = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=${API_KEY}&uuid=${uuid}`);
        const profileData = await profileRes.json();
        // console.log(profileData);

        if (!profileData.success || !profileData.profiles) return null;

        const selectedProfile = profileData.profiles.find(profile => profile.selected === true);

        const member = selectedProfile.members[uuid];
        // console.log(member);

        const skills = member.player_data.experience;
        // console.log(skills)

        // Hier berekenen we de levels voor elke skill
        const skillLevels = {};

        for (const [skill, experience] of Object.entries(skills)) {
            if (skill === "SKILL_RUNECRAFTING") {
                skillLevels[skill] = calculateLevel(experience, runecraftingExperienceTable);
            } else if (skill === "SKILL_SOCIAL") {
                skillLevels[skill] = calculateLevel(experience, socialExperienceTable);
            } else if (skill === "SKILL_DUNGEONEERING") {
                skillLevels[skill] = calculateLevel(experience, dungeoneeringExperienceTable);
            } else {
                skillLevels[skill] = calculateLevel(experience);
            }
        }
        // console.log(skillLevels);  // Dit logt de levels van alle skills

        return skillLevels;
    } catch (err) {
        console.error("Fout bij ophalen spelerdata:", err);
        return null;
    }
}

app.post('/', async (req, res) => {
    const { prompt, username, history } = req.body;
    let profileDataText = "";
    let profile;

    // Controleer of history een array is, en of deze niet leeg is
    if (!Array.isArray(history)) {
        return res.status(400).send("Geschiedenis is ongeldig.");
    }

    // Log de geschiedenis voor debuggen, zelfs als deze leeg is
    console.log(history);

    if (username) {
        try {
            profile = await getPlayerProfile(username);

            if (!profile) {
                return res.status(404).send("Kon geen profielinformatie vinden.");
            }

            // Bouw de string van de skill levels
            profileDataText = Object.entries(profile)
                .map(([skill, level]) => `${skill.replace("SKILL_", "")}: ${level}`)
                .join(", ");
        } catch (error) {
            return res.status(500).send("Er is iets mis gegaan bij het ophalen van het profiel.");
        }
    }

    // Verwerk de geschiedenis en voeg berichten toe, zelfs als de geschiedenis leeg is
    const messages = history.map(({ sender, text }) => {
        return sender === "user" ? new HumanMessage(text) : new AIMessage(text);
    });

    // Voeg het huidige gebruikersbericht toe, ongeacht de geschiedenis
    messages.push(new HumanMessage(prompt));

    // Haal relevante documenten op uit de vector store
    let context = "";
    try {
        const relevantDocs = await vectorStore.similaritySearch("What is this document about?", 3);
        context = relevantDocs.map(doc => doc.pageContent).join("\n\n");
    } catch (error) {
        return res.status(500).send("Er is iets mis gegaan bij het ophalen van de documenten.");
    }

    // Bouw het prompt op basis van gebruikersinformatie
    let engineeredPrompt = "";
    if (username && profileDataText) {
        engineeredPrompt = `Je bent een behulpzame en ervaren Hypixel Skyblock-gids. Hier zijn de statistieken van speler ${username}: ${profileDataText}. Beantwoord de volgende vraag op basis van deze gegevens: "${prompt}". Geef een kort, duidelijk en persoonlijk antwoord dat relevant is voor deze speler.`;
    } else {
        engineeredPrompt = `Je bent een behulpzame en ervaren Hypixel Skyblock-gids. Beantwoord de volgende algemene vraag: "${prompt}". Houd het antwoord duidelijk en kort, gericht op zowel beginners als ervaren spelers.`;
    }

    // Vraag aan het model voor een antwoord
    let response;
    try {
        response = await model.invoke([
            ["system", "Use only the following context to answer the user's question."],
            ["user", `Context: ${context}\n\nQuestion: ${prompt}`]
        ]);
        console.log("Answer found:");
        console.log(response.content);
    } catch (error) {
        return res.status(500).send("Er is iets mis gegaan bij het verkrijgen van een antwoord.");
    }

    // Stream de reactie naar de client
    try {
        const stream = await model.stream(engineeredPrompt);
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        for await (const chunk of stream) {
            res.write(chunk.content);
        }

        res.end();
    } catch (error) {
        return res.status(500).send("Er is iets mis gegaan bij het streamen van het antwoord.");
    }
});


app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
