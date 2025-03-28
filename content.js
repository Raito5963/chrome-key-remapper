// Qwerty → Dvorak マッピング
const qwertyToDvorakMap = {
  'q': "'", 'w': ',', 'e': '.', 'r': 'p', 't': 'y',
  'y': 'f', 'u': 'g', 'i': 'c', 'o': 'r', 'p': 'l',
  'a': 'a', 's': 'o', 'd': 'e', 'f': 'u', 'g': 'i',
  'h': 'd', 'j': 'h', 'k': 't', 'l': 'n', ';': 's',
  'z': ';', 'x': 'q', 'c': 'j', 'v': 'k', 'b': 'x',
  'n': 'b', 'm': 'm', ',': 'w', '.': 'v', '/': 'z'
};

// Qwerty → Dvorakへの変換処理
function remapKey(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return; // 修飾キーが押された場合は無視

  const originalKey = event.key;
  const lowerKey = originalKey.toLowerCase();
  if (qwertyToDvorakMap[lowerKey]) {
    // 元のイベントをキャンセル
    event.preventDefault();

    const newKey = qwertyToDvorakMap[lowerKey];

    // 変換後のキーを挿入
    const input = document.activeElement;
    if (input && (input.tagName === "INPUT" || input.tagName === "TEXTAREA" || input.isContentEditable)) {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      // 文字を挿入し、カーソル位置を更新
      input.value = input.value.slice(0, start) + newKey + input.value.slice(end);
      input.setSelectionRange(start + 1, start + 1);
    }
  }
}

// イベントを監視
document.addEventListener('keydown', remapKey, true);
