const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 200;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#EDEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5'
}

url = 'https://pokeapi.co/api/v2/pokemon/'

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
}

const getPokemons = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/${id};'
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
}

const createPokemonCard = () => {
    let pokPokedex = []
    fetch(url + "?limit=251").then( response =>{
        if(response.status == 200){
            pokPokedex = response.json().then( api => {
               api.results.map( result => {
                let pokLi = document.createElement("li")
                let pokImg = document.createElement("img")
                let pokName = document.createElement("h4")
                let pokId = document.createElement("h5")
                let btnPok = document.createElement("button")
                fetch(result.url).then( pokLi => {
                    pokLi.json().then( pokInfo => {
                        pokImg.src = pokInfo['sprites']['front_default']
                        pokName.innerHTML = pokInfo.name
                        pokId.innerHTML = "#" + pokInfo.id
                    })
                })
                btnPok.innerHTML = 
                `
                    Capturar
                `
                btnPok.id = 'btnPok'
                pokImg.id = 'pokImg'
                pokLi.appendChild(btnPok)
                pokLi.appendChild(pokImg)
                pokLi.appendChild(pokId)
                pokLi.appendChild(pokName)
                document.getElementById("pokeContainer").appendChild(pokLi)
               })
            })
        }
    })
}

createPokemonCard();