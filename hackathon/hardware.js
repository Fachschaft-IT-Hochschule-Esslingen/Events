// CSV-Export der Hardware-Liste: liest die Teile direkt aus der Seite,
// damit Liste und Export nie auseinanderlaufen.
// Semikolon als Trenner und BOM am Anfang, sonst zeigt ein deutsches Excel alles in einer Spalte
// bzw. die Umlaute falsch an.

document.getElementById("export-csv").addEventListener("click", () => {
    const quote = text => '"' + text.replace(/"/g, '""') + '"';
    const rows = [["Kategorie", "Anzahl", "Bezeichnung", "Shop-Link", "Doku-Link"]];

    document.querySelectorAll(".parts").forEach(list => {
        const category = list.previousElementSibling.textContent.replace(/^#+\s*/, "");

        list.querySelectorAll("li").forEach(item => {
            const shop = item.querySelector("a:not(.doku)");
            const doku = item.querySelector("a.doku");
            rows.push([
                category,
                item.querySelector(".qty").textContent.replace("x", ""),
                shop.textContent,
                shop.href,
                doku ? doku.href : ""
            ]);
        });
    });

    const csv = "﻿" + rows.map(row => row.map(quote).join(";")).join("\r\n") + "\r\n";
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "hackathon-stueckliste.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
});
