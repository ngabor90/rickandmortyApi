const usp = new URLSearchParams(window.location.search);
const id = usp.get("id");
const back = usp.get("back") || 1;

console.log(id);

const fetchCharacter = async () => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) throw new Error("Nem sikerült lekérni a karaktert.");

    const json = await response.json();

    // DOM elemek frissítése
    document.getElementById("name").textContent = json.name;
    document.getElementById("gender").textContent = json.gender;
    document.getElementById("status").textContent = json.status;
    document.getElementById("species").textContent = json.species;

    const kep = document.getElementById("kep");
    kep.src = json.image;
    kep.alt = json.name;
    kep.name = json.name;
    kep.className = "w-100";

    document.getElementById("backButton").href = `index.html?page=${back}`;

  } catch (error) {
    console.error(error.message);
  }
};

fetchCharacter();
