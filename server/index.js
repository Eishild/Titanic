const express = require("express")
const cors = require("cors")
const User = require("./routes/user")
const { connexion } = require("./connexion/mongoConnect")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json()) // équivalent à body-parser

app.use("/", User)

connexion(process.env.DB_URI, process.env.APP_PORT)
