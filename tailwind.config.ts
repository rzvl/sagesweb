import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'hsl(var(--white) / <alpha-value>)',
      black: 'hsl(var(--black) / <alpha-value>)',
      'background-100': 'hsl(var(--background-100) / <alpha-value>)',
      'background-200': 'hsl(var(--background-200) / <alpha-value>)',
      'gray-100': 'hsl(var(--gray-100) / <alpha-value>)',
      'gray-200': 'hsl(var(--gray-200) / <alpha-value>)',
      'gray-300': 'hsl(var(--gray-300) / <alpha-value>)',
      'gray-400': 'hsl(var(--gray-400) / <alpha-value>)',
      'gray-500': 'hsl(var(--gray-500) / <alpha-value>)',
      'gray-600': 'hsl(var(--gray-600) / <alpha-value>)',
      'gray-700': 'hsl(var(--gray-700) / <alpha-value>)',
      'gray-800': 'hsl(var(--gray-800) / <alpha-value>)',
      'gray-900': 'hsl(var(--gray-900) / <alpha-value>)',
      'gray-950': 'hsl(var(--gray-950) / <alpha-value>)',
      'blue-700': 'hsl(var(--blue-700) / <alpha-value>)',
      'blue-800': 'hsl(var(--blue-800) / <alpha-value>)',
      'red-700': 'hsl(var(--red-700) / <alpha-value>)',
      'red-800': 'hsl(var(--red-800) / <alpha-value>)',
      'amber-700': 'hsl(var(--amber-700) / <alpha-value>)',
      'amber-800': 'hsl(var(--amber-800) / <alpha-value>)',
      'green-700': 'hsl(var(--green-700) / <alpha-value>)',
      'green-800': 'hsl(var(--green-800) / <alpha-value>)',
      'teal-700': 'hsl(var(--teal-700) / <alpha-value>)',
      'teal-800': 'hsl(var(--teal-800) / <alpha-value>)',
      'purple-700': 'hsl(var(--purple-700) / <alpha-value>)',
      'purple-800': 'hsl(var(--purple-800) / <alpha-value>)',
      'pink-700': 'hsl(var(--pink-700) / <alpha-value>)',
      'pink-800': 'hsl(var(--pink-800) / <alpha-value>)',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        border: 'hsl(var(--gray-400))',
        input: 'hsl(var(--gray-400))',
        ring: 'hsl(var(--gray-950))',
        background: 'hsl(var(--background-100))',
        foreground: 'hsl(var(--gray-950))',
        primary: {
          DEFAULT: 'hsl(var(--gray-950))',
          foreground: 'hsl(var(--background-100))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--gray-100))',
          foreground: 'hsl(var(--gray-950))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--red-700))',
          foreground: 'hsl(var(--white))',
        },
        success: {
          DEFAULT: 'hsl(var(--green-700))',
          foreground: 'hsl(var(--white))',
        },
        muted: {
          DEFAULT: 'hsl(var(--gray-100))',
          foreground: 'hsl(var(--gray-900))',
        },
        accent: {
          DEFAULT: 'hsl(var(--gray-100))',
          foreground: 'hsl(var(--gray-950))',
        },
        popover: {
          DEFAULT: 'hsl(var(--background-200))',
          foreground: 'hsl(var(--gray-950))',
        },
        card: {
          DEFAULT: 'hsl(var(--background-200))',
          foreground: 'hsl(var(--gray-950))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
