import { useCallback, useEffect, useState } from "react";
import { TopbarMenuItem, backgroundBridge } from "@nbundle/react";
import { AiOutlineFontSize, AiOutlineFormatPainter } from "react-icons/ai";

export default function App() {
  // Get & set themes from background on startup
  const [themes, setThemes] = useState([]);
  const [theme, setTheme] = useState();
  useEffect(() => {
    backgroundBridge.getThemes().then(setThemes);
    backgroundBridge.getTheme().then(setTheme);
  }, [setThemes, setTheme]);

  // Render style into DOM
  const [style, setStyle] = useState();
  useEffect(() => {
    if (!style) return;
    if (!style.isConnected) document.head.append(style);
    return () => style.remove();
  }, [style]);

  //  Compile theme into style
  useEffect(() => {
    if (!theme) return;
    if (!theme.css) {
      backgroundBridge.getCss(theme).then((css) => {
        const themeWithCss = { ...theme, css };
        setThemes((themes) =>
          themes.map((t) => (t === theme ? themeWithCss : t))
        );
        setTheme(themeWithCss);
      });
      return;
    }
    const style = document.createElement("style");
    style.append(document.createTextNode(theme.css));
    setStyle(style);
    backgroundBridge.setTheme(theme);
  }, [theme, setThemes, setTheme, setStyle]);

  const handleClickTheme = useCallback(
    (name) => setTheme(themes.find((t) => t.name === name)),
    [themes, setTheme]
  );
  return (
    <>
      <TopbarMenuItem
        type="select"
        text="Set custom theme"
        icon={AiOutlineFormatPainter}
        optionsTitle="Set theme"
        options={themes.map((t) => t.name)}
        value={theme ? theme.name : ""}
        onClickOption={handleClickTheme}
      />
      <TopbarMenuItem
        type="select"
        text="Set custom font"
        icon={AiOutlineFontSize}
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
        value="Notion Default"
      />
    </>
  );
}
