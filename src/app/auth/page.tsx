import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SingInForm } from "./components/sign-in-form"
import { SignUpForm } from "./components/sign-up-form"

export default async function AuthPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SingInForm />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
