function getPokemonCardTemplate(pokemon, i) {
    return `
        <div class="pokemon-card" onclick="openPokemonDetail(${i})">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
        </div>
    `;
}