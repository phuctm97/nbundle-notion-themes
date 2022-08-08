const fontStyle = document.createElement("style");

export function applyFontStyle(css) {
  fontStyle.innerHTML = css;
  if (!fontStyle.isConnected) document.head.append(fontStyle);
}

export function removeFontStyle() {
  if (fontStyle.isConnected) fontStyle.remove();
}
