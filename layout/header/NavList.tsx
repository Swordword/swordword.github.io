import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

// Local
import Icon from '@/components/Icon'

// Type
type Itype = {
  icon: string
  text: string
  path: string
}

const navList: Itype[] = [
  {
    icon: "#icon-lianhe4",
    text: "关于",
    path: "/about",
  },
  {
    icon: "#icon-rss",
    text: "RSS",
    path: "/rss",
  },
]

const insideNavList: Itype[] = [
  {
    icon: "#icon-guidang",
    text: "归档",
    path: "/archive",
  },
  {
    icon: "#icon-leimupinleifenleileibie2",
    text: "分类",
    path: "/category",
  },
  {
    icon: "#icon-tag1",
    text: "标签",
    path: "/tag",
  }
]

const NavList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span className="flex items-center">
                <Icon src="#icon-home" />
                <span className="ml-2">首页</span>
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="flex items-center">
              <Icon src="#icon-list" />
              <span className="ml-2">索引</span>
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4">
              {insideNavList.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}>
                      <div className="flex items-center">
                        <Icon src={item.icon} />
                        <span className="ml-2">{item.text}</span>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {navList.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link href={item.path} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="flex items-center">
                  <Icon src={item.icon} />
                  <span className="ml-2">{item.text}</span>
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <button className="p-2 hover:bg-accent rounded-md">
            <Icon src="#icon-OOjs_UI_icon_search-ltr" />
          </button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <button className="p-2 hover:bg-accent rounded-md">
            <Icon src="#icon-sun" />
          </button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavList
