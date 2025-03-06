const rickAndMortyApi = async () => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character/?page=19"
  );
  const data = await response.json();
  // console.log(data.results);

  const sortedCharacters = data.results.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  // console.log(sortedCharacters);

  const topTenCharacters = sortedCharacters.slice(0, 10);
  console.log("Top 10 characters",topTenCharacters);

  const mostEpisodesCharacter = data.results.reduce((max, character) =>
    character.episode.length > max.episode.length ? character : max
  );
  console.log("Character with the most episodes:", mostEpisodesCharacter.name);
  console.log("Number of episodes", mostEpisodesCharacter.episode.length);

  topTenCharacters.forEach((results) => {
    const card = document.createElement("div");

    const characterName = document.createElement("h1");
    characterName.textContent = results.name;

    const characterSpecies = document.createElement("h2");
    characterSpecies.textContent = results.species;

    const characterOrigin = document.createElement("h3");
    characterOrigin.textContent =
      results.origin.name === "unknown" ? "-" : results.origin.name;

    const characterImg = document.createElement("img");
    characterImg.src = results.image;
    characterImg.alt = results.name;

    card.append(characterName);
    card.append(characterSpecies);
    card.append(characterOrigin);
    card.append(characterImg);
    container.append(card);

    card.addEventListener("click", () => {
      console.log(results.name);
      localStorage.setItem("selectedCharacter", JSON.stringify(results));

      fetch(`https://rickandmortyapi.com/api/character/${results.id}`)
        .then((response) => response.json())
        .then((characterData) => console.log("Character info:", characterData));
    });
  });
};
const fetchLocations = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/location");
  const data = await response.json();
  console.log("All locations:", data.results);
};
const mostPopulatedLocations = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/location");
  const data = await response.json();

  const topPopulatedLocation = data.results.reduce((max, location) =>
    location.residents.length > max.residents.length ? location : max
  );
  console.log(
    "Most populated location:",
    topPopulatedLocation.name,
    "population:",
    topPopulatedLocation.residents.length
  );
};
rickAndMortyApi();
fetchLocations();
mostPopulatedLocations();
