import React, { useEffect, useState } from "react"
import axios from "axios"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (localStorage.getItem("username")) {
      window.location.replace("/dashboard")
    }
  })

  const handleUsername = (inputUsername) => {
    setUsername(inputUsername)
  }

  const handlePassword = (inputPassword) => {
    setPassword(inputPassword)
  }

  const submitData = () => {
    const isUsernameEmpt = document.mainForm.username.value
    const isPasswordEmpt = document.mainForm.password.value

    if (isUsernameEmpt === "" && isPasswordEmpt === "") {
      alert("Username dan Password harus diisi!")
    } else if (isUsernameEmpt === "") {
      alert("Username harus disii!")
    } else if (isPasswordEmpt === "") {
      alert("Password harus diisi!")
    } else {
      const requestingData = {
        username: username,
        password: password,
      }
      axios({
        method: "POST",
        url: "http://localhost:3200/login/",
        data: requestingData,
      })
        .then((result) => {
          localStorage.setItem("username", username)
          alert("Berhasil Login")
          window.location.replace("/dashboard")
        })
        .catch((err) => {
          alert("Gagal Login")
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
        <div className="square top-[190px] right-2 w-24 h-24 bg-slate-900/10 lg:top-[130px] lg:right-96"></div>
        <div className="square bottom-[190px] left-2 lg:left-[370px] lg:bottom-[130px] w-24 h-24 bg-slate-900/10"></div>
        <div className="w-[80%] lg:max-w-[400px] h-auto flex flex-col justify-center items-center  border-[1px] border-white/50 border-r-[1px] border-r-white/20 border-b-[1px] border-b-white/90  shadow-[0_25px_45px_rgba(0,0,0,0.1)] rounded-[10px] box-border  px-5 py-6 backdrop-blur-md bg-slate-900/10 mx-5 overflow-hidden">
          <div className="w-full h-full box-border flex justify-center items-center flex-col ">
            <div className="relative w-full h-full ">
              <h2 className="relative text-white text-[24px] font-[600] before:absolute before:left-0 before:-bottom-[5px] before:w-[40px] before:h-[3px] before:bg-white mb-6 drop-shadow-sm ">
                Login
                <span className="ml-1 relative before:absolute before:right-0 before:top-0 before:bg-white before:w-[40px] before:h-[3px]">
                  Admin
                </span>
              </h2>
              <form name="mainForm">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="inputan placeholder:text-white placeholder:text-[16px] placeholder:drop-shadow-lg"
                    required
                    name="username"
                    autoComplete="off"
                    onChange={(event) => handleUsername(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="inputan placeholder:text-white placeholder:text-[16px] placeholder:drop-shadow-lg"
                    required
                    name="password"
                    autoComplete="off"
                    onChange={(event) => handlePassword(event.target.value)}
                  />
                </div>
                <div className="mt-4 ml-2">
                  <button
                    className="inputan w-auto bg-slate-100 hover:cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white transition px-4 py-2 text-[13px]"
                    onClick={() => submitData()}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
