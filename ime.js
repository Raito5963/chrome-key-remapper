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

// 既に変換済みのキーを保持するセット（無限ループ防止用）
const processedKeys = new Set();

/**
 * キーイベントを処理する関数
 * 
 * - keydown で、マッピングに該当する場合は commitText を呼び出し、そのキーを processedKeys に追加。
 * - keyup で、そのキーを processedKeys から削除して、次回の入力を許可する。
 * - デバッグ用に各処理段階でログ出力を行う。
 * 
 * @param {string} engineID - IME のコンテキストID
 * @param {object} keyData - キーイベントオブジェクト
 * @returns {boolean} - キーが変換された場合は true、それ以外は false
 */
export function handleKeyEvent(engineID, keyData) {
  // IMEのコンテキストIDが有効か確認
  if (!engineID) {
    console.error("Invalid engineID");
    return false;
  }

  // 入力されたキーを小文字に変換
  const key = keyData.key.toLowerCase();

  // keyup イベントの場合、処理済みセットから削除して通常処理を続行
  if (keyData.type === "keyup") {
    if (processedKeys.has(key)) {
      processedKeys.delete(key);
      console.log(`キー "${key}" が離され、processedKeys から削除されました。`);
    }
    return false;
  }

  // keydown イベントの場合
  if (keyData.type === "keydown") {
    console.log(`keydown イベント検出: "${key}"`);

    // 既に処理済みのキーなら無視（無限ループ防止）
    if (processedKeys.has(key)) {
      console.log(`キー "${key}" は既に処理済みのためスキップします。`);
      return false;
    }

    // マッピングが存在する場合、変換テキストをコミット
    if (keyMapping[key]) {
      console.log(`キー "${key}" に対応する変換テキスト: "${keyMapping[key]}" をコミットします。`);
      chrome.input.ime.commitText({
        contextID: engineID,
        text: keyMapping[key],
      });
      // 変換済みとしてフラグを設定
      processedKeys.add(key);
      return true; // イベントを消費
    }
  }

  // 該当しない場合は通常処理を継続
  return false;
}
