export default function () {
  let token;
  document.cookie.split("; ").forEach((cookie) => {
    if (cookie.startsWith("token")) {
      token = cookie.split("=")[1];
    }
  });
  if (!token) throw new Error("Token could not found");
  return token;
}
