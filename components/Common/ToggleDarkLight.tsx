"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineSun } from "react-icons/hi2";
import { MdOutlineNightlightRound } from "react-icons/md";

const ToggleDarkLight = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const currentTheme = theme === "system" ? systemTheme : theme;
  return currentTheme === "dark" ? (
    <button
      type="button"
      onClick={() => setTheme("light")}
      className="p-1 bg-primary text-white rounded-full "
    >
      <HiOutlineSun size={24} />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setTheme("dark")}
      className="p-1 bg-primary text-white rounded-full "
    >
      <MdOutlineNightlightRound size={24} />
    </button>
  );
};

export default ToggleDarkLight;
