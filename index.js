const usp = new URLSearchParams(window.location.search);
let pageNumber = Number(usp.get("page")) || 1;

const fetchData = async () => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const json = await response.json();
    const maxPageNumber = json.info.pages;
    const buttonLoc = document.getElementById("paginateButton");
    const tBody = document.getElementById("tBody");

    // Oldal navigáció gombok
    for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
      if (i >= 1 && i <= maxPageNumber) {
        const li = document.createElement("li");
        li.className = "page-item";
        
        const a = document.createElement("a");
        a.className = "page-link";
        a.href = `?page=${i}`;
        a.textContent = i;
        
        li.appendChild(a);
        buttonLoc.appendChild(li);
      }
    }

    // Utolsó oldal gomb
    const liLastPage = document.createElement("li");
    liLastPage.className = "page-item";
    
    const aLastPage = document.createElement("a");
    aLastPage.className = "page-link";
    aLastPage.href = `?page=${maxPageNumber}`;
    aLastPage.innerHTML = `<span aria-hidden="true">&raquo;</span>`;
    
    liLastPage.appendChild(aLastPage);
    buttonLoc.appendChild(liLastPage);

    // Karakterkártyák megjelenítése
    json.results.forEach(character => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-3 my-3";

      const cardColor = {
        Alive: "green",
        Dead: "red",
        unknown: "black"
      }[character.status] || "black";

      const card = document.createElement("div");
      card.className = "card w-100 h-100";
      card.innerHTML = `
        <img src="${character.image}" class="card-img-top" alt="${character.name}">
        <div class="card-body">
          <h5 class="card-title" style="color: ${cardColor}">${character.name}</h5>
          <ul>
            <li><span style="font-weight: bold;">Gender:</span> ${character.gender}</li>
            <li><span style="font-weight: bold;">Status:</span> ${character.status}</li>
            <li><span style="font-weight: bold;">Species:</span> ${character.species}</li>
          </ul>
          <a href="/profile.html?id=${character.id}&back=${pageNumber}" class="btn btn-success w-100">Profile</a>
        </div>
      `;

      col.appendChild(card);
      tBody.appendChild(col);
    });

  } catch (error) {
    console.error("Hiba történt az adatok lekérésekor:", error);
  }
};

fetchData();
