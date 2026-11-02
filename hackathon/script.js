// ASCII-Grafiken genau auf die verfügbare Breite skalieren und mittig setzen.
// Reine CSS-Rechnung reicht nicht: Chrome rundet bei kleinen Schriftgrößen die Zeichenbreiten,
// dann ragt die Grafik rechts heraus. Darum bei 15px messen und per transform verkleinern.

(function () {
    const boxes = document.querySelectorAll(".art-fit");

    function fit() {
        boxes.forEach(box => {
            const art = box.querySelector(".art");
            art.classList.add("fitted");
            art.style.transform = "none";

            const available = box.clientWidth;
            const scale = Math.min(1, available / art.offsetWidth);
            const left = (available - art.offsetWidth * scale) / 2;

            art.style.transform = "translateX(" + left + "px) scale(" + scale + ")";
            box.style.height = art.offsetHeight * scale + "px";
        });
    }

    fit();
    window.addEventListener("resize", fit);
    if (document.fonts) document.fonts.ready.then(fit);
})();


// Terminal-Animation der Hackathon-Seite.
// Geht alle Elemente mit data-anim der Reihe nach durch (siehe Kommentar in index.html).
// Klick oder Taste überspringt die Animation. Ohne die Klasse "animate" (z.B. bei
// "Bewegung reduzieren") passiert nichts und alles ist sofort sichtbar.

(function () {
    const root = document.documentElement;
    if (!root.classList.contains("animate")) return;

    const terminal = document.querySelector(".terminal");
    const steps = Array.from(document.querySelectorAll(".terminal-body [data-anim]"));

    let skipped = false;
    let wakeUp = null;
    const running = []; // Zeilen-Animationen, die beim Überspringen sofort fertig werden

    // Wartet ms Millisekunden, endet aber sofort, wenn übersprungen wird
    function wait(ms) {
        if (skipped) return Promise.resolve();
        return new Promise(resolve => {
            const timer = setTimeout(resolve, ms);
            wakeUp = () => { clearTimeout(timer); resolve(); };
        });
    }

    function show(el) {
        el.classList.add("shown");
    }

    // Befehl Zeichen für Zeichen eintippen
    async function type(el) {
        const cmd = el.querySelector(".cmd");
        const text = cmd.textContent;
        cmd.textContent = "";
        el.classList.add("typing");
        show(el);
        await wait(200);

        for (const char of text) {
            if (skipped) break;
            cmd.textContent += char;
            await wait(10 + Math.random() * 22);
        }

        cmd.textContent = text;
        await wait(250);
        el.classList.remove("typing");
    }

    // Block ausgeben; mehrzeiliger Text erscheint Zeile für Zeile
    async function print(el) {
        show(el);
        const lines = el.tagName === "PRE" ? el.textContent.split("\n").length : 1;

        if (lines > 1 && el.animate) {
            const duration = lines * 35;
            running.push(el.animate(
                [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }],
                { duration: duration, easing: "steps(" + lines + ", end)" }
            ));
            await wait(duration + 150);
        } else {
            await wait(70);
        }
    }

    // [  OK  ]-Zeile: erst kurz ein Spinner, dann das Ergebnis
    async function status(el) {
        const badge = el.querySelector(".badge");
        const result = badge.innerHTML;
        const frames = ["|", "/", "-", "\\"];
        show(el);

        for (let i = 0; i < 4 && !skipped; i++) {
            const f = frames[i % frames.length];
            badge.innerHTML = '[<span class="spinner">  ' + f + f + '  </span>]';
            await wait(45);
        }

        badge.innerHTML = result;
        await wait(90);
    }

    const handlers = { type: type, print: print, status: status };

    function skip() {
        if (skipped) return;
        skipped = true;
        if (wakeUp) wakeUp();
    }

    async function run() {
        terminal.classList.add("running");
        await wait(700); // Einschalt-Animation abwarten

        for (const el of steps) {
            if (skipped) break;
            await handlers[el.dataset.anim](el);
        }

        // Aufräumen: alles anzeigen, laufende Animationen beenden
        steps.forEach(el => {
            show(el);
            el.classList.remove("typing");
        });
        running.forEach(a => a.finish());
        terminal.classList.remove("running");
        terminal.removeEventListener("click", skip);
        document.removeEventListener("keydown", skip);
    }

    terminal.addEventListener("click", skip);
    document.addEventListener("keydown", skip);
    run();
})();
