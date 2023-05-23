const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UsersModel = require("../models/users")
const PassengersModel = require("../models/passengers")

async function addUser(req, res) {
  let newUser = req.body

  try {
    const users = await UsersModel.find()

    if (
      users.find((e) => {
        return e.email == newUser.email
      }) !== undefined
    ) {
      console.log("accountAlreadyExist")
      return res.status(400).send({
        type: "accountAlreadyExist",
        message: "Ce compte existe déjà.",
      })
    }

    const passwordHashed = await bcrypt.hash(newUser.password, 10)
    newUser.password = passwordHashed

    await UsersModel.create(newUser)
    console.log(`donnée ajouté ${newUser.email}`)
    res.status(200).send("Donnée envoyée avec succèes.")
  } catch (error) {
    console.log(error)
    res.status(500).send("Erreur de serveur.")
  }
}

async function login(req, res) {
  try {
    let userLogin = { ...req.body }

    const user = await UsersModel.findOne({ email: userLogin.email })

    if (!user) {
      console.log("account Not found !")
      return res
        .status(400)
        .send({ type: "login", message: "Compte introuvable" })
    }

    console.log("account found !")

    const isValid = await bcrypt.compare(userLogin.password, user.password)
    console.log(isValid)

    if (isValid) {
      const token = jwt.sign(
        {
          firstname: user.firstname,
          lastname: user.lastname,
        },
        process.env.SECRET_API_TOKEN
      )
      return res.status(200).send({
        type: "success",
        message: "Connexion Validée.",
        token: token,
        user: user,
      })
    } else {
      return res.status(403).send("mot de passe incorrect")
    }

    // res.status(200).send("Compte trouvé ! Demande de connexion reçu.");
  } catch (error) {
    res
      .status(500)
      .send({ type: "server", message: `Erreur serveur ${error} ` })
  }
}

function getAllPassengers(req, res) {
  PassengersModel.find().then((data) => {
    res.status(200).send({ message: `Donnée envoyé !`, value: data })
  })
}

module.exports = { getAllPassengers, login, addUser }
