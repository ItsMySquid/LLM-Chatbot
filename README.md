Tuurlijk! Hier is een eerste versie van je `README.md` gebaseerd op je code en projectstructuur:

---

# Hypixel Skyblock Guide API

Dit project is een **Node.js Express server** die informatie biedt over **Hypixel Skyblock**, inclusief ervaringstabellen voor verschillende skills en een integratie met **Azure OpenAI** voor chat- en zoekfunctionaliteit.

## 📚 Functies
- Chatten via een **AzureChatOpenAI** model.
- Zoeken naar informatie in een **FAISS vectorstore** (`guidestore`).
- Ervaringstabellen voor:
  - **Normale Skills** (tot level 60)
  - **Runecrafting** (tot level 25)
  - **Social Skills** (tot level 25)
  - **Dungeoneering** (tot level 50)
- Integratie met de **Hypixel API** (via eigen API-key).

## 🛠️ Gebruikte technologieën
- [Express](https://expressjs.com/)
- [LangChain (AzureChatOpenAI, FaissStore)](https://js.langchain.com/)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)

## 📦 Installatie

1. **Clone de repository**:
   ```bash
   git clone https://github.com/ItsMySquid/LLM-Chatbot.git
   cd LLM-Chatbot
   ```

2. **Installeer de dependencies**:
   ```bash
   npm install
   ```

3. **Zorg voor een `.env` bestand** in de root met de volgende variabelen:
   ```env
   AZURE_OPENAI_API_KEY=your_azure_openai_key
   AZURE_OPENAI_ENDPOINT=your_azure_endpoint
   AZURE_OPENAI_API_VERSION=your_api_version
   AZURE_EMBEDDING_DEPLOYMENT_NAME=your_embedding_deployment_name
   HYPIXEL_API_KEY=your_hypixel_api_key
   ```

4. **Start de server**:
   ```bash
   node index.js
   ```

## 🧠 Structuur
- `index.js`: Hoofdserver, configuratie van de API, laden van embeddings en chatmodel.
- `guidestore/`: Directory waarin de FAISS-vectorstore opgeslagen is.
- `.env`: Bevat API keys (niet meeleveren in je repository!).

## 🔮 Toekomstige uitbreidingen (suggesties)
- Endpoints maken voor specifieke vragen zoals "Wat is de ervaring nodig voor level X?"
- User-authenticatie toevoegen.
- Endpoint voor Hypixel profielinformatie.
- Integratie van meerdere modellen.
- Deployment naar services zoals **Render**, **Vercel** of **Azure Web Services**.

## ⚠️ Belangrijke opmerkingen
- Zorg dat je Azure OpenAI en Hypixel API-keys **veilig** houdt.
- FAISS bestanden (`guidestore`) moeten aanwezig zijn of apart gegenereerd worden.
- Let op de tokenlimieten en kosten van Azure OpenAI als je deze app veel gebruikt.

---
