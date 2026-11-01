let lastPlayerUrl = "";

report();
const observer = new MutationObserver(() => {
  const frame = document.querySelector("iframe#video-player");
  const src = frame?.getAttribute("src") || "";
  if (src && src !== lastPlayerUrl) {
    lastPlayerUrl = src;
    report();
  }
});

observer.observe(document.documentElement, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["src"]
});

function report() {
  const src = document.querySelector("iframe#video-player")?.getAttribute("src") || "";
  if (src) chrome.runtime.sendMessage({ type: "playerFrame", url: src }).catch(() => {});
}
