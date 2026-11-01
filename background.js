const playerTargets = new Map();

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: "#2563eb" });
  chrome.action.setBadgeText({ text: "" });
});

chrome.tabs.onRemoved.addListener(tabId => playerTargets.delete(tabId));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "playerFrame") {
    const tabId = sender.tab?.id;
    if (typeof tabId === "number") {
      playerTargets.set(tabId, sanitizePlayer(message.url));
    }
    return;
  }

  if (message?.type === "getPlayer") {
    const target = playerTargets.get(message.tabId) || null;
    sendResponse({ target });
    return;
  }

  if (message?.type === "openDownload") {
    const target = playerTargets.get(message.tabId);
    if (!target?.downloadUrl) {
      sendResponse({ ok: false, error: "No supported player was detected." });
      return;
    }
    chrome.tabs.create({ url: target.downloadUrl, active: true }, created => {
      if (created?.id && message.tabId) {
        playerTargets.set(`downloader:${created.id}`, { sourceTabId: message.tabId });
      }
    });
    sendResponse({ ok: true });
    return;
  }
});

function sanitizePlayer(url) {
  try {
    const parsed = new URL(url);
    if (!/(^|\.)flixcloud\.cc$/.test(parsed.hostname)) return null;
    const segments = parsed.pathname.split("/").filter(Boolean);
    const accessId = segments[0] === "e" ? segments[1] : segments[0];
    if (!accessId) return null;
    return {
      playerUrl: parsed.toString(),
      downloadUrl: `https://flixcloud.cc/d/${encodeURIComponent(accessId)}`
    };
  } catch {
    return null;
  }
}
