// =========================================
// SMART TRAVEL EXPLORER
// COUNTRIESNOW API
// =========================================

async function searchCountry() {

    const input = document.getElementById("countryInput");
    const country = input.value.trim();

    const message = document.getElementById("message");
    const countryCard = document.getElementById("countryCard");

    if (country === "") {
        message.textContent = "⚠️ Please enter a country name.";
        countryCard.style.display = "none";
        return;
    }

    message.textContent = "🌍 Searching...";
    countryCard.style.display = "none";

    try {

        // -----------------------------------------
        // 1. BASIC COUNTRY INFORMATION
        // -----------------------------------------

        const infoResponse = await fetch(
            "https://countriesnow.space/api/v0.1/countries/info?returns=unicodeFlag,currency,image",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    country: country
                })
            }
        );

        const infoResult = await infoResponse.json();

        if (infoResult.error || !infoResult.data) {
            throw new Error("Country not found");
        }

        const info = infoResult.data;


        // -----------------------------------------
        // 2. CAPITAL
        // -----------------------------------------

        let capital = "Not available";

        const capitalResponse = await fetch(
            "https://countriesnow.space/api/v0.1/countries/capital",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    country: country
                })
            }
        );

        const capitalResult = await capitalResponse.json();

        if (!capitalResult.error && capitalResult.data) {
            capital = capitalResult.data.capital || "Not available";
        }


        // -----------------------------------------
        // 3. POPULATION
        // -----------------------------------------

        let population = "Not available";

        const populationResponse = await fetch(
            "https://countriesnow.space/api/v0.1/countries/population",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    country: country
                })
            }
        );

        const populationResult = await populationResponse.json();

        if (!populationResult.error && populationResult.data) {

            const populationData =
                populationResult.data.populationCounts;

            if (populationData && populationData.length > 0) {

                const latest =
                    populationData[populationData.length - 1];

                population =
                    Number(latest.value).toLocaleString();
            }
        }


        // -----------------------------------------
        // 4. CURRENCY
        // -----------------------------------------

        let currency = "Not available";

        if (info.currency) {
            currency = info.currency;
        }


        // -----------------------------------------
        // 5. FLAG
        // -----------------------------------------

        let flag = "";

        if (info.unicodeFlag) {
            flag = info.unicodeFlag;
        }


        // -----------------------------------------
        // 6. COUNTRY NAME
        // -----------------------------------------

        const countryName =
            info.name || country;


        // -----------------------------------------
        // DISPLAY COUNTRY NAME
        // -----------------------------------------

        document.getElementById("countryName").textContent =
            countryName;


        // -----------------------------------------
        // DISPLAY FLAG
        // -----------------------------------------

        const flagElement =
            document.getElementById("flag");

        if (flag) {

            flagElement.src = flag;

        } else {

            flagElement.src = "";
        }

        flagElement.alt =
            `${countryName} Flag`;


        // -----------------------------------------
        // DISPLAY CAPITAL
        // -----------------------------------------

        document.getElementById("capital").textContent =
            capital;


        // -----------------------------------------
        // DISPLAY POPULATION
        // -----------------------------------------

        document.getElementById("population").textContent =
            population;


        // -----------------------------------------
        // REGION
        // -----------------------------------------

        document.getElementById("region").textContent =
            "Country information";


        // -----------------------------------------
        // CURRENCY
        // -----------------------------------------

        document.getElementById("currency").textContent =
            currency;


        // -----------------------------------------
        // LANGUAGES
        // -----------------------------------------

        document.getElementById("languages").textContent =
            "See local languages";


        // -----------------------------------------
        // TIMEZONE
        // -----------------------------------------

        document.getElementById("timezone").textContent =
            "Local timezone";


        // -----------------------------------------
        // GOOGLE MAPS
        // -----------------------------------------

        document.getElementById("mapLink").href =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(countryName)}`;


        // -----------------------------------------
        // SHOW RESULT
        // -----------------------------------------

        countryCard.style.display = "block";

        message.textContent =
            `✅ Information found for ${countryName}`;

    }

    catch (error) {

        console.error("API ERROR:", error);

        countryCard.style.display = "none";

        message.textContent =
            "❌ Unable to find this country.";
    }
}


// =========================================
// QUICK COUNTRY SEARCH
// =========================================

function quickSearch(countryName) {

    const input =
        document.getElementById("countryInput");

    input.value = countryName;

    searchCountry();
}


// =========================================
// ENTER KEY SEARCH
// =========================================

const countryInput =
    document.getElementById("countryInput");

if (countryInput) {

    countryInput.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {
                searchCountry();
            }

        }
    );
}