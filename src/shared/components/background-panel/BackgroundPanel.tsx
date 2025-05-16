import Image from 'next/image';

import './BackgroundPanel.css';

export function BackgroundPanel() {
  return (
    <>
      <div className="fixed inset-0 left-10 z-[-1] mt-5 hidden h-full w-full items-center justify-start sm:flex">
        <div className="ml-16">
          <h1 className="mb-3 text-5xl font-extrabold text-[#333]">Dolpin</h1>
          <p className="mb-1 text-lg text-[#333]">
            어디를 방문해야 할지 모르겠다구요?
          </p>
          <p className="text-lg text-[#333]">
            <span className="font-bold">돌핀</span>이 찾아드릴게요!
          </p>
          <div className="mt-10">
            <Image
              src="/img/dolphin.png"
              alt="돌핀"
              width={200}
              height={200}
              className="dolphinFloat"
            />
          </div>
        </div>
      </div>
    </>
  );
}
