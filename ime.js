const keyMapping = {
  "q": "q", "w": "l", "e": "u", "r": "f", "t": "-",
  "y": "k", "u": "w", "i": "r", "o": "y", "p": "p",

  "a": "e", "s": "i", "d": "a", "f": "o", "g": ",",
  "h": "g", "j": "t", "k": "n", "l": "s", ";": "h",
  
  "z": "z", "x": "x", "c": "c", "v": "v",
  "b": "Enter", "n": " ", "m": "d",
  ",": "m", ".": "j", "/": "b",
  " ": "Backspace"
};

const processedKeys = new Set(); // 変換済みキーを追跡

chrome.runtime.onInstalled.addListener(() => {
  console.log("Key Remapper IME installed");
});

chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  const key = keyData.key.toLowerCase();
  if (processedKeys.has(key)) return false; // 無限ループ防止

  if (keyMapping[key]) {
    console.log(`Input: ${key}, Output: ${keyMapping[key]}`);
    chrome.input.ime.commitText({
      contextID: engineID,
      text: keyMapping[key]
    });
    processedKeys.add(key); // 変換済みキーとして追加
    return true;
  }

  return false; // 通常入力
});
