const mongoose = require("mongoose")

const Passengers = new mongoose.Schema({
  passengerId: { type: Number },
  survived: { type: Number },
  pclass: { type: Number },
  name: { type: String },
  sex: { type: String },
  age: { type: Number },
  sibSp: { type: Number },
  parch: { type: Number },
  ticket: { type: Number },
  fare: { type: Number },
  cabin: { type: String },
  embarked: { type: String },
})

module.exports = mongoose.model("Passengers", Passengers)
