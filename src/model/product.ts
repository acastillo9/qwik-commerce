import { models, model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: String,
    productDescription: String,
    productImage: String,
    productSlug: String,
    productPrice: Number,
    productQuantity: Number,
    productFeatured: Boolean,
    productCategory: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  { timestamps: true },
);

const Product = models?.Products || model("Products", ProductSchema);

export default Product;
