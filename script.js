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

  // l'header si compatta appena si scorre: osservo una riga alta 1px in cima
  // alla pagina invece di stare in ascolto sullo scroll
  const header = document.querySelector(".site-header");
  if (header) {
    const inizio = document.createElement("div");
    inizio.style.cssText = "position:absolute;top:0;height:1px;width:1px";
    document.body.prepend(inizio);
    new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting)).observe(inizio);
  }
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
