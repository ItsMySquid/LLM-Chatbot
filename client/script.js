const form = document.querySelector("form");
const inputField = document.querySelector("#chatfield");
const chatArea = document.querySelector("#chat");

// Haal de chatgeschiedenis op uit localStorage of gebruik een lege array als deze niet bestaat
let messages = JSON.parse(localStorage.getItem("myChatHistory")) || [];

// Laad de opgeslagen chatgeschiedenis wanneer de pagina opnieuw wordt geladen
window.addEventListener("DOMContentLoaded", () => {
    messages.forEach(([role, message]) => {
        if (role === "human") {
            addUserMessage(message);
        } else if (role === "assistant") {
            addBotMessage(message);
        }
    });
    // Scroll naar beneden na het laden van de chat
    chatArea.scrollTop = chatArea.scrollHeight;
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = inputField.value.trim();
    if (!prompt) {
        addBotMessage("Voer eerst een vraag in.");
        return;
    }

    // Voeg de gebruikersvraag toe aan de geschiedenis
    messages.push(["human", prompt]);

    // Voeg de gebruikersvraag toe aan de chat
    addUserMessage(prompt);

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
    };

    try {
        const response = await fetch("http://localhost:3000/", options);

        if (response.ok) {
            const data = await response.json();
            console.log("Server response:", data);

            // Voeg het antwoord van de bot toe aan de geschiedenis
            messages.push(["assistant", data.message]);

            // Voeg het antwoord van de bot toe aan de chat
            addBotMessage(data.message);

            // Sla de bijgewerkte chatgeschiedenis op in localStorage
            localStorage.setItem("myChatHistory", JSON.stringify(messages));
        } else {
            console.error("Serverfout:", response.status);
            addBotMessage(`Fout: ${response.status}`);
        }
    } catch (error) {
        console.error("Fetch-fout:", error);
        addBotMessage("Er is een probleem met het ophalen van een antwoord.");
    }

    inputField.value = "";
});

// Helpers
function addUserMessage(message) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble user";
    bubble.innerHTML = `
        <img class="avatar" src="https://mc-heads.net/avatar/Steve/40.png" alt="User">
        <div class="message">${message}</div>
    `;
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight; // Scroll naar beneden
}

function addBotMessage(message) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot";
    bubble.innerHTML = `
        <img class="avatar" src="https://mc-heads.net/avatar/5b09e3561de24bbfa5471873fcd72904" alt="Bot">
        <div class="message">${message}</div>
    `;
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight; // Scroll naar beneden
}
