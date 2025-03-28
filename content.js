// QwertyからDvorakへのキー変換マッピング（基本的な例）
const qwertyToDvorakMap = {
  'q': '\'',
  'w': ',',
  'e': '.',
  'r': 'p',
  't': 'y',
  'y': 'f',
  'u': 'g',
  'i': 'c',
  'o': 'r',
  'p': 'l',
  'a': 'a',
  's': 'o',
  'd': 'e',
  'f': 'u',
  'g': 'i',
  'h': 'd',
  'j': 'h',
  'k': 't',
  'l': 'n',
  ';': 's',
  'z': ';',
  'x': 'q',
  'c': 'j',
  'v': 'k',
  'b': 'x',
  'n': 'b',
  'm': 'm',
  ',': 'w',
  '.': 'v',
  '/': 'z'
};

// キーイベントをリッスンして変換処理を実装
chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
  // keyData.typeは "keydown" や "keyup" が入ります。ここではkeydownのみ処理します。
  if (keyData.type === "keydown") {
    // キーが変換マッピングに存在するかチェック
    const lowerKey = keyData.key.toLowerCase();
    if (qwertyToDvorakMap.hasOwnProperty(lowerKey)) {
      const convertedKey = qwertyToDvorakMap[lowerKey];
      
      // テキストのコミットで変換後の文字を入力します
      chrome.input.ime.commitText({
        contextID: keyData.contextID,
        text: convertedKey
      });

      // イベント処理済みとするため true を返す
      return true;
    }
  }
  // 他のキーやkeyupイベントはChrome側に任せる（falseを返す）
  return false;
});
