  const button = document.getElementById("generate-joke");
  const displayDiv = document.getElementById("joke-display");


  button.addEventListener("click", async () => {
    getRandomJoke();
  }
)

"https://official-joke-api.appspot.com/random_joke

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

async function fetchNewJoke() {
  const response = await axios.get(
    "https://official-joke-api.appspot.com/random_joke"
  );

  displayDiv.innerHTML = "";

  // create new div 
  let newDiv = document.createElement("div");
  let h3 = document.createElement("h3");

  h3.innerHTML = response .data.setup;
  newDiv.appendChild(h3);
  let p = document.createElement("p");
  p.innerHTML = response.data.punchline;
  newDiv.appendChild(p);
  displayDiv.appendChild(newDiv);
  displayDiv.classList.remove("hidden");
  return newDiv;
}


  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch joke");
  }

