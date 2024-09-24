"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import DialogWrapper from "@/components/Common/DialogWrapper";
import { Button } from "@/components/ui/button";
import { addCredits } from "@/app/actions/balanceActions";
import CreditField from "./CreditField";

const creditTypes = [
  "annual",
  "family",
  "sick",
  "study",
  "maternity",
  "paternity",
] as const;

const initialCreditValues: { [key: string]: number } = {
  annual: 0,
  family: 0,
  sick: 0,
  study: 0,
  maternity: 0,
  paternity: 0,
};

type Props = {
  email: string;
  name: string;
};

const AddCredits = ({ email, name }: Props) => {
  const [creditValues, setCreditValues] = useState(initialCreditValues);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCreditChange = (type: string, value: number) => {
    setCreditValues((prevValues) => ({ ...prevValues, [type]: value }));
  };

  async function SubmitCredits(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const year = new Date().getFullYear().toString();
      const formData = new FormData();
      Object.entries({
        ...creditValues,
        year,
        email,
        name,
      }).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      await addCredits(formData);
      toast.success("Credits Submitted", { duration: 4000 });
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(`An Unexpected error occurred ${error}`);
    }
  }

  return (
    <DialogWrapper
      title="Add Credits"
      description="The Credits you are about to add are for this year only!"
      icon={FaPlus}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <form onSubmit={SubmitCredits}>
        {creditTypes.map((type) => (
          <div key={type} className="my-3">
            {["Credit"].map((suffix) => (
              <CreditField
                key={type + suffix}
                name={`${type}${suffix}`}
                label={`${
                  type.charAt(0).toUpperCase() + type.slice(1)
                } ${suffix}`}
                onChange={(value) => handleCreditChange(type, value)}
              />
            ))}
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </DialogWrapper>
  );
};

export default AddCredits;
