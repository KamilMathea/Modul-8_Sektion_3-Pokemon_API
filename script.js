const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let allPokemons = [];
let currentPokemonIndex = 0;

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
    let response = await fetch(BASE_URL + `?limit=20&offset=${currentPokemonIndex}`);
    let responseToJson = await response.json();
    let pokemonArray = responseToJson.results;

    for (let i = 0; i < pokemonArray.length; i++) {
        let pokemonUrl = pokemonArray[i].url;
        await getPokemonDetails(pokemonUrl);
    }

    currentPokemonIndex += 20;
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

function openPokemonDetail(i) {
    const pokemon = allPokemons[i];
    const content = document.getElementById('pokemon-card-content');
    
    content.innerHTML = getModalHeaderTemplate(pokemon);
    content.innerHTML += getModalStatsTemplate(pokemon);
    content.innerHTML += getModalFooterTemplate(i);
    
    document.getElementById('pokemon-detail-card').showModal();
}

function navigatePokemonCard(newIndex) {
    if (newIndex < 0) {
        newIndex = allPokemons.length - 1;
    } else if (newIndex >= allPokemons.length) {
        newIndex = 0;
    }
    
    openPokemonDetail(newIndex);
}

function closePokemonCard() {
    let dialog = document.getElementById('pokemon-detail-card');
    dialog.close();
}

async function loadMorePokemon() {
    toggleLoadingScreen();
    try {
        await getPokemonList();
        renderPokemonList();
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }
    toggleLoadingScreen();
}