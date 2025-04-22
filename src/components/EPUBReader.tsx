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
        url="/epubs/Dimityr_Peev_-_Alibi_-_626-b.epub"
        title="Алиби"
        location={location}
        locationChanged={setLocation}
        getRendition={(r) => {
          rendition.current = r;
          r.themes.fontSize(largeText ? "140%" : "100%");
        }}
      />
      <ReactReader
        url="/epubs/Ljuben_Dilov_-_Atomnijat_chovek_-_4108-b.epub"
        title="Атомният човек"
        location={location}
        locationChanged={setLocation}
        getRendition={(r) => {
          rendition.current = r;
          r.themes.fontSize(largeText ? "140%" : "100%");
        }}
      />
      <ReactReader
        url="/epubs/Vladimir_Zelengorov_-_Snezhnijat_chovek_-_11911-b.epub"
        title="Снежният човек"
        location={location}
        locationChanged={setLocation}
        getRendition={(r) => {
          rendition.current = r;
          r.themes.fontSize(largeText ? "140%" : "100%");
        }}
      />
      <ReactReader
        url="/epubs/crimeandpunishment.epub"
        title="Crime and Punishment"
        location={location}
        locationChanged={setLocation}
        getRendition={(r) => {
          rendition.current = r;
          r.themes.fontSize(largeText ? "140%" : "100%");
        }}
      />
       <ReactReader
        url="/epubs/doriangray.epub"
        title="The Picture of Dorian Gray"
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