"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const isEventOver = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {isEventOver ? (
        <p className="font-bold p-2 text-red-400">
          Sorry, tickets are no longer availble for this event
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets Now!</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
