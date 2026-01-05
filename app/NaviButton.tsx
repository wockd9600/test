"use client";

export function NaviButton() {
    const handleTmapClick2 = () => {
        // 플레이스토어 URL의 id값(com.skt.tmap.ku)이 실제 앱의 패키지명입니다.
        handleTmapClick({ 
            TMAP_ANDROID_PLAYSTORE_URL: 'https://play.google.com/store/apps/details?id=com.skt.tmap.ku' 
        });
    }

    const handleTmapClick = ({ 
        goalname = "서울시청", 
        lat = 37.5665, 
        lng = 126.9780, 
        TMAP_ANDROID_PLAYSTORE_URL = "" 
    }) => {
        const TMAP_IOS_APPSTORE_URL = 'https://apps.apple.com/kr/app/tmap-t-maeb-daehanmingug-daepyo-naebigeisyeon/id431589174';

        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.includes('android')) {
            // [수정 1] 안드로이드는 setTimeout을 제거해야 합니다.
            // Intent 스키마 자체적으로 앱이 없으면 fallback_url로 이동하는 기능이 내장되어 있습니다.
            // 타이머를 쓰면 앱이 켜지는 중에 강제로 마켓으로 이동될 수 있습니다.

            // [수정 2] 패키지명을 com.sktelecom.tmap -> com.skt.tmap.ku 로 변경
            // goalname은 한글 깨짐 방지를 위해 encodeURIComponent 필수
            const androidIntent = `intent://route?goalname=${encodeURIComponent(goalname)}&goalx=${lng}&goaly=${lat}#Intent;scheme=tmap;package=com.skt.tmap.ku;S.browser_fallback_url=${encodeURIComponent(TMAP_ANDROID_PLAYSTORE_URL)};end;`;
            
            window.location.href = androidIntent;

        } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            // iOS는 기존 로직 유지 (iOS는 intent 스키마가 없어서 타이머 방식이 필요함)
            const tmapScheme = `tmap://route?goalname=${encodeURIComponent(goalname)}&goalx=${lng}&goaly=${lat}`;
            const appStoreUrl = TMAP_IOS_APPSTORE_URL;

            const timer = setTimeout(() => {
                window.location.href = appStoreUrl;
            }, 1000);

            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    clearTimeout(timer);
                }
            });

            window.location.href = tmapScheme;

        } else {
            alert('Tmap은 모바일에서만 실행 가능합니다.');
        }
    };

    return (
        <>
            <button
                onClick={handleTmapClick2}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Tmap 길찾기 2
            </button>
        </>
    );
}