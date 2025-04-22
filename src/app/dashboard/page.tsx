"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactReader } from "react-reader";
import type { Rendition } from "epubjs";
import { FaPlay, FaPause, FaRedo, FaStop } from "react-icons/fa";


const books = [
  { title: "Снежният човек", url: "/epubs/Vladimir_Zelengorov_-_Snezhnijat_chovek_-_11911-b.epub" },
  { title: "Атомният човек", url: "/epubs/Ljuben_Dilov_-_Atomnijat_chovek_-_4108-b.epub" },
  { title: "Алиби", url: "/epubs/Dimityr_Peev_-_Alibi_-_626-b.epub" },
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
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
const [isSpeaking, setIsSpeaking] = useState(false);
const [isPaused, setIsPaused] = useState(false);
const [dropdownOpen, setDropdownOpen] = useState(false);


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

  const speakCurrentPage = () => {
    if (!rendition.current) return;
  
    const currentIframe = document.querySelector("iframe");
  
    if (!currentIframe) {
      alert("Не е намерен iframe за четене.");
      return;
    }
  
    try {
      const doc = currentIframe.contentDocument || currentIframe.contentWindow?.document;
      const text = doc?.body?.innerText || "";
  
      if (text.trim()) {
        speechSynthesis.cancel(); // Stop anything already playing
  
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "bg-BG";
  
        utterance.onend = () => {
          setIsSpeaking(false);
          setIsPaused(false);
        };
  
        utterance.onerror = () => {
          setIsSpeaking(false);
          setIsPaused(false);
        };
  
        utteranceRef.current = utterance;
        setIsSpeaking(true);
        setIsPaused(false);
  
        speechSynthesis.speak(utterance);
      } else {
        alert("Няма текст за четене на тази страница.");
      }
    } catch (err) {
      console.error("Speech error:", err);
      alert("Невъзможно е да се прочете съдържанието.");
    }
  };
  
  
  const pauseSpeech = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };
  
  const resumeSpeech = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };
  
  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };
  

  

  return (
    <div className="flex flex-col items-center w-full mt-24">
      {!selectedBook ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Избери книга за четене📖
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
          {/* top bar */}
          <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
            <button
              onClick={() => setSelectedBook(null)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Назад
            </button>
            <button
              onClick={() => setLargeText(!largeText)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Размер
            </button>
            <select
              className="p-2 border rounded"
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Monospace</option>
            </select>
           
            <div className="relative inline-block text-left">
  <div>
    <button
      type="button"
      className="inline-flex justify-center w-full rounded-lg border border-green-600 shadow-lg px-4 py-2 bg-green-500 text-white text-xl font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      onClick={() => setDropdownOpen((prev) => !prev)}
    >
      🔊 Гласови опции
    </button>
  </div>

  {dropdownOpen && (
    <div
      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="py-2" role="none">
        <button
          onClick={speakCurrentPage}
          className="text-gray-700 block w-full px-4 py-3 text-lg hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          role="menuitem"
        >
          <FaPlay className="inline-block mr-2" />
          Чети
        </button>
        <button
          onClick={() => {
            speechSynthesis.pause();
            setIsPaused(true);
          }}
          className="text-gray-700 block w-full px-4 py-3 text-lg hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          role="menuitem"
        >
          <FaPause className="inline-block mr-2" />
          Пауза
        </button>
        <button
          onClick={() => {
            speechSynthesis.resume();
            setIsPaused(false);
          }}
          className="text-gray-700 block w-full px-4 py-3 text-lg hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          role="menuitem"
        >
          <FaRedo className="inline-block mr-2" />
        Продължи
        </button>
        <button
          onClick={() => {
            speechSynthesis.cancel();
            speakCurrentPage(); // restart
          }}
          className="text-gray-700 block w-full px-4 py-3 text-lg hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          role="menuitem"
        >
          <FaStop className="inline-block mr-2" />
          Рестарт
        </button>
      </div>
    </div>
  )}
</div>


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
    return <div>Зареждане...</div>; 
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <EPUBReader />
    </div>
  );
};

export default Dashboard;
