function getPokemonCardTemplate(pokemon, i) {
    const mainType = pokemon.types[0].type.name;

    return `
        <div class="pokemon-card" onclick="openPokemonDetail(${i})">
            <div class="pokemon-image-container ${mainType}">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <h3>${pokemon.name}</h3>
            <div class="pokemon-types">
                ${getTypesTemplate(pokemon)} 
            </div>
        </div>
    `;
}

function getTypesTemplate(pokemon) {
    let typesHTML = "";
    for (let j = 0; j < pokemon.types.length; j++) {
        const typeName = pokemon.types[j].type.name;
        typesHTML += `<span class="type-badge ${typeName}">${typeName}</span>`;
    }
    return typesHTML;
}