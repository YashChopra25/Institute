"use client";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserAvatar from "./UserAvatar";

export default function Navbar() {
  const user = useCurrentUser();
  return (
    <nav className="fixed top-0 w-full py-4 border-b shadow-[0px_4px_64px_0px_rgba(0,0,0,0.06)] z-50 bg-white px-5 md:px-10">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <p className="text-3xl font-bold">Logo</p>
        <div className="flex items-center gap-4">
          {user?.image ? (
            <UserAvatar />
          ) : (
            <>
              <Register />
              <Login />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
