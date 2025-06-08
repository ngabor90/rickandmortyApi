const usp = new URLSearchParams(window.location.search);
let pageNumber = Number(usp.get("page")) || 1;

const fetchLocations = async () => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${pageNumber}`);
    if (!response.ok) throw new Error("Hiba történt az adatok lekérésekor");

    const json = await response.json();
    const maxPageNumber = json.info.pages;

    const buttonLoc = document.getElementById("lapozoGombok");
    const tBody = document.getElementById("tBody");

    // Lapozó gombok létrehozása
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

    // Táblázat feltöltése
    json.results.forEach(location => {
      const tr = document.createElement("tr");

      ["name", "type", "dimension"].forEach(key => {
        const td = document.createElement("td");
        td.textContent = location[key];
        tr.appendChild(td);
      });

      tBody.appendChild(tr);
    });

  } catch (error) {
    console.error(error.message);
  }
};

fetchLocations();
