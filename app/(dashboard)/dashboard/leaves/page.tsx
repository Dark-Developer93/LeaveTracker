import Container from "@/components/Common/Container";
import TableWrapper from "@/components/Common/TableWrapper";
import { getAllLeaveDays } from "@/lib/data/getLeaveDays";
import { Leave, Role } from "@prisma/client";
import LeavesTable from "./LeavesTable";
import { getCurrentUser } from "@/lib/session";
import { getAllSuperviseeUsers } from "@/app/actions/userActions";

const AdminLeaves = async () => {
  const allLeaves = await getAllLeaveDays();
  const currentUser = await getCurrentUser();
  const allSuperviseeUsers = await getAllSuperviseeUsers();

  if (allLeaves === null) {
    return <Container>No Leaves found...</Container>;
  }

  let filteredLeaves: Leave[] = [];

  if (currentUser?.role === "MODERATOR" || currentUser?.role === "ADMIN") {
    filteredLeaves = allLeaves;
  } else if (currentUser?.role === "SUPERVISOR") {
    filteredLeaves = allLeaves.filter((leave) =>
      allSuperviseeUsers
    .map((user) => user.email)
    .includes(leave.userEmail)
  );
}

console.log(allSuperviseeUsers);
  console.log(allLeaves);

  return (
    <Container>
      <TableWrapper title="All Leaves">
        <LeavesTable
          leaves={filteredLeaves}
          currentUserRole={currentUser?.role as Role}
        />
      </TableWrapper>
    </Container>
  );
};

export default AdminLeaves;
