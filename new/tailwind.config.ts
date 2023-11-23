import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './comps/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      "dim",
      {
        main: {
          "base-100": "#011D28",
          "base-200": "#02303A",
          "base-300": "#03464E",
          "base-content": "#fff",
          "primary": "#FB8151",
          "primary-content": "#471f10",
          "secondary": "#AFF5FF",
          "secondary-content": "#0f3d4a",
          "accent": "#AA69AF",
          "accent-content": "#ffffff",
          "neutral": "#33454d",
          "neutral-content": "#9c9fa6",
          "info": "#2094f3",
          "info-content": "#ffffff",
          "success": "#94FF8F",
          "success-content": "#1a401a",
          "warning": "#ff9900",
          "warning-content": "#ffffff",
          "error": "#fc6060",
          "error-content": "#4d0f0f",
        }
      }
    ],
  },
}
export default config
