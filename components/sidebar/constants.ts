import dynamicIconImports from "lucide-react/dynamicIconImports";

interface NavItem {
  href: string;
  title: string;
  icon: keyof typeof dynamicIconImports;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    title: 'Home',
    icon: 'home',
  },
  {
    href: '/todos/completed',
    title: 'Completed',
    icon: 'circle-check-big',
  },
  {
    href: '/settings',
    title: 'Settings',
    icon: 'settings',
  },
];


export const PAGE_TITLE = "Todo"
