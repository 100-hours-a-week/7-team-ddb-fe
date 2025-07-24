'use client';

import { LogOut, Menu } from 'iconoir-react';
import { UserCog, UserX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '../../api';

import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components';
import { useUserStore } from '@/shared/store';

export function ProfileSettingsSheet() {
  const router = useRouter();
  const { setLoggedIn } = useUserStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/onboarding');
      setLoggedIn(false);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const menuItems = [
    {
      href: '/mypage/edit',
      label: '회원정보 수정',
      icon: <UserCog className="mr-2 h-4 w-4" />,
    },
    {
      href: '/mypage/delete',
      label: '회원탈퇴',
      icon: <UserX className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-12 w-12">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="rounded-l-2xl">
        <SheetHeader>
          <SheetTitle className="text-xl">내 정보</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-5 px-8">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <SheetFooter className="border-t">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
