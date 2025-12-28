"use client";

import { useEffect, useState } from "react";

export function GoogleDriverAuth() {
    const [googleEmail, setGoogleEmail] = useState<string | null>(null);

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            // 보안: 우리 도메인인지 확인

            //dasf
            if (event.origin !== window.location.origin) return;

            const data = event.data;
            if (!data || data.source !== "maison-de-marie-google-oauth") return;

            const payload = data.payload;
            if (payload?.success) {
                // ✅ 콜백에서 보낸 이메일로 state 업데이트
                if (payload.email) {
                    setGoogleEmail(payload.email);
                }
            }

            window.removeEventListener("message", handleMessage);
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    const handleClick = async () => {
        // 예: "구글 드라이브 연결" 버튼 클릭 시
        const res = await fetch("/api/google/auth-url");
        const { url } = await res.json();
        window.open(url, "_blank");
    }
    return (
        <>
            <button
                onClick={handleClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                {googleEmail ? `연결된 계정: ${googleEmail}` : "구글 드라이브 연동하기"}
            </button>
        </>
    );
}