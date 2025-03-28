// QWERTY → Dvorak対応
const qwertyToDvorak = {
  'a': 'a', 'b': 'x', 'c': 'j', 'd': 'e', 'e': '.', 'f': 'u',
  'g': 'i', 'h': 'd', 'i': 'c', 'j': 'h', 'k': 't', 'l': 'n',
  'm': 'm', 'n': 'b', 'o': 'r', 'p': 'l', 'q': "'", 'r': 'p',
  's': 'o', 't': 'y', 'u': 'g', 'v': 'k', 'w': ',', 'x': 'q',
  'y': 'f', 'z': ';', ';': 's', '.': 'v', ',': 'w', '/': 'z'
};

// ローマ字 → かな変換対応
const romajiToKana = {
  'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
  'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
  'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
  'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
  'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
  'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
  'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
  'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
  'wa': 'わ', 'wo': 'を', 'n': 'ん',
  // 拗音対応
  'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
  'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
  'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
  'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
  'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
  'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
  'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ'
};

// IMEモード管理
let isDvorakEnabled = true;  // Dvorak変換ON/OFF
let isRomajiMode = false;    // ローマ字入力モード

// IME切り替え
function toggleIME() {
  isDvorakEnabled = !isDvorakEnabled;
  console.log(`Dvorak変換: ${isDvorakEnabled ? 'ON' : 'OFF'}`);
}

// ローマ字入力モード切り替え
function toggleRomajiMode() {
  isRomajiMode = !isRomajiMode;
  console.log(`ローマ字入力: ${isRomajiMode ? 'ON' : 'OFF'}`);
}

// Dvorak変換
function convertToDvorak(char) {
  return qwertyToDvorak[char] || char;
}

// ローマ字をかなに変換
function convertToKana(input) {
  // 3文字・2文字・1文字の順で最大マッチ
  for (let len = 3; len > 0; len--) {
    const segment = input.slice(-len);
    if (romajiToKana[segment]) {
      return [input.slice(0, -len), romajiToKana[segment]];
    }
  }
  return [input, ''];
}

// ローマ字入力バッファ
let romajiBuffer = '';

// 入力イベントハンドラ
document.addEventListener('keydown', (e) => {
  // 修飾キーは無視
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  // IMEモード切り替え（変換・無変換・英数・かなキー）
  if (['Lang1', 'Lang2', 'Convert', 'NonConvert'].includes(e.code)) {
    if (e.code === 'Lang1' || e.code === 'Convert') toggleRomajiMode();
    if (e.code === 'Lang2' || e.code === 'NonConvert') toggleIME();
    return;
  }

  // DvorakモードがOFFなら何もしない
  if (!isDvorakEnabled) return;

  const char = e.key.toLowerCase();
  if (qwertyToDvorak[char]) {
    e.preventDefault();

    // Dvorak変換
    const dvorakChar = convertToDvorak(char);

    if (isRomajiMode) {
      // ローマ字入力の場合、バッファに追加して変換
      romajiBuffer += dvorakChar;
      const [remaining, kana] = convertToKana(romajiBuffer);

      // 変換成功ならバッファ更新
      if (kana) {
        romajiBuffer = remaining;
        document.execCommand('insertText', false, kana);
      }
    } else {
      // 英数モードはそのまま出力
      document.execCommand('insertText', false, dvorakChar);
    }
  }
});
