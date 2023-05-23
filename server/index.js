require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const User = require("./routes/user")

const port = process.env.APP_PORT

app.use(cors())
app.use(express.json()) // équivalent à body-parser

app.use("/", User)

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("connexion avec la base de donnée établie")
  app.listen(port, () => console.log(`Serveur lancé sur le port : ${port}`))
})
