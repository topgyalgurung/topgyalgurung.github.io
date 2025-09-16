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

const headingText = "Hi,\nI'm Topgyal 👋";
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

// Initialize resource category tabs (for tech learning channels)

document.addEventListener("DOMContentLoaded", function () {
  initializeResourceTabs();
  initializeProjectTabs();
});

function initializeResourceTabs() {
  const tabs = document.querySelectorAll(".category-tab");
  const contents = document.querySelectorAll(".category-content");

  if (tabs.length === 0 || contents.length === 0) return;

  // Initialize - hide all content except general
  contents.forEach((content) => {
    if (content.getAttribute("data-category") === "general") {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

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
      const targetContent = document.querySelector(
        `.category-content[data-category="${category}"]`
      );
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    });
  });
}

function initializeProjectTabs() {
  const projectTabs = document.querySelectorAll(".project-tab");
  const projectContents = document.querySelectorAll(
    "#projects .project-content"
  );

  if (projectTabs.length === 0 || projectContents.length === 0) return;

  // Initialize - show React projects by default and set first tab as active
  projectContents.forEach((content) => {
    if (content.getAttribute("data-category") === "nextjs") {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

  // Set first tab as active initially
  projectTabs.forEach((tab, index) => {
    if (index === 0) {
      tab.classList.add("active", "bg-blue-500", "text-white");
      tab.classList.remove("bg-gray-200", "text-gray-700");
    } else {
      tab.classList.remove("active", "bg-blue-500", "text-white");
      tab.classList.add("bg-gray-200", "text-gray-700");
    }
  });

  projectTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      const category = tab.getAttribute("data-category");
      console.log("Project tab clicked:", category); // Debug log

      // Remove active class from all project tabs
      projectTabs.forEach((t) => {
        t.classList.remove("active", "bg-blue-500", "text-white");
        t.classList.add("bg-gray-200", "text-gray-700");
      });

      // Add active class to clicked tab
      tab.classList.add("active", "bg-blue-500", "text-white");
      tab.classList.remove("bg-gray-200", "text-gray-700");

      // Hide all project content
      projectContents.forEach((content) => {
        content.classList.add("hidden");
      });

      // Show selected project content
      const targetContent = document.querySelector(
        `#projects .project-content[data-category="${category}"]`
      );
      console.log("Target content found:", targetContent); // Debug log

      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    });
  });
}

// Reusable accordion function
function toggleAccordion(id, groupName = "") {
  const content = document.getElementById(id);
  const icon = document.getElementById(`icon-${id}`);

  if (!content) return;

  const isOpen = !content.classList.contains("hidden");

  // Close all other accordions in the same group or section
  const section =
    content.closest("section") || content.closest(".project-content");
  if (section) {
    // Find all accordion contents in the same section
    const allContents = section.querySelectorAll(
      "[id^='collapse'], [id^='cert']"
    );
    const allIcons = section.querySelectorAll("[id^='icon-']");

    // Close all except the current one
    allContents.forEach((item) => {
      if (item.id !== id) {
        item.classList.add("hidden");
      }
    });

    // Reset all icons except the current one
    allIcons.forEach((iconElem) => {
      if (iconElem.id !== `icon-${id}`) {
        iconElem.textContent = "▼";
      }
    });
  }

  // Toggle current accordion
  if (isOpen) {
    content.classList.add("hidden");
    if (icon) icon.textContent = "▼";
  } else {
    content.classList.remove("hidden");
    if (icon) icon.textContent = "▲";
  }
}

// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modalBtn = document.getElementById("aboutMeModalBtn");
  const modal = document.getElementById("aboutMeModal");
  const closeBtn = document.getElementById("closeAboutMeModal");

  if (modalBtn && modal && closeBtn) {
    modalBtn.addEventListener("click", function () {
      modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
});

// Make toggleAccordion available globally
window.toggleAccordion = toggleAccordion;

// Visit Counter Logic
function updateVisitCounter() {
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get stored visit data
  let visitData = JSON.parse(localStorage.getItem("visitData")) || {
    totalVisits: 0,
    lastVisitDate: null,
    dailyVisits: 0,
  };

  // Check if it's a new day
  if (visitData.lastVisitDate !== today) {
    visitData.dailyVisits = 1;
    visitData.lastVisitDate = today;
  } else {
    visitData.dailyVisits++;
  }

  // Increment total visits
  visitData.totalVisits++;

  // Save updated data
  localStorage.setItem("visitData", JSON.stringify(visitData));

  // Update display
  document.getElementById("dailyVisits").textContent = visitData.dailyVisits;
  document.getElementById("totalVisits").textContent = visitData.totalVisits;
}

// Call updateVisitCounter when page loads
document.addEventListener("DOMContentLoaded", updateVisitCounter);
