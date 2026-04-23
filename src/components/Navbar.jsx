"use client";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";

import React from "react";

const Navbar = () => {
  const { data, isPending } = useSession();
  console.log(data);
  const user = data?.user;

  const handleLogout = () => {
    authClient.signOut();
  };

  // if (isPending) {
  //   return (
  //     <div className="flex justify-center">
  //       <h2>Loading...</h2>
  //     </div>
  //   );
  // }
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <p className="font-bold">ACME</p>
          </div>
          <ul className="flex items-center gap-4 ">
            <li className=" ">
              <Link href="/" className="no-underline font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/models" className="no-underline font-bold">
                Models
              </Link>
            </li>
            <li>
              <Link href="/posts" className="no-underline font-bold">
                Posts
              </Link>
            </li>
          </ul>
          {user ? (
            <div className="flex gap-4 items-center">
              <div>
                <p className="text-green-500 font-bold">Welcome!</p>
                <p className="font-bold">{user?.name}</p>
              </div>
              <Button onClick={handleLogout} variant="danger">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/signup" className="no-underline">
                <Button variant="primary">Sign Up</Button>
              </Link>
              <Link href="/signin" className="no-underline">
                <Button variant="primary">Sign In</Button>
              </Link>
            </div>
          )}
        </header>
      </nav>
    </>
  );
};

export default Navbar;
