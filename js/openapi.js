import { TheDogAPI_Key } from "../key.js";
const DogBreedsURL = "https://api.thedogapi.com/v1/breeds";

async function getBreedList() {
  try {
    const response = await fetch(DogBreedsURL, {
      headers: { "x-api-key": TheDogAPI_Key },
    });
    if (!response.ok) {
      throw new Error(response.status);
    }

    const breeds = await response.json();
    const breedsSection = document.getElementById("Breeds");
    const ul = breedsSection.querySelector("ul");

    for (let i = 0; i < breeds.length; i++) {
      const b = breeds[i];
      const li = document.createElement("li");
      li.textContent = b.name;
      ul.appendChild(li);
    }
  } catch (error) {
    console.error("Failed to get list of breeds", error);
  }
}

document.addEventListener("DOMContentLoaded", getBreedList);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.searchBreed;
  const cardContainer = document.querySelector("#BreedCardContainer");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    cardContainer.innerHTML = "";
    const query = form.BreedName.value.trim();
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${query}`,
        {
          headers: {
            "x-api-key": TheDogAPI_Key,
          },
        },
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const [breed] = await response.json();

      if (!breed) {
        cardContainer.innerHTML =
          "<p>No breed found. Please try another breed name.</p>";
        return;
      }

      const NA = "Not Available";
      const card = document.createElement("div");
      card.classList.add("breed-card");

      const imageUrl = breed.image?.url;

      card.innerHTML = `
        <h3>${breed.name}</h3>

        ${imageUrl ? `<img src="${imageUrl}" alt="${breed.name}" />` : ""}
        <p><strong>Group:</strong> ${breed.breed_group || NA}</p>
        <p><strong>Bred For:</strong> ${breed.bred_for || NA}</p>
        <p><strong>Life Span:</strong> ${breed.life_span || NA}</p>
        <p><strong>Temperament:</strong> ${breed.temperament || NA}</p>
        <p><strong>Weight:</strong> ${breed.weight?.imperial || NA} lbs</p>
        <p><strong>Height:</strong> ${breed.height?.imperial || NA} in</p>
      `;

      cardContainer.appendChild(card);
    } catch (err) {
      console.error(err);

      cardContainer.innerHTML = `
        <p>Error loading breed information: ${err.message}</p>
      `;
    }
  });
});
