import { server$ } from "@builder.io/qwik-city";

export const addToCart = server$(async function () {
  console.log('Add to Cart from server')
  return { success: false, message: "You are not authorized Please login!" };
});
