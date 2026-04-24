"use client";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  console.log(user);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await authClient.signOut();
      // toast.success("Logged out successfully");

      // router.push("/");
      // router.refresh();
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/"); // redirect to login page
            toast.success("Logged out successfully");
          },
        },
      });
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <p className="font-bold">ACME</p>

        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/models">Models</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
        </ul>

        {user ? (
          <div className="flex gap-4 items-center">
            <div>
              <p className="text-green-500 font-bold">Welcome!</p>
              <p className="font-bold">{user.name}</p>
            </div>

            <Button onClick={handleLogout} variant="danger">
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        )}
      </header>
    </nav>
  );
};

export default Navbar;
