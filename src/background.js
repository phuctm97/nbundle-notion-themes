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
  const value = await new Promise((resolve, reject) =>
    chrome.storage.local.get(["name", "img", "style", "path", "css"], (value) =>
      chrome.runtime.lastError
        ? reject(chrome.runtime.lastError)
        : resolve(value)
    )
  );
  if (!value.name || !value.style || !value.path) return;
  return value;
}

export function setTheme(theme) {
  chrome.storage.local.set(theme);
}
