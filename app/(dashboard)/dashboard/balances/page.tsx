import dynamic from "next/dynamic";
import Container from "@/components/Common/Container";
import { getAllBalances } from "@/lib/data/getBalanceData";
import { Balances } from "@prisma/client";

const BalancesTable = dynamic(() => import("./BalancesTable"), { ssr: false });

const AdminBalances = async () => {
  const allBalances = await getAllBalances();
  if (allBalances === null) {
    return <Container>No Balances found...</Container>;
  }
  return (
    <Container>
      <BalancesTable balances={allBalances as Balances[]} />
    </Container>
  );
};

export default AdminBalances;
