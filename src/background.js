// Fetch data from APIs, save & load user settings to secure storage
// Exported functions will be available in app.jsx via background bridge APIs

// Get all available themes
export async function getThemes() {
  const res = await fetch("https://notionthemes.netlify.app/themes.json");
  if (!res.ok) throw new Error(`Couldn't download themes: HTTP ${res.status}.`);
  const themes = await res.json();
  return themes;
}

// Get all available fonts
export async function getFonts() {
  const res = await fetch("https://notionthemes.netlify.app/fonts.json");
  if (!res.ok) throw new Error(`Couldn't download fonts: HTTP ${res.status}.`);
  const { fonts } = await res.json();
  return fonts;
}

// Get CSS for a given theme
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

export const settingsKeys = ["theme", "font"];

// Get user settings
export function getSettings() {
  return new Promise((resolve, reject) =>
    chrome.storage.local.get(settingsKeys, (settings) =>
      chrome.runtime.lastError
        ? reject(chrome.runtime.lastError)
        : resolve(settings)
    )
  );
}

// Save user settings
export function setSettings(settings) {
  return new Promise((resolve, reject) =>
    chrome.storage.local.set(
      Object.fromEntries(
        Object.entries(settings).filter(([key]) => settingsKeys.includes(key))
      ),
      () =>
        chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve()
    )
  );
}
