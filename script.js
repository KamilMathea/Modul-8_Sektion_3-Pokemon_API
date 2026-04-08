const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let allPokemon = [];

async function init() {
    toggleLoadingScreen();
    try {
        await getPokemonList();
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
    console.log("Die ersten 20 Pokemon:", responseToJson.results);
}