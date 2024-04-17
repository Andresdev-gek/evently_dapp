"use client";

import React, { useState, useEffect } from "react";
import { IEvent } from "@/lib/database/models/event.model";
import { useUser, SignedOut, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Checkout from "./Checkout";
import Link from "next/link";
import { getDecryptedValue } from "@/lib/utils";
import { CreateOrderParams } from "@/types";
import { ContractBuyTicket, buyTicket } from "@/lib/smart-contract-service";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime as Date) < new Date();

  const [actualPrincipal, setActualPrincipal] = useState<null | string>(null);

  useEffect(() => {
    const principal = getDecryptedValue("principalAddress");
    if (principal) setActualPrincipal(principal as string);
  }, []); 


  const handleCheckout = async (createOrder: CreateOrderParams) => {
    //se arma objeto para stacks 
    const dataToPurchaseTicket: ContractBuyTicket = {
      ownerPrincipal: event.ownerPrincipal,
      eventUUID: event.eventUUID,
      ticketId: `TI${crypto.randomUUID()}`,
      price: event.price as string
    }
    const purchaseResFromStacks = await buyTicket(dataToPurchaseTicket);
    console.log(purchaseResFromStacks)

        
  }

  return (
    <div className="flex items-center gap-3">
      {/* cannot buy past events */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available 😢
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} buyerPrincipal={'some pricipal'} onCheckout={handleCheckout}/>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
