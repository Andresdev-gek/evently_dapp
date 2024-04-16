"use client";
import React from "react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import NavItems from './NavItems';

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
            <Image alt="menu" src="/assets/icons/menu.svg" width={24} height={24} className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
        <Image alt="menu" src="/public/assets/complete-logo.svg" width={128} height={38} />
        <Separator className="border border-gray" />
        <NavItems/>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
