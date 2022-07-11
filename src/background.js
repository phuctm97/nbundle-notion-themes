export async function getThemes() {
  const res = await fetch("https://notionthemes.netlify.app/themes.json");
  const json = await res.json();
  return json;
}

export async function getCss(theme) {
  const globalCss = await fetch(
    `https://notionthemes.netlify.app/${theme.style}/global.css`
  );
  const themeCss = await fetch(
    `https://notionthemes.netlify.app/${theme.path}`
  );
  return [globalCss, themeCss].join("\n");
}

export async function getCurrentTheme() {
  await chrome.storage.local.get(["name", "img", "style", "path", "css"]);
}

export async function setCurrentTheme(theme) {
  await chrome.storage.local.set(theme);
}
