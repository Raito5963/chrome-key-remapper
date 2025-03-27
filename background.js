chrome.commands.onCommand.addListener((command) => {
    if (command === "custom_action") {
      console.log("カスタムアクションが実行されました！");
      alert("カスタムショートカットが押されました！");
    }
  });
  