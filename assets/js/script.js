// Language switch: applies the dictionary texts (provided by i18n.js) and updates the CV link based on the active language.

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.title = dict[lang].title;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[lang][key]) el.innerHTML = dict[lang][key];
  });

  // CV follows the active language via cvHref link in i18n.js
  const cvLink = document.getElementById("cvLink");
  if (cvLink) cvLink.setAttribute("href", dict[lang].cvHref);

  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  applyLang("fr");
});