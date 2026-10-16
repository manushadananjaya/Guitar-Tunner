'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // The embeddable widget can be told its theme with ?theme=light|dark.
  // forcedTheme applies it without saving it, which matters: the widget
  // builder previews it in a same-origin frame, and a saved choice would
  // switch the whole site's theme for that visitor.
  const pathname = usePathname()
  const [forcedTheme, setForcedTheme] = React.useState<string | undefined>()
  React.useEffect(() => {
    if (!pathname?.startsWith('/embed/')) return setForcedTheme(undefined)
    const theme = new URLSearchParams(window.location.search).get('theme')
    setForcedTheme(theme === 'light' || theme === 'dark' ? theme : undefined)
  }, [pathname])

  return (
    <NextThemesProvider {...props} forcedTheme={forcedTheme}>
      {children}
    </NextThemesProvider>
  )
}
