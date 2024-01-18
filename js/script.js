const accessKey = "3CdvKEGn_Y9WFzrQd5tVzoeK1jlvabDqxTyL-xpDr_w";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreButton = document.getElementById("show-more-btn");
let keyword = "";
let page = 1;
async function getImages() {
	keyword = searchBox.value;
	const url = `
     https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

	const response = await fetch(url);
	const data = await response.json();

	if (page === 1) {
		searchResult.innerHTML = "";
	}
	const results = data.results;

	results.map((result) => {
		const image = document.createElement("img");
		image.src = result.urls.small;
		const imageLink = document.createElement("a");
		imageLink.href = result.links.html;
		imageLink.target = "_blank";
		imageLink.appendChild(image);
		searchResult.appendChild(imageLink);
	});
	showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	page = 1;
	getImages();
});

showMoreButton.addEventListener("click", () => {
	page++;
	getImages();
});
