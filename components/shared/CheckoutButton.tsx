'use client'

import React from "react";
import { IEvent } from "@/lib/database/models/event.model";
import { useUser, SignedOut, SignedIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Checkout from './Checkout';
import Link from "next/link";


const CheckoutButton = ({ event }: { event: IEvent }) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;


  const hasEventFinished = new Date(event.endDateTime as Date) < new Date();

  return (<div className="flex items-center gap-3">

    {/* cannot buy past events */}
    {hasEventFinished ? (
        <p className="p-2 text-red-400">Sorry, tickets are no longer available 😢</p>
    ): (<>
        <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
                <Link href="/sign-in">
                    Get Tickets
                </Link>
            </Button>
        </SignedOut>

        <SignedIn>
            {/** <Checkout event={event} userId={userId}/> */}
        </SignedIn>
    </>)}
  </div>);
};

export default CheckoutButton;
