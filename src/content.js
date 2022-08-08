// To comply with the content security policy, we'll need to add/remove font <style> in content scripts (because it uses Google APIs to load fonts)
// Export functions will be available in app.jsx via contentBridge

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
