import { useCallback } from "react";
import { TopbarMenuItem } from "@nbundle/react";
import { AiOutlineFormatPainter } from "react-icons/ai";

export default function App() {
  const setCustomTheme = useCallback(() => {
    console.log("Select custom theme");
  }, []);
  return (
    <>
      <TopbarMenuItem
        type="button"
        text="Set custom theme"
        icon={AiOutlineFormatPainter}
        onClick={setCustomTheme}
      />
    </>
  );
}
