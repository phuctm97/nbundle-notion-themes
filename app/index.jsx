import { TopbarMenuItem } from "@nbundle/react";
import { AiOutlineFontSize, AiOutlineFormatPainter } from "react-icons/ai";

export default function App() {
  return (
    <>
      <TopbarMenuItem
        type="select"
        text="Set custom theme"
        icon={AiOutlineFormatPainter}
        value="Notion Default"
        optionsTitle="Set theme"
        options={[
          "Notion Default",
          "Laser Wave",
          "Material Ocean",
          "Dracula",
          "Deep Dark",
          "Github Light",
          "Github Dark",
          "Kawaii",
          "Yotsuba",
          "Base 16 Eighties",
          "Library",
        ]}
      />
      <TopbarMenuItem
        type="select"
        text="Set custom font"
        icon={AiOutlineFontSize}
        value="Notion Default"
        optionsTitle="Set font"
        options={[
          "Notion Default",
          "Arimo",
          "Barlow",
          "Dosis",
          "Fira Sans",
          "Heebo",
          "IBM Plex Sans",
          "Inter",
          "Josefin Sans",
          "Karla",
          "Libre Franklin",
          "Lora",
          "Merriweather",
          "Montserrat",
          "Mukta",
          "Mulish",
          "Nanum Gothic",
          "Noto Sans",
          "Noto Serif",
          "Nunito",
          "Nunito Sans",
          "Open Sans",
          "Oswald",
          "Oxygen",
          "Poppins",
          "PT Sans",
          "Playfair Display",
          "Raleway",
          "PT Serif",
          "Roboto",
          "Roboto Condensed",
          "Roboto Mono",
          "Roboto Slab",
          "Rubik",
          "Source Code Pro",
          "Source Sans Pro",
          "Titillium Web",
          "Ubuntu",
          "Work Sans",
          "Yanone Kaffeesatz",
          "Lato",
          "Abel",
          "Exo 2",
        ]}
      />
    </>
  );
}
