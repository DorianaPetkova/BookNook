"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactReader } from "react-reader";
import type { Rendition } from "epubjs";

const books = [
  { title: "Alice in Wonderland", url: "/epubs/alice.epub" },
  { title: "Crime and Punishment", url: "/epubs/crimeandpunishment.epub" },
  { title: "The Picture of Dorian Gray", url: "/epubs/doriangray.epub" },
];

const EPUBReader = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [location, setLocation] = useState<string | number>(localStorage.getItem("lastLocation") || 0);
  const [largeText, setLargeText] = useState(false);
  const [theme, setTheme] = useState("default");
  const [font, setFont] = useState("Arial");
  const rendition = useRef<Rendition | undefined>(undefined);

  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? "140%" : "100%");
  }, [largeText]);

  useEffect(() => {
    localStorage.setItem("lastLocation", String(location));
  }, [location]);

  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.select(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.font(font);
    }
  }, [font]);

  return (
    <div className="flex flex-col items-center w-full mt-24">
   {!selectedBook ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Select a Book to Read 📖
          </h2>
          <ul className="space-y-4">
            {books.map((book) => (
              <li key={book.title}>
                <button
                  onClick={() => setSelectedBook(book.url)}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {book.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full max-w-4xl p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          {/* Top Bar Controls */}
          <div className="flex justify-between items-center mb-4 space-x-4">
            <button
              onClick={() => setSelectedBook(null)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              ⬅ Back
            </button>
            <button
              onClick={() => setLargeText(!largeText)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Toggle
            </button>

            {/* Font Change Control */}
            <select
              className="p-2 border rounded"
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Monospace</option>
            </select>
          </div>

          {/* EPUB Reader */}
          <div className="h-[600px] border rounded-lg shadow-md overflow-hidden">
            <ReactReader
              url={selectedBook}
              title=""
              location={location}
              locationChanged={setLocation}
              getRendition={(r) => {
                rendition.current = r;
                r.themes.fontSize(largeText ? "140%" : "100%");
                r.themes.select(theme);
                r.themes.font(font);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { data: session, status } = useSession(); 
  const router = useRouter();

  useEffect(() => {
    
    if (status === "loading") return; 
    if (!session || !session.user?.email) {
      router.push("/login"); 
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
     
     
      <EPUBReader />
    </div>
  );
};

export default Dashboard;
