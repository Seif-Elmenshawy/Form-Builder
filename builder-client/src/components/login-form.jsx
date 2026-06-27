import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import api from "../api/api"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}) {

  const [showResult, setShowResult] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)
  const [loginControls, setLoginControls] = useState({})

  const handleSubmit = async (e) => {
    setLoginControls({
      showLoader: true,
      showResult: false,
      result: null,
      message: null
    })
    e.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const btn = document.querySelector("#submit")
    btn.disabled = true

    try {
      const response = await api.post("/user/log-in", { email, password })
      console.log(response.data)
      setLoginControls({
        showLoader: false,
        showResult: true,
        result: response.data.state,
        message: response.data.message
      })
    } catch (error) {
      btn.disabled = false
      console.log(error)
      setLoginControls({
        showLoader: false,
        showResult: true,
        result: error.response.data.state,
        message: error.response.data.message
      })
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button id="submit" type="submit">Login</Button>
                {loginControls.showLoader && <Spinner />}
                {loginControls.showResult && <center><p className={loginControls.result ? "text-green-600" : "text-red-600"} >{loginControls.message}</p></center>}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
