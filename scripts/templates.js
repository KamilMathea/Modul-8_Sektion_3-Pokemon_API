function getPokemonCardTemplate(pokemon, i, typesHtml) {
    const mainType = pokemon.types[0].type.name;

    return `
        <div class="pokemon-card" onclick="openPokemonDetailByName('${pokemon.name}')">
            <div class="pokemon-image-container ${mainType}">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <h3>${pokemon.name}</h3>
            <div class="pokemon-types">
                ${typesHtml} 
            </div>
        </div>
    `;
}

function getTypeTemplate(typeName) {
    return `<span class="type-badge ${typeName}">${typeName}</span>`;
}

function getModalHeaderTemplate(pokemon, typesHtml) {
    const mainType = pokemon.types[0].type.name;
    return `
        <header class="modal-header ${mainType}">
        <button class="close-btn" onclick="closePokemonCard()">&times;</button>
            <div class="header-nav">
                <h2>${pokemon.name}</h2>
                <span>#${pokemon.id}</span>
            </div>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </header>
    `;
}

function getModalStatsTemplate(pokemon) {
    return `
        <div class="modal-stats">
            <div class="stat-item">
                <b>Weight:</b> <span>${pokemon.weight / 10} kg</span>
            </div>
            <div class="stat-item">
                <b>Height:</b> <span>${pokemon.height / 10} m</span>
            </div>
            <div class="stat-item">
                <b>HP:</b> <span>${pokemon.stats[0].base_stat}</span>
            </div>
            <div class="stat-item">
                <b>Attack:</b> <span>${pokemon.stats[1].base_stat}</span>
            </div>
            <div class="stat-item">
                <b>Defense:</b> <span>${pokemon.stats[2].base_stat}</span>
            </div>
        </div>
    `;
}

function getModalFooterTemplate(i) {
    return `
        <div class="modal-footer">
            <button onclick="navigatePokemonCard(${i - 1})">Previous</button>
            <button onclick="navigatePokemonCard(${i + 1})">Next</button>
        </div>
    `;
}

function getNoPokemonFoundTemplate(searchTerm) {
    return `<div class="no-pokemon">No Pokémon found with "${searchTerm}".</div>`;
}