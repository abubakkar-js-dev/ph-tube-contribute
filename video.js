let activeButton = null;

// Function to fetch and display all categories
const fetchCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    const categories = data.data;
    const categoriesContainer = document.getElementById("categoriesContainer");

    categoriesContainer.innerHTML = ""; // Clear previous buttons

    // Create buttons for each category
    categories.forEach((category, index) => {
      const button = document.createElement("button");
      button.id = `btnCat-${category.category_id}`;
      button.classList =
        "px-4 py-2 flex gap-2 text-gray-700 bg-gray-200 rounded";
      button.textContent = category.category;
      button.onclick = () => handleCategoryClick(button, category.category_id);

      // Mark the first button as active by default
      if (index === 0) {
        handleCategoryClick(button, category.category_id);
      }

      categoriesContainer.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Function to handle category button clicks
const handleCategoryClick = (button, categoryId) => {
  if (activeButton) {
    activeButton.classList.remove("bg-red-300");
    activeButton.classList.add("bg-gray-200");
  }

  button.classList.remove("bg-gray-200");
  button.classList.add("bg-red-300");
  activeButton = button;

  // Clear the videos container
  const videosContainer = document.getElementById("videosContainer");
  videosContainer.innerHTML = "";

  // Fetch videos for the selected category
  fetchCategoryVideos(categoryId);
};


const showSpinner = () => {
    const spinner = document.getElementById("loadingSpinner");
    spinner.style.display = "flex"; // Makes the spinner visible
};

// Hide the spinner
const hideSpinner = () => {
    const spinner = document.getElementById("loadingSpinner");
    spinner.style.display = "none"; // Hides the spinner
};

// Function to fetch and display videos for a specific category
const fetchCategoryVideos = async (categoryId) => {
  const spinner = document.getElementById("loadingSpinner");
  const videosContainer = document.getElementById("videosContainer");

  try {
    showSpinner();  // Show spinner
    // Show the spinner


    let url = "https://openapi.programming-hero.com/api/videos";
    if (categoryId !== "all") {
      url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    const videos = data.data;

    videosContainer.innerHTML = ""; // Clear previous content

    if (videos.length === 0) {
      videosContainer.innerHTML = '<p class="flex justify-center items-center text-center">No videos found for this category.</p>';
    } else {
      videos.forEach((video) => {
        const { thumbnail, title, authors, others } = video;
        const { profile_picture, profile_name, verified } = authors[0];
        const videoCard = document.createElement("div");
        videoCard.classList =
          "bg-white border rounded-lg shadow-md overflow-hidden";

        videoCard.innerHTML = `
          <img src="${thumbnail}" alt="Thumbnail" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900">${title}</h3>
            <div class="flex items-center gap-3 mt-2">
              <img src="${profile_picture}" alt="Author" class="w-10 h-10 rounded-full">
              <div>
                <p class="text-sm font-medium text-gray-800 flex items-center gap-1">
                  ${profile_name} 
                  ${verified ? '<span class="text-blue-500">✔</span>' : ""}
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center mt-4 text-sm text-gray-600">
              <p>${others.views} views</p>
              <p>${others.posted_date || "Date not available"}</p>
            </div>
          </div>
        `;
        videosContainer.appendChild(videoCard);
      });
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
  } finally {
    hideSpinner();  // Hide the spinner
  }
};

// Initialize the app
fetchCategories();
