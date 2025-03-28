let isDvorakEnabled = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isDvorakEnabled: false });
});

// IMEモード切替
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-ime") {
    isDvorakEnabled = !isDvorakEnabled;
    chrome.storage.local.set({ isDvorakEnabled });
    console.log(`Dvorak IME: ${isDvorakEnabled ? 'ON' : 'OFF'}`);
  }
});
