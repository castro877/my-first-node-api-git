import express from 'express'
import usersRoutes from './routes/users.js'
const app = express()
const PORT = 3000

app.use(express.json())
app.use('/users', usersRoutes)
app.get('/', (req,res)=> res.send("Benvenuto nella Homepage"))
app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})