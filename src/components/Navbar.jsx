"use client";
import { Button, Link } from "@heroui/react";
import React from "react";

const Navbar = () => {
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
          </ul>
          <Link href="/signup" className="no-underline">
            {" "}
            <Button variant="primary">Sign Up</Button>
          </Link>
        </header>
      </nav>
    </>
  );
};

export default Navbar;
