const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Passenser = require("../models/passengers")
const User = require("../models/user")

async function addUser(req, res) {
  let { email, password } = req.body

  try {
    const users = await User.find({ email })

    if (users.length !== 0) {
      console.log("accountAlreadyExist")
      return res.status(400).send({
        type: "accountAlreadyExist",
        message: "Ce compte existe déjà.",
      })
    }

    const passwordHashed = await bcrypt.hash(password, 10)

    const newUser = new User({
      ...req.body,
      password: passwordHashed,
    })

    newUser.save()

    res.status(200).send("Donnée envoyée avec succèes.")
  } catch (error) {
    console.log(error)
    res.status(500).send("Erreur de serveur.")
  }
}

async function login(req, res) {
  try {
    let { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      console.log("account Not found !")
      return res
        .status(400)
        .send({ type: "login", message: "Compte introuvable" })
    }

    console.log("account found !")

    const isValid = bcrypt.compare(userLogin.password, user.password)

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
  } catch (error) {
    res
      .status(500)
      .send({ type: "server", message: `Erreur serveur ${error} ` })
  }
}

async function getAllPassengers(req, res) {
  try {
    const data = await Passenser.find()
    res.status(200).send({ message: "Donnée envoyée !", value: data })
  } catch (error) {
    console.log(error)
    res.status(500).send("Erreur de serveur.")
  }
}

module.exports = { getAllPassengers, login, addUser }
