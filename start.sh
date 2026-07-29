#!/bin/bash
# Startet den Workshop-Server im lokalen Netz.
cd "$(dirname "$0")"

HOST="$(scutil --get LocalHostName | tr '[:upper:]' '[:lower:]')"
PORT=8000

echo "Workshop läuft auf:"
echo
echo "  Startseite:  http://${HOST}.local:${PORT}/"
echo
for dir in */; do
  name="${dir%/}"
  if [ -f "$dir/index.html" ]; then
    echo "  ${name}:  http://${HOST}.local:${PORT}/${name}/"
  fi
done
echo
echo "Beenden mit Strg+C."
echo

# Mac wachhalten, solange der Server läuft
caffeinate -dims &
CAFF_PID=$!
trap 'kill "$CAFF_PID" 2>/dev/null; exit 0' INT TERM

python3 -m http.server "$PORT" --bind 0.0.0.0

kill "$CAFF_PID" 2>/dev/null
