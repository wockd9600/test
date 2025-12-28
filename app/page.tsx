"use client";

// import { CenterLineTracer } from "./CenterLineTracer";
import { GoogleDriverAuth } from "./GoogleDirverAuth";

// import { MusicPlayer } from "./MusicPlayer";
// import { NaviButton } from "./NaviButton";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex justify-center space-x-2 mt-4">
        {/* <MusicPlayer /> */}
        {/* <NaviButton /> */}
        {/* <CenterLineTracer /> */}
        <GoogleDriverAuth />
      </div>
    </div>
  );
}
