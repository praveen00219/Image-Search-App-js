const accessKey = "BdNtRpBKDveuvCT8h6KKO1rjRC7t4ntbIEXTuVa3bcQ"; // Replace with your Unsplash API key
const perPage = 10;
let currentPage = 1;
let query = "";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const imagesContainer = document.getElementById("imagesContainer");
const showMoreButton = document.getElementById("showMoreButton");

// Fetch default images on page load
document.addEventListener("DOMContentLoaded", () => {
  query = "nature"; // Default search query
  fetchImages();
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = searchInput.value;
  currentPage = 1;
  imagesContainer.innerHTML = "";
  await fetchImages();
});

showMoreButton.addEventListener("click", async () => {
  currentPage++;
  await fetchImages();
});

async function fetchImages() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=${perPage}&query=${query}&client_id=${accessKey}`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      imagesContainer.innerHTML =
        '<p class="text-center text-gray-700">No images found.</p>';
      return;
    }

    data.results.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.urls.regular;
      imgElement.alt = image.alt_description || "Image";
      imgElement.classList.add(
        "w-full",
        "h-64",
        "object-cover",
        "rounded-lg",
        "shadow-lg",
        "transition-transform",
        "duration-300",
        "hover:scale-105",
        "fade-in"
      );

      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("relative");
      imageWrapper.appendChild(imgElement);

      imagesContainer.appendChild(imageWrapper);
    });
  } catch (error) {
    imagesContainer.innerHTML =
      '<p class="text-center text-red-600">An error occurred while fetching images.</p>';
    console.error("Error fetching images:", error);
  }
}
