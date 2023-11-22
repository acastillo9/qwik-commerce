import { component$, Slot } from "@builder.io/qwik";
import { routeAction$, type RequestHandler } from "@builder.io/qwik-city";
import { QToastContainer } from "~/integrations/react/toast";
import { addToCart } from "~/server/cart/add-to-cart";
import { bookmarkProduct } from "~/server/common/bookmark/bookmark-product";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useAddToCartAction = routeAction$(() => {
  return addToCart();
});

export const useBookmarkProductAction = routeAction$(() => {
  return bookmarkProduct();
});

export default component$(() => {
  return (
    <>
      <Slot />
      <QToastContainer client:load />
    </>
  );
});
