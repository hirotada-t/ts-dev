import * as SF from "./sizeFunctions.js";

// URLからCLICK_ID/KWDを取得
const [clidObj, kwdObj] = SF.createObjFromUrl();

// 各オブジェクトをLocalStrageに保存
SF.setStrage(clidObj, "suid");
SF.setStrage(kwdObj, "kwd");

// 各オブジェクトをURLパラメーターの文字列に変換
const urlStr = SF.toStringUrlParamsByStrage();

// URLにCLICK ID/KWDを追加してリプレイス
if (urlStr) {
  window.history.replaceState(
    null,
    null,
    `${window.location.pathname}?${urlStr}`
  );
}

SF.setBottomBtnClick();

// 時間差で実行（DOMが展開されるのを待つ）
setTimeout(() => {
  // href属性がないaタグをコンソールに出力（エラーチェック）
  SF.checkNoneHref();
  // threeateリンクにCLICK IDを追加
  SF.addClickIdToThreeateLink();
  // 下層ページのリンクにCLICK IDを追加
  SF.addClickIdToElements('a[href*="router.php"]');
  // フォームの遷移先にCLICK IDを追加
  SF.addClickIdToElements('form[action*="router.php"]');

  // threeateリンクのポジションをリファラに追加するイベントを設置
  const adsLinkList = document.querySelectorAll(`a[href*="${SF.ADS_HOST_NAME}"]`);
  adsLinkList.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const beforeUrl = window.location.href;
      const href = link.href;
      // URLにPOSITION_INDEXを追加した後にthreeateリンクを新しいタブで開く
      SF.addPositionIndex(index + 1);
      SF.addKeyFromBottomBtn();
      window.open(href, "_blank");
      // URLを元に戻す（=POSITION_INDEXを消去するため）
      window.history.replaceState(null, null, beforeUrl);
    });
  });
}, 500);

SF.addPositionBySearch();
