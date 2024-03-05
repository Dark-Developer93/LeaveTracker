import { HiOutlineUserGroup } from "react-icons/hi";
import {
  HiMiniComputerDesktop,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { MdOutlineBalance, MdEvent, MdHistory  } from "react-icons/md";
import { TbListCheck } from "react-icons/tb";

export const AdminRoutes = [
  { title: "Portal", url: "/portal", icon: HiMiniComputerDesktop },
  { title: "Dashboard", url: "/dashboard", icon: HiOutlineSquares2X2 },
  { title: "History", url: "/portal/history", icon: MdHistory },
  { title: "Balances", url: "/dashboard/balances", icon: MdOutlineBalance },
  { title: "Leaves", url: "/dashboard/leaves", icon: TbListCheck },
  { title: "Users", url: "/dashboard/users", icon: HiOutlineUserGroup },
  { title: "Events", url: "/dashboard/events", icon: MdEvent },
];

export const UserRoutes = [
  { title: "Portal", url: "/portal", icon: HiMiniComputerDesktop },
  { title: "History", url: "/portal/history", icon: MdHistory },
];

export const ModeratorRoutes = [
  { title: "Portal", url: "/portal", icon: HiMiniComputerDesktop },
  { title: "Dashboard", url: "/dashboard", icon: HiOutlineSquares2X2 },
  { title: "History", url: "/portal/history", icon: MdHistory },
  { title: "Balances", url: "/dashboard/balances", icon: MdOutlineBalance },
  { title: "Leaves", url: "/dashboard/leaves", icon: TbListCheck },
  { title: "Users", url: "/dashboard/users", icon: HiOutlineUserGroup },
  { title: "Events", url: "/dashboard/events", icon: MdEvent },
];
