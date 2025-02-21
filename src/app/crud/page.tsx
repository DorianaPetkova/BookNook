'use client'
import Image from "next/image";
import BooksPage from "../api/books/page";
import UsersPage from "../api/users/page";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter();
  const [location, setLocation] = useState<string | number>(0);
  const allowedUserEmail = "admin@gmail.com"; // Replace with the email you want to allow

  useEffect(() => {
    // If the session is loading or there's no session (user is not logged in), redirect to login
    if (status === "loading") return; // Wait for session to load
    if (!session || !session.user?.email) {
      router.push("/login"); // Redirect to login if no session or email is null
    } else if (session.user?.email !== allowedUserEmail) {
      router.push("/"); // Redirect to unauthorized page if email doesn't match
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // You can display a loading state while checking the session
  }

  return (
    <main className="tables-crud">
      <h1 >CRUD</h1>
      <BooksPage />
      <UsersPage />
    </main>
  );
}
