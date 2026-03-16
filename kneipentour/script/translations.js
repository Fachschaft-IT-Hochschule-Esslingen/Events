// standard language
const langs = ["DE", "EN"];
let lang_index = 0;

// init function gatting called once
init();


function init() {
    const langButton = document.getElementById("lang-button");
    langButton.addEventListener("click", () => onChangeLang());
    langButton.innerHTML = langs[lang_index];

    loadLang();
}

function onChangeLang() {
    lang_index++;
    if (lang_index >= langs.length) {lang_index = 0};

    loadLang();

    const langButton = document.getElementById("lang-button");
    langButton.innerHTML = langs[lang_index];
}

function loadLang() {
    const file = "lang/" + langs[lang_index] + ".html";

    const text = document.getElementById("lang-text");

    fetch(file)
        .then(response => response.text())
        .then(respoText => text.innerHTML = respoText)
        .catch(err => console.error("Error while loading language", err));
}