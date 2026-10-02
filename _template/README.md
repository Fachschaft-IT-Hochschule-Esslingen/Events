# Vorlage für eine neue Event-Seite

Dieser Ordner ist die Vorlage für alle Event-Seiten. Logo, Hell/Dunkel-Button, Zurück-Button und Footer sind schon eingebaut.

Ordner, die mit `_` beginnen, veröffentlicht GitHub Pages nicht. Die Vorlage ist also nicht öffentlich erreichbar.

## Neues Event anlegen

1. Den Ordner `_template` kopieren und umbenennen, z.B. in `sommerfest`. Der Ordnername wird Teil der URL: `.../Events/sommerfest/`.
2. In `index.html`:
   - `<title>` anpassen.
   - Variante wählen: Plakat links und Text rechts (`<main class="page split">`) oder nur kurzer Text mittig (`<main class="page centered">`). Beide stehen in der Datei.
   - Inhalt eintragen. Header und Footer nicht ändern.
3. Plakat in `images/` legen und den Pfad im `<img class="poster">` anpassen. Ohne Plakat `images/poster.svg` löschen.
4. Diese `README.md` im neuen Ordner löschen.
5. Auf der Hauptseite (`/index.html`) in der Event-Liste einen Link ergänzen:

   ```html
   <a class="button" href="sommerfest/">Sommerfest</a>
   ```

## Was wo liegt

| Datei | Zweck |
| --- | --- |
| `../assets/css/base.css` | Gemeinsames Layout und Farben für alle Seiten. Änderungen hier wirken überall. |
| `../assets/js/theme.js` | Hell/Dunkelmodus. Die Auswahl wird gespeichert und gilt für alle Seiten. |
| `../assets/images/` | FSIT-Logos (hell und dunkel). |
| `style.css` | Anpassungen nur für dieses Event. Darf leer bleiben. |

Nützliche Klassen aus `base.css`:

- `highlight`: rot und fett, z.B. für Termine.
- `button`: roter Button für Links.
