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
    if (content.getAttribute("data-category") === "react") {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

  // Set first tab (React) as active initially
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

// Toggle accordion function
function toggleAccordion(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById("icon" + id.replace("collapse", ""));

  // Close all accordions first
  const allAccordionContents = document.querySelectorAll('[id^="collapse"]');
  const allAccordionIcons = document.querySelectorAll('[id^="icon"]');

  allAccordionContents.forEach((accordionContent) => {
    if (accordionContent.id !== id) {
      accordionContent.classList.add("hidden");
    }
  });

  allAccordionIcons.forEach((accordionIcon) => {
    if (accordionIcon.id !== "icon" + id.replace("collapse", "")) {
      accordionIcon.textContent = "▼";
      accordionIcon.style.transform = "rotate(0deg)";
    }
  });

  // Toggle the clicked accordion
  content.classList.toggle("hidden");
  const isHidden = content.classList.contains("hidden");

  if (icon) {
    icon.textContent = isHidden ? "▼" : "▼";
    icon.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
  }
}

// Make toggleAccordion available globally
window.toggleAccordion = toggleAccordion;
