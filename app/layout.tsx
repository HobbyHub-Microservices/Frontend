import '../styles/globals.css'
import { SidebarProvider } from '../components/ui/sidebar'
import { ThemeProvider } from "../components/theme-provider"
import { ThemeToggle } from "@/../../components/theme-toggle"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen flex-col">
              <header className="border-b">
                <div className="container flex items-center justify-between py-4">
                  <h1 className="text-2xl font-bold"></h1>
                  <ThemeToggle />
                </div>
              </header>
              {children}
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

