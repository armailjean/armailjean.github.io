const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

function updateScrollUI(){
  const scrollTop = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = total > 0 ? `${(scrollTop / total) * 100}%` : "0%";
  header.classList.toggle("scrolled", scrollTop > 12);

  let current = "accueil";
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 140) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateScrollUI, {passive:true});
updateScrollUI();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
