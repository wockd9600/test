"use client";

export default function Home() {
  const address = "대전 동구 광명길 64";
  const handleNaverMapClick1 = () => {
    if (!address) return;
    window.open(`https://map.naver.com/p/search/${encodeURIComponent(address)}`, '_blank');
  };
  const handleNaverMapClick2 = () => {
    if (!address) return;
    const url = `https://map.naver.com/p/directions/14145818.539039,4514955.7706404,/14148473.5088944,4493577.2512047,/-/car?c=11.00,0,0,0,dh`;
    window.open(url, '_blank');
  };
  const handleNaverMapClick3 = () => {
    if (!address) return;
    const url = `https://map.naver.com/p/directions/,,/14148473.5088944,4493577.2512047,/-/car?c=11.00,0,0,0,dh`;
    window.open(url, '_blank');
  };

  const handleKakaoMapClick1 = () => {
    if (!address) return;
    window.open(`https://map.kakao.com/link/search/${encodeURIComponent(address)}`, '_blank');
    // const url = `https://map.kakao.com/link/route?ep=${encodeURIComponent(address)}`;
    // window.open(url, '_blank');
  };
  const handleKakaoMapClick2 = () => {
    if (!address) return;
    const url = `https://map.kakao.com/link/route?ep=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };
  const handleKakaoMapClick3 = () => {
    if (!address) return;
    const url = `https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt2=${encodeURIComponent(address)}`;
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
          onClick={handleNaverMapClick1}
          className="bg-[#03C75A] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          네이버 지도1
        </button>
        <button
          onClick={handleNaverMapClick2}
          className="bg-[#03C75A] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          네이버 지도2
        </button>
        <button
          onClick={handleNaverMapClick3}
          className="bg-[#03C75A] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          네이버 지도3
        </button>
        <button
          onClick={handleKakaoMapClick1}
          className="bg-[#FEE500] text-black px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          카카오 지도1
        </button>
        <button
          onClick={handleKakaoMapClick2}
          className="bg-[#FEE500] text-black px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          카카오 지도2
        </button>
        <button
          onClick={handleKakaoMapClick3}
          className="bg-[#FEE500] text-black px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          카카오 지도3
        </button>
        <button
          onClick={handleTmapClick}
          className="bg-[#ED1C24] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
          style={{ minWidth: '100px' }}
        >
          T맵
        </button>
      </div>
    </div>
  );
}
