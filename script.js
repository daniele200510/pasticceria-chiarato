document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Chiudi il menu" : "Apri il menu");
});

navigation?.addEventListener("click", () => {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Apri il menu");
});

document.querySelector("#year").textContent = new Date().getFullYear();

// carosello: le frecce spostano di una schermata e tornano all'altro capo
// quando la corsa è finita, così scorre in cerchio in entrambi i versi
const track = document.querySelector(".carousel-track");
if (track) {
  const step = () => track.clientWidth * 0.8;
  const end = () => track.scrollWidth - track.clientWidth;
  document.querySelector(".carousel-next")?.addEventListener("click", () => {
    track.scrollTo({ left: track.scrollLeft >= end() - 8 ? 0 : track.scrollLeft + step() });
  });
  document.querySelector(".carousel-prev")?.addEventListener("click", () => {
    track.scrollTo({ left: track.scrollLeft <= 8 ? end() : track.scrollLeft - step() });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }),
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  // l'header si compatta quando la barra indirizzo esce dallo schermo.
  // ponytail: osservo un elemento che già esiste, così niente listener di scroll
  const topBar = document.querySelector(".announcement");
  const header = document.querySelector(".site-header");
  if (topBar && header) {
    new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting)).observe(topBar);
  }
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
