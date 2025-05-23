'use client'
import Image from "next/image";
import BooksPage from "../api/books/page";
import UsersPage from "../api/users/page";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession(); 
  const router = useRouter();
  const [location, setLocation] = useState<string | number>(0);
  const allowedUserEmail = "admin@gmail.com"; 

  useEffect(() => {
    
    if (status === "loading") return; 
    if (!session || !session.user?.email) {
      router.push("/login"); 
    } else if (session.user?.email !== allowedUserEmail) {
      router.push("/"); 
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Зареждане...</div>; 
  }

  return (
    <main className="tables-crud">
      <h1 >Управлявай база данни</h1>
      <BooksPage />
      <UsersPage />
    </main>
  );
}
