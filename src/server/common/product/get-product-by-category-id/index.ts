import connectDB from "~/db/connect-db";
import { server$ } from "@builder.io/qwik-city";
import Product from "~/model/product";

export const getProductByCategoryId = server$(async function (categoryId) {
  await connectDB(this.env.get("DB_URI") as string);
  try {
    const productModel = await Product.find({ 'productCategory' : categoryId }).populate('productCategory' ,' categoryName categorySlug _id')
    const products = productModel.map(product => product.toObject({
      transform: (doc, ret) => {
        ret._id = ret._id.toString(),
        delete ret.__v
      }
    }));
    return products;
  } catch (error) {
    console.log("Error getting the products by category:", error);
    return null;
  }
});
