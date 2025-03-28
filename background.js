// Qwerty から Dvorak への変換マップ
const qwertyToDvorak = {
  "q": "'",
  "w": ",",
  "e": ".",
  "r": "p",
  "t": "y",
  "y": "f",
  "u": "g",
  "i": "c",
  "o": "r",
  "p": "l",
  "a": "a",
  "s": "o",
  "d": "e",
  "f": "u",
  "g": "i",
  "h": "d",
  "j": "h",
  "k": "t",
  "l": "n",
  ";": "s",
  "z": ";",
  "x": "q",
  "c": "j",
  "v": "k",
  "b": "x",
  "n": "b",
  "m": "m",
  ",": "w",
  ".": "v",
  "/": "z"
};

// IME 状態
let isDvorakActive = false;

// IME の有効/無効を切り替え
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-ime") {
    isDvorakActive = !isDvorakActive;
    console.log(`IME: ${isDvorakActive ? "Dvorak" : "Qwerty"}`);
  }
});

// キーイベントを監視
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "keyPress" && isDvorakActive) {
    const dvorakKey = qwertyToDvorak[request.key] || request.key;
    sendResponse({ key: dvorakKey });
  }
});
