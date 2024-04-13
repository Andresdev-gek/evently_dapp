import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from '@/components/shared/NavItems'
import MobileNav from '@/components/shared/MobileNav'
import { Button } from "@/components/ui/button";
import ConnectWallet from "./ConnectWallet"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex content-center items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            alt="Evently logo"
            src="/assets/complete-logo.svg"
            width={100}
            height={30}
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
          </nav>
        </SignedIn>

        <div className="flex justify-end gap-3 items-center">
        <SignedOut>
          <Button asChild className="rounded-full" size="lg">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <ConnectWallet></ConnectWallet>
          <UserButton afterSignOutUrl="/" />
          <MobileNav />
        </SignedIn>
      </div>
      </div>

      
    </header>
  );
};

export default Header;
