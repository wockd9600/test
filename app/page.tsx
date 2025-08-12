import Image from "next/image";

export default function Home() {
  const address = "대전 동구 광명길 64";
  const handleNaverMapClick = () => {
    if (!address) return;
    // window.open(`https://map.naver.com/p/search/${encodeURIComponent(address)}`, '_blank');
    // const url = `https://map.naver.com/p/directions/,,/${encodeURIComponent(address)},,/-/car`;
    const url = `https://map.naver.com/p/directions/-/${encodeURIComponent(address)}/-/car`;
    window.open(url, '_blank');
  };

  const handleKakaoMapClick = () => {
    if (!address) return;
    // window.open(`https://map.kakao.com/link/search/${encodeURIComponent(address)}`, '_blank');
    const url = `https://map.kakao.com/link/route?ep=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  const handleTmapClick = () => {
    if (!address) return;
    // TMAP API 키는 예시이며, 실제 유효한 키를 사용해야 합니다.
    const tmapAppKey = "l7xx7d40a2102da948ae88c2a350e81a3428";
    window.open(`https://apis.openapi.sk.com/tmap/app/routes?appKey=${tmapAppKey}&name=${encodeURIComponent(address)}&goalname=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={handleNaverMapClick}
          className="bg-[#03C75A] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          네이버 지도
        </button>
        <button
          onClick={handleKakaoMapClick}
          className="bg-[#FEE500] text-black px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          카카오 지도
        </button>
        <button
          onClick={handleTmapClick}
          className="bg-[#ED1C24] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          T맵
        </button>
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
