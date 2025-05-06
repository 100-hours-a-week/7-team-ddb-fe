import { Book, BookSolid, Home, HomeAlt, UserCircle } from 'iconoir-react';
import React from 'react';

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  solidIcon: React.ReactNode;
  href: string;
  isHome?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    label: '다이어리',
    icon: <Book className="h-6 w-6" />,
    solidIcon: <BookSolid className="h-6 w-6" />,
    href: '/moments',
  },
  {
    label: '홈',
    icon: <Home className="h-12 w-12" />,
    solidIcon: <HomeAlt className="h-12 w-12" />,
    href: '/',
    isHome: true,
  },
  {
    label: 'MY',
    icon: <UserCircle className="h-7 w-7" />,
    solidIcon: <UserCircle className="h-7 w-7" />,
    href: '/mypage',
  },
];
