const form = document.querySelector("form")
const inputField = document.querySelector("#chatfield")
const outputField = document.querySelector("#chat")

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // voorkomt dat het formulier de pagina herlaadt

    const prompt = inputField.value.trim();
    if (!prompt) {
        outputField.textContent = "Voer eerst een vraag in.";
        return;
    }

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    }

    try {
        const response = await fetch("http://localhost:3000/", options);

        if (response.ok) {
            const data = await response.json();
            console.log("Server response:", data);
            outputField.textContent = data.message;
        } else {
            console.error("Serverfout:", response.status);
            outputField.textContent = `Fout: ${response.status}`;
        }
    } catch (error) {
        console.error("Fetch-fout:", error);
        outputField.textContent = "Er is een probleem met het ophalen van een antwoord.";
    }
});
