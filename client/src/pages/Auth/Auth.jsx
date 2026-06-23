import { useState } from 'react'
import { useNavigate } from "react-router-dom"



const serverUrl = import.meta.env.VITE_SERVER_URL;


const Auth = () => {
  const navigate = useNavigate();
  const [current, setCurret] = useState("login")
  const [userState, setUserState] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    const body = {
      email: document.getElementById("login-email-input").value,
      password: document.getElementById("login-password-input").value
    }
    try {
      const response = await fetch(`${serverUrl}/user/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include"
      })
      const data = await response.json()
      if (!data.state) {
        setUserState(data.message)
      } else {
        setUserState(data.message)
        navigate("/dashboard")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const body = {
      userName: document.getElementById("signup-user-input").value,
      email: document.getElementById("signup-email-input").value,
      password: document.getElementById("signup-password-input").value
    }
    try {
      const response = await fetch(`${serverUrl}/user/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (!data.state) {
        setUserState(data.message)
      } else {
        setUserState(data.message)
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

    </>
  )
}

export default Auth
