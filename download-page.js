let stage = 0;

look();
const observer = new MutationObserver(() => setTimeout(look, 150));
observer.observe(document.body, { childList: true, subtree: true });

function look() {
  const buttons = [...document.querySelectorAll("button")];
  if (stage < 1) {
    const prepare = buttons.find(button => /get download link/i.test(button.innerText));
    if (prepare && !prepare.disabled) {
      stage = 1;
      setTimeout(() => prepare.click(), 250);
    }
    return;
  }
  if (stage === 1) {
    const download = buttons.find(button => /download file/i.test(button.innerText));
    if (download && !download.disabled) {
      stage = 2;
      setTimeout(() => download.click(), 250);
    }
  }
}
