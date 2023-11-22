import { models, model, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    categoryName: String,
    categoryDescription: String,
    categoryImage: String,
    categorySlug: String,
  },
  { timestamps: true },
);

const Category = models?.Categories || model("Categories", CategorySchema);

export default Category;
