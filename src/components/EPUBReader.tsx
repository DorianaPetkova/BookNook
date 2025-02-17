"use client";
import React, { useState, useRef, useEffect } from "react";
import { ReactReader } from "react-reader";
import type { Rendition } from "epubjs";

const EPUBReader = () => {
  const [location, setLocation] = useState<string | number>(0);
  const [largeText, setLargeText] = useState(false);
  const rendition = useRef<Rendition | undefined>(undefined);

  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? "140%" : "100%");
  }, [largeText]);

  return (
    <div className="w-full h-[80vh]">
      <button
        onClick={() => setLargeText(!largeText)}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Toggle Font Size
      </button>
      <ReactReader
        url="/epubs/alice.epub"
        title="Alice in Wonderland"
        location={location}
        locationChanged={setLocation}
        getRendition={(r) => {
          rendition.current = r;
          r.themes.fontSize(largeText ? "140%" : "100%");
        }}
      />
    </div>
  );
};

export default EPUBReader;
