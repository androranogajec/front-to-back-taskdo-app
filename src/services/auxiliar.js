export function removeTokenInTwoHours() {
  return setTimeout(() => {
    return window.localStorage.removeItem("token");
  },20000);
}
