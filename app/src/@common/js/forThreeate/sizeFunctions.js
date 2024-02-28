import { emptyObj } from "./utils.js";

const ID_LIST = ["gclid", "yclid", "wbraid", "msclkid"];
const OTHER_ID = ["keyword"];
export const ADS_HOST_NAME = "tr.threeate.jp";
const OTHER_PARAM_LIST = ["utm_source", "utm_referrer"];
const HOST_NAME_LIST = ["tr.threeate.jp", "www.af-mark.jp", "t.felmat.net"];

export const findUtmParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};

  for (const [key, value] of urlParams.entries()) {
    if (OTHER_PARAM_LIST.includes(key)) console.log(key, value);
  }
};

export const createObjFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const clidObj = {};
  const kwdObj = {};

  for (const [key, value] of urlParams.entries()) {
    if (ID_LIST.includes(key)) clidObj[key] = value;
    if (OTHER_ID.includes(key)) kwdObj[key] = value;
  }

  return [clidObj, kwdObj];
};

export const setStrage = (urlObj, strageKey) => {
  // 1. LocalStrageの値を確認
  const item = window.localStorage.getItem(strageKey);
  // LocalStrageに値が存在しないor空の値がセットされている場合
  // →新しくLocalStrageに値をセットして終了
  if (!item || emptyObj(JSON.parse(item))) {
    window.localStorage.setItem(strageKey, JSON.stringify(urlObj));
    return;
  }

  // （以下、LocalStrageに値が存在し、かつ空ではないことが確定している状態）
  // 2. URLパラメーターを確認
  // urlObjが空（=下層ページに遷移）の場合
  // →LocalStrageを更新することなく終了
  if (emptyObj(urlObj)) return;

  // 3. LocalStrageとURLの両方が存在している場合
  // →URLパラメーターをLocalStrageにセットする（LocalStrageを更新）
  window.localStorage.setItem(strageKey, JSON.stringify(urlObj));
};

export const toStringUrlParamsByStrage = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const appendParams = (obj) => {
    if (emptyObj(obj)) return;
    for (const [key, value] of Object.entries(obj)) {
      if (!urlParams.has(key)) urlParams.append(key, value);
    }
  };

  appendParams(JSON.parse(window.localStorage.getItem("suid")));
  appendParams(JSON.parse(window.localStorage.getItem("kwd")));

  return urlParams.toString();
};

export const addClickIdToThreeateLink = () => {
  const suid = JSON.parse(window.localStorage.getItem("suid"));
  if (emptyObj(suid)) return;
  const threeateLinks = document.querySelectorAll(
    `a[href*="${ADS_HOST_NAME}"]`
  );
  threeateLinks.forEach((link) => {
    link.href = `${link.href}&suid=${Object.values(suid)[0]}`;
  });
};

const getClid = () => {
  const urlParams = new URLSearchParams(window.location.search);
  for (const key of urlParams.keys()) {
    if (ID_LIST.includes(key)) return key;
  }
  return null;
};

export const addClickIdToElements = (selector) => {
  const suid = JSON.parse(window.localStorage.getItem("suid"));
  if (emptyObj(suid)) return;
  const elements = document.querySelectorAll(selector);
  const clid = getClid();
  const suidValue = Object.values(suid)[0];

  elements.forEach((element) => {
    const url = element.href || element.action;
    const separator = url.includes("?") ? "&" : "?";
    const newUrl = `${url}${separator}${clid}=${suidValue}`;

    if (element.href) element.href = newUrl;
    else if (element.action) element.action = newUrl;
  });
};

export const checkNoneHref = () => {
  const atags = document.querySelectorAll("a");
  atags.forEach((atag) => {
    if (!atag.href) {
      console.log("no href");
      console.log(atag);
    }
  });
  console.log("check done: no href atag is nothing!");
};

// URLにPOSITION INDEXを追加
export const addPositionIndex = (index) => {
  const path = window.location.pathname.split("/")[1] + "_";
  const positionIndex = path === "_" ? "top_" + index : path + index;
  window.history.replaceState(
    null,
    null,
    `${window.location.href}&positionIndex=${positionIndex}`
  );
};

const isRunPath = () => {
  const path = window.location.pathname.split("/")[1];
  const target = ["", "2", "001", "002", "003", "004", "result.php"];
  return target.includes(path);
};

export const setBottomBtnClick = () => {
  if (!isRunPath()) return;

  if (localStorage.getItem("s0_51") === null) {
    localStorage.setItem("s0_51", "top");
    return;
  }
  // id=s0_51の要素がクリックされた時にローカルストレージにs0_51=bottomを保存
  const ctaBtnList = document.querySelectorAll("[data-search_cta]");
  ctaBtnList.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem("s0_51", btn.dataset.search_cta);
      console.log("bottom saved");
    });
  });
  // ローカルストレージでs0_51=bottomの状態でjs__closeがクリックされたらs0_51=bottomを削除
  document.querySelectorAll(".js__close").forEach((elem) => {
    elem.addEventListener("click", () => {
      if (localStorage.getItem("s0_51")) {
        localStorage.setItem("s0_51", "top");
        console.log("bottom removed");
      }
    });
  });
};

export const addKeyFromBottomBtn = () => {
  if (!isRunPath()) return;
  window.history.replaceState(
    null,
    null,
    `${window.location.href}&runSearch=${localStorage.getItem("s0_51")}`
  );
};

export const addPositionBySearch = () => {
  if (!isRunPath()) return;
  const currentUrl = window.location.href;
  const notRunPage = ["result", "agent_page"];
  if (notRunPage.some((page) => currentUrl.includes(page))) return;

  // root or 2のトップページでのみ以下を実行
  // submitが実行される前にローカルストレージのs0_51をrunSearchに追加
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      if (localStorage.getItem("s0_51")) {
        const search = new URLSearchParams(window.location.search);
        search.set("runSearch", localStorage.getItem("s0_51"));
        window.history.replaceState(
          null,
          null,
          `${window.location.pathname}?${search}`
        );
      }
    });
  });
};
