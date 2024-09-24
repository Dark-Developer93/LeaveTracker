import { IconType } from "react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type DialogProps = {
  children: React.ReactNode;
  btnTitle?: string;
  linkTitle?: string;
  title?: string;
  description?: string;
  isBtn?: boolean;
  isLink?: boolean;
  icon?: IconType;
  open?: boolean;
  setOpen?: () => void;
  hasCloseBtn?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const DialogWrapper = ({
  children,
  btnTitle = "Close",
  linkTitle,
  title,
  description,
  isBtn,
  isLink,
  icon: Icon,
  open,
  setOpen,
  hasCloseBtn,
  onClick,
}: DialogProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      event.stopPropagation(); // Stop propagation only if onClick is provided
      onClick(event);
    }
  };

  const renderTrigger = () => {
    if (isBtn) {
      return <Button className="text-white">{btnTitle}</Button>;
    }
    if (isLink) {
      return (
        <Button
          variant="link"
          className="p-0 m-0 h-5 text-secondary-foreground font-normal"
        >
          {linkTitle}
        </Button>
      );
    }
    if (Icon) {
      return (
        <Icon
          className="text-primary cursor-pointer hover:text-primary/50 dark:hover:text-primary"
          size={24}
        />
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={handleClick}>
        {renderTrigger()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        {hasCloseBtn && (
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
