'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ComponentProps } from 'react'
import { FC } from 'react'

export const ThemeProvider: FC<ComponentProps<typeof NextThemesProvider>> = (props) => <NextThemesProvider {...props} />
