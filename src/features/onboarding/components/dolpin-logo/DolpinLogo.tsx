import Image from 'next/image';

export function DolpinLogo() {
  return <Image src="/logo.svg" alt="로고" width={120} height={120} priority />;
}
