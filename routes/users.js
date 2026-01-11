import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [
    { id: "seed-luca", nome:"Luca", cognome:"Bianchi", email:"luca.bianchi@gmail.com" },
    { id: "seed-marco", nome:"Marco", cognome:"Bianchi", email:"marco.bianchi@gmail.com" },
    { id: "seed-lons", nome:"Lons", cognome:"Bianchi", email:"lons.bianchi@gmail.com" },
  ];
  

// GET /users -> lista utenti
router.get("/", (req, res) => {
  return res.json(users);
});

// PATCH /users/:id -> update parziale
router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const nome = req.body?.nome !== undefined ? String(req.body.nome).trim() : undefined;
    const cognome = req.body?.cognome !== undefined ? String(req.body.cognome).trim() : undefined;
    const emailRaw = req.body?.email !== undefined ? String(req.body.email).trim() : undefined;
  
    // se presente ma vuoto -> 400 (evita update a stringa vuota)
    if (nome !== undefined && !nome) return res.status(400).json({ message: "nome cannot be empty" });
    if (cognome !== undefined && !cognome) return res.status(400).json({ message: "cognome cannot be empty" });
  
    let email;
    if (emailRaw !== undefined) {
      if (!emailRaw) return res.status(400).json({ message: "email cannot be empty" });
      email = emailRaw.toLowerCase();
  
      const emailEsistente = users.some((u) => u.id !== id && u.email.toLowerCase() === email);
      if (emailEsistente) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }
  
    const updated = {
      ...users[index],
      ...(nome !== undefined ? { nome } : {}),
      ...(cognome !== undefined ? { cognome } : {}),
      ...(email !== undefined ? { email } : {}),
    };
  
    users[index] = updated;
    return res.json(updated);
  });
  
  // DELETE /users/:id -> elimina
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  
    users.splice(index, 1);
    return res.status(204).send();
  });
  

// POST /users -> crea utente (con validazione)
router.post("/", (req, res) => {
    const nome = (req.body?.nome ?? "").trim();
    const cognome = (req.body?.cognome ?? "").trim();
    const emailRaw = (req.body?.email ?? "").trim();
  
    if (!nome || !cognome || !emailRaw) {
      return res.status(400).json({ message: "nome, cognome, email are required" });
    }
  
    // normalizzo email per confronto (case-insensitive)
    const email = emailRaw.toLowerCase();
  
    const emailEsistente = users.some((u) => u.email.toLowerCase() === email);
    if (emailEsistente) {
      return res.status(409).json({ message: "Email already exists" });
    }
  
    const newUser = { id: uuidv4(), nome, cognome, email };
    users.push(newUser);
  
    return res.status(201).json(newUser);
  });
  

// GET /users/:id -> singolo utente
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const userTrovato = users.find((u) => u.id === id);

  if (!userTrovato) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(userTrovato);
});

export default router;
