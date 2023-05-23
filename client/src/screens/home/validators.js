export const validatorsLoginFrom = (signIn) => {
  const errors = []

  if (signIn.email === "") {
    errors.push({ type: "email", message: "Veuillez entrer un email." })
  }

  if (!signIn.email.includes("@") && signIn.email !== "") {
    errors.push({ type: "email", message: "Veuillez entrer un email valide." })
  }

  if (signIn.password === "") {
    errors.push({
      type: "password",
      message: "Veuillez entrer un mot de passe.",
    })
  }

  if (errors.length !== 0) throw errors
  return errors
}

export const validatorsInscriptionFrom = (signUp) => {
  const { firstname, lastname, email, password, confirmPassword } = signUp
  const errors = []

  if (firstname === "") {
    errors.push({ type: "firstname", message: "Veuillez entrer un prénom." })
  }

  if (lastname === "") {
    errors.push({ type: "lastname", message: "Veuillez entrer un nom." })
  }

  if (email === "") {
    errors.push({ type: "emailSignUp", message: "Veuillez entrer un email." })
  }

  if (!email.includes("@") && email !== "") {
    errors.push({
      type: "emailSignUp",
      message: "Veuillez entrer un email valide.",
    })
  }

  if (password === "") {
    errors.push({
      type: "passwordSignUp",
      message: "Veuillez entrer un mot de passe.",
    })
  }

  if (password.length < 5 && password !== "") {
    errors.push({
      type: "passwordSignUp",
      message: "Mot de passe trop court",
    })
  }

  if (password !== confirmPassword) {
    errors.push({
      type: "passwordSignUp",
      message: "Les mots de passe ne sont pas les même.",
    })
  }

  if (errors.length !== 0) throw errors
  return errors
}
