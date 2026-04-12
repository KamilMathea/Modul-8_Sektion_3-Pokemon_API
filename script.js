const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let allPokemons = [];

async function init() {
    toggleLoadingScreen();
    try {
        await getPokemonList();
        renderPokemonList();
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

function renderPokemonList() {
    let container = document.getElementById('pokemon-list-container');
    container.innerHTML = "";

    for (let i = 0; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
        container.innerHTML += getPokemonCardTemplate(pokemon, i);
    }
}