export default function (token) {
  const time = new Date().getTime() + 1000 * 36000;
  document.cookie = `token=${token};expires=${time.toString()}`;
}
