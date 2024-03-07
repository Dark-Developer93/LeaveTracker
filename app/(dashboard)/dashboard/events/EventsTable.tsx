"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { Events } from "@prisma/client";
import { IoPencil } from "react-icons/io5";
// import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/Common/DialogWrapper";
import EventForm from "./EventForm";

type UserProps = {
  events: Events[];
};

const EventsTable = ({ events }: UserProps) => {
  const [open, setOpen] = useState(false);
  // const router = useRouter();

  // async function updateEventHandler(
  //   eventId: string,
  //   updatedData: Partial<Events>
  // ) {
  //   {
  //     try {
  //       const res = await fetch("/api/events/eventId", {
  //         method: "PATCH",
  //         body: JSON.stringify(updatedData),
  //       });
  //       if (res.ok) {
  //         toast.success("Edit Successful", { duration: 4000 });
  //         // router.refresh();
  //       } else {
  //         const errorMessage = await res.text();
  //         toast.error(`An error occured ${errorMessage}`, { duration: 6000 });
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //       toast.error("An Unexpected error occured");
  //     }
  //   }
  // }

  const deleteEventHandler = async (eventId: string) => {
    try {
      const response = await fetch('/api/events/eventId', {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      // Optionally, handle the response here, e.g., remove the event from the UI
    } catch (error) {
      console.error("Error deleting event:", error);
      // Optionally, handle errors, e.g., show an error message
    }
  };

  return (
    <div className="  rounded-lg shadow-md px-6  max-h-[50vh] overflow-y-auto bg-white dark:bg-black">
      <div className="py-5 px-10 sticky top-0 z-10 shadow-md bg-white  dark:bg-slate-900">
        <h2 className="text-2xl text-center font-bold tracking-tight">
          Events
        </h2>
      </div>

      <div className="relative overflow-x-auto  ">
        <Table>
          <TableHeader className="whitespace-nowrap">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead className="">Delete</TableHead>
              <TableHead className="">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="whitespace-nowrap">
            {/* if no events then show an h2 with the text "No events" */}
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No events
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.startDate.toLocaleDateString()}</TableCell>
                  {/* TODO: Check why the API for the Delete and the update is not working */}
                  <TableCell className="">
                    <button>
                      {/* TODO: when you click it delete the event */}
                      <FaRegTrashCan
                        size={18}
                        color="#2563eb"
                        onClick={() => {
                          deleteEventHandler(event.id);
                          console.log(event.id);
                        }}
                      />
                    </button>
                  </TableCell>
                  <TableCell>
                    <DialogWrapper
                      title="Edit User"
                      icon={IoPencil}
                      isBtn={false}
                      open={open}
                      setOpen={() => setOpen(!open)}
                    >
                      <EventForm
                        mode="update"
                        initialState={{
                          id: event.id,
                          title: event.title,
                          description: event.description || "",
                          startDate: event.startDate,
                        }}
                      />
                    </DialogWrapper>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventsTable;
