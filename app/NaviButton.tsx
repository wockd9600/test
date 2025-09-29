"use client";

export function NaviButton() {
    const handleTmapClick = () => {
        window.location.href = "tmap://route?goalname=서울시청&lon=126.9780&lat=37.5665";
        // const tmapAppKey = "l7xx7d40a2102da948ae88c2a350e81a3428";
        // window.open(`https://apis.openapi.sk.com/tmap/app/routes?appKey=${tmapAppKey}&name=${encodeURIComponent(name || address)}&goalname=${encodeURIComponent(address)}`, '_blank');
    };

    const handleTmapClick2 = () => {
        const goalname = encodeURIComponent("서울시청");
        const lat = 126.9780;
        const lng = 37.5665;

        // 앱 실행용 스킴 (Android + iOS Tmap 설치되어 있는 경우)
        const tmapScheme = `tmap://route?goalname=${goalname}&lon=${lng}&lat=${lat}`;

        // Android fallback용 intent
        const androidIntent = `intent://route?goalname=${goalname}&lon=${lng}&lat=${lat}#Intent;scheme=tmap;package=com.sktelecom.tmap.ku;end`;

        // 우선 스킴으로 실행하고, 실패 시 fallback
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('android')) {
            location.href = androidIntent;
        } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            location.href = tmapScheme;
        } else {
            alert('Tmap은 모바일에서만 실행 가능합니다.');
        }
    };

    return (
        <>
            <button
                onClick={handleTmapClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Tmap 길찾기
            </button>
            <button
                onClick={handleTmapClick2}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Tmap 길찾기 2
            </button>
        </>
    );
}