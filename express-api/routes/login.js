const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

require("../utils/db")
const Admin = require("../models/admin")

// Handle Login Get
router.get("/", async (req, res) => {
  const admin = await Admin.find()
  res.status(200).json({
    admin: admin,
    metadata: "Ini adalah endpoint utama",
  })
})

// Handle Login Post
router.post("/", async (req, res) => {
  try {
    const usernameMatch = await Admin.findOne({ username: req.body.username })
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      usernameMatch.password
    )
    if (usernameMatch && passwordMatch) {
      res.status(200).json({
        data: usernameMatch,
        metadata: "Login berhasil",
      })
    } else {
      throw new Error("Gagal Login")
    }
  } catch (e) {
    res.status(400).json({
      keterangan: "Login gagal, cek lagi username & password!",
    })
    console.log(e)
  }
})

// router.post("/", (req, res) => {
//   const { username, password } = req.body

//   Admin.findOne({ username: username })
//     .then((user) => {
//       // kalau user ga sama kasih status error 400
//       if (!user) return res.status(400).json({ pesan: "user tidak ditemukan" })

//       // kalau username ada maka compare password
//       // password dari user
//       // user.password dari database
//       bcrypt.compare(password, user.password, (err, data) => {
//         // kalau error maka lempar error
//         if (err) throw err

//         //  jika keduanya sama antara maka lakukan perintah lain
//         if (data) {
//           return res.status(200).json({ pesan: "Login success" })
//         } else {
//           return res.status(400).json({ pesan: "Invalid credencial" })
//         }
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

// Handle Add data
router.post("/add", async (req, res) => {
  try {
    const { username, password } = req.body
    // Hashing Password
    const hashPassword = await bcrypt.hash(password, 10)
    const duplicate = await Admin.findOne({ username: username })
    if (duplicate) {
      throw new Error("Username sudah terdaftar")
    } else {
      Admin.insertMany({
        username,
        password: hashPassword,
      })
      res.status(200).json({
        keterangan: {
          username,
          hashPassword,
        },
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
