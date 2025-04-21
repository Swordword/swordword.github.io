// Local
import Title from './Title'
import NavList from './NavList'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 z-50 border-b border-border/40">
      <nav className="container h-full max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        <Title />
        <NavList />
      </nav>
    </header>
  )
}

export default Header
