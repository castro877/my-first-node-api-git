# My First Node API (Express)

Mini API REST in Node.js + Express per gestire utenti in memoria (no DB).
Include CRUD, validazione, normalizzazione email, controllo duplicati e logging delle richieste.

## Features
- CRUD `/users`
  - `GET /users` -> lista utenti
  - `GET /users/:id` -> utente singolo
  - `POST /users` -> crea utente
  - `PATCH /users/:id` -> aggiorna parzialmente
  - `DELETE /users/:id` -> elimina
- Validazione campi richiesti (`nome`, `cognome`, `email`) su POST
- `trim()` su nome/cognome/email e normalizzazione `email.toLowerCase()`
- Controllo email duplicata -> `409 Conflict`
- Logging middleware: data ISO, metodo, URL, status code, tempo (ms)

## Tech Stack
- Node.js
- Express
- UUID (per ID)
- Nodemon (dev)

## Setup
```bash
npm install
