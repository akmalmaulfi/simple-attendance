const mongoose = require("mongoose")

const Absensi = mongoose.model("Absensi", {
  npm: {
    type: String,
    required: true,
  },
  kodeabsen: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
})

module.exports = Absensi
