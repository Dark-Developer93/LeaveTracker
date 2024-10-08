import Container from "@/components/Common/Container";

import { Leave } from "@prisma/client";
import { getUserLeaveDays } from "@/lib/data/getLeaveDays";
import TableWrapper from "@/components/Common/TableWrapper";
import HistoryTable from "./HistoryTable";

const UserHistory = async () => {
  const leaveHistory = await getUserLeaveDays();

  if (leaveHistory === null) {
    return <Container>No Leaves found...</Container>;
  }
  return (
    <Container>
      <TableWrapper title="My Leave History">
        <HistoryTable history={leaveHistory as Leave[]} />
      </TableWrapper>
    </Container>
  );
};

export default UserHistory;
