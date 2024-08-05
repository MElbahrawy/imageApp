const form = document.querySelector("form");
const accessKey = "iPB3dsnwupOX-qFq8EK5vhq8voY9TypXeyZbz7AcfuQ";
const searchValue = document.querySelector("#search");
const container = document.querySelector(".gallery");
const showMore = document.querySelector(".show-more");
let page = 1;

const getData = async (keyword) => {
  let api = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
  const res = await fetch(api).then((res) => res.json());
  return res.results;
};
const createElement = (data) => {
  data.map((pic) => {
    const img = document.createElement("img");
    img.className = "col-lg-3 col-md-5 col-sm-12 rounded-1";
    img.src = pic.urls.small;
    img.alt = pic.alt_description;
    container.appendChild(img);
    console.log(img);
  });
};
form.onsubmit = async (e) => {
  container.innerHTML = "";
  e.preventDefault();
  if (searchValue.value) {
    let data = await getData(searchValue.value);
    createElement(data);
    showMore.classList.toggle("d-none");
  }
};
showMore.onclick = async () => {
  page++;
  let data = await getData(searchValue.value);
  createElement(data);
};
