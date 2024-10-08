import Container from "@/components/Common/Container";
import { Balances } from "@prisma/client";
import LeaveCard from "./LeaveCard";

type Props = {
  balances: Balances;
};

const UserBalances = ({ balances }: Props) => {
  return (
    <Container>
      <section className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <LeaveCard
          year={balances?.year}
          leaveType="ANNUAL"
          credit={balances?.annualCredit as number}
          used={balances?.annualUsed as number}
          // balance = {balances?.annualCredit as number - (balances?.annualUsed || 0) as number}
          balance={balances?.annualAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType="STUDY"
          credit={balances?.studyCredit as number}
          used={balances?.studyUsed as number}
          // balance = {balances?.studyCredit as number - (balances?.studyUsed || 0) as number}
          balance={balances?.studyAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType="SICK"
          credit={balances?.sickCredit as number}
          used={balances?.sickUsed as number}
          // balance = {balances?.sickCredit as number - (balances?.sickUsed || 0) as number}
          balance={balances?.sickAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType="FAMILY"
          credit={balances?.familyCredit as number}
          used={balances?.familyUsed as number}
          // balance = {balances?.familyCredit as number - (balances?.familyUsed || 0) as number}
          balance={balances?.familyAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType="PATERNITY"
          credit={balances?.paternityCredit as number}
          used={balances?.paternityUsed as number}
          // balance = {balances?.paternityCredit as number - (balances?.paternityUsed || 0) as number}
          balance={balances?.paternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType="MATERNITY"
          credit={balances?.maternityCredit as number}
          used={balances?.maternityUsed as number}
          // balance = {balances?.maternityCredit as number - (balances?.maternityUsed || 0) as number}
          balance={balances?.maternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType="UNPAID"
          used={balances?.unpaidUsed as number}
        />
      </section>
    </Container>
  );
};

export default UserBalances;
