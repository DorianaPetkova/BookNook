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
    <div className="duh">
      <button
        onClick={() => setLargeText(!largeText)}
        className="toggle"
      >
        Toggle
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
