import React from 'react'

const themes = {
  light: {
    foreground: '#000000',
    background: '#ffffff',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}
// dafault theme
const initialTheme = themes.light

// // theme reducer
// function themeReducer(state, action) {
//   switch (action.type) {
//     case 'light':
//       return { theme: themes.light }
//     case 'dark':
//       return { theme: themes.dark }
//     default:
//       throw new Error('Unknown action')
//   }
// }

const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
})

export { themes, ThemeContext, initialTheme }
