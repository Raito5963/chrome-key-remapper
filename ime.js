// キー入力から変換するマッピング（1st～3rd floorとスペースキーの定義）
const keyMapping = {
    // 1st floor
    "q": "q", "w": "l", "e": "u", "r": "f", "t": "-",   
    "y": "k", "u": "w", "i": "r", "o": "y", "p": "p",
    // 2nd floor
    "a": "e", "s": "i", "d": "a", "f": "o", "g": ",",   
    "h": "g", "j": "t", "k": "n", "l": "s", ";": "h",
    // 3rd floor
    "z": "z", "x": "x", "c": "c", "v": "v", 
    "b": "Enter", "n": "Space", "m": "d",
    ",": "m", ".": "j", "/": "b",
    // Space key: 実際のスペースは " " として扱うことが多いです
    " ": "Backspace",
  };
  
  // キーイベントを処理する関数
  export function handleKeyEvent(engineID, keyData) {
    // IMEのコンテキストIDが有効か確認
    if (!engineID) {
      console.error("Invalid engineID");
      return false;
    }
  
    // 入力されたキーを小文字に変換して、マッピングを確認する
    const key = keyData.key.toLowerCase();
  
    // keyData.type が "keydown" で、かつマッピングが存在する場合、変換テキストをコミット
    if (keyData.type === "keydown" && keyMapping[key]) {
      chrome.input.ime.commitText({
        contextID: engineID,
        text: keyMapping[key],
      });
      return true; // イベントを消費
    }
  
    // マッピングに該当しない場合は、通常の処理を継続
    return false;
  }
  