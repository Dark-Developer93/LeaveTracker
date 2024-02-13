"use client";

import React from "react";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type UsersTableProps = {
  users: User[];
};

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table>
      <TableHeader className="whitespace-nowrap">
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="">Edit</TableHead>
          <TableHead className="">Add Leave Credits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="whitespace-nowrap">
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <Avatar>
                <AvatarImage
                  src={user.image as string}
                  alt={user.name as string}
                />
                <AvatarFallback>
                  {" "}
                  {user.name?.charAt(0).toUpperCase()}{" "}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Badge variant="outline">{user.department}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className="p-0">
                {user.title}
              </Badge>
            </TableCell>
            <TableCell className="">{user.role}</TableCell>
            <TableCell className="text-right">
              <p>/</p>
            </TableCell>
            <TableCell className="text-right">
              <p>+</p>
            </TableCell>
            {/* <TableCell className="text-left">
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800 p-0"
                onClick={() => console.log("edit")}
              >
                Edit
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800 p-0"
                onClick={() => console.log("Add")}
              >
                Add Leave Credits
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
