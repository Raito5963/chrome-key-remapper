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

// 既に変換済みのキーを保持するセット
const processedKeys = new Set();
let isProcessing = false;

// キーイベントを処理する関数
export function handleKeyEvent(engineID, keyData) {
  // IMEのコンテキストIDが有効か確認
  if (!engineID) {
    console.error("Invalid engineID");
    return false;
  }

  const key = keyData.key.toLowerCase();
  console.log(`キー入力を検出: ${key}`);  // ログを追加

  // 入力されたキーが既に処理されているか確認（無限ループ防止）
  if (processedKeys.has(key)) {
    console.log(`キー ${key} は既に処理されています。無限ループ防止のため処理をスキップします。`);
    return false; // 無限ループ防止
  }

  // `keydown` のみ処理
  if (keyData.type === "keydown" && keyMapping[key]) {
    // 処理中フラグを立てる
    if (isProcessing) {
      console.log("処理中のキーが重複しました。スキップします。");
      return false; // 重複を防ぐ
    }
    
    isProcessing = true;  // 処理中フラグを設定
    
    // 変換テキストをコミット
    console.log(`キー ${key} に対応する変換テキスト: ${keyMapping[key]}`);  // ログを追加
    chrome.input.ime.commitText({
      contextID: engineID,
      text: keyMapping[key],
    });

    // 変換済みキーをセットに追加
    processedKeys.add(key);

    // 処理が完了したらフラグをリセット
    isProcessing = false;

    return true; // イベントを消費
  }

  // マッピングに該当しない場合は、通常の処理を続行
  return false;
}
