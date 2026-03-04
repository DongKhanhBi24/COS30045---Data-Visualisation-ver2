// Handle navigation using JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const logo = document.getElementById("logo");

  // Navigate using JavaScript
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      window.location.href = target;
    });
  });

  // Logo returns to Home page
  if (logo) {
    logo.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Highlight current page
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
