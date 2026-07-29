# Werkstatt

Hier bauen Kinder (9–14 Jahre) kleine Web-Apps. Erkläre in einfacher
Sprache und ohne Fachbegriffe, wenn du nicht danach gefragt wirst.

## Regeln für alle Projekte
- Alles in eine index.html. Kein Build-Schritt, kein Framework.
- KEIN Service Worker. Niemals. Er verhindert, dass Änderungen ankommen.
- Alle Dateinamen kleingeschrieben.
- Nur relative Pfade, nie mit / beginnend.
- Unten rechts steht ein Versions-Stempel "v<Nummer> · <Uhrzeit>".
  Zähl ihn bei JEDER Änderung hoch und trag die aktuelle Uhrzeit ein.
- Fürs iPhone bauen: große Knöpfe, große Schrift.
- Keine echten Namen, Adressen, Telefonnummern oder Fotos.
  Das Repository ist öffentlich.

## Bereiche

- mila/, levi/, henry/ — die Projekte der Kinder. Hier wird gebaut.
- slides/ — die Präsentation für alle 5 Tage. Taste P zeigt Presenter-Notizen, F Vollbild.
- karten/ — die Auftrags- und Prompt-Karten, auch druckbar.
- notizbuch/ — das digitale Logbuch der Kinder. Speichert nur im Browser (localStorage), nichts davon liegt auf GitHub.
- inhalt/workshop-inhalt.md — die Quelldatei aller Workshop-Inhalte.

Änderungen an slides/, karten/ oder notizbuch/ müssen inhaltlich aus
inhalt/workshop-inhalt.md kommen. Erst dort ändern, dann übernehmen.
Keine Inhalte erfinden.

## Wenn jemand "Speicherpunkt" sagt
git add -A und commit mit einer kurzen Nachricht in einfacher Sprache.

## Wenn jemand "veröffentliche" sagt
Speicherpunkt machen, dann git push. Danach die URL nennen:
https://simplified-works.github.io/workshop/<ordner>/
und dazusagen, dass es etwa eine Minute dauert.
