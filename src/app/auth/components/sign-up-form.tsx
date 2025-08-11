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

import { useForm } from "react-hook-form"

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
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })
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
        <form className="space-y-5">
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
            <Button>Entrar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
