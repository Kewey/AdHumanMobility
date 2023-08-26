import { getCsrfToken } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function SignIn() {
  const csrfToken = await getCsrfToken()

  return (
    <div className="grid place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <form method="post" action="/api/auth/signin/email">
          <CardContent>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="grid gap-2">
              <div className="grid gap-1">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Mot de passe</Label>
                  <Input
                    id="password"
                    placeholder="Ex: mOt-2-Pas"
                    type="password"
                    autoComplete="password"
                    autoCorrect="off"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign In with Email</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
