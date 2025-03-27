let pressedKeys = new Set();

const keyMapF = {
    "q": "Q",
    "w": "L",
    "e": "U",
    "r": "F",
    "t": "-",
    "y": "K",
    "u": "W",
    "i": "R",
    "o": "Y",
    "p": "P",
    "a": "E",
    "s": "I",
    "d": "A",
    "g": ",",
    "h": "G",
    "j": "T",
    "k": "N",
    "l": "S",
    ";": "H",
    "z": "Z",
    "x": "X",
    "c": "C",
    "v": "V",
    "b": "Enter",
    "n": "Space",
    "m": "D",
    ",": "M",
    ".": "J",
    "/": "B"
};

const keyMapJ = {
    "q": "Q",
    "w": "L",
    "e": "U",
    "r": "F",
    "t": "-",
    "y": "K",
    "u": "W",
    "i": "R",
    "o": "Y",
    "p": "P",
    "a": "E",
    "s": "I",
    "d": "A",
    "g": ",",
    "h": "G",
    "f": "O",
    "k": "N",
    "l": "S",
    ";": "H",
    "z": "Z",
    "x": "X",
    "c": "C",
    "v": "V",
    "b": "Enter",
    "n": "Space",
    "m": "D",
    ",": "M",
    ".": "J",
    "/": "B"
};

const keyMapB = {
    "q": "~",
    "w": "1",
    "e": "2",
    "r": "3",
    "t": "-",
    "y": "^",
    "u": "<",
    "i": "=",
    "o": ">",
    "p": "%",
    "a": "0",
    "s": "4",
    "d": "5",
    "f": "6",
    "g": ".",
    "h": "_",
    "j": "+",
    "k": "*",
    "l": "/",
    ";": "¥",
    "z": "&",
    "x": "7",
    "c": "8",
    "v": "9",
    "n": "Space",
    "m": "!",
    ",": "?",
    ".": ":",
    "/": ";"
};

const keyMapN = {
    "q": "@",
    "w": "[",
    "e": '"',
    "r": "]",
    "t": "&",
    "a": "#",
    "s": "(",
    "d": "`",
    "f": ")",
    "g": "|",
    "z": "`",
    "x": "{",
    "c": "`",
    "v": "}"
};

// 現在使用するキー・マップ
let currentKeyMap = keyMapF; // 初期状態は keyMapF

/**
 * 現在のキー・マップから変換文字をコミットする。
 * @param {string} engineID - IME のコンテキストID
 * @param {string} key - 入力されたキー
 * @returns {boolean} - 対応する文字があれば true、なければ false
 */
function commitTextIfNeeded(engineID, key) {
    if (currentKeyMap[key]) {
        chrome.input.ime.commitText({
            contextID: engineID,
            text: currentKeyMap[key]
        });
        return true;
    }
    return false;
}

/**
 * 指定のトリガーキーが押されている場合に対応するキー・マップを使い、
 * 他のキーから変換文字をコミットする。
 * @param {string} engineID - IME のコンテキストID
 * @param {string} triggerKey - トリガーとなるキー（例: "f", "j", "b", "n"）
 * @param {object} mapping - 対応するキー・マップ
 * @returns {boolean} - 変換が実行された場合 true、そうでなければ false
 */
function processTrigger(engineID, triggerKey, mapping) {
    if (pressedKeys.has(triggerKey)) {
        currentKeyMap = mapping; // トリガーキーに対応するマップを選択
        // トリガーキー以外のキーで変換を試みる
        for (let key of pressedKeys) {
            if (key !== triggerKey && commitTextIfNeeded(engineID, key)) {
                return true;
            }
        }
    }
    return false;
}

chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
    console.log("キー入力を検出", keyData);

    if (keyData.type === "keydown") {
        pressedKeys.add(keyData.key); // キーが押されたときにセットに追加
    } else if (keyData.type === "keyup") {
        pressedKeys.delete(keyData.key); // キーが離されたときにセットから削除
    }

    // 各トリガーキーに対して変換処理を実行する
    if (processTrigger(engineID, "f", keyMapF)) return true;
    if (processTrigger(engineID, "j", keyMapJ)) return true;
    if (processTrigger(engineID, "b", keyMapB)) return true;
    if (processTrigger(engineID, "n", keyMapN)) return true;

    return false; // 何も変換しなかった場合は通常の処理を続行
});
