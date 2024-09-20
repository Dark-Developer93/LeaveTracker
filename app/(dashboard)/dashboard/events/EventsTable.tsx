"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { Events } from "@prisma/client";
import { IoPencil } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogWrapper from "@/components/Common/DialogWrapper";
import { deleteEvent } from "@/app/actions/eventActions";
import ConfirmationDialog from "@/components/Common/confirmation-dialog/ConfirmationDialog";
import EventForm from "./EventForm";

type UserProps = {
  events: Events[];
};

const EventsTable = ({ events }: UserProps) => {
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const router = useRouter();

  const deleteEventHandler = async (eventId: string) => {
    try {
      const formData = new FormData();
      formData.append("id", eventId);
      await deleteEvent(formData);
      toast.success("Event deleted successfully", { duration: 4000 });
      router.refresh();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(`An error occurred: ${error}`, { duration: 6000 });
    }
  };

  const handleEventUpdate = () => {
    setOpenEventId(null);
    router.refresh();
  };

  return (
    <div className="rounded-lg shadow-md px-6 max-h-[50vh] overflow-y-auto bg-white dark:bg-black">
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
                    <ConfirmationDialog
                      triggerButton={
                        <button>
                          <FaRegTrashCan
                            size={18}
                            className="text-primary hover:cursor-pointer hover:text-primary/50 dark:hover:text-primary"
                          />
                        </button>
                      }
                      title="Are you absolutely sure?"
                      description="This action cannot be undone. This will permanently delete your event and remove its data from our servers."
                      onConfirm={() => deleteEventHandler(event.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <DialogWrapper
                      icon={IoPencil}
                      isBtn={false}
                      open={openEventId === event.id}
                      setOpen={() =>
                        setOpenEventId(
                          openEventId === event.id ? null : event.id,
                        )
                      }
                    >
                      <EventForm
                        mode="update"
                        initialState={{
                          id: event.id,
                          title: event.title,
                          description: event.description || "",
                          startDate: event.startDate,
                        }}
                        onSuccessfulUpdate={handleEventUpdate}
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
