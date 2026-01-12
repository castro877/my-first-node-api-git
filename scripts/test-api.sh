#!/usr/bin/env bash
set -e

BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "== GET /users"
curl -s "$BASE_URL/users"
echo -e "\n"

echo "== POST /users (create: spazi + email maiuscola)"
CREATE_RES=$(curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"nome":"  Anna  ","cognome":"  Rossi  ","email":"ANNA.ROSSI@gmail.com  "}')
echo "$CREATE_RES"
echo -e "\n"

USER_ID=$(echo "$CREATE_RES" | node -e "process.stdin.on('data',d=>{const j=JSON.parse(d); console.log(j.id)})")

echo "== GET /users/:id"
curl -s "$BASE_URL/users/$USER_ID"
echo -e "\n"

echo "== Duplicate email (expect 409)"
curl -i -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Anna","cognome":"Rossi","email":"anna.rossi@gmail.com"}' | head -n 12
echo -e "\n"

echo "== PATCH /users/:id (trim nome)"
curl -s -X PATCH "$BASE_URL/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{"nome":"  Annina  "}'
echo -e "\n"

echo "== DELETE /users/:id"
curl -i -X DELETE "$BASE_URL/users/$USER_ID" | head -n 12
echo -e "\n"

echo "DONE ✅"
