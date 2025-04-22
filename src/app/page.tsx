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
          Открийте свят от истории с <b>BookNook</b>, най-доброто място за любителите на книги.
Четете по всяко време, навсякъде и се потопете в завладяващи разкази със собственото си темпо.
Започнете следващото си приключение още днес!
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
          <h2 className="features"><b>Функционалност:</b></h2>
          
      <ul>
        
        <li>1. Разглеждане на книги</li>
        <li>2. Създаване и влизане с акаунт</li>
        <li>3. Тъмна и светла тема</li>
        <li>4. CRUD заявки за книги и потребители</li>
       
        <ul className="ml-6 list-disc">
          <li>Добавене на потребители/книги</li>
          <li>Проманя на потребители/книги</li>
          <li>Изтриване на потребители/книги</li>
          <li>Хеширане на пароли</li>
        </ul>
      </ul>
          </h2>
        </div>
      </div>


      
    </main>

    
  );
}






