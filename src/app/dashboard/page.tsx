"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import EPUBReader from "@/components/EPUBReader";

const Dashboard = () => {
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter();
  const [location, setLocation] = useState<string | number>(0)

  useEffect(() => {
    // If the session is loading or there's no session (user is not logged in), redirect to login
    if (status === "loading") return; // Wait for session to load
    if (!session || !session.user?.email) {
      router.push("/login"); // Redirect to login if no session or email is null
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // You can display a loading state while checking the session
  }

 
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold">Dashboard</h1>
     
     <EPUBReader/>
    </div>
  );
};

export default Dashboard;
