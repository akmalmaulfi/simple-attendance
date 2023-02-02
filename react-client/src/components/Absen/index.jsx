import React, { useEffect, useState } from "react"
import axios from "axios"

const Absen = () => {
  const [npm, setNpm] = useState("")
  const [kodeabsen, setKodeabsen] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [ip, setIp] = useState("")

  useEffect(() => {
    // membuat request ke server dan mengembalikan ip user address
    fetch("https://api.ipify.org?format=json")
      .then(function (response) {
        // parsing respon ke json
        return response.json()
      })
      .then(function (data) {
        // mengambil ip dari data, dan men set state
        setIp(data.ip)
      })

    // Cek apakah Browser support dengan API Geolocatin atau tidak
    if (navigator.geolocation) {
      // jika support, maka dapatkan lokasi user sekarang
      navigator.geolocation.getCurrentPosition((position) => {
        // objek posisi berisi lintang(latitude) dan bujur(longitude) dari lokasi user sekarang
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
    } else {
      // If the browser does not support the Geolocation API, log an error message
      console.log("Browser tidak support Geolocation")
    }
  })

  const submitData = () => {
    const isNpmEmpt = document.mainForm.npmCheck.value
    const isKodeabsenEmpt = document.mainForm.kodeabsenCheck.value

    if (isNpmEmpt === "" && isKodeabsenEmpt === "") {
      alert("NPM dan Kode Absen harus diisi!")
    } else if (isNpmEmpt === "") {
      alert("NPM harus diisi!")
    } else if (isKodeabsenEmpt === "") {
      alert("Kode Absen harus diisi")
    } else {
      const requestingData = {
        npm: npm,
        kodeabsen: kodeabsen,
        ip: ip,
        latitude: latitude,
        longitude: longitude,
      }

      axios({
        method: "POST",
        url: "http://localhost:3200/absensi/",
        data: requestingData,
      })
        .then((response) => {
          alert("Berhasil Absen")
        })
        .catch((err) => {
          alert("Gagal Absen!")
        })
    }
  }

  return (
    <section
      id="login"
      className=" flex justify-center items-center w-full h-auto bg-gradient-to-b from-[#f1f4f9] to-[#dff1ff] font-poppins overflow-hidden box-border "
    >
      <div className="absolute blur-[80px] -top-[235px] w-[400px] h-[400px] bg-[#ff359b] "></div>
      <div className="absolute blur-[80px] -bottom-[1px] left-[65px] w-[330px] h-[237px] bg-[#fffd87]  "></div>
      <div className="absolute blur-[80px] bottom-[35px] right-[60px] w-[205px] h-[200px] bg-[#00d2ff]  "></div>
      <div className="flex w-full h-screen justify-center items-center overflow-hidden">
        <div className="square top-[80px] right-2 w-24 h-24 bg-slate-900/10 lg:top-[15px] lg:right-96"></div>
        <div className="square bottom-[80px] left-2 lg:left-[370px] lg:bottom-[15px] w-24 h-24 bg-slate-900/10"></div>
        <div className="w-[80%] lg:max-w-[400px] h-auto flex flex-col justify-center items-center  border-[1px] border-white/50 border-r-[1px] border-r-white/20 border-b-[1px] border-b-white/90  shadow-[0_25px_45px_rgba(0,0,0,0.1)] rounded-[10px] box-border  px-5 py-6 backdrop-blur-md bg-slate-900/10 mx-5 overflow-hidden">
          <div className="w-full h-full box-border flex justify-center items-center flex-col ">
            <div className="relative w-full h-full ">
              <div className="flex items-center justify-between">
                <h2 className="relative text-white text-[24px] font-[600] before:absolute before:left-0 before:-bottom-[3px] before:w-[40px] before:h-[4px] before:bg-white mb-6 drop-shadow-sm">
                  Absensi
                  <span className="ml-1 relative before:absolute before:right-0 before:top-0 before:w-[40px] before:h-[4px] before:bg-white">
                    Mahasiswa
                  </span>
                </h2>
                <a href="/login">
                  <i
                    className="fa fa-sign-in text-xl text-white cursor-pointer hover:text-slate-700 transition -translate-y-3"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>

              <form name="mainForm">
                <div>
                  <input
                    type="number"
                    placeholder="Masukkan NPM"
                    className="inputan placeholder:text-white placeholder:text-[16px] placeholder:drop-shadow-lg"
                    required
                    name="npmCheck"
                    onChange={(event) => setNpm(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Masukkan Kode Absen"
                    className="inputan placeholder:text-white placeholder:text-[16px] placeholder:drop-shadow-lg"
                    required
                    name="kodeabsenCheck"
                    onChange={(event) => setKodeabsen(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="IP"
                    className="inputan placeholder:text-white placeholder:text-[16px] placeholder:drop-shadow-lg"
                    required
                    readOnly
                    value={ip}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Latitude"
                    className="inputan placeholder:text-white placeholder:text-[16px] placeholder:drop-shadow-lg"
                    required
                    readOnly
                    value={latitude}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Longitude"
                    className="inputan placeholder:text-white placeholder:text-[16px] placeholder:drop-shadow-lg"
                    required
                    readOnly
                    value={longitude}
                  />
                </div>
                <div className="flex items-centerb justify-between">
                  <div className="mt-4 ml-2">
                    <button
                      className="inputan w-auto bg-slate-100 hover:cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white transition px-4 py-2 text-[13px]"
                      onClick={() => submitData()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Absen
