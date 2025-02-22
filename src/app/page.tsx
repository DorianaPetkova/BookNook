'use client'
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center p-12 pt-[150px]">
      <br /><br /><br /><br />
    
      <div className="flex items-center justify-center w-full max-w-5xl">
        {/* Text Section */}
        <div className="w-1/2">
          <h2 className="text-first-page">
            Discover a world of stories with <b>BookNook</b>, the ultimate site for book lovers. 
            Read anytime, anywhere, and dive into captivating tales at your own pace. 
            Start your next adventure today!
          </h2>
        </div>
        
        {/* Image Section */}
        <div className="w-1/2 flex justify-center">
          <img src="/images/kotefinal.png" alt="kotence" className="max-w-120px h-auto"/>
        </div>
      </div>
    <br />
      <div className="flex items-center justify-center w-full max-w-5xl pt-[210px]">
        {/* Image Section */}
        <div className="w-1/2 flex">
          <img 
            src={theme === 'dark' ? '/images/Vector-white.png' : '/images/Vector.png'} 
            alt="kotence" 
            className="max-w-full h-auto"
          />
        </div>
        
        {/* Text Section */}
        <div className="w-1/2">
          <h2 className="text-first-page">
          <h2 className="features"><b>Features:</b></h2>
          
      <ul>
        
        <li>1. View different books</li>
        <li>2. Create and log in with an individual account</li>
        <li>3. Toggle light and dark theme</li>
        <li>4. CRUD for both users and books</li>
       
        <ul className="ml-6 list-disc">
          <li>Add books/users</li>
          <li>Edit books/users</li>
          <li>Delete books/users</li>
          <li>Hashing for passwords</li>
        </ul>
      </ul>
          </h2>
        </div>
      </div>


      
    </main>

    
  );
}






