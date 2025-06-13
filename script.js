// hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Add click event listeners to all mobile menu links
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
});

const headingText = "Hi,\nI'm Topgyal";
const subheadingText = "Software Engineer with Bachelor's in Computer Science";
let headingIndex = 0;
let subheadingIndex = 0;

function typeHeading() {
  if (headingIndex < headingText.length) {
    document.getElementById("typed-heading").innerHTML +=
      headingText.charAt(headingIndex);
    headingIndex++;
    setTimeout(typeHeading, 50);
  } else {
    typeSubheading();
  }
}

function typeSubheading() {
  if (subheadingIndex < subheadingText.length) {
    document.getElementById("typed-subheading").innerHTML +=
      subheadingText.charAt(subheadingIndex);
    subheadingIndex++;
    setTimeout(typeSubheading, 30);
  }
}

window.onload = typeHeading;

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".category-tab");
  const contents = document.querySelectorAll(".category-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) =>
        t.classList.remove("active", "bg-blue-500", "text-white")
      );
      tabs.forEach((t) => t.classList.add("bg-gray-200", "text-gray-700"));

      // Add active class to clicked tab
      tab.classList.add("active", "bg-blue-500", "text-white");
      tab.classList.remove("bg-gray-200", "text-gray-700");

      // Hide all content
      contents.forEach((content) => content.classList.add("hidden"));

      // Show selected content
      const category = tab.getAttribute("data-category");
      document
        .querySelector(`.category-content[data-category="${category}"]`)
        .classList.remove("hidden");
    });
  });
});

// Load LeetCode progress
async function loadLeetCodeProgress() {
  try {
    const leetcodeData = await LeetCodeStats.fetchData();
    LeetCodeStats.updateStats(leetcodeData);
  } catch (error) {
    console.error("Error loading LeetCode progress:", error);
    // Set default values in case of error
    const defaultData = {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
    };
    LeetCodeStats.updateStats(defaultData);
  }
}

// Load progress when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadLeetCodeProgress();
  // Refresh LeetCode stats every 5 minutes
  setInterval(loadLeetCodeProgress, 5 * 60 * 1000);
});

// Load books from Open Library API
async function loadBooks() {
  try {
    // Fetch currently reading books
    const readingResponse = await fetch("/api/reading-list");
    const readingData = await readingResponse.json();

    // Update currently reading section
    const readingContainer = document.getElementById("currently-reading");
    if (readingContainer && readingData) {
      readingContainer.innerHTML = readingData.reading_log_entries
        .map((book) => {
          // Get the work ID from the book data
          const workId = book.work.key.split("/").pop();
          // Construct the cover image URL
          const coverUrl = `https://covers.openlibrary.org/b/id/${book.work.cover_id}-L.jpg`;

          return `
            <div class="book-card p-4 bg-white rounded-lg shadow-md">
              <img src="${coverUrl}" 
                   alt="${book.work.title}" 
                   class="w-32 h-48 object-cover mx-auto mb-4"
                   onerror="this.src='https://via.placeholder.com/128x192?text=No+Cover'">
              <h3 class="text-lg font-semibold text-center">${
                book.work.title
              }</h3>
              <p class="text-sm text-gray-600 text-center">by ${
                book.work.author_names
                  ? book.work.author_names.join(", ")
                  : "Unknown Author"
              }</p>
            </div>
          `;
        })
        .join("");
    }
  } catch (error) {
    console.error("Error loading books:", error);
    // Show error message in the container
    const readingContainer = document.getElementById("currently-reading");
    if (readingContainer) {
      readingContainer.innerHTML = `
        <div class="text-center text-gray-600">
          <p>Unable to load books at the moment. Please try again later.</p>
        </div>
      `;
    }
  }
}

// Daily Joke functionality
class DailyJoke {
  constructor() {
    this.apiUrl = "https://official-joke-api.appspot.com/random_joke";
    this.storageKey = "dailyJoke";
    this.dateKey = "dailyJokeDate";
    this.init();
  }

  init() {
    this.loadJoke();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const refreshButton = document.getElementById("refresh-joke");
    if (refreshButton) {
      refreshButton.addEventListener("click", () => this.fetchNewJoke());
    }
  }

  async loadJoke() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(this.dateKey);
    const storedJoke = localStorage.getItem(this.storageKey);

    // Check if we have a joke for today
    if (storedDate === today && storedJoke) {
      this.displayJoke(JSON.parse(storedJoke));
    } else {
      await this.fetchNewJoke();
    }
  }

  async fetchNewJoke() {
    this.showLoading();

    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const joke = await response.json();

      // Store the joke with today's date
      const today = new Date().toDateString();
      localStorage.setItem(this.storageKey, JSON.stringify(joke));
      localStorage.setItem(this.dateKey, today);

      this.displayJoke(joke);
    } catch (error) {
      console.error("Error fetching joke:", error);
      this.showError();
    }
  }

  displayJoke(joke) {
    const loadingElement = document.getElementById("joke-loading");
    const contentElement = document.getElementById("joke-content");
    const errorElement = document.getElementById("joke-error");
    const setupElement = document.getElementById("joke-setup");
    const punchlineElement = document.getElementById("joke-punchline");
    const typeElement = document.getElementById("joke-type");

    // Hide loading and error states
    if (loadingElement) loadingElement.classList.add("hidden");
    if (errorElement) errorElement.classList.add("hidden");

    // Show content
    if (contentElement) contentElement.classList.remove("hidden");

    // Populate joke content
    if (setupElement) setupElement.textContent = joke.setup;
    if (punchlineElement) punchlineElement.textContent = joke.punchline;
    if (typeElement)
      typeElement.textContent =
        joke.type.charAt(0).toUpperCase() + joke.type.slice(1);
  }

  showLoading() {
    const loadingElement = document.getElementById("joke-loading");
    const contentElement = document.getElementById("joke-content");
    const errorElement = document.getElementById("joke-error");

    if (loadingElement) loadingElement.classList.remove("hidden");
    if (contentElement) contentElement.classList.add("hidden");
    if (errorElement) errorElement.classList.add("hidden");
  }

  showError() {
    const loadingElement = document.getElementById("joke-loading");
    const contentElement = document.getElementById("joke-content");
    const errorElement = document.getElementById("joke-error");

    if (loadingElement) loadingElement.classList.add("hidden");
    if (contentElement) contentElement.classList.add("hidden");
    if (errorElement) errorElement.classList.remove("hidden");
  }
}

// Initialize daily joke when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DailyJoke();
});
