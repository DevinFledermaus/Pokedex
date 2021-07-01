let base_URL = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch a list of pokemon
function getPokemonList(url) {
  fetch(url)
    // Convert data from JSON
    .then((response) => response.json())
    //Stuff to do with data
    .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      // Get the list of pokemon from the results
      let pokemon = data.results;
      // Get element from HTML to write buttons in
      let container = document.querySelector(".pokemon-buttons");
      // Clear the container
      container.innerHTML = "";
      // Loop over pokemon list and create an HTML button for each one. Add the button to the container
      pokemon.forEach((btn) => {
        container.innerHTML += `<button class="buttons" onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      // Add a next pokemon button
      container.innerHTML += `<br><br><button class="next" onclick="getPokemonList('${data.previous}')">Prev</button>`;
      // Add a back pokemon button
      container.innerHTML += `<br><br><button class="back" onclick="getPokemonList('${data.next}')">Next</button>`;
    });
}

// Get default pokemon list
getPokemonList(base_URL);

// Function to get information about a specific pokemin
function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes through
      console.log(data);
      // Write data to pokemon information container
      document.querySelector(".pokemon-image").innerHTML = `
    <img src="${data.sprites.front_default} " >
    `;
      fetch(data.species.url)
        .then((response) => response.json())
        .then((daata) => {
          console.log(daata);
          document.querySelector(
            ".pokemon-des"
          ).innerHTML = `${daata.flavor_text_entries[0].flavor_text}`;
        });
      document.querySelector(
        ".pokemon-info"
      ).innerHTML = ` Name : ${data.species.name} <br></br> Height : ${data.height} <br></br> Weight : ${data.weight} <br></br> Abilities : ${data.abilities[0].ability.name} and ${data.abilities[1].ability.name}
    `;
    });
}

function activate() {
  let hidden = document.querySelectorAll(".hidden");
  hidden.forEach((poke) => {
    poke.style.display = "block ";
  });
  let button = document.querySelectorAll(".btn");
  button.forEach((btn) => {
    btn.style.display = "none";
  });
}

function exit() {
  let hidden = document.querySelectorAll(".hidden");
  hidden.forEach((poke) => {
    poke.style.display = "none";
  });
  let button = document.querySelectorAll(".btn");
  button.forEach((btn) => {
    btn.style.display = "block";
  });
}
