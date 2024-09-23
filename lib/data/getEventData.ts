import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function getEventsData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  try {
    const eventsData = await prisma.events.findMany({});

    return [...eventsData];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching events data:", error);
    throw new Error("Error fetching events data");
  }
}
