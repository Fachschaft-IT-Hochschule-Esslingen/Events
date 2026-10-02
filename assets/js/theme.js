// Hell-/Dunkelmodus für alle Seiten.
// Wird im <head> geladen, damit beim Seitenwechsel nichts kurz hell aufblitzt.
// Die Auswahl wird im Browser gespeichert und gilt so auch auf den anderen Seiten.

(function () {
    try {
        if (localStorage.getItem("theme") === "light") {
            document.documentElement.classList.remove("dark-mode");
        }
    } catch (e) {
        // Speicher nicht verfügbar (z.B. privates Fenster): Standard bleibt dunkel
    }
})();

function toggleColorMode() {
    const dark = document.documentElement.classList.toggle("dark-mode");
    try {
        localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
        // ignorieren, Umschalten funktioniert trotzdem
    }
}
