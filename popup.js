const box = document.getElementById("streams");
const statusBox = document.getElementById("status");

init();

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.runtime.sendMessage({ type: "getPlayer", tabId: tab.id });
  render(response?.target);
}

function render(target) {
  if (!target?.downloadUrl) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Play the episode, then reopen this popup.";
    box.replaceChildren(empty);
    return;
  }

  const card = document.createElement("section");
  card.className = "item";
  const title = document.createElement("div");
  title.className = "kind";
  title.textContent = "FlixCloud direct file";
  const url = document.createElement("div");
  url.className = "url";
  url.textContent = target.playerUrl;
  const row = document.createElement("div");
  row.className = "row";
  const download = document.createElement("button");
  download.textContent = "Download";
  download.onclick = save;
  const copy = document.createElement("button");
  copy.className = "ghost";
  copy.textContent = "Copy player link";
  copy.onclick = async () => {
    await navigator.clipboard.writeText(target.playerUrl);
    statusBox.textContent = "Player link copied.";
  };
  row.append(download, copy);
  card.append(title, url, row);
  box.replaceChildren(card);
}

async function save() {
  statusBox.textContent = "Opening secure download...";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.runtime.sendMessage({ type: "openDownload", tabId: tab.id });
  statusBox.textContent = response.ok ? "Download started." : response.error;
}
