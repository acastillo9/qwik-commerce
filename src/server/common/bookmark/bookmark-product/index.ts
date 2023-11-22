import { server$ } from "@builder.io/qwik-city";

export const bookmarkProduct = server$(async function () {
  console.log('Bookmark product from server')
  return { success: false, message: "You are not authorized Please login!" };
});
