import connectDB from "~/db/connect-db";
import Category from "~/model/category";
import { server$ } from "@builder.io/qwik-city";

export const getAllCategories = server$(async function () {
  await connectDB(this.env.get("DB_URI") as string);
  try {
    const categoriesModel = await Category.find({});
    const categories = categoriesModel.map(category => category.toObject({
      transform: (doc: any, ret: any) => {
        ret._id = ret._id.toString(),
        delete ret.__v
      }
    }));
    return categories;
  } catch (error) {
    console.log("Error in getting all categories:", error);
    return [];
  }
});
