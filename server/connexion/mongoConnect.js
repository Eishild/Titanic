const mongoose = require("mongoose")
const express = require("express")

const app = express()
mongoose.set("strictQuery", false)
async function connexion(db_uri, port) {
  try {
    await mongoose.connect(db_uri)
    app.listen(port, () => console.log(`Serveur lancé sur le port : ${port}`))
  } catch (error) {
    console.log(error)
  }
}

module.exports = { connexion }
