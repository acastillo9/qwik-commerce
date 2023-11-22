import { component$ } from "@builder.io/qwik";
import { useCategoryData } from "~/routes";
import CategoryCard from "../category-card";

type CategoryData = {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  categorySlug: string;
};

export default component$(() => {
  const categoryData = useCategoryData();

  const filteredCategories = categoryData.value.slice(0, 3);

  return (
    <div
      id="my-Categories"
      class="w-full bg-gray-50  flex items-center flex-col justify-start"
    >
      <div class="flex items-center justify-center px-2 py-2 mb-2">
        <h1 class="py-2 px-4 border-x-2 border-x-orange-500 text-black font-semibold text-2xl ">
          Top Categories
        </h1>
      </div>

      <div class="md:w-4/5 w-full min-h-16  px-1  py-2 md:px-4 flex items-center justify-center flex-wrap">
        {filteredCategories.length < 1 ? (
          <h1 class="text-2xl font-semibold text-gray-500">No Categories</h1>
        ) : (
          filteredCategories.map((item: CategoryData) => {
            return (
              <CategoryCard
                categoryName={item.categoryName}
                categoryDescription={item.categoryDescription}
                categoryImage={item.categoryImage}
                categorySlug={item.categorySlug}
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
