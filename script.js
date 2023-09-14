const accessKey = "gk00B3S66rgcn97r1GGQZkyM6C5DbGKzCzVCqVQDQlQ";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more")

let inputData = "";
let page = 1;

//funnction
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;   //store result
    if (page === 1) {
        searchResults.innerHTML = "";
    }
    //map the result
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        //append
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);//append or img

    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;  //page
    searchImages();
});
showMore.addEventListener("click", () => {
    searchImages(); //call func agin
});