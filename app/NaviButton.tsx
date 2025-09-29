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
        // const tmapScheme = `tmap://route?goalname=${goalname}&lon=${lng}&lat=${lat}`;

        // // Android fallback용 intent
        // const androidIntent = `intent://route?goalname=${goalname}&lon=${lng}&lat=${lat}#Intent;scheme=tmap;package=com.sktelecom.tmap.ku;end`;

        // // 우선 스킴으로 실행하고, 실패 시 fallback
        // const userAgent = navigator.userAgent.toLowerCase();
        // if (userAgent.includes('android')) {
        //     location.href = androidIntent;
        // } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        //     location.href = tmapScheme;
        // } else {
        //     alert('Tmap은 모바일에서만 실행 가능합니다.');
        // }
        const TMAP_IOS_APPSTORE_URL = 'https://apps.apple.com/kr/app/tmap-t-maeb-daehanmingug-daepyo-naebigeisyeon/id431589174';
        const TMAP_ANDROID_PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=com.sktelecom.tmap';


        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.includes('android')) {
            // 안드로이드는 인텐트에 fallback_url을 내장하여 처리합니다.
            // 앱이 없으면 browser_fallback_url로 지정된 플레이 스토어로 자동 이동합니다.
            const androidIntent = `intent://route?goalname=${goalname}&goalx=${lng}&goaly=${lat}#Intent;scheme=tmap;package=com.sktelecom.tmap;S.browser_fallback_url=${encodeURIComponent(TMAP_ANDROID_PLAYSTORE_URL)};end;`;
            location.href = androidIntent;

        } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            // iOS는 타이머를 이용한 폴백 방식을 사용합니다.
            const tmapScheme = `tmap://route?goalname=${goalname}&goalx=${lng}&goaly=${lat}`;
            const appStoreUrl = TMAP_IOS_APPSTORE_URL;

            // 1초 후에 앱 스토어로 보내는 타이머를 설정합니다.
            // 만약 티맵 앱이 실행되면 현재 웹페이지는 백그라운드로 전환되므로, 아래 코드는 사실상 실행되지 않습니다.
            const timer = setTimeout(() => {
                window.location.href = appStoreUrl;
            }, 1000);

            // visibilitychange 이벤트를 사용하여 페이지가 숨겨지면(앱으로 전환되면) 타이머를 제거합니다.
            // 이는 사용자가 앱 실행 후 다시 브라우저로 돌아왔을 때 스토어로 이동하는 것을 방지합니다.
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    clearTimeout(timer);
                }
            });

            // 우선 앱 실행을 시도합니다.
            window.location.href = tmapScheme;

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