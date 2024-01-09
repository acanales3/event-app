import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const numOrdersPages = Number(searchParams?.ordersPage) || 1;
  const numEventsPages = Number(searchParams?.ordersPage) || 1;

  const orders = await getOrdersByUser({ userId, page: numOrdersPages });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event || []);

  const myEvents = await getEventsByUser({ userId, page: numEventsPages });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No Event Tickets Purchased Yet"
          emptyStateSubtext="No Worries, Plenty of Exciting Events to Explore!"
          collectionType="My_Tickets"
          limit={3}
          page={numOrdersPages}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Events</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={myEvents?.data}
          emptyTitle="You Have Not Created Any Events"
          emptyStateSubtext="Go Create Some!"
          collectionType="Events_Organized"
          limit={6}
          page={numEventsPages}
          urlParamName="eventsPage"
          totalPages={myEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
