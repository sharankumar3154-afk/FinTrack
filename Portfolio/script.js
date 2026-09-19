// Contact form: Bootstrap-style client-side validation
const form = document.getElementById("contactForm");
const successBox = document.getElementById("formSuccess");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  if (!form.checkValidity()) {
    // Show Bootstrap's red invalid-feedback messages
    form.classList.add("was-validated");
    successBox.classList.add("d-none");
    return;
  }

  // Form is valid — in a real project this is where you'd send
  // the data to a backend (e.g. Django view) using fetch().
  successBox.classList.remove("d-none");
  form.reset();
  form.classList.remove("was-validated");
});

// Highlight active nav link while scrolling
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
