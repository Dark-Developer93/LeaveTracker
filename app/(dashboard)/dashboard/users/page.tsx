import React from "react";
import { getAllUsers } from "@/lib/data/getUserData";
import Container from "@/components/Common/Container";
import TableWrapper from "@/components/Common/TableWrapper";
import UsersTable from "./UsersTable";

const AdminUsersPage = async () => {
  const users = await getAllUsers();
  return (
    <Container>
      <TableWrapper title="Users">
        <UsersTable users={users} />
      </TableWrapper>
    </Container>
  );
};

export default AdminUsersPage;
