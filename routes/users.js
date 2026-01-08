import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router();

let users = [
    {
        nome: "Luca",
        cognome: "Bianchi",
        email: "luca.bianchi@gmmail.com"
    },
    {
        nome: "Marco",
        cognome: "Bianchi",
        email: "marco.bianchi@gmmail.com"
    },
    {
        nome: "Lons",
        cognome: "Bianchi",
        email: "lons.bianchi@gmmail.com"
    }
]

router.get('/', (req, res)=>{
    console.log(users)
    res.send(users)
})

router.post('/',(req,res)=>{
    
    const user= req.body

    users.push({ ...user, id: uuidv4() })



    res.send(`Utente con email ${user.email} è stato aggiumto con successo!`)
})

router.get('/:id', (req,res)=>{
    const id = req.params.id
    const userTrovato = users.find((user)=> user.id ==id)

    res.send(userTrovato)

})

export default router;