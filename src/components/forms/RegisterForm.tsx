"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

import { CELLPHONE_REGEX } from "@/lib/constants"

const formSchema = z.object({
  username: z.string().min(8, {
    message: "Nombre de usuario inválido.",
  }),
  password: z.string().min(8, {
    message: "Contraseña inválida."
  }),
  confirmPassword: z.string(),
  email: z.string().email({
    message: "El email es inválido."
  }),
  cellphone: z.string().regex(CELLPHONE_REGEX, {
    message: "El número de teléfono es inválido."
  })
}).refine(
  (data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"]
})

function RegisterForm() {
  const [errorAlert, setErrorAlert] = useState<{
    title: string,
    message: string,
  } | null>(null)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      cellphone: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword: _, ...data } = values

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const responseJSON = await response.json()

    if (response.ok) {
      router.push("/auth/login")
    } else {
      setErrorAlert({
        title: responseJSON?.title ?? "Error",
        message: responseJSON?.message ?? "Tuvimos un problema, inténtelo más tarde."
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                El nombre de usuario debe tener al menos 8 caracteres.
              </FormDescription>
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
              <FormDescription>
                La contraseña debe tener al menos 8 caracteres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="cellphone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  pattern="[0-9]{10}"
                  {...field} />
              </FormControl>
              <FormDescription>
                El número de teléfono debe ser de un celular.
              </FormDescription>
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

        <Button type="submit">Registrarse</Button>
      </form>
    </Form>
  )
}

export default RegisterForm