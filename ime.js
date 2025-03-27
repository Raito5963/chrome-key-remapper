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

// commitText 呼び出し後、一定時間イベント処理を無視するフラグ
let isProcessing = false;

/**
 * キーイベントを処理する関数
 *
 * - keydown 時、マッピングに該当する場合は commitText を呼び出し、
 *   commitText 呼び出し後に isProcessing フラグを立てて一定時間処理を無視する。
 * - keyup 時、processedKeys からキーを削除して次回の入力を許可する。
 *
 * @param {string} engineID - IME のコンテキストID
 * @param {object} keyData - キーイベントオブジェクト
 * @returns {boolean} - 変換処理が実行された場合 true、それ以外は false
 */
export function handleKeyEvent(engineID, keyData) {
  if (!engineID) {
    console.error("Invalid engineID");
    return false;
  }

  // キーアップの場合は、処理済みフラグとセットからキーを削除して終了
  if (keyData.type === "keyup") {
    const upKey = keyData.key.toLowerCase();
    if (processedKeys.has(upKey)) {
      processedKeys.delete(upKey);
      console.log(`キー "${upKey}" が離され、processedKeys から削除されました。`);
    }
    return false;
  }

  // keydown イベントの場合
  if (keyData.type === "keydown") {
    const key = keyData.key.toLowerCase();
    console.log(`keydown イベント検出: "${key}"`);

    // 既に処理済みまたは処理中の場合はスキップ
    if (processedKeys.has(key) || isProcessing) {
      console.log(`キー "${key}" は既に処理済みまたは処理中のためスキップします。`);
      return false;
    }

    if (keyMapping[key]) {
      console.log(`キー "${key}" に対応する変換テキスト: "${keyMapping[key]}" をコミットします。`);

      // 処理中フラグを立てる
      isProcessing = true;
      chrome.input.ime.commitText({
        contextID: engineID,
        text: keyMapping[key],
      });
      // commitText 呼び出し後、キーを処理済みとして登録
      processedKeys.add(key);

      // 一定時間後（50ms）に処理中フラグを解除（必要に応じて調整）
      setTimeout(() => {
        isProcessing = false;
        console.log(`isProcessing フラグが解除されました。`);
      }, 50);

      return true; // イベントを消費
    }
  }

  return false;
}
