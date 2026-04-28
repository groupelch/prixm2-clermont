"use client";

import dynamic from "next/dynamic";

const QuartierMiniMap = dynamic(() => import("@/components/home/QuartierMiniMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] md:h-[400px] rounded-sm bg-cbf-ivory border border-cbf-gray-soft animate-pulse" />
  ),
});

export function QuartierMap(props: {
  lat: number;
  lng: number;
  nom: string;
  prix: number | null;
}) {
  return <QuartierMiniMap {...props} />;
}
