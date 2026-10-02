// ================================
// MASOUMEH SADAT PORTFOLIO
// Main JavaScript
// ================================

// -------------------------------
// 1. Select elements
// -------------------------------

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

const year = document.querySelector("#year");
const glow = document.querySelector(".cursor-glow");

// -------------------------------
// 2. Set current year automatically
// -------------------------------

if (year) {
  year.textContent = new Date().getFullYear();
}

// -------------------------------
// 3. Mobile navigation
// -------------------------------

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    navToggle.setAttribute("aria-expanded", String(isOpen));

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );
  });
}

// -------------------------------
// 4. Close mobile menu
// when a navigation link is clicked
// -------------------------------

if (navLinks) {
  const links = navLinks.querySelectorAll("a");

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");

      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// -------------------------------
// 5. Project filters
// -------------------------------

filters.forEach(function (filter) {
  filter.addEventListener("click", function () {
    const selectedCategory = filter.dataset.filter;

    // Update active filter button
    filters.forEach(function (button) {
      const isActive = button === filter;

      button.classList.toggle("active", isActive);

      button.setAttribute("aria-selected", String(isActive));
    });

    // Show / hide projects
    projects.forEach(function (project) {
      const tagString = project.dataset.tags || "";

      const tags = tagString.split(" ");

      const shouldShow =
        selectedCategory === "all" || tags.includes(selectedCategory);

      project.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// -------------------------------
// 6. Reveal animation
// -------------------------------

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
} else {
  // Fallback for older browsers

  revealElements.forEach(function (element) {
    element.classList.add("is-visible");
  });
}

// -------------------------------
// 7. Cursor glow effect
// Desktop only
// -------------------------------

window.addEventListener("pointermove", function (event) {
  if (!glow) {
    return;
  }

  // Disable on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  glow.style.left = event.clientX + "px";

  glow.style.top = event.clientY + "px";
});

// -------------------------------
// 8. Close mobile navigation
// with Escape key
// -------------------------------

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (navLinks) {
      navLinks.classList.remove("open");
    }

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }
});
