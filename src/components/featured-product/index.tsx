import { component$ } from "@builder.io/qwik";
import { useProductData } from "~/routes";
import ProductCard from "../product-card";

type ProductData = {
  productName: string;
  productImage: string;
  productSlug: string;
  productPrice: Number;
  productFeatured: Boolean;
  productCategory: {
    categoryName: string;
    _id: string;
    categoryDescription: string;
  };
  _id: string;
};

export default component$(() => {
  const products = useProductData();

  const filteredProducts = products.value
    .filter((prod: ProductData) => prod.productFeatured === true)
    .slice(0, 9);

  return (
    <div class="w-full bg-gray-50 text-black  flex items-center flex-col justify-start">
      <div class="flex items-center justify-center px-2 py-2 mb-2">
        <h1 class="py-2 px-4 border-x-2 border-x-orange-500 font-semibold text-2xl ">
          Top Products
        </h1>
      </div>
      <div class="md:w-4/5 w-full px-1 h-full min-h-96 py-2 md:px-4 flex items-center justify-center flex-wrap">
        {filteredProducts.length < 1 ? (
          <h1 class="text-2xl font-semibold text-gray-500">
            No Featured Products
          </h1>
        ) : (
          filteredProducts.map((item: ProductData) => {
            return (
              <ProductCard
                productName={item.productName}
                productPrice={item.productPrice}
                productFeatured={item.productFeatured}
                productImage={item.productImage}
                productCategory={item.productCategory}
                productSlug={item.productSlug}
                _id={item._id}
                key={item._id}
              />
            );
          })
        )}
      </div>
    </div>
  );
});
