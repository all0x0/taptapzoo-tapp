"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LucideDog } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="mx-3 my-4">
      <div className="flex justify-between">
        <div className="p-2">
          <LucideDog />
        </div>
        <div className="ml-auto flex items-center ">
          <w3m-button />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
