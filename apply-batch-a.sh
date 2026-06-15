#!/usr/bin/env bash
# Batch A van de Emigratieplan-audit: 8 schone commits op branch fix/audit.
# Draai dit vanuit de repo-root op je eigen machine (waar git wel naar .git mag schrijven).
# De sandbox kon de bestanden wel bewerken maar niet committen, vandaar deze patch-serie.
set -e
cd "$(dirname "$0")"

BASE=76dd09a   # feat/over-page HEAD waarop de fixes zijn gebouwd

echo "1/4  stale sandbox-lock opruimen"
rm -f .git/index.lock

echo "2/4  branch fix/audit op $BASE zetten (forceren, sandbox-edits weg)"
git checkout -f -B fix/audit "$BASE"
git reset --hard "$BASE"
rm -f preview/images/og-cover.png   # untracked sandbox-restant; patch R20 herbouwt 'm

echo "3/4  de 8 commits terugspelen"
git am _audit-batch-a/*.patch

echo "4/4  klaar. Commits op fix/audit:"
git log --oneline "$BASE"..fix/audit

cat <<'NOTE'

Controleer de diff (git log -p of je editor), dan pushen:
  git push -u origin fix/audit

Patches niet meer nodig na review:
  rm -rf _audit-batch-a apply-batch-a.sh

Loopt git am vast? Herstel met:  git am --abort
NOTE
