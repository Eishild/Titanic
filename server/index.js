const express = require("express")
const cors = require("cors")
const User = require("./routes/user")
const { Connexion } = require("./connexion/mongoConnect")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json()) // équivalent à body-parser

app.use("/", User)

Connexion(process.env.DB_URI).then(() => {
  app.listen(process.env.APP_PORT, () =>
    console.log(`Serveur lancé sur le port : ${process.env.APP_PORT}`)
  )
})
