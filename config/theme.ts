import { createContext } from 'react'

const themes = {
  light: {
    foreground: '#000000',
    background: '#eee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}
// dafault theme
const initialTheme = themes.light

const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
})

export { themes, ThemeContext, initialTheme }
