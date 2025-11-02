const boxes = document.querySelector(".boxes");
const btnMore = document.querySelector(".btnMore");
const searchInput = document.querySelector(".search");
const nothingFound = document.querySelector(".nothing-found");

let page = 1;
let allCharacters = [];
let isSearching = false;
let searchQuery = "";
let hasNextPage = true;

function showCards(data) {
  if (!data || data.length === 0) {
    boxes.innerHTML = "";
    nothingFound.style.display = "block";
    return;
  }

  nothingFound.style.display = "none";

  data.forEach((item) => {
    boxes.innerHTML += `
      <div class="box">
        <img class="boxImg" src="${item.image}" alt="${item.name}">
        <h3 class="boxName">${item.name}</h3>
        <p class="boxGender">${item.gender}</p>
      </div>
    `;
  });
}

const loadData = async () => {
  let url = "";

  if (isSearching && searchQuery !== "") {
    url = `https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${page}`;
  } else {
    url = `https://rickandmortyapi.com/api/character?page=${page}`;
  }

  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        if (page === 1) {
          boxes.innerHTML = "";
          nothingFound.style.display = "block";
        }
        btnMore.style.display = "none";
        hasNextPage = false;
        return;
      }

      allCharacters = [...allCharacters, ...data.results];
      showCards(data.results);

      if (!data.info.next) {
        btnMore.style.display = "none";
        hasNextPage = false;
      } else {
        btnMore.style.display = "block";
        hasNextPage = true;
      }
    })
    .catch((err) => {
      console.log(err);
      nothingFound.style.display = "block";
      btnMore.style.display = "none";
    });
};

btnMore.addEventListener("click", () => {
  if (hasNextPage) {
    page++;
    loadData();
  }
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim().toLowerCase();

  if (value === "") {
    boxes.innerHTML = "";
    allCharacters = [];
    page = 1;
    isSearching = false;
    searchQuery = "";
    loadData();
    return;
  }

  boxes.innerHTML = "";
  allCharacters = [];
  page = 1;
  isSearching = true;
  searchQuery = value;
  loadData();
});

loadData();