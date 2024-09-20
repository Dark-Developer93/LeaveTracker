"use client";

import { FormEvent, useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { IoPencil } from "react-icons/io5";

import { Balances } from "@prisma/client";
import { updateBalance } from "@/app/actions/balanceActions";
import DialogWrapper from "@/components/Common/DialogWrapper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";

type State = {
  [key: string]: number;
};

type Action = {
  type: string;
  value: number;
};
type Props = {
  balance: Balances;
};

const EditBalances = ({ balance }: Props) => {
  const initialState: State = {
    annualCredit: balance.annualCredit as number,
    annualUsed: balance.annualUsed as number,
    annualAvailable: balance.annualAvailable as number,
    familyCredit: balance.familyCredit as number,
    familyUsed: balance.familyUsed as number,
    familyAvailable: balance.familyAvailable as number,
    sickCredit: balance.sickCredit as number,
    sickUsed: balance.sickUsed as number,
    sickAvailable: balance.sickAvailable as number,
    maternityCredit: balance.maternityCredit as number,
    maternityUsed: balance.maternityUsed as number,
    maternityAvailable: balance.maternityAvailable as number,
    paternityCredit: balance.paternityCredit as number,
    paternityUsed: balance.paternityUsed as number,
    paternityAvailable: balance.paternityAvailable as number,
    studyCredit: balance.studyCredit as number,
    studyUsed: balance.studyUsed as number,
    studyAvailable: balance.studyAvailable as number,
    unpaidUsed: balance.unpaidUsed as number,
  };

  const reducer = (state: State, action: Action): State => {
    return {
      ...state,
      [action.type]: action.value,
    };
  };

  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const balancesFormSchema = z.object({
    annualCredit: z.number(),
    annualUsed: z.number(),
    annualAvailable: z.number(),
    familyCredit: z.number(),
    familyUsed: z.number(),
    familyAvailable: z.number(),
    sickCredit: z.number(),
    sickUsed: z.number(),
    sickAvailable: z.number(),
    maternityCredit: z.number(),
    maternityUsed: z.number(),
    maternityAvailable: z.number(),
    paternityCredit: z.number(),
    paternityUsed: z.number(),
    paternityAvailable: z.number(),
    studyCredit: z.number(),
    studyUsed: z.number(),
    studyAvailable: z.number(),
    unpaidUsed: z.number(),
  });

  const handleInputChange =
    (type: string) => (e: FormEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.valueAsNumber;
      // Dispatch the change for the current field
      dispatch({
        type,
        value: newValue,
      });

      // TODO: There is a bug when the below code is running that make the available values to be either extra by one or less by one

      // // Recalculate available values if the type is Credit or Used
      if (type.endsWith("Credit") || type.endsWith("Used")) {
        const baseType = type.replace(/Credit|Used/, "");
        const creditKey = `${baseType}Credit`;
        const usedKey = `${baseType}Used`;
        const availableKey = `${baseType}Available`;

        const credit = type.endsWith("Credit")
          ? newValue
          : state[creditKey] || 0;
        const used = type.endsWith("Used") ? newValue : state[usedKey] || 0;
        const available = credit - used;

        // Dispatch the change for the available field
        dispatch({
          type: availableKey,
          value: available,
        });
      }
    };

  async function submitEditedBalances(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { id } = balance;
      const formData = new FormData();
      Object.entries({
        ...state,
        id,
      }).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      await updateBalance(formData);
      toast.success("Edit Successful", { duration: 4000 });
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(`An error occurred: ${error}`);
    }
  }

  return (
    <DialogWrapper
      title="Edit Credits"
      icon={IoPencil}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <form onSubmit={submitEditedBalances}>
        <div className="grid grid-cols-3 gap-2 my-3">
          {Object.keys(initialState).map((key) => {
            const isAvailable = key.endsWith("Available");
            return (
              <div className="flex flex-col" key={key}>
                <Label className="text-xs">{key}</Label>
                <Input
                  type="number"
                  onChange={handleInputChange(key)}
                  value={state[key]}
                  disabled={isAvailable} // Disable available inputs
                />
              </div>
            );
          })}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </DialogWrapper>
  );
};

export default EditBalances;
