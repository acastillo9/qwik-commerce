import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { BsCartPlus } from "@qwikest/icons/bootstrap";
import { MatFavoriteRound } from "@qwikest/icons/material";
import { qToast } from "~/integrations/react/toast";
import { useAddToCartAction, useBookmarkProductAction } from "~/routes/layout";

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

export default component$(
  ({ productName, productImage, productPrice, _id }: ProductData) => {
    const nav = useNavigate();
    const addToCartAction = useAddToCartAction();
    const bookmarkProductAction = useBookmarkProductAction();

    const addToCart = $(async () => {
      const finalData = { productID: _id, userID: "" };
      const res = await addToCartAction.submit(finalData);
      if (res.value.success) {
        qToast.success(res.value.message);
      } else {
        qToast.error(res.value.message);
      }
    });

    const addToBookmark = $(async () => {
      const finalData = { productID: _id, userID: "" };
      const res = await bookmarkProductAction.submit(finalData);
      if (res.value.success) {
        qToast.success(res.value.message);
      } else {
        qToast.error(res.value.message);
      }
    });

    return (
      <div class="card text-black cursor-pointer card-compact m-3 w-80 bg-white shadow-xl relative">
        <div
          onClick$={() => nav(`/product/product-detail/${_id}`)}
          class="w-full rounded relative h-60"
        >
          <img
            src={productImage || "/images98.jpg"}
            alt="no Image"
            class="rounded absolute h-full w-full fit-cover"
            height={320}
            width={240}
          />
        </div>

        <div class="card-body">
          <h2
            class="card-title"
            onClick$={() => nav(`/product/product-detail/${_id}`)}
          >
            {productName}{" "}
          </h2>
          <p
            class="font-semibold"
            onClick$={() => nav(`/product/product-detail/${_id}`)}
          >{`Rs ${productPrice}`}</p>
          <div class="card-actions justify-end z-20">
            <button onClick$={addToCart} class="btn  btn-circle btn-ghost ">
              <BsCartPlus class="text-2xl text-orange-600 font-semibold" />
            </button>
            <button
              onClick$={addToBookmark}
              class="btn btn-circle btn-ghost absolute top-0 right-0 "
            >
              <MatFavoriteRound class="text-2xl text-orange-600 font-semibold" />
            </button>
          </div>
        </div>
      </div>
    );
  },
);
