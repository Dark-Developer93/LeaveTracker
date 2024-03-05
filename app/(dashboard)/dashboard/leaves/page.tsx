import Container from "@/components/Common/Container"
import TableWrapper from "@/components/Common/TableWrapper"
import { getAllLeaveDays } from "@/lib/data/getLeaveDays"
import LeavesTable from "./LeavesTable"
import { Leave } from "@prisma/client"


const AdminLeaves  = async () => {
    const allLeaves = await getAllLeaveDays()

    if(allLeaves === null) {
        return <Container>No Leaves found...</Container>
    }

  return (
    <Container>
        <TableWrapper title="All Leaves">
            <LeavesTable leaves={allLeaves as Leave[]} />
        </TableWrapper>
    </Container>
  )
}

export default AdminLeaves