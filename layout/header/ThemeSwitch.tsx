import { useContext } from 'react'
import { ThemeContext, themes } from 'config/theme'



const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div>
      <button onClick={toggleTheme}>aa</button>
    </div>
  )
}

export default ThemeSwitch
