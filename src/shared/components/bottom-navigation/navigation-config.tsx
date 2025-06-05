import {
  Home,
  HomeAlt,
  MultiBubble,
  MultiBubbleSolid,
  UserCircle,
} from 'iconoir-react';
import React from 'react';

export interface NavItem {
  icon: React.ReactNode;
  solidIcon: React.ReactNode;
  href: string;
  isHome?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    icon: <MultiBubble className="h-8 w-8" />,
    solidIcon: <MultiBubbleSolid className="h-8 w-8" />,
    href: '/moments',
  },
  {
    icon: <Home className="h-12 w-12" />,
    solidIcon: <HomeAlt className="h-12 w-12" />,
    href: '/',
    isHome: true,
  },
  {
    icon: <UserCircle className="h-8 w-8" />,
    solidIcon: <UserCircle className="h-8 w-8" />,
    href: '/mypage',
  },
];
