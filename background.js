// IME の有効化/無効化イベント
chrome.input.ime.onActivate.addListener(function(engineID) {
    console.log("IME activated: " + engineID);
  });
  
  chrome.input.ime.onDeactivated.addListener(function(engineID) {
    console.log("IME deactivated: " + engineID);
  });
  
  // Qwerty から Dvorak への変換テーブル（基本的なキー変換例）
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
  
  // キーイベントのリスナー
  chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
    // keydown または keypress イベントのみ処理する
    if (keyData.type === "keydown" || keyData.type === "keypress") {
      if (qwertyToDvorak[keyData.code]) {
        // 変換後の文字を取得
        const newChar = qwertyToDvorak[keyData.code];
  
        // 変換結果を入力として送信する
        chrome.input.ime.commitText({
          engineID: engineID,
          text: newChar
        });
        
        // 既に処理済みなので true を返す
        return true;
      }
    }
    return false; // 未処理の場合は false を返す
  });
  