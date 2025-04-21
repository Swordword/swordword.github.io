// Local
import Title from './Title'
import NavList from './NavList'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-background/80 backdrop-blur-md z-50 border-b border-border/40">
      <div className="container h-full max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        <Title />
        <NavList />
      </div>
    </header>
  )
}

export default Header
