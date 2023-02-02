import { createBrowserRouter, RouterProvider } from "react-router-dom"
import React from "react"
import Absen from "./components/Absen"
import Login from "./components/Login"
import ErrorPage from "./components/error-page"
import Dashboard from "./components/Dashboard"

function App() {
  const absen = createBrowserRouter([
    // Root Endpoint
    {
      path: "/",
      element: <Absen />,
      errorElement: <ErrorPage />,
    },
    // Login Endpoint
    {
      path: "/login",
      element: <Login />,
    },
    // Dashboard Endpoint
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ])

  return (
    <>
      <RouterProvider router={absen} />
    </>
  )
}

export default App
