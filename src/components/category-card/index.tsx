import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

type CategoryData = {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  categorySlug: string;
};

export default component$(
  ({ categoryImage, categoryName, _id }: CategoryData) => {
    const nav = useNavigate();
    return (
      <div
        onClick$={() => nav(`/category/category-product/${_id}`)}
        class="card card-compact text-black cursor-pointer m-3 w-80 bg-gray-50 shadow-xl relative"
      >
        <div class="w-full rounded relative h-60">
          <img
            src={categoryImage || "/images98.jpg"}
            alt="no Image"
            class="rounded absolute h-full w-full fit-cover"
            height={320}
            width={240}
          />
        </div>
        <div class="card-body">
          <h2 class="card-title mb-1">{categoryName} </h2>
          <button class="btn text-white tracking-widest btn-wide mt-2">
            View Products
          </button>
        </div>
      </div>
    );
  },
);
