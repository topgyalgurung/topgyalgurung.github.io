// Constants
const TYPING_DELAY = {
  HEADING: 50,
  SUBHEADING: 30,
};

// Utility functions
const getElement = (id) => document.getElementById(id);
const getElements = (selector) => document.querySelectorAll(selector);

// Mobile menu functionality
function initializeMobileMenu() {
  const hamburger = getElement("hamburger");
  const mobileMenu = getElement("mobile-menu");

  if (!hamburger || !mobileMenu) {
    console.warn("Mobile menu elements not found");
    return;
  }

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

// Typing animation configuration
const TYPING_CONFIG = {
  heading: {
    text: "Hi,\nI'm Topgyal 👋",
    elementId: "typed-heading",
    delay: TYPING_DELAY.HEADING,
  },
  subheading: {
    text: "Software Engineer with Bachelor's in Computer Science",
    elementId: "typed-subheading",
    delay: TYPING_DELAY.SUBHEADING,
  },
};

class TypingAnimation {
  constructor(config) {
    this.config = config;
    this.currentIndex = 0;
  }

  start() {
    const element = getElement(this.config.elementId);
    if (!element) {
      console.warn(`Element with id '${this.config.elementId}' not found`);
      return Promise.reject(
        new Error(`Element not found: ${this.config.elementId}`)
      );
    }

    return new Promise((resolve) => {
      const type = () => {
        if (this.currentIndex < this.config.text.length) {
          element.innerHTML += this.config.text.charAt(this.currentIndex);
          this.currentIndex++;
          setTimeout(type, this.config.delay);
        } else {
          resolve();
        }
      };
      type();
    });
  }
}

// Initialize typing animations
async function initializeTypingAnimations() {
  try {
    const headingAnimation = new TypingAnimation(TYPING_CONFIG.heading);
    await headingAnimation.start();

    const subheadingAnimation = new TypingAnimation(TYPING_CONFIG.subheading);
    await subheadingAnimation.start();
  } catch (error) {
    console.error("Error in typing animation:", error);
  }
}

// Initialize resource category tabs (for tech learning channels)

// Tab system configuration
const TAB_STYLES = {
  active: ["active", "bg-blue-500", "text-white"],
  inactive: ["bg-gray-200", "text-gray-700"],
};

class TabSystem {
  constructor(config) {
    this.config = {
      tabSelector: config.tabSelector,
      contentSelector: config.contentSelector,
      defaultCategory: config.defaultCategory || "general",
      containerSelector: config.containerSelector || "",
      ...config,
    };

    this.tabs = getElements(this.config.tabSelector);
    this.contents = getElements(this.config.contentSelector);
  }

  initialize() {
    if (this.tabs.length === 0 || this.contents.length === 0) {
      console.warn("Tab elements not found");
      return;
    }

    // Initialize content visibility
    this.contents.forEach((content) => {
      const isDefault =
        content.getAttribute("data-category") === this.config.defaultCategory;
      content.classList.toggle("hidden", !isDefault);
    });

    // Initialize tab styles
    this.tabs.forEach((tab, index) => {
      const isDefault =
        index === 0 ||
        tab.getAttribute("data-category") === this.config.defaultCategory;
      this.setTabStyle(tab, isDefault);
    });

    // Add click handlers
    this.tabs.forEach((tab) => this.setupTabClickHandler(tab));
  }

  setTabStyle(tab, isActive) {
    const [addStyles, removeStyles] = isActive
      ? [TAB_STYLES.active, TAB_STYLES.inactive]
      : [TAB_STYLES.inactive, TAB_STYLES.active];

    tab.classList.remove(...removeStyles);
    tab.classList.add(...addStyles);
  }

  setupTabClickHandler(tab) {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const category = tab.getAttribute("data-category");

      // Update tab styles
      this.tabs.forEach((t) => this.setTabStyle(t, t === tab));

      // Update content visibility
      this.contents.forEach((content) => {
        content.classList.toggle(
          "hidden",
          content.getAttribute("data-category") !== category
        );
      });
    });
  }
}

// Initialize all tab systems
function initializeTabSystems() {
  const resourceTabs = new TabSystem({
    tabSelector: ".category-tab",
    contentSelector: ".category-content",
    defaultCategory: "general",
  });
  resourceTabs.initialize();

  const projectTabs = new TabSystem({
    tabSelector: ".project-tab",
    contentSelector: "#projects .project-content",
    defaultCategory: "fullstack",
    containerSelector: "#projects",
  });
  projectTabs.initialize();
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

// Visit counter functionality
class VisitCounter {
  constructor() {
    this.storageKey = "visitData";
    this.today = new Date().toISOString().split("T")[0];
  }

  initialize() {
    try {
      const visitData = this.getVisitData();
      this.updateVisitCounts(visitData);
      this.saveVisitData(visitData);
      this.updateDisplay(visitData);
    } catch (error) {
      console.error("Error initializing visit counter:", error);
    }
  }

  getVisitData() {
    try {
      return (
        JSON.parse(localStorage.getItem(this.storageKey)) || {
          totalVisits: 0,
          lastVisitDate: null,
          dailyVisits: 0,
        }
      );
    } catch (error) {
      console.error("Error reading visit data:", error);
      return {
        totalVisits: 0,
        lastVisitDate: null,
        dailyVisits: 0,
      };
    }
  }

  updateVisitCounts(data) {
    if (data.lastVisitDate !== this.today) {
      data.dailyVisits = 1;
      data.lastVisitDate = this.today;
    } else {
      data.dailyVisits++;
    }
    data.totalVisits++;
  }

  saveVisitData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving visit data:", error);
    }
  }

  updateDisplay(data) {
    const elements = {
      daily: getElement("dailyVisits"),
      total: getElement("totalVisits"),
    };

    if (elements.daily) elements.daily.textContent = data.dailyVisits;
    if (elements.total) elements.total.textContent = data.totalVisits;
  }
}

// Initialize all functionality when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize mobile menu
    initializeMobileMenu();

    // Initialize tab systems
    initializeTabSystems();

    // Initialize typing animations
    initializeTypingAnimations();

    // Initialize visit counter
    const visitCounter = new VisitCounter();
    visitCounter.initialize();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
