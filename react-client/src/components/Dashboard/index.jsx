import React, { useState, useEffect } from "react"
import axios from "axios"

const Dashboard = () => {
  const [absensiList, setAbsensiList] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      console.log("User belum login")
      window.location.replace("/login")
    }

    axios({
      method: "GET",
      url: "http://localhost:3200/absensi",
    }).then((result) => setAbsensiList(result.data.absensi))
  }, [])

  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`
    window.open(url)
  }

  const logout = () => {
    localStorage.removeItem("username")
    window.location.replace("/login")
  }

  return (
    <section className="w-full h-screen font-poppins bg-white">
      <nav className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white uppercase text-sm">
        <div>
          <h3 className="font-semibold">{localStorage.getItem("username")}</h3>
        </div>
        <div>
          <i className="fa fa-user-circle text-lg" aria-hidden="true"></i>
        </div>
      </nav>
      <div className="lg:flex px-2 lg:pl-0 py-4  lg:py-0 lg:h-screen">
        <div className="hidden lg:block lg:w-[15%] lg:mr-2 border-[1px] px-[4px] py-[4px]">
          <div className="w-full border-[1px] rounded-xl  px-2 py-2  text-sm uppercase bg-blue-600 text-white cursor-pointer">
            <h3 className="tracking-wider font-semibold">Home</h3>
          </div>
          <div
            className="w-full border-[1px] text-slate-800 px-2 py-2 rounded-xl text-sm uppercase mt-1 cursor-pointer hover:bg-red-600 hover:text-slate-100 transition"
            onClick={() => logout()}
          >
            <h3 className="tracking-wider">
              Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
            </h3>
          </div>
        </div>
        <div className="w-full lg:w-[85%]">
          <div className="flex justify-center items-center lg:block">
            <div className="w-[90%] lg:w-full border-none lg:border-[1px]  px-2 py-2 lg:rounded-lg rounded-none lg:mt-4 bg-blue-500">
              <h1 className="uppercase text-center  font-semibold text-slate-100">
                Data Absensi Mahasiswa
              </h1>
            </div>
            <button
              className="lg:hidden bg-red-500  text-slate-100 px-2 py-2   w-[10%]"
              onClick={() => logout()}
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>

          <div className="w-full  border-[1px]  h-[79vh] lg:h-[81vh] overflow-y-auto px-2 py-2 rounded-lg mt-2 text-slate-600">
            <div className="w-full overflow-x-scroll">
              <table className="border-[1px] border-collapse lg:w-full text-center">
                <thead className="text-sm">
                  <tr>
                    <th className="p-2">No</th>
                    <th className="p-2">NPM</th>
                    <th className="p-2">Kode Absen</th>
                    <th className="p-2">Latitude</th>
                    <th className="p-2">Longitude</th>
                    <th className="p-2">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {absensiList.map((absensi, index) => {
                    const { npm, kodeabsen, latitude, longitude } = absensi

                    return (
                      <tr key={index}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{npm}</td>
                        <td className="p-2">{kodeabsen}</td>
                        <td className="p-2">{latitude}</td>
                        <td className="p-2">{longitude}</td>
                        <td className="p-2">
                          <button
                            className="py-1 px-2 bg-green-600 text-white text-sm rounded-md"
                            onClick={() => getLocation(latitude, longitude)}
                          >
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
