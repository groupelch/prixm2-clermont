"use client";

import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[500px] rounded-sm bg-cbf-ivory border border-cbf-gray-soft animate-pulse flex items-center justify-center text-cbf-gray-light text-sm">
      Chargement de la carte…
    </div>
  ),
});

export function MapWrapper() {
  return <InteractiveMap />;
}
