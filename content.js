// 再処理防止のためのフラグを利用
let isDispatching = false;

function sendKey(newKey) {
  // すでにディスパッチ中の場合は処理しない
  if (isDispatching) return;
  isDispatching = true;

  const event = new KeyboardEvent("keydown", {
    key: newKey,
    code: newKey,
    bubbles: true
  });
  document.dispatchEvent(event);
  isDispatching = false;
}

document.addEventListener("keydown", (event) => {
  // 1st floor
  if (event.key === "w") {
    event.preventDefault();
    sendKey("l");
  }
  if (event.key === "e") {
    event.preventDefault();
    sendKey("u");
  }
  if (event.key === "r") {
    event.preventDefault();
    sendKey("f");
  }
  if (event.key === "t") {
    event.preventDefault();
    sendKey("-");
  }
  if (event.key === "y") {
    event.preventDefault();
    sendKey("k");
  }
  if (event.key === "u") {
    event.preventDefault();
    sendKey("w");
  }
  if (event.key === "i") {
    event.preventDefault();
    sendKey("r");
  }
  if (event.key === "o") {
    event.preventDefault();
    sendKey("y");
  }

  // 2nd floor
  if (event.key === "a") {
    event.preventDefault();
    sendKey("e");
  }
  if (event.key === "s") {
    event.preventDefault();
    sendKey("i");
  }
  if (event.key === "d") {
    event.preventDefault();
    sendKey("a");
  }
  if (event.key === "f") {
    event.preventDefault();
    sendKey("o");
  }
  if (event.key === "g") {
    event.preventDefault();
    sendKey(",");
  }
  if (event.key === "h") {
    event.preventDefault();
    sendKey("g");
  }
  if (event.key === "j") {
    event.preventDefault();
    sendKey("t");
  }
  if (event.key === "k") {
    event.preventDefault();
    sendKey("n");
  }
  if (event.key === "l") {
    event.preventDefault();
    sendKey("s");
  }
  if (event.key === ";") {
    event.preventDefault();
    sendKey("h");
  }

  // 3rd floor
  if (event.key === "b") {
    event.preventDefault();
    sendKey("Enter");
  }
  if (event.key === "n") {
    event.preventDefault();
    // スペースキーは event.key が " " である場合が多いので要注意
    sendKey("Space");
  }
  if (event.key === "m") {
    event.preventDefault();
    sendKey("d");
  }
  if (event.key === ",") {
    event.preventDefault();
    sendKey("m");
  }
  if (event.key === ".") {
    event.preventDefault();
    sendKey("j");
  }
  if (event.key === "/") {
    event.preventDefault();
    sendKey("b");
  }

  // space key の処理（ここでは event.key === " " を検出する例）
  if (event.key === " ") {
    event.preventDefault();
    sendKey("Backspace");
  }
});
