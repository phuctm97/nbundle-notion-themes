export async function getThemes() {
  const res = await fetch("https://notionthemes.netlify.app/themes.json");
  const json = await res.json();
  return Object.entries(json).map(([name, theme]) => ({ ...theme, name }));
}

export async function getCss(theme) {
  const globalCss = await fetch(
    `https://notionthemes.netlify.app/${theme.style}/global.css`
  ).then((res) => {
    if (res.ok) return res.text();
    throw new Error(`Couldn't download global CSS: HTTP ${res.status}.`);
  });
  const themeCss = await fetch(
    `https://notionthemes.netlify.app/${theme.path}`
  ).then((res) => {
    if (res.ok) return res.text();
    throw new Error(`Couldn't download theme CSS: HTTP ${res.status}.`);
  });
  return [globalCss, themeCss].join("\n");
}

export async function getTheme() {
  const value = await chrome.storage.local.get([
    "name",
    "img",
    "style",
    "path",
    "css",
  ]);
  if (!value.name || !value.style || !value.path) return;
  return value;
}

export async function setTheme(theme) {
  await chrome.storage.local.set(theme);
}
