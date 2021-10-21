const auth = "563492ad6f91700001000001a5184bb930154d828c1e8639f48a8418";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let searchValue;

//event //

form = addEventListener("submit", (e) => {
  updatephoto();
  e.preventDefault();
  serachphotos();
});
function updatephoto(e) {
  searchValue = searchInput.value;
}

async function curatedphoto() {
  const datafetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=1",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await datafetch.json();
  console.log(data);

  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographe}</p>`;
    gallery.appendChild(galleryImg);
  });
}
async function serachphotos() {
  let url =
    "https://api.pexels.com/v1/search?query=" + searchValue + "&per_page=15";
  console.log(url);
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
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographe}</p>`;
    gallery.appendChild(galleryImg);
  });
}
curatedphoto();
