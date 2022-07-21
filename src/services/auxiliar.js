export function removeTokenInTwoHours() {
  return setTimeout(() => {
    window.localStorage.removeItem("token");
  },7200 * 1000);
}
