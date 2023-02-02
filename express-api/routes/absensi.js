const express = require("express")
const router = express.Router()

// Memanggil koneksi db
require("../models/absensi")
// Memanggil model absensi
const Absensi = require("../models/absensi")

// Endpoint halaman utama
router.get("/", async (req, res) => {
  const absensi = await Absensi.find()
  res.status(200).json({
    absensi: absensi,
    metadata: "Ini adalah endpoint utama",
  })
})

// Endpoint insert data absensi
router.post("/", async (req, res) => {
  try {
    const duplicate = await Absensi.findOne({ npm: req.body.npm })
    if (duplicate) {
      throw new Error("NPM sudah terdaftar")
    } else {
      Absensi.insertMany(req.body, (result, error) => {})
      res.status(200).json({
        keterangan: req.body,
        metadata: "berhasil menambahkan data",
      })
    }
  } catch (e) {
    res.status(400).json({
      keterangan: "gagal menambahkan data",
    })
    console.log(e)
  }
})

module.exports = router
