import connectDB from "~/db/connect-db";
import { server$ } from "@builder.io/qwik-city";
import Product from "~/model/product";

export const getProductById = server$(async function (id) {
  await connectDB(this.env.get("DB_URI") as string);
  try {
    const productModel = await Product.findById(id).populate('productCategory' ,' categoryName categorySlug _id')
    const product = productModel.toObject({
      transform: (doc: any, ret: any) => {
        ret._id = ret._id.toString(),
        delete ret.__v
      }
    });
    return product;
  } catch (error) {
    console.log("Error getting the product:", error);
    return [];
  }
});
