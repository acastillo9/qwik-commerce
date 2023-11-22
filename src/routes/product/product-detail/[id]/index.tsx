import { component$, $ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { BiCartAdd } from "~/components/icons/bi/cart-add";
import { DiCodeigniter } from "~/components/icons/di/codeigniter";
import { RiBookMarkFill } from "~/components/icons/ri/book-mark-fill";
import { qToast } from "~/integrations/react/toast";
import { useAddToCartAction, useBookmarkProductAction } from "~/routes/layout";
import { getProductById } from "~/server/common/product/get-product-by-id";

export const useProductById = routeLoader$(async (requestEvent) => {
  return await getProductById(requestEvent.params.id);
});

export default component$(() => {
  const product = useProductById();
  const addToCartAction = useAddToCartAction();
  const bookmarkProductAction = useBookmarkProductAction();

  const addToCart = $(async () => {
    const finalData = { productID: product.value._id, userID: "" };
    const res = await addToCartAction.submit(finalData);
    if (res.value.success) {
      qToast.success(res.value.message);
    } else {
      qToast.error(res.value.message);
    }
  });

  const addToBookmark = $(async () => {
    const finalData = { productID: product.value._id, userID: "" };
    const res = await bookmarkProductAction.submit(finalData);
    if (res.value.success) {
      qToast.success(res.value.message);
    } else {
      qToast.error(res.value.message);
    }
  });

  return (
    <div class="w-full h-full dark:text-black lg:h-screen bg-gray-200 py-4 px-2">
      <div class="text-sm breadcrumbs  border-b-2 py-2 px-2 border-b-orange-600">
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
            <Link
              href={`/category/category-product/${product.value.productCategory?._id}`}
            >
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
              {product.value.productCategory?.categoryName ||
                "Loading Category Name"}
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
            {product.value.productName || "Loading Product Name"}
          </li>
        </ul>
      </div>
      <div class="w-full   h-full lg:h-4/5 py-4 px-4 flex items-center justify-center">
        <div class="lg:w-4/5 w-full h-full  bg-gray-100 rounded-xl lg:h-4/5 flex flex-col lg:flex-row items-center justify-center shadow-2xl  ">
          <div class="lg:w-4/12 w-full h-60  lg:h-full  rounded-xl z-10 relative">
            <Image
              src={product.value.productImage}
              layout="fill"
              width={800}
              height={600}
              alt="no Image"
              class="rounded-xl absolute h-full w-full fit-cover"
            />
          </div>
          <div class="lg:w-8/12 w-full px-3 h-full  rounded flex flex-col lg:px-5 py-2">
            <div class="flex flex-col  lg:flex-row md:justify-between w-full md:h-20 py-2 items-center">
              <h1 class="text-3xl font-semibold text-black">
                {product.value.productName}
              </h1>
              {product.value.productFeatured && (
                <p class="px-3 py-2 bg-orange-600 hidden lg:flex font-semibold tracking-widest rounded text-white  items-center justify-center ">
                  <DiCodeigniter class="mx-2" />
                  Featured Product
                </p>
              )}
            </div>
            <p class=" py-2   lg:h-40 w-full">
              {product.value.productDescription}
            </p>
            <h1 class="text-3xl font-semibold text-black py-2">
              $ {`${product.value.productPrice}`}
            </h1>
            <div class="w-full py-2 lg:flex-row flex-col flex ">
              <button
                onClick$={addToCart}
                class="btn m-2 lg:w-52 h-10 btn-outline btn-success flex items-center justify-center"
              >
                {" "}
                <BiCartAdd class="text-3xl mx-2" /> Add to Cart
              </button>
              <button
                onClick$={addToBookmark}
                class="btn m-2  lg:w-52 h-10 btn-outline btn-success flex items-center justify-center"
              >
                {" "}
                <RiBookMarkFill class="text-3xl mx-2" />
                Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
