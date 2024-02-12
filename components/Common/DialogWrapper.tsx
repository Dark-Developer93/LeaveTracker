import { IconType } from "react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type DialogProps = {
  children: React.ReactNode;
  btnTitle?: string;
  title?: string;
  description?: string;
  isBtn: boolean;
  icon?: IconType;
  open?: boolean;
  setOpen?: () => void;
};

const DialogWrapper = ({
  children,
  btnTitle = "Close",
  title = "Title",
  description = "Description",
  isBtn = true,
  icon: Icon,
  open,
  setOpen,
}: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isBtn ? (
          <Button className="text-white">{btnTitle}</Button>
        ) : (
          Icon && <Icon className=" text-blue-600 cursor-pointer" size={24} />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
