"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import SearchInput from "./SearchInput";
import GenreDropDown from "./GenreDropDown";
import ThemeToggler from "./ThemeToggler";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { data: session }: any = useSession();
  const { theme } = useTheme();
  const adminEmail = process.env.NEXT_PUBLIC_MASTER_ADMIN_EMAIL; 

  return (
    <div>
   
      <nav className="flex justify-between items-center p-5 bg-white dark:bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md">
       
        <Link href="/" className="flex items-center">
          <img
            src={theme === 'dark' ? '/images/logo-white.png' : '/images/logo.png'}
            alt="logo"
            className="h-12" 
          />
        </Link>

     
        <div className="flex items-center space-x-6">
        
          <Link href="/dashboard">
            <li className="text-lg">Books</li>
          </Link>

          {/* crud for admin*/}
          {session?.user?.email === adminEmail && (
            <Link href="/crud">
              <li className="text-lg">Crud</li>
            </Link>
          )}

         
          <ThemeToggler />

          {/* condition login register */}
          {!session ? (
            <>
              <Link href="/login">
                <li className="text-lg">Login</li>
              </Link>
              <Link href="/register">
                <li className="text-lg">Register</li>
              </Link>
            </>
          ) : (
            <>
              <span className="text-lg">{session.user?.email}</span>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 bg-blue-800 text-white rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
