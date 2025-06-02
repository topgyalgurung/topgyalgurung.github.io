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

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       entry.target.classList.add("show");
//     } else {
//       entry.target.classList.remove("show");
//     }
//   });
// });

// const hiddenElements = document.querySelectorAll(".hidden");
// hiddenElements.forEach((el) => observer.observe(el));

function observeHandler(ob) {
  ob.forEach((el) => {
    el.target.style.opacity = ob[0].intersectionRatio;
  });
}

let options = {
  root: document,
  rootMargin: "0px",
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

let observer = new IntersectionObserver(this.observeHandler, options);

let els = document.querySelectorAll("[data-observe]");

els.forEach((el) => {
  observer.observe(el);
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

// Load LeetCode and Blind 75 progress from LeetCode API
async function loadLeetCodeProgress() {
  try {
    const response = await fetch("/api/leetcode-progress");
    const data = await response.json();

    // Update overall LeetCode stats
    document.getElementById("leetcode-easy").textContent =
      data.overall?.easy || 0;
    document.getElementById("leetcode-medium").textContent =
      data.overall?.medium || 0;
    document.getElementById("leetcode-hard").textContent =
      data.overall?.hard || 0;
    document.getElementById("leetcode-total").textContent =
      data.overall?.total || 0;

    // Only update Blind 75 progress if API provides data
    if (data.blind75) {
      document.getElementById("blind75-easy").textContent =
        data.blind75.easy || 25;
      document.getElementById("blind75-medium").textContent =
        data.blind75.medium || 0;
      document.getElementById("blind75-hard").textContent =
        data.blind75.hard || 0;
      document.getElementById("blind75-total").textContent =
        data.blind75.total || 25;
    }
  } catch (error) {
    console.error("Error loading LeetCode progress:", error);
  }
}

// Load progress when the page loads
document.addEventListener("DOMContentLoaded", loadLeetCodeProgress);
