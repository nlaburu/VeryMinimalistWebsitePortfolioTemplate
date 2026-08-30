// script.js — logique de rendu i18n (dict fourni par i18n.js)
let current = "fr";
let wordIndex = 0;
let rotateTimer;

function applyLang(lang){
  current = lang;
  document.documentElement.lang = lang;
  document.title = dict[lang].title;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[lang][key]) el.innerHTML = dict[lang][key];
  });

  // Le CV suit la langue active (CV-FR.pdf / CV-EN.pdf)
  const cvLink = document.getElementById("cvLink");
  if (cvLink) cvLink.setAttribute("href", dict[lang].cvHref);

  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });

  wordIndex = 0;
  updateStatusWord();
}

function updateStatusWord(){
  const words = dict[current].words;
  const el = document.getElementById("statusWord");
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = words[wordIndex % words.length];
    el.style.opacity = 1;
    wordIndex++;
  }, 200);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  applyLang(current);

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced){
    rotateTimer = setInterval(updateStatusWord, 2400);
  }
});
