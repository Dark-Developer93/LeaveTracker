"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogWrapper from "@/components/Common/DialogWrapper";
import toast from "react-hot-toast";
import { IoPencil } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiCaretUpDownBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { BsCheckLg } from "react-icons/bs";
import { Role, User } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRoles, orgDepartments, orgTitles } from "@/lib/data/dummy-data";
import { updateUser } from "@/app/actions/userActions";

type EditUserProps = {
  user: User;
};

type DefaultValues = {
  phone: string;
  department: string;
  title: string;
  role: Role;
};

const EditUser = ({ user }: EditUserProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const userFormSchema = z.object({
    phone: z.string().max(50),

    department: z.string(),

    title: z.string(),

    role: z.enum(UserRoles),
  });

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      phone: user.phone,
      department: user.department,
      title: user.title,
      role: user.role,
    } as DefaultValues,
  });

  async function SubmitEditUser(values: z.infer<typeof userFormSchema>) {
    const { id } = user;
    try {
      const formData = new FormData();
      formData.append("id", id);
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await updateUser(formData);

      toast.success("User Edited Successfully", { duration: 4000 });
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  }

  return (
    <DialogWrapper
      title="Edit User"
      icon={IoPencil}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitEditUser)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Department</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          " justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? orgDepartments.find(
                              (dpt) => dpt.label === field.value,
                            )?.label
                          : "Select a department"}
                        <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search a department..." />
                      <CommandEmpty>No department found.</CommandEmpty>
                      <CommandGroup>
                        {orgDepartments.map((dpt) => (
                          <CommandItem
                            value={dpt.label}
                            key={dpt.id}
                            onSelect={() => {
                              form.setValue("department", dpt.label);
                            }}
                          >
                            <BsCheckLg
                              className={cn(
                                "mr-2 h-4 w-4",
                                dpt.label === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {dpt.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField // TODO: check if the user who edits the role is an admin and not a normal user or moderaotor.
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Title</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          " justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? orgTitles.find(
                              (title) => title.label === field.value,
                            )?.label
                          : "Select a title"}
                        <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search a title..." />
                      <CommandEmpty>No title found.</CommandEmpty>
                      <CommandGroup>
                        {orgTitles.map((title) => (
                          <CommandItem
                            value={title.label}
                            key={title.id}
                            onSelect={() => {
                              form.setValue("title", title.label);
                            }}
                          >
                            <BsCheckLg
                              className={cn(
                                "mr-2 h-4 w-4",
                                title.label === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {title.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Role</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          " justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? UserRoles.find((role) => role === field.value)
                          : "Select a role"}
                        <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search a role..." />
                      <CommandEmpty>No role found.</CommandEmpty>
                      <CommandGroup>
                        {UserRoles.map((role) => (
                          <CommandItem
                            value={role}
                            key={role}
                            onSelect={() => {
                              form.setValue("role", role);
                            }}
                          >
                            <BsCheckLg
                              className={cn(
                                "mr-2 h-4 w-4",
                                role === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {role}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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

export default EditUser;
