"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="neutral"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="theme"
      themes={[
        "neutral",
        "neutral-dark",
        "blue",
        "blue-dark",
        "orange",
        "orange-dark",
        "violet",
        "violet-dark",
      ]}
      forcedTheme={undefined}
      {...props}>
      {children}
    </NextThemesProvider>
  );
}
