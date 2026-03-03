const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-link");
const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

if (yearEl) yearEl.textContent = new Date().getFullYear();

function openMenu() {
  navLinks.classList.add("open");
  toggleBtn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  navLinks.classList.remove("open");
  toggleBtn.setAttribute("aria-expanded", "false");
}

function isMenuOpen() {
  return navLinks.classList.contains("open");
}

toggleBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isMenuOpen()) closeMenu();
  else openMenu();
});

navLinkItems.forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("click", (e) => {
  if (!isMenuOpen()) return;

  const clickedInsideMenu = navLinks.contains(e.target);
  const clickedToggle = toggleBtn.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen()) closeMenu();
});

const sections = ["home", "about", "info", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const setActive = () => {
  const y = window.scrollY + 90;
  let current = "home";

  for (const s of sections) {
    if (s.offsetTop <= y) current = s.id;
  }

  navLinkItems.forEach(link => {
    const href = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", href === current);
  });
};

window.addEventListener("scroll", setActive);
window.addEventListener("load", setActive);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  form.reset();
  if (formHint) {
    formHint.textContent = `Ευχαριστώ${name ? ", " + name : ""}! Το μήνυμα καταχωρήθηκε (demo).`;
  }
});