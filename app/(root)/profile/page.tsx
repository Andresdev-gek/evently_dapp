"use client";

import React, { useState, useEffect } from "react";

import { findEventsByOwnerPrincipal } from "../../../lib/actions/event.actions";
import { getDecryptedValue } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import Collection from "../../../components/shared/Collection";
import Link from "next/link";
import { IEvent } from "../../../lib/database/models/event.model";

const ProfilePage = () => {
  const [actualPrincipal, setActualPrincipal] = useState<null | string>(null);
  const [myTickets, setMyTickets] = useState<IEvent[]>([]);
  const [eventsByPrincipal, setEventsByPrincipal] = useState<IEvent[]>([]);
  const [show, setShow] = useState(false);
  

  useEffect(() => {
    const principal = getDecryptedValue("principalAddress");
    if (principal) setActualPrincipal(principal as string);
  }, []);

  useEffect(() => {
    if (actualPrincipal !== null) {
      setShow(true);
    }
  }, [actualPrincipal]);

  useEffect(() => {
    findEventsByOwnerPrincipal(actualPrincipal as string)
      .then((events) => {
        if (events.length > 0) {
          setEventsByPrincipal(events);
          console.log(events);
        } else {
          console.log("Event not found with principal");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [actualPrincipal]);

  // Luego, en otro lugar del componente
  // Esto evitará que la actualización del estado cause un bucle
  useEffect(() => {
    console.log("Events updated:", eventsByPrincipal);
  }, [eventsByPrincipal]);

  if (!show) {
    return (
      <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
            <Button asChild className="button hidden sm:flex">
              <Link href="/#events">Explore More Events</Link>
            </Button>
          </div>
        </section>

        <div className="wrapper my-8">
          <div
            className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-md text-yellow-700"
            role="alert"
          >
            <svg
              className="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              <span className="font-medium">Hey!</span> You must connect your
              wallet to do this.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* my tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 ">
      <Collection
          data={myTickets}
          emptyTitle="No event ticket purchased yet"
          emptyStateSubtext="No worries - there are many events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
  </section> 

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg"  className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 ">
        <Collection
          data={eventsByPrincipal}
          emptyTitle="There are no events created by you yet"
          emptyStateSubtext="No worries something will occur to you soon"
          collectionType="Events_Organized"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
