// To comply with the Notion's content security policy, the app needs to add/remove font <style> in content scripts (because it uses Google APIs to load fonts)
// Exported functions will be available in app.jsx via content bridge APIs

const fontStyle = document.createElement("style");

// Apply font CSS
export function applyFontStyle(css) {
  fontStyle.innerHTML = css;
  if (!fontStyle.isConnected) document.head.append(fontStyle);
}

// Remove font CSS
export function removeFontStyle() {
  if (fontStyle.isConnected) fontStyle.remove();
}
