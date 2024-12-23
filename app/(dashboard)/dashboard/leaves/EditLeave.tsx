"use client";

import { useRouter } from "next/navigation";
import DialogWrapper from "@/components/Common/DialogWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiCaretUpDownBold } from "react-icons/pi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { BsCheckLg } from "react-icons/bs";
import { leaveStatus } from "@/lib/data/dummy-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LeaveStatus } from "@prisma/client";
import { updateLeave } from "@/app/actions/leaveActions";

type EditLeaveProps = {
  id: string;
  days: number;
  type: string;
  year: string;
  email: string;
  user: string;
  startDate: Date;
};

const EditLeave = ({
  id,
  days,
  type,
  year,
  email,
  user,
  startDate,
}: EditLeaveProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    notes: z.string().max(500),
    status: z.enum(leaveStatus),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  async function editLeave(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      Object.entries({
        ...values,
        id,
        days,
        type,
        year,
        email,
        user,
        startDate,
      }).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      await updateLeave(formData);
      toast.success("Leave updated successfully", { duration: 4000 });
      setOpen(false);
      router.refresh();

      // Send email notification
      try {
        const response = await fetch("/api/email/leave-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: user,
            leaveType: type,
            startDate: startDate.toISOString(),
            endDate: new Date(
              startDate.getTime() + days * 24 * 60 * 60 * 1000,
            ).toISOString(),
            status: values.status,
            email,
          }),
        });

        if (!response.ok) {
          toast.error("Failed to send email notification");
        }
      } catch (emailError) {
        toast.error(`Failed to send email notification: ${emailError}`);
      }
    } catch (error) {
      toast.error(`An Unexpected error occurred: ${error}`);
    }
  }
  return (
    <DialogWrapper
      btnTitle="Update Leave Status"
      title="Update Leave Status"
      isBtn
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(editLeave)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Make a Decision</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? leaveStatus.find(
                              (status: LeaveStatus) => status === field.value,
                            )
                          : "Select a decision"}
                        <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search a status..." />
                      <CommandEmpty>No leave type found.</CommandEmpty>
                      <CommandGroup>
                        {leaveStatus.map((status: LeaveStatus) => (
                          <CommandItem
                            value={status}
                            key={status}
                            onSelect={() => {
                              form.setValue("status", status);
                            }}
                          >
                            <BsCheckLg
                              className={cn(
                                "mr-2 h-4 w-4",
                                status === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {status}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes" {...field} />
                </FormControl>
                <FormDescription>
                  Add extra notes to support your decision.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default EditLeave;
