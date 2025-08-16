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

const signUpFormSchema = z
  .object({
    name: z.string().trim().min(1, {
      error: "Nome inválido",
    }),
    email: z.email({
      error: "E-mail inválido.",
    }),
    password: z.string().min(8, {
      error: "A senha deve conter no mínimo 8 caracteres",
    }),
    passwordConfirmation: z.string().min(8, {
      error: "Senha inválida",
    }),
  })
  .refine(
    ({ password, passwordConfirmation }) => {
      return passwordConfirmation === password
    },
    {
      error: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    },
  )

type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const router = useRouter()

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function handleSignUp({ email, name, password }: SignUpFormSchema) {
    await authClient.signUp.email({
      name,
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Conta criada com sucesso!")
          router.push("/")
        },
        onError: (error) => {
          if (error.error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail já cadastrado.")
            return form.setError("email", {
              message: "E-mail já cadastrado.",
            })
          }
          toast.error(error.error.message)
        },
      },
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>
          Crie sua conta usando um e-mail e senha ou crie sua conta usando uma
          conta Google.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
          <CardContent className="grid gap-6">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
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
              control={form.control}
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
            {/* Confirmar senha */}
            <FormField
              control={form.control}
              name="passwordConfirmation"
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
              Criar conta
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
