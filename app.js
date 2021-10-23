const auth = "563492ad6f91700001000001a5184bb930154d828c1e8639f48a8418";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let linkfetch;
let currentsearch;
let url =
  "https://api.pexels.com/v1/search?query=" + searchValue + "&per_page=15";

//event //

form = addEventListener("submit", (e) => {
  updatephoto();
  e.preventDefault();
  currentsearch = searchValue;

  serachphotos();
});
more.addEventListener("click", loadmore);
function updatephoto(e) {
  searchValue = searchInput.value;
}
async function fetchgpi(url) {
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

async function curatedphoto() {
  linkfetch = "https://api.pexels.com/v1/curated?per_page=15";
  const datafetch = await fetch(
    linkfetch,

    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await datafetch.json();

  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographe}</p>`;
    gallery.appendChild(galleryImg);
  });
}
async function serachphotos() {
  clear();
  url =
    "https://api.pexels.com/v1/search?query=" + searchValue + "&per_page=15";

  const datafetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await datafetch.json();

  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class = "gallery-info"> 
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Download </a>
    </div>
    <img src=${photo.src.large}></img>
    `;
    gallery.appendChild(galleryImg);
  });
}
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
async function done() {
  const data = await datafetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographe}</p>`;
    gallery.appendChild(galleryImg);
  });
}
async function loadmore() {
  page++;
  if (currentsearch) {
    url =
      "https://api.pexels.com/v1/search?query=" +
      searchValue +
      "&per_page=15&page=" +
      page +
      "";
  } else {
    linkfetch = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchgpi(linkfetch);
  done();
}
curatedphoto();
