const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let allPokemons = [];
let filteredPokemons = [];
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
    filteredPokemons = allPokemons;
}

function renderPokemonList() {
    let container = document.getElementById('pokemon-list-container');
    container.innerHTML = "";

    for (let i = 0; i < filteredPokemons.length; i++) {
        const pokemon = filteredPokemons[i];

        const typesHtml = getPokemonTypesHtml(pokemon);

        container.innerHTML += getPokemonCardTemplate(pokemon, i, typesHtml);
    }
}

function filterPokemon() {
    let searchInput = document.getElementById('search-input').value.toLowerCase();
    
    if (searchInput.length > 0 && searchInput.length < 3) {
        return;
    }

    if (searchInput.length === 0) {
        filteredPokemons = allPokemons;
        handleLoadMoreBtn(searchInput);
        renderPokemonList();
        return;
    }

    searchAndRender(searchInput);
}

function searchAndRender(searchInput) {
    filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));

    handleLoadMoreBtn(searchInput);

    if (filteredPokemons.length === 0) {
        renderNoResults(searchInput);
    } else {
        renderPokemonList();
    }
}

function renderNoResults(searchTerm) {
    let container = document.getElementById('pokemon-list-container');
    container.innerHTML = getNoPokemonFoundTemplate(searchTerm);
}

function handleLoadMoreBtn(searchInput) {
    let loadMoreBtn = document.getElementById('load-more-btn');
    if (searchInput.length > 0) {
        loadMoreBtn.classList.add('d-none');
    } else {
        loadMoreBtn.classList.remove('d-none');
    }
}

function openPokemonDetailByName(pokemonName) {
    for (let i = 0; i < allPokemons.length; i++) {

        if (allPokemons[i].name === pokemonName) {
            const pokemon = allPokemons[i];
            const content = document.getElementById('pokemon-card-content');
            const typesHtml = getPokemonTypesHtml(pokemon);
            
            content.innerHTML = getModalHeaderTemplate(pokemon, typesHtml);
            content.innerHTML += getModalStatsTemplate(pokemon);
            content.innerHTML += getModalFooterTemplate(i);

            document.body.classList.add('no-scroll');
            
            document.getElementById('pokemon-detail-card').showModal();
            return;
        }
    }
}

function getPokemonTypesHtml(pokemon) {
    let typesHTML = "";
    for (let j = 0; j < pokemon.types.length; j++) {
        const typeName = pokemon.types[j].type.name;
        typesHTML += getTypeTemplate(typeName); 
    }
    return typesHTML;
}

function updateModal(i) {
    const pokemon = allPokemons[i];
    const content = document.getElementById('pokemon-card-content');
    const typesHtml = getPokemonTypesHtml(pokemon);
    
    content.innerHTML = getModalHeaderTemplate(pokemon, typesHtml);
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
    
    updateModal(newIndex);
}

function closePokemonCard() {
    let dialog = document.getElementById('pokemon-detail-card');
    dialog.close();
    document.body.classList.remove('no-scroll');
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

document.getElementById('pokemon-detail-card')?.addEventListener('close', () => {
    document.body.classList.remove('no-scroll');
});