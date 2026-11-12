// Checkliste auf der FAQ-Seite: Häkchen im Browser merken und Fortschritt als Balken anzeigen.

(function () {
    const boxes = Array.from(document.querySelectorAll(".checklist input[type=checkbox]"));
    const bar = document.querySelector(".progress .bar");
    const count = document.querySelector(".progress .count");
    const width = 20; // Zeichen im Fortschrittsbalken

    function load(key) {
        try {
            return localStorage.getItem("hackathon-prep-" + key) === "1";
        } catch (e) {
            return false; // Speicher nicht verfügbar (z.B. privates Fenster)
        }
    }

    function save(key, checked) {
        try {
            localStorage.setItem("hackathon-prep-" + key, checked ? "1" : "0");
        } catch (e) {
            // ignorieren, Abhaken funktioniert trotzdem
        }
    }

    function update() {
        const done = boxes.filter(b => b.checked).length;
        const filled = Math.round(done / boxes.length * width);
        bar.textContent = "#".repeat(filled) + ".".repeat(width - filled);
        count.textContent = done === boxes.length
            ? done + "/" + boxes.length + " erledigt. Ready to hack!"
            : done + "/" + boxes.length + " erledigt";
    }

    boxes.forEach(box => {
        box.checked = load(box.dataset.key);
        box.addEventListener("change", () => {
            save(box.dataset.key, box.checked);
            update();
        });
    });

    update();
})();


// Link auf eine Frage (z.B. faq.html#anmeldung): Antwort aufklappen, hinscrollen und kurz hervorheben

function openFromHash() {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (!target || target.tagName !== "DETAILS") return;

    target.open = true;
    target.scrollIntoView({ block: "start" });
    target.classList.remove("flash");
    void target.offsetWidth; // Animation neu starten, falls der Link zweimal geklickt wird
    target.classList.add("flash");
}

// Erst nach der Einschalt-Animation scrollen, vorher ist das Terminal noch gestaucht
setTimeout(openFromHash, document.documentElement.classList.contains("animate") ? 650 : 0);
window.addEventListener("hashchange", openFromHash);


// "kopieren"-Buttons: kopieren den Text des Codeblocks mit der id aus data-copy

document.querySelectorAll("button.copy").forEach(button => {
    button.addEventListener("click", () => {
        const text = document.getElementById(button.dataset.copy).textContent;
        const done = label => {
            button.textContent = label;
            setTimeout(() => { button.textContent = "kopieren"; }, 1500);
        };

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => done("kopiert ✓"), () => done("markieren + Strg+C"));
        } else {
            done("markieren + Strg+C");
        }
    });
});
