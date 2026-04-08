const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let allPokemons = [];

async function init() {
    toggleLoadingScreen();
    try {
        await getPokemonList();
        console.log("Alle Details sind da:", allPokemons);
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }
    toggleLoadingScreen();
}

function toggleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.toggle('d-none');
}

async function getPokemonList() {
    let response = await fetch(BASE_URL + "?limit=20&offset=0");
    let responseToJson = await response.json();
    let pokemonArray = responseToJson.results;

    console.log("Die ersten 20 Pokemon:", responseToJson.results);

    for (let i = 0; i < pokemonArray.length; i++) {
        let pokemonUrl = pokemonArray[i].url;
        await getPokemonDetails(pokemonUrl);
    }
}

async function getPokemonDetails(url) {
    let response = await fetch(url);
    let pokemonDetails = await response.json();
    
    allPokemons.push(pokemonDetails);
}