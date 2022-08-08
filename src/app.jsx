import { useEffect } from "react";
import {
  TopbarMenuItem,
  backgroundBridge,
  contentBridge,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "@nbundle/react";
import { AiOutlineFontSize, AiOutlineFormatPainter } from "react-icons/ai";

// This app uses nbundle built-in state management APIs (which inherits from https://recoiljs.org)
// Apps are free to use any state management APIs they want, but the built-in APIs are recommended, best in class dev tools, & easy to use.

const themesState = selector({
  key: "themes",
  get: () => backgroundBridge.getThemes(), // Get themes from background
});

const themeOptionsState = selector({
  key: "themeOptions",
  get: ({ get }) => ["Default", ...Object.keys(get(themesState))], // Add "Default" to theme options for no custom theme
});

const themeOptionState = atom({
  key: "themeOption",
  default: backgroundBridge
    .getSettings()
    .then(({ theme }) => (theme ? theme : "Default")), // Use saved theme or "Default"
  effects: [
    ({ onSet }) => {
      onSet((theme) => backgroundBridge.setSettings({ theme })); // Save settings
    },
  ],
});

const themeStyleState = selector({
  key: "themeStyle",
  get: async ({ get }) => {
    // Compile theme into DOM stylesheet
    const themes = get(themesState);
    const themeOption = get(themeOptionState);
    if (!themeOption || themeOption === "Default") return;
    const theme = themes[themeOption];
    if (!theme) return;
    const css = await backgroundBridge.getCss(theme);
    const style = document.createElement("style");
    style.innerHTML = css;
    return style;
  },
});

const fontOptionsState = selector({
  key: "fontOptions",
  get: async () => {
    // Get fonts from background, plus "Default" (no custom font)
    const fonts = await backgroundBridge.getFonts();
    return ["Default", ...fonts];
  },
});

const fontOptionState = atom({
  key: "fontOption",
  default: backgroundBridge
    .getSettings()
    .then(({ font }) => (font ? font : "Default")), // Use saved font or "Default"
  effects: [
    ({ onSet }) => {
      onSet((font) => backgroundBridge.setSettings({ font })); // Save settings
    },
  ],
});

export default function App() {
  const themeOptions = useRecoilValue(themeOptionsState);
  const [themeOption, setThemeOption] = useRecoilState(themeOptionState);

  const themeStyle = useRecoilValue(themeStyleState);
  useEffect(() => {
    if (!themeStyle) return; // No custom theme, reset theme CSS
    // Re-apply theme style whenever it changes
    if (!themeStyle.isConnected) document.head.append(themeStyle);
    return () => themeStyle.remove();
  }, [themeStyle]);

  const fontOptions = useRecoilValue(fontOptionsState);
  const [fontOption, setFontOption] = useRecoilState(fontOptionState);
  useEffect(() => {
    if (
      // Custom fonts are not supported on Firefox because content security policy for content scripts are not supported
      process.env.NODE_PLATFORM === "firefox" ||
      // No custom font
      !fontOption ||
      fontOption === "Default"
    ) {
      // Reset font CSS
      contentBridge.removeFontStyle();
      return;
    }
    // Apply CSS by using Google Fonts & content bridge APIs (see content.js) to comply with content security policy
    const fontUrl = fontOption.replace(/\s/g, "+");
    contentBridge.applyFontStyle(`
      @import url('https://fonts.googleapis.com/css2?family=${fontUrl}:wght@300;400;500;700&display=swap');
      #notion-app * {
        font-family: '${fontOption}', ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important;
      }
    `);
  }, [fontOption]);
  useEffect(() => {
    // Reset font CSS when app is closed/unmounted
    return () => contentBridge.removeFontStyle();
  }, []);

  return (
    <>
      {/* Quickly change themes */}
      <TopbarMenuItem
        type="select"
        text="Set custom theme"
        icon={AiOutlineFormatPainter}
        optionsTitle="Set theme"
        options={themeOptions}
        value={themeOption}
        onClickOption={setThemeOption}
      />
      {/* Quickly change fonts, won't be available on Firefox */}
      {process.env.NODE_PLATFORM !== "firefox" && (
        <TopbarMenuItem
          type="select"
          text="Set custom font"
          icon={AiOutlineFontSize}
          optionsTitle="Set font"
          options={fontOptions}
          value={fontOption}
          onClickOption={setFontOption}
        />
      )}
    </>
  );
}
