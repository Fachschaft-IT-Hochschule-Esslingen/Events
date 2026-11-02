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
