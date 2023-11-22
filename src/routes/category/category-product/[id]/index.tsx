import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card";
import { QToastContainer } from "~/integrations/react/toast";
import { getProductByCategoryId } from "~/server/common/product/get-product-by-category-id";

type ProductData = {
  productName: string;
  productImage: string;
  productSlug: string;
  productPrice: Number;
  productFeatured: Boolean;
  productCategory: {
    categoryName: string;
    categoryDescription: string;
    _id: string;
  };
  _id: string;
};

export const useProductByCategoryId = routeLoader$(async (requestEvent) => {
  return await getProductByCategoryId(requestEvent.params.id);
});

export default component$(() => {
  const products = useProductByCategoryId();

  const categoryName = products.value?.map((item: ProductData) => {
    return item.productCategory.categoryName;
  });

  return (
    <div class="w-full h-screen dark:text-black bg-gray-50 py-4 px-2 ">
      <div class="text-sm breadcrumbs  border-b-2 border-b-orange-600">
        <ul>
          <li>
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            {categoryName?.[0] || "Loading Category"}
          </li>
        </ul>
      </div>
      <div class="w-full h-5/6  flex items-start justify-center flex-wrap overflow-auto">
        {products.value?.map((item: ProductData) => {
          return (
            <ProductCard
              productName={item.productName}
              productPrice={item.productPrice}
              productFeatured={item.productFeatured}
              productImage={item.productImage}
              productSlug={item.productSlug}
              productCategory={item.productCategory}
              _id={item._id}
              key={item._id}
            />
          );
        })}
        {products.value?.length && products.value.length < 1 && (
          <p class="text-2xl my-4 text-center font-semibold text-red-400">
            No Product Found in this Category
          </p>
        )}
      </div>
      <QToastContainer />
    </div>
  );
});
