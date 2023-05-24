const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const Connexion = async (db_uri) => {
  try {
    await mongoose.connect(db_uri)
    console.log("connexion avec la base de donnée établie")
  } catch (error) {
    console.log("Erreur de connexion avec la base de donnée")

    console.log(error)
  }
}

module.exports = { Connexion }
