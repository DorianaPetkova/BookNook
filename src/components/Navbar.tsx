"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import SearchInput from "./SearchInput";
import GenreDropDown from "./GenreDropDown";
import ThemeToggler from "./ThemeToggler";
const Navbar = () => {
  const { data: session }: any = useSession();
  return (
    <div>
      <ul className="flex justify-between m-10 item-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="nav">
          <Link href="/dashboard">
            <li>Dashboard</li>
            
          </Link>
          <Link href="/crud">
                <li>Crud</li>
              </Link>
          <GenreDropDown/>
          <ThemeToggler/>
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
               
          
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
