"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "El email es inválido."
  }),
  password: z.string().min(8, {
    message: "Contraseña inválida."
  }),
})

function LoginForm() {
  const [errorAlert, setErrorAlert] = useState<{
    title: string,
    message: string,
  } | null>(null)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (response?.ok && !response?.error) {
      router.push("/")
      router.refresh()
    } else {
      setErrorAlert({
        title: "Ups!",
        message: response?.error ?? "Tuvimos un problema, inténtelo más tarde."
      })
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorAlert && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{errorAlert.title}</AlertTitle>
            <AlertDescription>
              {errorAlert.message}
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit">Iniciar sesión</Button>
      </form>
    </Form>
  )
}

export default LoginForm