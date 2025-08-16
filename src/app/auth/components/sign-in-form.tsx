"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const signInSchema = z.object({
  email: z.email({
    error: "E-mail inválido.",
  }),
  password: z.string().min(8, {
    error: "A senha deve conter no mínimo 8 caracteres",
  }),
})

type SignInDataForm = z.infer<typeof signInSchema>

export function SingInForm() {
  const router = useRouter()
  const form = useForm<SignInDataForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form

  async function handleSignIn({ email, password }: SignInDataForm) {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/")
        },
        onError: (error) => {
          console.log(JSON.stringify(error.error, null, 2))
          if (error.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error(error.error.message)
            setError("email", {
              message: error.error.message,
            })

            return setError("password", {
              message: error.error.message,
            })
          }
          toast.error(error.error.message)
        },
      },
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Faça seu login.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          className="space-y-5"
          onSubmit={handleSubmit(handleSignIn)}
          noValidate
        >
          <CardContent className="grid gap-6">
            {/* Email */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@email.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Senha */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
