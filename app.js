const auth = "563492ad6f91700001000001a5184bb930154d828c1e8639f48a8418";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//event listeners//
searchInput.addEventListener("input", updateInput);
form = addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = searchInput.value;
}

async function fetchApi(url) {
  const datafetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await datafetch.json();
  return data;
}

async function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
          <div class="gallary-info">
          <p>${photo.photographer}</p>;
          <a href=${photo.src.original}>Download</a>
          </div>
          <img src=${photo.src.large}></img>
          `;
    gallery.appendChild(galleryImg);
  });
}
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
curatedPhotos();
