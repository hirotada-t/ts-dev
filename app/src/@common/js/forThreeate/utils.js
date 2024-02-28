export class Cookie {
  static set(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  static get(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  static delete(name) {
    document.cookie = name + "=; Max-Age=-99999999; path=/;";
  }

  static exists(name) {
    return Cookie.get(name) !== null;
  }

  static clear() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      Cookie.delete(cookies[i].split("=")[0]);
    }
  }

  static getAll() {
    const cookies = {};
    const cookiesList = document.cookie.split(";");
    cookiesList.forEach((cookie) => {
      const [key, value] = cookie.split("=").map((str) => str.trim());
      cookies[key] = value;
    });
    return cookies;
  }
}

// オブジェクトが空かどうかを判定
export const emptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};