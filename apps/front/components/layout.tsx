import { Analytics } from "@vercel/analytics/react"

import { AuthProvider } from "@/components/auth"
import { SiteHeader } from "@/components/site-header"

type LayoutProps = {
  children: React.ReactNode
}

export function RootLayout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <>
        <SiteHeader />
        <main>{children}</main>
        <Analytics />
      </>
    </AuthProvider>
  )
}
