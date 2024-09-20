"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { IoCalendarOutline } from "react-icons/io5";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/app/actions/eventActions";

type EventFormProps = {
  mode: "create" | "update";
  initialState?: {
    id: string;
    title: string;
    description: string;
    startDate: Date;
  };
  onSuccessfulUpdate?: () => void;
};

const EventForm = ({
  mode,
  initialState,
  onSuccessfulUpdate,
}: EventFormProps) => {
  const router = useRouter();

  const formSchema = z.object({
    title: z.string({ required_error: "Please add a Title." }).max(500),
    description: z.string({ required_error: "Please add a Description." }),
    startDate: z.date({ required_error: "A start date is required." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialState || {
      title: "",
      description: "",
      startDate: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("startDate", data.startDate.toISOString());

      if (mode === "create") {
        await createEvent(formData);
        toast.success("Event Added", { duration: 4000 });
      } else {
        formData.append("id", initialState!.id);
        await updateEvent(formData);
        toast.success("Event Updated", { duration: 4000 });
        if (onSuccessfulUpdate) {
          onSuccessfulUpdate();
        }
      }

      form.reset();
      router.refresh();
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md dark:bg-black">
      <h2 className="text-2xl text-center font-bold tracking-tight">
        {mode === "create" ? "Add an Event" : "Update an Event"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Add a title to the event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  Describe briefly the Event details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "  inline-flex justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IoCalendarOutline className=" h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {mode === "create" ? "Submit" : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
