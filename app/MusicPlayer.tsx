"use client";

import { useState, useEffect, useRef } from "react";

const musicList = [
    { id: 0, name: "Love, Written in Stars", path: "/music/Love, Written in Stars.mp3" },
    { id: 1, name: "Pages of Us", path: "/music/Pages of Us.mp3" },
    { id: 2, name: "The Day We Begin", path: "/music/The Day We Begin.mp3" },
    { id: 3, name: "Will You, Always", path: "/music/Will You, Always.mp3" },
];

export function MusicPlayer() {
    // 1. 초기 상태는 '재생 중이 아님'이 더 정확합니다.
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentMusic = musicList[0]; // 기본 음악 설정

    // 2. 자동 재생 로직만 처리합니다.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // 음소거 상태로 자동 재생 시도
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // NotAllowedError는 정상일 수 있으므로 콘솔에만 표시합니다.
                console.error("음악 자동 재생 시도 실패:", error);
            });
        }

        // 사용자의 첫 상호작용 시 음소거를 해제하는 리스너
        const unmute = () => {
            if (audio) {
                audio.muted = false;
                document.removeEventListener("click", unmute);
                document.removeEventListener("touchstart", unmute);
            }
        };

        document.addEventListener("click", unmute);
        document.addEventListener("touchstart", unmute);

        return () => {
            document.removeEventListener("click", unmute);
            document.removeEventListener("touchstart", unmute);
        };
    }, []); // 이 useEffect는 마운트 시 한 번만 실행되는 것이 맞습니다.

    // 3. 재생/일시정지 토글 함수
    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.muted = false; // 수동 재생 시 음소거 해제
            audio.play().catch(error => console.error("음악 재생 실패:", error));
        }
    };

    return (
        <>
            {/* 3. audio 태그에 src를 직접 전달하여 레이스 컨디션을 방지합니다. */}
            <audio
                ref={audioRef}
                src={currentMusic.path} // 여기에 직접 경로를 지정
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}   // 실제 오디오 상태와 UI 상태를 동기화
                onPause={() => setIsPlaying(false)}  // 실제 오디오 상태와 UI 상태를 동기화
            />

            <div className={"fixed w-full wcard-max-w mx-auto flex justify-end top-0 z-1"}>
                <button
                    className="w-10 h-10 p-0 hover-bg-transparent"
                    onClick={togglePlayPause}
                    title={isPlaying ? "일시정지" : "재생"}
                >
                    {isPlaying ? (
                        "재생중"
                    ) : (
                        "정지됨"
                    )}
                    <span className="sr-only">{isPlaying ? "일시정지" : "재생"}</span>
                </button>
            </div>
        </>
    );
}