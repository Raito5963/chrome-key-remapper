// Qwerty → Dvorak の変換テーブル（物理キーコードを基に変換）
const qwertyToDvorak = {
  "KeyQ": "'",
  "KeyW": ",",
  "KeyE": ".",
  "KeyR": "p",
  "KeyT": "y",
  "KeyY": "f",
  "KeyU": "g",
  "KeyI": "c",
  "KeyO": "r",
  "KeyP": "l",
  "KeyA": "a",
  "KeyS": "o",
  "KeyD": "e",
  "KeyF": "u",
  "KeyG": "i",
  "KeyH": "d",
  "KeyJ": "h",
  "KeyK": "t",
  "KeyL": "n",
  "Semicolon": "s",
  "Quote": "-",
  "KeyZ": ";",
  "KeyX": "q",
  "KeyC": "j",
  "KeyV": "k",
  "KeyB": "x",
  "KeyN": "b",
  "KeyM": "m",
  "Comma": "w",
  "Period": "v",
  "Slash": "z"
};

// IME のアクティベート時の処理
chrome.input.ime.onActivate.addListener(function(engineID) {
  console.log("IME activated: " + engineID);
});

// キーイベントの処理
chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
  // キー押下（keydown）のみ処理します
  if (keyData.type === "keydown" && qwertyToDvorak[keyData.code]) {
    const newChar = qwertyToDvorak[keyData.code];
    // 変換した文字をコミット
    chrome.input.ime.commitText({
      engineID: engineID,
      text: newChar
    });
    // イベントを処理済みとする
    return true;
  }
  // 未処理の場合は false を返す
  return false;
});

// IME のディアクティベート時の処理
chrome.input.ime.onDeactivated.addListener(function(engineID) {
  console.log("IME deactivated: " + engineID);
});
