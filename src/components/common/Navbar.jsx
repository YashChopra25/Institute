import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full py-4 border-b shadow-[0px_4px_64px_0px_rgba(0,0,0,0.06)] z-50 bg-white">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        <p className="text-3xl font-bold">Logo</p>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center px-5 py-2 font-medium text-white bg-blue rounded-3xl">
            Register
          </button>
          <button className="flex items-center justify-center px-5 py-2 font-medium text-white bg-blue rounded-3xl">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
