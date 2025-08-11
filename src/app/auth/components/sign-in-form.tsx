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
  const form = useForm<SignInDataForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Faça seu login.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-5">
          <CardContent className="grid gap-6">
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
          </CardContent>
          <CardFooter>
            <Button>Entrar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
