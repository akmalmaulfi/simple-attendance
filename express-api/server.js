const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
const port = 3200

// Memanggil koneksi db
require("./utils/db")

// Memanggil routingan absensi
const absensiEndPoint = require("./routes/absensi")
const loginEndPoint = require("./routes/login")

// Middleware
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routingan
app.use("/absensi", absensiEndPoint)
app.use("/login", loginEndPoint)

// Handle 404 / page not found
app.use("*", (req, res) => {
  res.send("<h1>GA ADA HALAMANYA!!</h1>")
})

app.listen(port, () =>
  // console.log(`Server berjalan di port http://localhost:${port}`)
  console.log(`Server is running`)
)
