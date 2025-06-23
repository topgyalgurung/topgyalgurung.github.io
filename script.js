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
  // Handle resource category tabs
  const tabs = document.querySelectorAll(".category-tab");
  const contents = document.querySelectorAll(".category-content");

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
      document
        .querySelector(`.category-content[data-category="${category}"]`)
        .classList.remove("hidden");
    });
  });

  // Handle project tabs
  const projectTabs = document.querySelectorAll(".project-tab");
  const projectContents = document.querySelectorAll(
    ".category-content[data-category]"
  );

  // Initialize - show React projects by default
  projectContents.forEach((content) => {
    if (content.getAttribute("data-category") === "react") {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

  projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all project tabs
      projectTabs.forEach((t) =>
        t.classList.remove("active", "bg-blue-500", "text-white")
      );
      projectTabs.forEach((t) =>
        t.classList.add("bg-gray-200", "text-gray-700")
      );

      // Add active class to clicked tab
      tab.classList.add("active", "bg-blue-500", "text-white");
      tab.classList.remove("bg-gray-200", "text-gray-700");

      // Hide all project content
      const projectSectionContents = document.querySelectorAll(
        "#projects .category-content"
      );
      projectSectionContents.forEach((content) =>
        content.classList.add("hidden")
      );

      // Show selected project content
      const category = tab.getAttribute("data-category");
      const targetContent = document.querySelector(
        `#projects .category-content[data-category="${category}"]`
      );
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    });
  });
});

// Toggle accordion function
function toggleAccordion(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById("icon" + id.charAt(id.length - 1));

  // Close all other accordions first
  const allAccordionContents = document.querySelectorAll('[id^="accordion"]');
  const allAccordionIcons = document.querySelectorAll('[id^="icon"]');

  allAccordionContents.forEach((accordionContent) => {
    if (accordionContent.id !== id) {
      accordionContent.classList.add("hidden");
    }
  });

  allAccordionIcons.forEach((accordionIcon) => {
    if (accordionIcon.id !== "icon" + id.charAt(id.length - 1)) {
      accordionIcon.style.transform = "rotate(0deg)";
    }
  });

  // Toggle the visibility of the clicked accordion content
  const isHidden = content.classList.contains("hidden");
  content.classList.toggle("hidden");

  // Rotate the icon based on accordion state
  icon.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
}

// Make toggleAccordion available globally
window.toggleAccordion = toggleAccordion;
