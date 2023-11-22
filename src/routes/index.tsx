import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import FeaturedProduct from "~/components/featured-product";
import Footer from "~/components/footer";
import Hero from "~/components/hero";
import Navbar from "~/components/navbar";
import TopCategories from "~/components/top-categories";
import { qToast } from "~/integrations/react/toast";
import { getAllCategories } from "~/server/common/category/get-category";
import { getAllProducts } from "~/server/common/product/get-product";

export const useCategoryData = routeLoader$(async () => {
  return await getAllCategories();
});

export const useProductData = routeLoader$(async () => {
  return await getAllProducts();
});

export default component$(() => {
  useVisibleTask$(() => {
    qToast.warning(
      "Application is under development , some features may not work properly",
    );
    qToast.warning(
      "This is a demo website, you can not buy anything from here",
    );
  });

  return (
    <>
      <Navbar />
      <Hero />
      <TopCategories />
      <FeaturedProduct />
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Fitness ECommerce",
  meta: [
    {
      name: "Fitness ECommerce",
      content:
        "Elevate your workout with our fitness e-commerce platform, where premium gear meets peak performance",
    },
  ],
};
