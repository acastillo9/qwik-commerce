import connectDB from "~/db/connect-db";
import { server$ } from "@builder.io/qwik-city";
import Product from "~/model/product";

export const getAllProducts = server$(async function () {
  await connectDB(this.env.get("DB_URI") as string);
  try {
    const productModel = await Product.find({}).populate('productCategory', ' categoryName categorySlug _id');
    const products = productModel.map(product => product.toObject({
      transform: (doc, ret) => {
        ret._id = ret._id.toString(),
        delete ret.__v
      }
    }));
    return products;
  } catch (error) {
    console.log("Error in getting all products:", error);
    return [];
  }
});
