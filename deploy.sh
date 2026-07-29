#!/bin/bash
# Speichert alles und lädt es auf GitHub hoch.
cd "$(dirname "$0")"

MSG="${1:-Stand vom $(date '+%d.%m.%Y %H:%M')}"

git add -A
git commit -m "$MSG"
git push
